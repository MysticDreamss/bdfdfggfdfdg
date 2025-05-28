const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
const data = JSON.parse(localStorage.getItem("caseData") || "{}");
const caseList = ["Грёзы и кошмары", "Гремучий кейс", "Килловатт", "Разлом", "Революция", "Спектр", "Оружейный"];

const caseColors = {
  "Грёзы и кошмары": "#ff4c4c",    // красный
  "Гремучий кейс": "#32CD32",      // Лайм заленый
  "Килловатт": "#FF9500",          // золотой
  "Разлом": "#0026A2",             // фиолетовый
  "Революция": "#D502FF",          // томатный
  "Спектр": "#FF0460",             // мятный
  "Оружейный": "#000000"           // стальной синий
};
const casePrices = {
  "Грёзы и кошмары": 75,
  "Гремучий кейс": 12,
  "Килловатт": 36,
  "Разлом": 15,
  "Революция": 24,
  "Спектр": 220,
  "Оружейный": 4800
};

const accountSelect = document.getElementById("accountSelect");
const caseSelect = document.getElementById("caseSelect");
const weekSelect = document.getElementById("weekSelect");
const viewWeekSelect = document.getElementById("viewWeekSelect");
const entriesTable = document.getElementById("entriesTable");
const accountCards = document.getElementById("accountCards");

const totalCases = document.getElementById("totalCases");
const totalMoney = document.getElementById("totalMoney");
const weekCases = document.getElementById("weekCases");
const weekMoney = document.getElementById("weekMoney");

function updateStorage() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
  localStorage.setItem("caseData", JSON.stringify(data));
}

function renderSelects() {
  accountSelect.innerHTML = accounts.map(acc => `<option value="${acc}">${acc}</option>`).join("");
  caseSelect.innerHTML = caseList.map(c => `<option value="${c}">${c}</option>`).join("");
}

function generateWeeks() {
  let weeks = [];
  let start = new Date("2025-05-07");
  for (let i = 0; i < 10; i++) {
    let d = new Date(start);
    d.setDate(d.getDate() + i * 7);
    let key = `Неделя ${i + 1} | ${d.toLocaleDateString("ru-RU")}`;
    weeks.push(key);
  }
  weekSelect.innerHTML = weeks.map(w => `<option value="${w}">${w}</option>`).join("");
  viewWeekSelect.innerHTML = weeks.map(w => `<option value="${w}">${w}</option>`).join("");
}

document.getElementById("addAccount").onclick = () => {
  const name = prompt("Введите имя аккаунта:");
  if (name && !accounts.includes(name)) {
    accounts.push(name);
    updateStorage();
    renderSelects();
  }
};

document.getElementById("removeAccount")?.remove();
const btn = document.createElement("button");
btn.textContent = "Удалить аккаунт";
btn.id = "removeAccount";
btn.onclick = () => {
  const acc = accountSelect.value;
  if (confirm(`Удалить аккаунт ${acc}?`)) {
    const index = accounts.indexOf(acc);
    if (index >= 0) accounts.splice(index, 1);
    for (let week in data) {
      data[week] = data[week].filter(e => e.acc !== acc);
    }
    updateStorage();
    renderSelects();
    renderView(weekView());
  }
};
document.querySelector(".select-group").appendChild(btn);

document.getElementById("addEntry").onclick = () => {
  const acc = accountSelect.value;
  const caseName = caseSelect.value;
  const week = weekSelect.value;
  const price = casePrices[caseName];
  if (!data[week]) data[week] = [];
  data[week].push({ acc, case: caseName, price });
  updateStorage();
  renderView(weekView());
};

function weekView() {
  return viewWeekSelect.value;
}

function renderView(weekKey) {
  const entries = data[weekKey] || [];
  entriesTable.innerHTML = entries.map((e, i) => `
    <div class="row">
      <div>${e.acc}</div>
      <div><span class="badge" style="background:${caseColors[e.case]}">${e.case}</span></div>
      <div>${e.price}</div>
      <div><button onclick="removeEntry('${weekKey}', ${i})">❌</button></div>
    </div>`).join("");

  accountCards.innerHTML = entries.map(e => `
    <div class="card">
      <strong>${e.acc}</strong><br/>
      <small>${weekKey}</small><br/>
      <span class="badge" style="background:${caseColors[e.case]}">${e.case}</span><br/>
      <b>Цена: ${e.price}</b>
    </div>`).join("");

  weekCases.textContent = entries.length;
  weekMoney.textContent = entries.reduce((sum, e) => sum + e.price, 0);

  const allEntries = Object.values(data).flat();
  totalCases.textContent = allEntries.length;
  totalMoney.textContent = allEntries.reduce((sum, e) => sum + e.price, 0);
}

function removeEntry(week, index) {
  if (confirm("Удалить эту запись?")) {
    data[week].splice(index, 1);
    updateStorage();
    renderView(weekView());
  }
}

viewWeekSelect.onchange = () => renderView(weekView());

renderSelects();
generateWeeks();
renderView(weekView());
const gradients = [
  'linear-gradient(135deg,#ce9e2d, #cc8e2e, #c5772c, #c0662e, #ba4b33)',
  'linear-gradient(135deg,#b22750, #f3326c, #d4358a, #922575, #7c1c7f)',
  'linear-gradient(135deg,  #8e2de2, #4a00e0)',
  'linear-gradient(135deg, #4a00e0, #9d00e0,#bc1bfb, #fd364d)',
'linear-gradient(135deg, #a639fa, #3ffbad, #49fd64, #01b920)'
];

const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
  card.style.background = gradients[index % gradients.length];
});

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