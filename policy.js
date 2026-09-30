// Educational, stateless model. Not an authorization engine or wallet.
export function evaluate(amount, scope = "compute:read") {
  if (!Number.isSafeInteger(amount) || amount < 0 || amount > 100)
    return {
      outcome: "block",
      reason: "Enter a whole number from 0 to 100 DEMO units.",
    };
  if (scope !== "compute:read")
    return {
      outcome: "block",
      reason: "This mandate does not grant that operation.",
    };
  if (amount > 60)
    return {
      outcome: "block",
      reason: "The request exceeds the 60 DEMO units remaining.",
    };
  if (amount > 50)
    return {
      outcome: "escalate",
      reason: "Within budget, but above the 50-unit review threshold.",
    };
  return {
    outcome: "allow",
    reason: "Within this illustrative scope and budget. No action is executed.",
  };
}
