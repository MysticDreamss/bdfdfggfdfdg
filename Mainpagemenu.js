
// script.js

const cards = document.querySelectorAll('.tool-card');

cards.forEach(card => {
  const light = card.querySelector('.light-effect');

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    light.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 60%)`;
    light.style.opacity = '1';
  });

  card.addEventListener('mouseleave', () => {
    light.style.opacity = '0';
  });
});

function filterTools() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categorySelect').value;
  const tools = document.querySelectorAll('.tool-card');

  tools.forEach(tool => {
    const title = tool.querySelector('h3').innerText.toLowerCase();
    const tag = tool.getAttribute('data-category');

    const matchText = title.includes(input);
    const matchCategory = category === 'all' || tag === category;

    if (matchText && matchCategory) {
      tool.style.display = 'block';
    } else {
      tool.style.display = 'none';
    }
  });
}



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

