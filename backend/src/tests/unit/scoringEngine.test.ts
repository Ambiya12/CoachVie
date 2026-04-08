import { scoringEngine } from '../../services/scoringEngine';

describe('scoringEngine', () => {
  it('computes deterministic scores for complete answers', () => {
    const input = {
      nutrition: [
        { questionCode: 'N1', value: 5 },
        { questionCode: 'N2', value: 4 },
        { questionCode: 'N3', value: 3 },
      ],
      sport: [
        { questionCode: 'S1', value: 2 },
        { questionCode: 'S2', value: 4 },
        { questionCode: 'S3', value: 5 },
      ],
      mind: [
        { questionCode: 'M1', value: 1 },
        { questionCode: 'M2', value: 2 },
        { questionCode: 'M3', value: 3 },
      ],
    };

    const first = scoringEngine.calculateProfileScores(input);
    const second = scoringEngine.calculateProfileScores(input);

    expect(first).toEqual(second);
    expect(first.nutritionScore).toBeGreaterThanOrEqual(0);
    expect(first.nutritionScore).toBeLessThanOrEqual(100);
    expect(first.sportScore).toBeGreaterThanOrEqual(0);
    expect(first.sportScore).toBeLessThanOrEqual(100);
    expect(first.mindScore).toBeGreaterThanOrEqual(0);
    expect(first.mindScore).toBeLessThanOrEqual(100);
  });

  it('throws when a required question is missing', () => {
    const input = {
      nutrition: [
        { questionCode: 'N1', value: 5 },
        { questionCode: 'N2', value: 4 },
      ],
      sport: [
        { questionCode: 'S1', value: 2 },
        { questionCode: 'S2', value: 4 },
        { questionCode: 'S3', value: 5 },
      ],
      mind: [
        { questionCode: 'M1', value: 1 },
        { questionCode: 'M2', value: 2 },
        { questionCode: 'M3', value: 3 },
      ],
    };

    expect(() => scoringEngine.calculateProfileScores(input)).toThrow('Missing required answers');
  });
});
