import { generateRecurringDates } from './recurringPicker.js';

const startInput = document.getElementById('start-date');
const endInput = document.getElementById('end-date');
const repeatType = document.getElementById('repeat-type');
const intervalInput = document.getElementById('interval');
const weekdaysCheckboxes = document.querySelectorAll('#weekdays input[type="checkbox"]');
const saveBtn = document.getElementById('save-btn');
const previewDiv = document.getElementById('preview-dates');

saveBtn.addEventListener('click', () => {
  const startDate = startInput.value;
  const endDate = endInput.value;
  const repeat = repeatType.value;
  const interval = parseInt(intervalInput.value) || 1;

  const selectedWeekdays = Array.from(weekdaysCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => parseInt(checkbox.value));

  if (!startDate) {
    alert('Please select a start date.');
    return;
  }

  const result = generateRecurringDates(startDate, endDate, repeat, interval, selectedWeekdays);

  if (result.length === 0) {
    previewDiv.innerText = 'No recurring dates found.';
  } else {
    previewDiv.innerHTML = result.map(date => date.toDateString()).join('<br>');
  }
});