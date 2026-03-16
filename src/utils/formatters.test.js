import { describe, expect, it, vi } from 'vitest';
import { daysUntil, formatDateIN, formatINR, getGreeting, maskString, timeAgo } from './formatters';

describe('formatters', () => {
  it('formats INR', () => {
    expect(formatINR(2094)).toContain('2,094');
  });

  it('formats dates in Indian style', () => {
    expect(formatDateIN('2026-04-15')).toMatch(/15.*Apr.*2026/);
  });

  it('returns greeting by hour', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-16T08:00:00'));
    expect(getGreeting()).toBe('Good morning');
    vi.setSystemTime(new Date('2026-03-16T14:00:00'));
    expect(getGreeting()).toBe('Good afternoon');
    vi.setSystemTime(new Date('2026-03-16T19:00:00'));
    expect(getGreeting()).toBe('Good evening');
    vi.useRealTimers();
  });

  it('masks strings', () => {
    expect(maskString('UP14123456789', 4, 4)).toBe('UP14*****6789');
    expect(maskString('', 4, 4)).toBe('');
  });

  it('calculates days until target date', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-16T00:00:00'));
    expect(daysUntil('2026-03-16')).toBe(0);
    expect(daysUntil('2026-03-17')).toBe(1);
    expect(daysUntil('2026-03-15')).toBe(-1);
    vi.useRealTimers();
  });

  it('formats relative time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-16T12:00:00Z'));
    expect(timeAgo('2026-03-16T11:58:00Z')).toBe('2 minutes ago');
    expect(timeAgo('2026-03-16T10:00:00Z')).toBe('2 hours ago');
    vi.useRealTimers();
  });
});
