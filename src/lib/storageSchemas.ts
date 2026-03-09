import { z } from 'zod';

export const VALID_CYCLE_PERIODS = ['weekly', 'biweekly', 'monthly', 'quarterly'] as const;

// Validates Circle objects read back from localStorage.
// Rejects structurally valid but semantically malicious payloads
// (e.g. spoofed status, injected ids, negative amounts).
export const storedCircleSchema = z.object({
    id: z.string().min(1).max(256),
    name: z.string().min(1).max(64),
    contributionAmount: z.string().regex(/^\d+$/),
    cyclePeriod: z.enum(VALID_CYCLE_PERIODS),
    memberCount: z.number().int().min(0),
    maxMembers: z.number().int().min(2).max(50),
    createdAt: z.number().int().min(0),
    status: z.enum(['enrolling', 'active', 'completed']),
});

// Validates Transaction objects read back from localStorage.
export const storedTransactionSchema = z.object({
    id: z.string().min(1).max(256),
    type: z.enum(['deposit', 'payout', 'join']),
    amount: z.string().regex(/^\d+(\.\d+)?$/),
    date: z.string().datetime({ offset: true }).or(z.string().min(1)),
    hash: z.string().optional(),
    status: z.enum(['pending', 'confirmed', 'failed']),
});

export type StoredCircle = z.infer<typeof storedCircleSchema>;
export type StoredTransaction = z.infer<typeof storedTransactionSchema>;
