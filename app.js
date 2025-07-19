document.getElementById("save-btn").addEventListener("click", () => {
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const interval = parseInt(document.getElementById("interval").value);
  const frequency = document.getElementById("frequency").value;
  const pattern = document.getElementById("monthly-pattern").value;

  const weekdays = Array.from(document.querySelectorAll("input[type=checkbox]:checked"))
    .map(cb => parseInt(cb.value));

  if (!startDate) return alert("Please select start date");

  const recurringDates = generateRecurringDates(startDate, endDate, interval, frequency, weekdays, pattern);

  const ul = document.getElementById("preview-list");
  ul.innerHTML = "";
  recurringDates.forEach(date => {
    const li = document.createElement("li");
    li.textContent = date;
    ul.appendChild(li);
  });

  alert("Recurring pattern saved!");
});

document.getElementById("clear-btn").addEventListener("click", () => {
  document.getElementById("start-date").value = "";
  document.getElementById("end-date").value = "";
  document.getElementById("interval").value = 1;
  document.getElementById("frequency").value = "Day(s)";
  document.getElementById("monthly-pattern").value = "";
  document.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);
  document.getElementById("preview-list").innerHTML = "";
});
