import type { Queryable } from '../types/database';
import type { PlanItemStatus, ProfileScores } from '../types/domain';
import type { PlanRepository } from '../repositories/PlanRepository';
import type { ContentRepository } from '../repositories/ContentRepository';
import { planGenerationEngine } from './planGenerationEngine';
import { NotFoundError } from '../utils/AppError';

export class PlanService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly contentRepository: ContentRepository,
  ) {}

  async generatePlanForSession(
    userId: number,
    sessionId: number,
    scores: ProfileScores,
    executor?: Queryable,
  ): Promise<{ planId: number; startDate: string; endDate: string; itemCount: number }> {
    const recommendations = {
      nutrition: await this.contentRepository.getRecommendedByScore('nutrition', scores.nutritionScore, executor),
      sport: await this.contentRepository.getRecommendedByScore('sport', scores.sportScore, executor),
      mind: await this.contentRepository.getRecommendedByScore('mind', scores.mindScore, executor),
    };

    const generated = planGenerationEngine.generate(recommendations, new Date());
    const version = await this.planRepository.getNextVersionForUser(userId, executor);
    const planId = await this.planRepository.createPlan(
      userId,
      sessionId,
      version,
      generated.startDate,
      generated.endDate,
      executor,
    );

    await this.planRepository.insertPlanItems(planId, generated.items, executor);

    return {
      planId,
      startDate: generated.startDate,
      endDate: generated.endDate,
      itemCount: generated.items.length,
    };
  }

  async getCurrentPlan(userId: number) {
    const plan = await this.planRepository.getCurrentPlanForUser(userId);
    if (!plan) {
      throw new NotFoundError('No plan found for user');
    }

    const items = await this.planRepository.getPlanItems(plan.id);

    return {
      plan,
      items,
    };
  }

  async getDayItems(userId: number, date: string) {
    const plan = await this.planRepository.getCurrentPlanForUser(userId);
    if (!plan) {
      throw new NotFoundError('No plan found for user');
    }

    const items = await this.planRepository.getItemsForDate(plan.id, date);

    return {
      planId: plan.id,
      date,
      items,
    };
  }

  async updatePlanItemStatus(userId: number, itemId: number, status: PlanItemStatus) {
    const plan = await this.planRepository.getCurrentPlanForUser(userId);
    if (!plan) {
      throw new NotFoundError('No plan found for user');
    }

    const item = await this.planRepository.updatePlanItemStatus(plan.id, itemId, status);
    if (!item) {
      throw new NotFoundError('Plan item not found');
    }

    return item;
  }
}
