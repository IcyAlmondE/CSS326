const mysql = require('mysql2/promise');

async function main(){
    const conn = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'Earth-2549',
        database: 'lab_3'
    });

    // Exercise 1
    const [rows1] = await conn.query('SELECT * FROM students');
    // console.log(rows1);
    for (const s of rows1){
        console.log(s.name, '-', s.major);
    }

    // Exercise 2
    const major = 'Software Engineering';
    const [rows2] = await conn.execute(
        'SELECT name FROM students WHERE major = ?', [major]
    );
    console.log(rows2);

    // Exercise 3
    const [r1] = await conn.execute(
        'INSERT INTO students (name, major, year) VALUES (?, ?, ?)',
        ['Adolf', 'Fine Arts', 1]
    );
    console.log('new id:', r1.insertId);

    const [r2] = await conn.execute(
        'UPDATE students SET year = year + 1 WHERE id = ?', [r1.insertId]
    );
    console.log('rows changed:', r2.affectedRows);

    const [r3] = await conn.execute(
        'DELETE FROM students WHERE id = ?', [r1.insertId]
    );
    console.log('rows deleted:', r3.affectedRows);

    // Exercise 4
    try{
        const [r4] = await conn.query(
            'SELECT * FROM student'
        );
        console.table(r4);
    } catch(err){
        console.error('Query failed:', err.message);
    } finally{
        await conn.end();
    }

    await conn.end();
}

main();