/**
 * Sanitizers for values interpolated into dangerouslySetInnerHTML CSS blocks.
 *
 * CSS identifiers (selector fragments, custom property names) may only contain
 * alphanumerics, hyphens, and underscores. Any other character is stripped.
 *
 * CSS values (colors, lengths, etc.) must not contain characters that can
 * break out of a declaration block: ; { } ' " \
 */
export const sanitizeCssIdent = (value: string): string =>
  value.replace(/[^a-zA-Z0-9_-]/g, '');

export const sanitizeCssValue = (value: string): string =>
  value.replace(/[;{}'"\\]/g, '');
