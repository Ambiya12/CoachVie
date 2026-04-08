import type { ContentRepository } from '../repositories/ContentRepository';
import type { Pillar } from '../types/domain';
import { NotFoundError } from '../utils/AppError';

export class ContentService {
  constructor(private readonly contentRepository: ContentRepository) {}

  async getByPillar(pillar: Pillar) {
    return this.contentRepository.getActiveByPillar(pillar);
  }

  async getById(id: number) {
    const content = await this.contentRepository.getById(id);
    if (!content) {
      throw new NotFoundError('Content not found');
    }

    return content;
  }
}
