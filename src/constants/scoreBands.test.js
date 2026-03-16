import { describe, expect, it } from 'vitest';
import { getBand, scoreToAngle, scoreToStrokeDashOffset, SCORE_MAX, SCORE_MIN } from './scoreBands';

describe('scoreBands', () => {
  it('returns correct labels at key boundaries', () => {
    expect(getBand(0).label).toBe('Poor');
    expect(getBand(299).label).toBe('Poor');
    expect(getBand(300).label).toBe('Below Average');
    expect(getBand(649).label).toBe('Average');
    expect(getBand(650).label).toBe('Good');
    expect(getBand(800).label).toBe('Excellent');
    expect(getBand(900).label).toBe('Excellent');
  });

  it('maps score to gauge angles', () => {
    expect(scoreToAngle(0)).toBe(-90);
    expect(scoreToAngle(450)).toBe(0);
    expect(scoreToAngle(900)).toBe(90);
  });

  it('maps score to stroke offsets', () => {
    expect(scoreToStrokeDashOffset(0)).toBe(371);
    expect(scoreToStrokeDashOffset(900)).toBe(0);
    expect(scoreToStrokeDashOffset(450)).toBeCloseTo(185.5, 1);
  });

  it('exports score bounds', () => {
    expect(SCORE_MIN).toBe(0);
    expect(SCORE_MAX).toBe(900);
  });
});
