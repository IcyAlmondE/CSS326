let students = [];

function addStudent(id, name, year){
    students.push({id, name, year})
}

function removeById(id){
    students = students.filter(s => s.id !== id)
}

function listAll(){
    for(i=0; i<students.length; i++){
        console.log(`ID: ${students[i].id}, Name: ${students[i].name}, Year: ${students[i].year}`);
    }
}

addStudent(1, 'Anong', 2)
addStudent(2, 'Somchai', 3)
addStudent(3, 'Malee', 1)
removeById(2)
listAll()

// Limitation: The data is temporary. The database resets every time.