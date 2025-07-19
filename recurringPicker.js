// recurringPicker.js

export function createRecurringPicker(containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML = `
    <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
      <h2 class="text-xl font-bold mb-4 text-center">Recurring Date Picker</h2>
      <label class="block mb-2 font-medium">Start Date:</label>
      <input type="date" id="startDate" class="input" />

      <label class="block mt-4 mb-2 font-medium">End Date (optional):</label>
      <input type="date" id="endDate" class="input" />

      <label class="block mt-4 mb-2 font-medium">Repeat:</label>
      <select id="recurrenceType" class="input">
        <option value="none">Does not repeat</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <label class="block mt-4 mb-2 font-medium">Repeat every:</label>
      <input type="number" id="interval" class="input" min="1" value="1" />

      <div id="weekdaySelector" class="mt-4 hidden">
        <label class="block mb-2 font-medium">Select Weekdays:</label>
        <div class="grid grid-cols-4 gap-2 text-sm">
          ${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            .map((day, index) => `
              <label><input type="checkbox" value="${index}" class="weekday" /> ${day}</label>
            `)
            .join("")}
        </div>
      </div>

      <div class="flex gap-2 mt-6">
        <button id="saveBtn" class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full">Save</button>
        <button id="resetBtn" class="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 w-full">Clear</button>
      </div>

      <div class="mt-6">
        <p class="font-medium mb-1">Preview Dates:</p>
        <ul id="previewDates" class="text-sm text-gray-700 space-y-1"></ul>
      </div>
    </div>
  `;

  const recurrenceType = document.getElementById("recurrenceType");
  const weekdaySelector = document.getElementById("weekdaySelector");
  const previewList = document.getElementById("previewDates");

  recurrenceType.addEventListener("change", () => {
    weekdaySelector.classList.toggle("hidden", recurrenceType.value !== "weekly");
    updatePreview();
  });

  ["startDate", "endDate", "interval"].forEach((id) =>
    document.getElementById(id).addEventListener("change", updatePreview)
  );

  document.querySelectorAll(".weekday").forEach((checkbox) =>
    checkbox.addEventListener("change", updatePreview)
  );

  function updatePreview() {
    previewList.innerHTML = "";
    const start = new Date(document.getElementById("startDate").value);
    const endVal = document.getElementById("endDate").value;
    const end = endVal ? new Date(endVal) : null;
    const type = recurrenceType.value;
    const interval = parseInt(document.getElementById("interval").value) || 1;
    const selectedWeekdays = [...document.querySelectorAll(".weekday:checked")].map(cb => parseInt(cb.value));

    if (isNaN(start.getTime())) return;

    let current = new Date(start);
    let count = 0;
    while ((!end || current <= end) && count < 100) {
      let include = false;

      switch (type) {
        case "none":
          include = count === 0;
          break;
        case "daily":
          include = true;
          break;
        case "weekly":
          include = selectedWeekdays.includes(current.getDay());
          break;
        case "monthly":
          include = true;
          break;
        case "yearly":
          include = true;
          break;
      }

      if (include) {
        const dateStr = current.toISOString().split("T")[0];
        const li = document.createElement("li");
        li.textContent = dateStr;
        previewList.appendChild(li);
      }

      switch (type) {
        case "daily":
          current.setDate(current.getDate() + interval);
          break;
        case "weekly":
          current.setDate(current.getDate() + 1);
          break;
        case "monthly":
          current.setMonth(current.getMonth() + interval);
          break;
        case "yearly":
          current.setFullYear(current.getFullYear() + interval);
          break;
        default:
          break;
      }

      count++;
    }
  }

  document.getElementById("saveBtn").addEventListener("click", () => {
    const dates = [...previewList.querySelectorAll("li")].map(li => li.textContent);
    if (dates.length) {
      alert("Saved Recurring Dates:\n" + dates.join("\n"));
      console.log("Saved Recurring Dates:", dates);
    } else {
      alert("No recurring dates to save.");
    }
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    recurrenceType.value = "none";
    document.getElementById("interval").value = "1";
    document.querySelectorAll(".weekday").forEach(cb => cb.checked = false);
    weekdaySelector.classList.add("hidden");
    previewList.innerHTML = "";
  });
}