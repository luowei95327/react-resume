import { describe, expect, it } from 'vitest';
import {
  MAX_STAGE_MS,
  MIN_STAGE_MS,
  MS_PER_CHAR,
  stageDuration,
  visibleLength,
  visibleSlice,
} from './typing';

const TEXT = 'abcdefghij';

describe('stageDuration', () => {
  it('scales with the character count', () => {
    expect(stageDuration(400)).toBe(400 * MS_PER_CHAR);
  });

  it('never drops below the minimum for tiny stages', () => {
    expect(stageDuration(1)).toBe(MIN_STAGE_MS);
    expect(stageDuration(0)).toBe(MIN_STAGE_MS);
  });

  it('stays bounded for very long resumes', () => {
    expect(stageDuration(50_000)).toBe(MAX_STAGE_MS);
  });

  it('keeps the default resume intro well under the old ~121s', () => {
    const total =
      stageDuration(1374) + stageDuration(582) + stageDuration(239) + stageDuration(833);

    expect(total).toBeLessThan(25_000);
  });
});

describe('visibleLength', () => {
  it('starts at the current length', () => {
    expect(visibleLength(0, TEXT.length, 0)).toBe(0);
    expect(visibleLength(4, TEXT.length, 0)).toBe(4);
  });

  it('is monotonic and ends exactly at the full length', () => {
    let previous = -1;
    for (let step = 0; step <= 100; step += 1) {
      const length = visibleLength(0, TEXT.length, step / 100);
      expect(length).toBeGreaterThanOrEqual(previous);
      previous = length;
    }
    expect(visibleLength(0, TEXT.length, 1)).toBe(TEXT.length);
  });

  it('clamps progress outside 0..1', () => {
    expect(visibleLength(0, TEXT.length, -3)).toBe(0);
    expect(visibleLength(0, TEXT.length, 4)).toBe(TEXT.length);
  });

  it('resumes from an existing prefix', () => {
    expect(visibleLength(5, TEXT.length, 1)).toBe(TEXT.length);
    expect(visibleLength(5, TEXT.length, 0.5)).toBe(8);
  });
});

describe('visibleSlice', () => {
  it('always returns a prefix of the text', () => {
    for (let step = 0; step <= 20; step += 1) {
      const slice = visibleSlice(TEXT, 0, step / 20);
      expect(TEXT.startsWith(slice)).toBe(true);
    }
  });

  it('returns the whole text at the end of the stage', () => {
    expect(visibleSlice(TEXT, 0, 1)).toBe(TEXT);
    expect(visibleSlice(TEXT, 4, 1)).toBe(TEXT);
  });
});
