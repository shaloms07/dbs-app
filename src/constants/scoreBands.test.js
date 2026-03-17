import { describe, expect, it } from 'vitest';
import { getBand, scoreToAngle, scoreToStrokeDashOffset, SCORE_MAX, SCORE_MIN } from './scoreBands';

describe('scoreBands', () => {
  it('returns correct labels at key boundaries', () => {
    expect(getBand(0).label).toBe('Poor');
    expect(getBand(99).label).toBe('Poor');
    expect(getBand(100).label).toBe('Below Average');
    expect(getBand(219).label).toBe('Average');
    expect(getBand(220).label).toBe('Good');
    expect(getBand(260).label).toBe('Excellent');
    expect(getBand(300).label).toBe('Excellent');
  });

  it('maps score to gauge angles', () => {
    expect(scoreToAngle(0)).toBe(-90);
    expect(scoreToAngle(150)).toBe(0);
    expect(scoreToAngle(300)).toBe(90);
  });

  it('maps score to stroke offsets', () => {
    expect(scoreToStrokeDashOffset(0)).toBe(371);
    expect(scoreToStrokeDashOffset(300)).toBe(0);
    expect(scoreToStrokeDashOffset(150)).toBeCloseTo(185.5, 1);
  });

  it('exports score bounds', () => {
    expect(SCORE_MIN).toBe(0);
    expect(SCORE_MAX).toBe(300);
  });
});
