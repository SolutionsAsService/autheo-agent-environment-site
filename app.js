import { evaluate } from "./policy.js";
const amount = document.querySelector("#amount");
const scope = document.querySelector("#scope");
const result = document.querySelector("#decision");
function update() {
  const { outcome, reason } = evaluate(
    amount.value === "" ? NaN : Number(amount.value),
    scope.value,
  );
  result.dataset.outcome = outcome;
  document.querySelector("#outcome").textContent = outcome.toUpperCase();
  document.querySelector("#reason").textContent = reason;
}
amount.addEventListener("input", update);
scope.addEventListener("change", update);
for (const button of document.querySelectorAll("[data-amount]"))
  button.addEventListener("click", () => {
    amount.value = button.dataset.amount;
    scope.value = "compute:read";
    update();
  });
update();
