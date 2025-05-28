
 //  БЛИНКИ
function applyTheme(theme) {
  if (theme === 'default') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', theme);
  }
  iconContainer.innerHTML = icons[theme];
  localStorage.setItem('selectedTheme', theme);
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  applyTheme(themes[currentThemeIndex]);
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('selectedTheme') || 'default';
  currentThemeIndex = themes.indexOf(savedTheme);
  applyTheme(savedTheme);
});

// Этот скрипт гарантирует, что код будет выполнен только после полной загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {
    const blinksContainer = document.getElementById('blinks-container');

    // Функция для создания одного блика (звездочки)
    function createBlink() {
        const blink = document.createElement('div'); // Создаем новый div-элемент
        blink.classList.add('blink'); // Добавляем ему класс 'blink' для применения стилей

        // Генерируем случайные координаты для размещения блика на экране
        const x = Math.random() * window.innerWidth; // Случайная позиция по горизонтали
        const y = Math.random() * window.innerHeight; // Случайная позиция по вертикали

        blink.style.left = `${x}px`; // Устанавливаем позицию
        blink.style.top = `${y}px`;

        blinksContainer.appendChild(blink); // Добавляем блик в контейнер на странице

        // Случайная продолжительность анимации для каждого блика
        // Это делает появление/исчезновение более естественным и разнообразным.
        const animationDuration = (Math.random() * 3 + 2) + 's'; // Длительность от 2 до 5 секунд
        blink.style.animation = `fadeInOutBlink ${animationDuration} ease-in-out forwards`;

        // Удаляем блик из DOM после завершения его анимации.
        // Это предотвращает накопление лишних элементов и оптимизирует производительность.
        blink.addEventListener('animationend', () => {
            blink.remove();
        });
    }

    // Запускаем процесс создания бликов через равные интервалы,
    // но с дополнительной случайной задержкой для каждого блика.
    setInterval(() => {
        const delay = Math.random() * 1500; // Случайная задержка до 1.5 секунды
        setTimeout(createBlink, delay); // Вызываем createBlink после этой задержки
    }, 500); // Проверяем каждые 0.5 секунды, не пора ли создать новый блик
});




const iconContainer = document.getElementById('theme-icon-container');
const root = document.documentElement;

const themes = ['light', 'neon', 'default'];
let currentThemeIndex = 0;

const icons = {
  default: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    stroke-width="1.5" stroke="currentColor" width="28" height="28">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 
      18 15.75c-5.385 0-9.75-4.365-9.75-9.75 
      0-1.33.266-2.597.748-3.752A9.753 9.753 
      0 0 0 3 11.25C3 16.635 7.365 21 
      12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>`, // 🌙 Тёмная тема
  light: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    stroke-width="1.5" stroke="currentColor" width="28" height="28">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 
      6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 
      1.591M5.25 12H3m4.227-4.773L5.636 
      5.636M15.75 12a3.75 3.75 0 1 1-7.5 
      0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>`, // 🌞 Светлая тема
  neon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" width="28" height="28" stroke="currentColor" stroke-width="2">
    <circle cx="32" cy="20" r="10" stroke="#ff00cc" />
    <path d="M10 45 Q20 40, 30 45 T50 45" stroke="#00ffaa" fill="none" />
    <path d="M14 52 Q26 48, 38 52 T58 52" stroke="#00ffaa" fill="none" />
  </svg>` // 🌐 Неоновая тема
};


