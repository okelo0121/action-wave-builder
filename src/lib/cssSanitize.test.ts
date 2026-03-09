import { describe, it, expect } from 'vitest';
import { sanitizeCssIdent, sanitizeCssValue } from './cssSanitize';

describe('sanitizeCssIdent', () => {
    it('passes through safe identifiers unchanged', () => {
        expect(sanitizeCssIdent('chart-abc_123')).toBe('chart-abc_123');
    });

    it('strips CSS selector break characters', () => {
        // ] breaks out of [data-chart=...] selector
        expect(sanitizeCssIdent('abc]evil')).toBe('abcevil');
    });

    it('strips braces that would break out of a rule block', () => {
        expect(sanitizeCssIdent('abc}{color:red')).toBe('abccolorred');
    });

    it('strips spaces', () => {
        expect(sanitizeCssIdent('my chart')).toBe('mychart');
    });

    it('strips special characters', () => {
        expect(sanitizeCssIdent('<script>')).toBe('script');
    });

    it('returns empty string for fully unsafe input', () => {
        expect(sanitizeCssIdent('!@#$%^&*()')).toBe('');
    });
});

describe('sanitizeCssValue', () => {
    it('passes through safe color values unchanged', () => {
        expect(sanitizeCssValue('#ff0000')).toBe('#ff0000');
        expect(sanitizeCssValue('rgb(255, 0, 0)')).toBe('rgb(255, 0, 0)');
        expect(sanitizeCssValue('hsl(120 100% 50%)')).toBe('hsl(120 100% 50%)');
    });

    it('strips semicolons that would inject new declarations', () => {
        expect(sanitizeCssValue('red; color: blue')).toBe('red color: blue');
    });

    it('strips braces that would break out of a rule block', () => {
        expect(sanitizeCssValue('red} .evil { color: blue')).toBe('red .evil  color: blue');
    });

    it('strips single quotes', () => {
        expect(sanitizeCssValue("red'; content: 'x")).toBe('red content: x');
    });

    it('strips double quotes', () => {
        expect(sanitizeCssValue('red"; content: "x')).toBe('red content: x');
    });

    it('strips backslashes', () => {
        expect(sanitizeCssValue('red\\00')).toBe('red00');
    });
});
