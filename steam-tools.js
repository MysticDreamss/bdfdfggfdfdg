

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


