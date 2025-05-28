const sampleMissions = [
  "Открой 10 кейсов",
  "Выбей 3 предмета выше обычной редкости",
  "Продай 1 предмет на торговле",
  "Собери 5 предметов из одной категории",
  "Получай 1000 монет с кейсов",
  "Участвуй в 3-х подряд фармах"
];

function joinTournament() {
  const duration = document.getElementById('duration').value;
  const payment = document.getElementById('payment').value;
  
  alert(`Вы участвуете на ${duration} дней за ${payment === 'money' ? '$5' : 'кейсы'}`);
  
  const shuffled = sampleMissions.sort(() => 0.5 - Math.random());
  const missions = shuffled.slice(0, 3);

  const list = document.getElementById('missions-list');
  list.innerHTML = '';
  missions.forEach(m => {
    const li = document.createElement('li');
    li.textContent = m;
    list.appendChild(li);
  });
}
