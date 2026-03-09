const VALID_CYCLE_PERIODS = ["weekly", "biweekly", "monthly", "quarterly"] as const;
const MAX_I128 = BigInt("170141183460469231731687303715884105727");

/**
 * Validates circle creation form fields before submitting to the provider.
 * Returns an error message string on failure, or null when all fields are valid.
 *
 * The provider runs the same checks via Zod; this function exists so the UI
 * can give immediate feedback without an async round-trip.
 */
export function validateCircleForm(
  name: string,
  contributionAmount: string,
  cyclePeriod: string,
  maxMembers: number,
): string | null {
  if (!name.trim()) return "Circle name is required";
  if (name.length > 64) return "Circle name must be 64 characters or fewer";
  if (!/^[\w\s\-]+$/.test(name))
    return "Circle name may only contain letters, numbers, spaces, hyphens, and underscores";
  if (!contributionAmount) return "Contribution amount is required";
  if (!/^\d+$/.test(contributionAmount))
    return "Contribution amount must be a positive whole number (no decimals)";
  if (BigInt(contributionAmount) <= 0n)
    return "Contribution amount must be greater than zero";
  if (BigInt(contributionAmount) > MAX_I128)
    return "Contribution amount exceeds maximum allowed value";
  if (!(VALID_CYCLE_PERIODS as readonly string[]).includes(cyclePeriod))
    return "Invalid cycle period";
  if (maxMembers < 2 || maxMembers > 50)
    return "Member count must be between 2 and 50";
  return null;
}
