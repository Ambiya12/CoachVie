import type { ContentModule, Pillar, PlanItemDraft } from '../types/domain';

const toDateOnly = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};

const addDays = (source: Date, days: number): Date => {
  const copy = new Date(source);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
};

const scheduleOffsets: Record<Pillar, number> = {
  nutrition: 0,
  sport: 2,
  mind: 4,
};

const fallbackContent = (pillar: Pillar): Pick<ContentModule, 'title' | 'description' | 'durationMinutes'> => {
  const defaults: Record<Pillar, Pick<ContentModule, 'title' | 'description' | 'durationMinutes'>> = {
    nutrition: {
      title: 'Routine alimentation',
      description: 'Action nutrition de base pour maintenir de bonnes habitudes.',
      durationMinutes: 20,
    },
    sport: {
      title: 'Routine mouvement',
      description: 'Action sport de base a realiser avec intensite moderee.',
      durationMinutes: 25,
    },
    mind: {
      title: 'Routine esprit',
      description: 'Action de respiration ou meditation pour la regulation mentale.',
      durationMinutes: 12,
    },
  };

  return defaults[pillar];
};

export const planGenerationEngine = {
  generate(
    recommendations: Record<Pillar, ContentModule[]>,
    startDate: Date,
  ): { startDate: string; endDate: string; items: PlanItemDraft[] } {
    const items: PlanItemDraft[] = [];
    const usedSlots = new Set<string>();

    for (let weekIndex = 0; weekIndex < 4; weekIndex += 1) {
      (Object.keys(scheduleOffsets) as Pillar[]).forEach((pillar) => {
        const dateOffset = weekIndex * 7 + scheduleOffsets[pillar];
        const scheduledDate = toDateOnly(addDays(startDate, dateOffset));
        const slotKey = `${scheduledDate}:${pillar}`;

        if (usedSlots.has(slotKey)) {
          return;
        }

        const contentList = recommendations[pillar];
        const selected = contentList[weekIndex % contentList.length] ?? null;
        const fallback = fallbackContent(pillar);

        items.push({
          scheduledDate,
          pillar,
          title: selected?.title ?? fallback.title,
          description: selected?.description ?? fallback.description,
          durationMinutes: selected?.durationMinutes ?? fallback.durationMinutes,
          contentId: selected?.id ?? null,
        });

        usedSlots.add(slotKey);
      });
    }

    return {
      startDate: toDateOnly(startDate),
      endDate: toDateOnly(addDays(startDate, 27)),
      items,
    };
  },
};
