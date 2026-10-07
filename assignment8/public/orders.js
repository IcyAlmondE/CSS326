const customerSelect = document.getElementById('customer');
const bookSelect = document.getElementById('book');
const list = document.getElementById('list');
const who = document.getElementById('who');
const message = document.getElementById('message');
const orderForm = document.getElementById('orderForm');
const quantityInput = orderForm.elements['quantity'];

async function loadCustomers() {
  const rows = await (await fetch('/customers')).json();
  customerSelect.innerHTML = rows.map(c =>
    `<option value="${c.id}">${c.name}</option>`).join('');
}

async function loadBooks() {
  const rows = await (await fetch('/books')).json();
  bookSelect.innerHTML = rows.map(b =>
    `<option value="${b.id}">${b.title} - $${b.price}</option>`).join('');
}

async function loadOrders() {
  const c = await (await fetch('/customers/' + customerSelect.value)).json();
  who.textContent = `${c.name}`;
  list.innerHTML = c.orders.length
    ? c.orders.map(o => `<li>${o.title} <span>x ${o.quantity}</span></li>`).join('')
    : '<li>No orders yet</li>';
}

customerSelect.addEventListener('change', loadOrders);

orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch(`/customers/${customerSelect.value}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      book_id: parseInt(bookSelect.value),
      quantity: parseInt(quantityInput.value)
    })
  });
  if (!res.ok) {
    message.textContent = (await res.json()).error;
    return;
  }
  message.textContent = '';
  quantityInput.value = 1;
  loadOrders();
});

(async () => {
  await loadCustomers();
  await loadBooks();
  loadOrders();
})();