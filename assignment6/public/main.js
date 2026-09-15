// public/main.js
//
// Task 6 (2 pts): list and add. Task 7 (1.5 pts): delete.
// Reference the fetch()/load() pattern in Lab Sheet 06, Section 10.8 --
// same idea, just for /books instead of /students.

// TODO: grab references to your list container, form, and its inputs,
// matching whatever ids/names you used in index.html.
const list = document.getElementById('list');
const form = document.getElementById('form');
const titleInput = form.elements['title'];
const authorInput = form.elements['author'];
const priceInput = form.elements['price'];
const message = document.getElementById('message');

// TODO (Task 6): write load() -- fetch('/books'), turn the JSON response
// into HTML, and set it as your list container's innerHTML. Each row
// should show the title and price, plus a delete button carrying the
// book's id (e.g. data-id="...").
async function load(){
    const rows = await (await fetch('/books')).json();
    list.innerHTML = rows.map(b =>
        `<li>${b.title} - ${b.author} ($${b.price})
        <button data-id="${b.id}">delete</button></li>`
    ).join('');
}

// TODO (Task 6): on the form's submit event, prevent the default reload,
// POST the form values as JSON to /books, then call load() again.
// If the response isn't ok, show the server's error message to the user.
form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const res = await fetch('/books', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({title: titleInput.value, author: authorInput.value, price: priceInput.value, stock: 1})
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

// TODO (Task 7): listen for clicks on the list container; when a delete
// button is clicked, send a DELETE request to /books/<that button's id>,
// then call load() again.
list.addEventListener('click', async (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const res = await fetch('/books/' + e.target.dataset.id, {method: 'DELETE'});
    if (!res.ok){
        const err = await res.json();
        message.textContent = err.error;
        return;
    }
    message.textContent = '';
    load();
})

// TODO: call load() once at the bottom so the list appears on page load.
load();