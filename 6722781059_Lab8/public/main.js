// public/main.js — show a student's courses; enrol and un-enrol via the API.
const studentSelect = document.getElementById('studentSelect');
const courseSelect  = document.getElementById('courseSelect');
const courseList    = document.getElementById('courseList');
const who = document.getElementById('who');
const msg = document.getElementById('msg');

async function fillSelect(select, url, label) {
  const items = await (await fetch(url)).json();
  select.innerHTML = items.map(i => `<option value="${i.id}">${label(i)}</option>`).join('');
}

async function show(id) {
  // TODO (Exercise 5): fetch /students/${id}, show the name in who and each course with a remove button
  const s = await (await fetch(`/students/${id}`)).json();
  who.textContent = `${s.name} — ${s.major}`;
  courseList.innerHTML = s.courses.map(c =>
    `<li>${c.title}<button data-course="${c.id}">remove</button></li>`
  ).join('') || '<li><em>no courses yet</em></li>';
}

studentSelect.addEventListener('change', () => show(studentSelect.value));

// TODO (Exercise 5): the Enrol form's submit handler (POST /students/:id/courses), then show()
document.getElementById('enrolForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = '';
  const res = await fetch(`/students/${studentSelect.value}/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ course_id: 
courseSelect.value
 })
  });
  if (!res.ok) { msg.textContent = (await res.json()).error; return; }
  show(studentSelect.value);
});

// TODO (Exercise 5): one click listener on courseList that sends DELETE /students/:id/courses/:courseId,
// then show() -- it handles every remove button, including rows rendered after a reload.
courseList.addEventListener('click', async (e) => {
  if (e.target.tagName === 'BUTTON') {
    msg.textContent = '';
    const res = await fetch(`/students/${studentSelect.value}/courses/${e.target.dataset.course}`,
      { method: 'DELETE'});
    if (!res.ok) { msg.textContent = (await res.json()).error; return; }
    show(studentSelect.value);
  }
});

(async function start() {
  await fillSelect(studentSelect, '/students', s => `${s.name}`);
  await fillSelect(courseSelect,  '/courses',  c => `${c.title}`);
  if (studentSelect.value) show(studentSelect.value);
})();
