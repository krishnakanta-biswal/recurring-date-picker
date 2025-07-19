test("integration: pattern and weekdays combined", () => {
  const { generateRecurringDates } = require("../recurringPicker");
  const result = generateRecurringDates("2025-07-01", "2025-12-31", 1, "Month(s)", [], "second-tuesday");
  expect(result.length).toBeGreaterThan(0);
});