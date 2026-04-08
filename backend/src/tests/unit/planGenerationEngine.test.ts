import { planGenerationEngine } from '../../services/planGenerationEngine';

describe('planGenerationEngine', () => {
  it('builds a 4-week deterministic plan with no duplicate pillar/day slots', () => {
    const recommendations = {
      nutrition: [
        {
          id: 1,
          pillar: 'nutrition' as const,
          title: 'Nutrition A',
          description: 'Desc A',
          durationMinutes: 20,
          externalLink: null,
        },
      ],
      sport: [
        {
          id: 2,
          pillar: 'sport' as const,
          title: 'Sport A',
          description: 'Desc B',
          durationMinutes: 30,
          externalLink: null,
        },
      ],
      mind: [
        {
          id: 3,
          pillar: 'mind' as const,
          title: 'Mind A',
          description: 'Desc C',
          durationMinutes: 15,
          externalLink: null,
        },
      ],
    };

    const generated = planGenerationEngine.generate(recommendations, new Date('2026-04-07T00:00:00.000Z'));

    expect(generated.items).toHaveLength(12);

    const slots = new Set(generated.items.map((item) => `${item.scheduledDate}:${item.pillar}`));
    expect(slots.size).toBe(12);
    expect(generated.startDate).toBe('2026-04-07');
    expect(generated.endDate).toBe('2026-05-04');
  });
});
