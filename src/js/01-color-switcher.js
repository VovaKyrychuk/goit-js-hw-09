const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let intervalId;

// Функція, яка генерує випадковий колір
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Функція, яка змінює фоновий колір елемента <body> на випадкове значення
function changeBackgroundColor() {
  const randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
}

// Функція, яка запускає інтервал зміни кольору
function startBackgroundColorChange() {
  // Встановлюємо властивість "disabled" кнопки "Start"
  startBtn.disabled = true;
  // Запускаємо інтервал зміни кольору
  intervalId = setInterval(changeBackgroundColor, 1000);
}

// Функція, яка зупиняє інтервал зміни кольору
function stopBackgroundColorChange() {
  startBtn.disabled = false;
  // Зупиняємо інтервал зміни кольору
  clearInterval(intervalId);
}

startBtn.addEventListener('click', startBackgroundColorChange);
stopBtn.addEventListener('click', stopBackgroundColorChange);
