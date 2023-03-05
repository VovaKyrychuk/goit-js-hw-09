// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.getElementById('start-btn');
startBtn.disabled = true;
const datepicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      Notiflix.Notify.success('please press Start to start the countdown');
      startBtn.disabled = false;
      startBtn.addEventListener('click', startCountdown);
    }
  },
});

function startCountdown() {
  startBtn.disabled = true;
  const selectedDate = datepicker.selectedDates[0];
  const countdown = setInterval(() => {
    const nowDate = Date.now();
    const distance = selectedDate - nowDate;
    if (distance < 0) {
      clearInterval(countdown);
      startBtn.disabled = true;
    } else {
      updateCountdown(distance);
    }
  }, 1000);
}

function updateCountdown(distance) {
  const { days, hours, minutes, seconds } = convertMs(distance);
  document.querySelector('[data-days]').textContent = days
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-hours]').textContent = hours
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-minutes]').textContent = minutes
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-seconds]').textContent = seconds
    .toString()
    .padStart(2, '0');
}

function convertMs(ms) {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}
