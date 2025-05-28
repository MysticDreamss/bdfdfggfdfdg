// Этот скрипт гарантирует, что код будет выполнен только после полной загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {
    const blinksContainer = document.getElementById('blinks-container');

    // Если контейнер не найден, скрипт не будет работать.
    if (!blinksContainer) {
        console.warn('Контейнер #blinks-container не найден. Анимация бликов не будет запущена.');
        return;
    }

    // Функция для создания одного блика (звездочки)
    function createBlink() {
        const blink = document.createElement('div');
        blink.classList.add('blink'); // Добавляем класс 'blink'

        // Случайные координаты на экране
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        blink.style.left = `${x}px`;
        blink.style.top = `${y}px`;

        blinksContainer.appendChild(blink);

        // Случайная продолжительность анимации для каждого блика (от 2 до 5 секунд)
        const animationDuration = (Math.random() * 3 + 2) + 's';
        blink.style.animation = `fadeInOutBlink ${animationDuration} ease-in-out forwards`;

        // Удаляем блик из DOM после завершения анимации
        blink.addEventListener('animationend', () => {
            blink.remove();
        });
    }

    // Запускаем процесс создания бликов через равные интервалы
    // с дополнительной случайной задержкой для каждого блика.
    setInterval(() => {
        const delay = Math.random() * 1500; // Случайная задержка до 1.5 секунды
        setTimeout(createBlink, delay);
    }, 500); // Проверяем каждые 0.5 секунды
});