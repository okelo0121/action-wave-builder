import { describe, it, expect } from 'vitest';
import { storedCircleSchema, storedTransactionSchema } from './storageSchemas';

// ── storedCircleSchema ────────────────────────────────────────────────────────

const validCircle = {
    id: 'abc123',
    name: 'My Circle',
    contributionAmount: '100',
    cyclePeriod: 'monthly' as const,
    memberCount: 3,
    maxMembers: 8,
    createdAt: 1700000000000,
    status: 'enrolling' as const,
};

describe('storedCircleSchema', () => {
    it('accepts a valid circle', () => {
        expect(storedCircleSchema.safeParse(validCircle).success).toBe(true);
    });

    it('rejects missing id', () => {
        const { id: _, ...rest } = validCircle;
        expect(storedCircleSchema.safeParse(rest).success).toBe(false);
    });

    it('rejects id longer than 256 chars', () => {
        expect(storedCircleSchema.safeParse({ ...validCircle, id: 'x'.repeat(257) }).success).toBe(false);
    });

    it('rejects name longer than 64 chars', () => {
        expect(storedCircleSchema.safeParse({ ...validCircle, name: 'a'.repeat(65) }).success).toBe(false);
    });

    it('rejects non-integer contributionAmount', () => {
        expect(storedCircleSchema.safeParse({ ...validCircle, contributionAmount: '10.5' }).success).toBe(false);
    });

    it('rejects non-numeric contributionAmount', () => {
        expect(storedCircleSchema.safeParse({ ...validCircle, contributionAmount: 'abc' }).success).toBe(false);
    });

    it('rejects invalid cyclePeriod', () => {
        expect(storedCircleSchema.safeParse({ ...validCircle, cyclePeriod: 'daily' }).success).toBe(false);
    });

    it('rejects invalid status', () => {
        expect(storedCircleSchema.safeParse({ ...validCircle, status: 'hacked' }).success).toBe(false);
    });

    it('rejects maxMembers above 50', () => {
        expect(storedCircleSchema.safeParse({ ...validCircle, maxMembers: 51 }).success).toBe(false);
    });

    it('rejects maxMembers below 2', () => {
        expect(storedCircleSchema.safeParse({ ...validCircle, maxMembers: 1 }).success).toBe(false);
    });

    it('rejects negative createdAt', () => {
        expect(storedCircleSchema.safeParse({ ...validCircle, createdAt: -1 }).success).toBe(false);
    });

    it('strips unknown fields via parse (does not fail)', () => {
        // Zod strips unknown keys by default — the parse succeeds but the extra field is dropped
        const result = storedCircleSchema.safeParse({ ...validCircle, injectedField: 'evil' });
        expect(result.success).toBe(true);
        if (result.success) {
            expect((result.data as Record<string, unknown>)['injectedField']).toBeUndefined();
        }
    });
});

// ── storedTransactionSchema ───────────────────────────────────────────────────

const validTx = {
    id: 'tx_abc',
    type: 'deposit' as const,
    amount: '50',
    date: '2024-01-01T00:00:00.000Z',
    status: 'confirmed' as const,
};

describe('storedTransactionSchema', () => {
    it('accepts a valid transaction', () => {
        expect(storedTransactionSchema.safeParse(validTx).success).toBe(true);
    });

    it('accepts a transaction with optional hash', () => {
        expect(storedTransactionSchema.safeParse({ ...validTx, hash: 'abc123' }).success).toBe(true);
    });

    it('rejects invalid type', () => {
        expect(storedTransactionSchema.safeParse({ ...validTx, type: 'withdrawal' }).success).toBe(false);
    });

    it('rejects non-numeric amount', () => {
        expect(storedTransactionSchema.safeParse({ ...validTx, amount: 'abc' }).success).toBe(false);
    });

    it('accepts decimal amount', () => {
        expect(storedTransactionSchema.safeParse({ ...validTx, amount: '10.5' }).success).toBe(true);
    });

    it('rejects invalid status', () => {
        expect(storedTransactionSchema.safeParse({ ...validTx, status: 'spoofed' }).success).toBe(false);
    });

    it('rejects id longer than 256 chars', () => {
        expect(storedTransactionSchema.safeParse({ ...validTx, id: 'x'.repeat(257) }).success).toBe(false);
    });
});
