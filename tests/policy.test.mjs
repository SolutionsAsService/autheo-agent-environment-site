import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { evaluate } from "../policy.js";
test("policy enforces scope and budget before escalation", () => {
  assert.equal(evaluate(40).outcome, "allow");
  assert.equal(evaluate(50).outcome, "allow");
  assert.equal(evaluate(51).outcome, "escalate");
  assert.equal(evaluate(60).outcome, "escalate");
  assert.equal(evaluate(61).outcome, "block");
  assert.equal(evaluate(40, "wallet:transfer").outcome, "block");
});
test("invalid values fail closed", () => {
  for (const v of [-1, 101, 0.5, NaN, Infinity, "40", null])
    assert.equal(evaluate(v).outcome, "block");
});
test("deployment contains public assets only", () => {
  assert.deepEqual(readdirSync(new URL("../dist", import.meta.url)).sort(), [
    ".nojekyll",
    "app.js",
    "favicon.svg",
    "index.html",
    "policy.js",
    "style.css",
  ]);
  const html = readFileSync(
    new URL("../dist/index.html", import.meta.url),
    "utf8",
  );
  for (const file of ["app.js", "style.css", "favicon.svg"])
    assert.ok(html.includes("./" + file));
  assert.match(html.replace(/\s+/g, " "), /planned—not connected/);
});
