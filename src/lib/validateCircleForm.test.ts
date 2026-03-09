import { describe, it, expect } from "vitest";
import { validateCircleForm } from "./validateCircleForm";

describe("validateCircleForm", () => {
  const valid = {
    name: "My Circle",
    amount: "100",
    period: "monthly",
    maxMembers: 8,
  };

  it("returns null for valid input", () => {
    expect(validateCircleForm(valid.name, valid.amount, valid.period, valid.maxMembers)).toBeNull();
  });

  // --- name ---
  it("rejects empty name", () => {
    expect(validateCircleForm("", valid.amount, valid.period, valid.maxMembers)).toBe(
      "Circle name is required",
    );
  });

  it("rejects whitespace-only name", () => {
    expect(validateCircleForm("   ", valid.amount, valid.period, valid.maxMembers)).toBe(
      "Circle name is required",
    );
  });

  it("rejects name longer than 64 characters", () => {
    const longName = "a".repeat(65);
    expect(validateCircleForm(longName, valid.amount, valid.period, valid.maxMembers)).toBe(
      "Circle name must be 64 characters or fewer",
    );
  });

  it("accepts name exactly 64 characters", () => {
    const maxName = "a".repeat(64);
    expect(validateCircleForm(maxName, valid.amount, valid.period, valid.maxMembers)).toBeNull();
  });

  it("rejects name with disallowed characters", () => {
    expect(validateCircleForm("<script>", valid.amount, valid.period, valid.maxMembers)).toBe(
      "Circle name may only contain letters, numbers, spaces, hyphens, and underscores",
    );
  });

  it("accepts name with hyphens and underscores", () => {
    expect(validateCircleForm("My-Circle_2", valid.amount, valid.period, valid.maxMembers)).toBeNull();
  });

  // --- contributionAmount ---
  it("rejects empty contribution amount", () => {
    expect(validateCircleForm(valid.name, "", valid.period, valid.maxMembers)).toBe(
      "Contribution amount is required",
    );
  });

  it("rejects non-numeric contribution amount", () => {
    expect(validateCircleForm(valid.name, "abc", valid.period, valid.maxMembers)).toBe(
      "Contribution amount must be a positive whole number (no decimals)",
    );
  });

  it("rejects decimal contribution amount", () => {
    expect(validateCircleForm(valid.name, "10.5", valid.period, valid.maxMembers)).toBe(
      "Contribution amount must be a positive whole number (no decimals)",
    );
  });

  it("rejects zero contribution amount", () => {
    expect(validateCircleForm(valid.name, "0", valid.period, valid.maxMembers)).toBe(
      "Contribution amount must be greater than zero",
    );
  });

  it("rejects negative contribution amount (string with minus)", () => {
    expect(validateCircleForm(valid.name, "-5", valid.period, valid.maxMembers)).toBe(
      "Contribution amount must be a positive whole number (no decimals)",
    );
  });

  it("rejects contribution amount exceeding i128 max", () => {
    const overMax = (BigInt("170141183460469231731687303715884105727") + 1n).toString();
    expect(validateCircleForm(valid.name, overMax, valid.period, valid.maxMembers)).toBe(
      "Contribution amount exceeds maximum allowed value",
    );
  });

  it("accepts contribution amount equal to i128 max", () => {
    const atMax = "170141183460469231731687303715884105727";
    expect(validateCircleForm(valid.name, atMax, valid.period, valid.maxMembers)).toBeNull();
  });

  // --- cyclePeriod ---
  it("rejects unknown cycle period", () => {
    expect(validateCircleForm(valid.name, valid.amount, "daily", valid.maxMembers)).toBe(
      "Invalid cycle period",
    );
  });

  it("accepts all valid cycle periods", () => {
    for (const period of ["weekly", "biweekly", "monthly", "quarterly"]) {
      expect(validateCircleForm(valid.name, valid.amount, period, valid.maxMembers)).toBeNull();
    }
  });

  // --- maxMembers ---
  it("rejects maxMembers below 2", () => {
    expect(validateCircleForm(valid.name, valid.amount, valid.period, 1)).toBe(
      "Member count must be between 2 and 50",
    );
  });

  it("rejects maxMembers above 50", () => {
    expect(validateCircleForm(valid.name, valid.amount, valid.period, 51)).toBe(
      "Member count must be between 2 and 50",
    );
  });

  it("accepts maxMembers at boundary values 2 and 50", () => {
    expect(validateCircleForm(valid.name, valid.amount, valid.period, 2)).toBeNull();
    expect(validateCircleForm(valid.name, valid.amount, valid.period, 50)).toBeNull();
  });
});
