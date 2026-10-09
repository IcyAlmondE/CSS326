// scripts/race.js - fire many enrol requests at the SAME moment
// Usage:  npm run race -- <courseId> [firstStudentId] [lastStudentId]
// e.g.    npm run race -- 4 1 5      (server must be running on port 3000)
// Before running, give the course only a few seats, e.g. in Workbench:
//         UPDATE courses SET seats = 2 WHERE id = 4;
const base = 'http://localhost:3000';
const courseId = Number(process.argv[2] || 4);
const first = Number(process.argv[3] || 1);
const last = Number(process.argv[4] || 5);

// one course's row, found in GET /courses
const getCourse = async () =>
  (await (await fetch(`${base}/courses`)).json()).find((c) => c.id === courseId);

(async () => {
  console.log('before:', await getCourse());

  const ids = [];
  for (let s = first; s <= last; s++) ids.push(s);
  const results = await Promise.all(ids.map(async (s) => {
    const r = await fetch(`${base}/students/${s}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course_id: courseId }),
    });
    return { student: s, status: r.status, body: await r.json() };
  }));
  results.forEach((r) => console.log(r.student, r.status, JSON.stringify(r.body)));

  const count = {};
  results.forEach((r) => { count[r.status] = (count[r.status] || 0) + 1; });
  console.log('status counts:', count);
  console.log('after:', await getCourse(), '(seats must never be negative)');
})();
