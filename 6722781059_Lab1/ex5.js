let students = [];

function addStudent(id, name, age){
    students.push({id, name, age})
}

function findById(id){
    return students.find(s => s.id === id);
}

function updateAge(id, newAge){
    const s = findById(id);
    if(s) s.age = newAge
}

function removeById(id){
    students = students.filter(s => s.id !== id)
}

function listAll(){
    console.log(students);
}

addStudent(1, 'Somchai', 20);
addStudent(2, 'Suda', 21);
addStudent(3, 'Yeet', 18)
listAll();

updateAge(1, 22);
listAll();

removeById(1);
listAll();

console.log(findById(2));