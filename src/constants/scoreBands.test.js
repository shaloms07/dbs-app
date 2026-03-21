import { describe, expect, it } from 'vitest';
import { getBand, scoreToAngle, scoreToStrokeDashOffset, SCORE_MAX, SCORE_MIN } from './scoreBands';

describe('scoreBands', () => {
  it('returns correct labels at key boundaries', () => {
    expect(getBand(0).label).toBe('Extreme Risk');
    expect(getBand(60).label).toBe('Habitual Offender');
    expect(getBand(90).label).toBe('Chronic Violator');
    expect(getBand(120).label).toBe('Serious Risk');
    expect(getBand(150).label).toBe('High Risk');
    expect(getBand(180).label).toBe('At Risk');
    expect(getBand(210).label).toBe('Marginal');
    expect(getBand(240).label).toBe('Average');
    expect(getBand(270).label).toBe('Responsible');
    expect(getBand(300).label).toBe('Exemplary');
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
