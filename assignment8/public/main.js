// public/main.js
const list = document.getElementById('list');
const form = document.getElementById('form');
const titleInput = form.elements['title'];
const authorInput = form.elements['author'];
const priceInput = form.elements['price'];
const message = document.getElementById('message');

async function load() {
  const rows = await (await fetch('/books')).json();
  list.innerHTML = rows.map(b =>
    `<li>${b.title} - $${b.price}
       <button data-id="${b.id}">delete</button></li>`
  ).join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: titleInput.value,
      author: authorInput.value,
      price: parseFloat(priceInput.value)
    })
  });
  if (!res.ok) {
    const err = await res.json();
    message.textContent = err.error;
    return;
  }
  message.textContent = '';
  form.reset();
  load();
});

list.addEventListener('click', async (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  const res = await fetch('/books/' + e.target.dataset.id, { method: 'DELETE' });
  if (!res.ok) {
    const err = await res.json();
    message.textContent = err.error;   // e.g. MySQL refusing to delete a row that still has children
    return;
  }
  message.textContent = '';
  load();
});

load();
