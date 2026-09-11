// public/main.js
//
// Exercise 3: fill in the three TODOs below. index.html and style.css are
// already done -- this file is the actual exercise.
const list = document.getElementById('list');
const form = document.getElementById('form');
const nameInput = form.elements['name'];
const majorInput = form.elements['major'];
const message = document.getElementById('message');

// TODO 1: fetch('/students'), turn the JSON response into an array of
// students, and set list.innerHTML to one <li> per student (name, major,
// and a delete <button data-id="..."> like the one used below).
//
// BONUS (optional, see the "Editing from the Page" slides in the deck):
// give each row a second button with data-action="edit" alongside the
// delete one (data-action="delete"), so the click listener in TODO 3 can
// tell them apart.
async function load() {
  // TODO
  const rows = await (await fetch('/students')).json();
  list.innerHTML = rows.map(s =>
    `<li>${s.name} - ${s.major}
    <button data-id="${s.id}">delete</button></li>`
  ).join('');
}

// TODO 2: on submit, prevent the default page reload, POST the form's
// values as JSON to /students, then call load() again to refresh the list.
// (Exercise 4: if the response isn't ok, show the server's error message
// in #message instead.)
form.addEventListener('submit', async (e) => {
  // TODO
  e.preventDefault();
  const res = await fetch('/students', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({name: nameInput.value, major: majorInput.value, year: 1})
  });
  if (!res.ok){
    const err = await res.json();
    message.textContent = err.error;
    return;
  }
  message.textContent = '';
  form.reset();
  load();
});

// TODO 3: when a delete button inside #list is clicked, send a DELETE
// request to /students/<that button's data-id>, then call load() again.
//
// BONUS (optional): if you added the edit button above, branch on
// e.target.dataset.action here. For 'edit', use prompt() to ask for a new
// major, then send a PUT to /students/<id> with { major: newMajor } as
// the JSON body -- the same pattern as the POST in TODO 2, just a
// different method and body. See the deck's "Editing from the Page (2/2)"
// slide for the full pattern.
list.addEventListener('click', async (e) => {
  // TODO
  if (e.target.tagName !== 'BUTTON') return;
  const res = await fetch('/students/' + e.target.dataset.id, {method: 'DELETE'});
  if (!res.ok){
    const err = await res.json();
    message.textContent = err.error;
    return;
  }
  message.textContent = '';
  load();
});

load();

