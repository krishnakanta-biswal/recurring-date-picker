function generateRecurringDates(startDate, endDate, interval, frequency, weekdays, pattern) {
  const result = [];
  const current = new Date(startDate);
  const maxDate = endDate ? new Date(endDate) : new Date(startDate);
  maxDate.setFullYear(maxDate.getFullYear() + 1); // safety net

  while (current <= maxDate) {
    const copy = new Date(current);
    if (pattern === "second-tuesday") {
      if (copy.getDate() === getNthWeekdayOfMonth(copy.getFullYear(), copy.getMonth(), 2, 2).getDate()) {
        result.push(copy.toDateString());
      }
    } else if (weekdays.length === 0 || weekdays.includes(copy.getDay())) {
      result.push(copy.toDateString());
    }

    switch (frequency) {
      case "Day(s)": current.setDate(current.getDate() + interval); break;
      case "Week(s)": current.setDate(current.getDate() + interval * 7); break;
      case "Month(s)": current.setMonth(current.getMonth() + interval); break;
      case "Year(s)": current.setFullYear(current.getFullYear() + interval); break;
    }
  }

  return result;
}

function getNthWeekdayOfMonth(year, month, n, weekday) {
  const date = new Date(year, month, 1);
  let count = 0;
  while (date.getMonth() === month) {
    if (date.getDay() === weekday) count++;
    if (count === n) return new Date(date);
    date.setDate(date.getDate() + 1);
  }
  return null;
}

if (typeof module !== "undefined") {
  module.exports = { generateRecurringDates, getNthWeekdayOfMonth };
}
