const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
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






let selectedCursor = null;
let selectedPointer = null;

// Переключение вкладок
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const selected = tab.dataset.tab;
    document.querySelectorAll(".tab-content").forEach(content => {
      content.classList.remove("active");
    });
    document.querySelector(`.tab-${selected}`).classList.add("active");

    // 🟣 Новый код — повторно фильтруем
    const input = document.getElementById('cursor-search');
    if (input) {
      const event = new Event('input');
      input.dispatchEvent(event);
    }
  });
});


// Открытие модального окна
document.getElementById("open-cursor-menu").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("cursor-modal").style.display = "flex";
});

// Закрытие модального окна
document.getElementById("close-cursor-modal").addEventListener("click", function () {
  document.getElementById("cursor-modal").style.display = "none";
});

// Выбор курсора или поинтера
document.querySelectorAll(".cursor-options").forEach(group => {
  group.addEventListener("click", (e) => {
    const target = e.target.closest(".cursor-option");
    if (!target) return;

    group.querySelectorAll(".cursor-option").forEach(opt => opt.classList.remove("selected"));
    target.classList.add("selected");

    const type = group.dataset.type;
    const img = target.querySelector("img");
    const name = img ? img.getAttribute("src") : null;

    if (type === "cursor") selectedCursor = name;
    if (type === "pointer") selectedPointer = name;
  });
});

// Подтверждение выбора
document.querySelector(".confirm-cursor").addEventListener("click", () => {
  if (selectedCursor) {
    localStorage.setItem('selectedCursor', selectedCursor);
    document.body.style.cursor = `url('${selectedCursor}'), auto`;
  }

  if (selectedPointer) {
    localStorage.setItem('selectedPointer', selectedPointer);

    const pointerTargets = document.querySelectorAll(
      "button, a, [role='button'], .clickable, .tool-card, .tab, .confirm-cursor"
    );
    pointerTargets.forEach(el => {
      el.style.cursor = `url('${selectedPointer}'), pointer`;
    });
  }

  document.getElementById("cursor-modal").style.display = "none";
});

// Применение сохранённых курсоров при загрузке
window.addEventListener("DOMContentLoaded", () => {
  const savedCursor = localStorage.getItem('selectedCursor');
  const savedPointer = localStorage.getItem('selectedPointer');

  if (savedCursor) {
    document.body.style.cursor = `url('${savedCursor}'), auto`;
    selectedCursor = savedCursor;

    document.querySelectorAll('.tab-cursor .cursor-option').forEach(opt => {
      const img = opt.querySelector('img');
      opt.classList.toggle('selected', img && img.getAttribute("src") === savedCursor);
    });
  }

  if (savedPointer) {
    selectedPointer = savedPointer;

    const pointerTargets = document.querySelectorAll(
      "button, a, [role='button'], .clickable, .tool-card, .tab, .confirm-cursor"
    );
    pointerTargets.forEach(el => {
      el.style.cursor = `url('${savedPointer}'), pointer`;
    });

    document.querySelectorAll('.tab-pointer .cursor-option').forEach(opt => {
      const img = opt.querySelector('img');
      opt.classList.toggle('selected', img && img.getAttribute("src") === savedPointer);
    });
  }
});

// Поиск по названию курсора
// Фільтр курсорів по пошуку
document.getElementById('cursor-search').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const allOptions = document.querySelectorAll('.tab-content.active .cursor-option');

  allOptions.forEach(opt => {
    const text = opt.querySelector('p')?.textContent.toLowerCase() || '';
    if (text.includes(query)) {
      opt.classList.remove('hidden');
    } else {
      opt.classList.add('hidden');
    }
  });
});



// === Частицы пламени внутри модального окна ===
function createFlameParticle() {
  const container = document.getElementById("cursor-particles");
  if (!container) return;

  const particle = document.createElement("div");
  particle.className = "cursor-particle";

  const x = Math.random() * container.offsetWidth;
  const y = Math.random() * 20 + (container.offsetHeight - 30); // чуть снизу

  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  container.appendChild(particle);

  setTimeout(() => particle.remove(), 2000);
}

// Запуск частиц только при открытом окне
setInterval(() => {
  const modal = document.getElementById("cursor-modal");
  if (modal && modal.style.display === "flex") {
    createFlameParticle();
  }
}, 150);
