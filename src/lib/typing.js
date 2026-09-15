/*
 * Timing helpers for the intro animation.
 *
 * The animation used to be one `setTimeout` per character (3028 timers for the
 * default resume) which also re-rendered the whole app per character and took
 * ~121s. It is now driven by requestAnimationFrame with a wall-clock budget:
 * the visible text is a pure function of elapsed time, so the number of frames
 * is bounded by the frame rate instead of by the content length, and the
 * duration stays sane when someone forks this with a much longer resume.
 */

export const MIN_STAGE_MS = 1200;
export const MAX_STAGE_MS = 6000;
export const MS_PER_CHAR = 6;

/** How long a stage of `charCount` characters should take. */
export function stageDuration(charCount) {
  return Math.min(MAX_STAGE_MS, Math.max(MIN_STAGE_MS, charCount * MS_PER_CHAR));
}

/** How many characters are visible at `progress` (0..1) of a stage. */
export function visibleLength(fromLength, totalLength, progress) {
  const clamped = Math.min(1, Math.max(0, progress));
  if (clamped >= 1) {
    return totalLength;
  }
  return fromLength + Math.round((totalLength - fromLength) * clamped);
}

/** The substring of `text` visible at `progress`, always ending on a full string. */
export function visibleSlice(text, fromLength, progress) {
  return text.slice(0, visibleLength(fromLength, text.length, progress));
}
