const mysql = require('mysql2/promise');

async function main(){
    let conn;
    try{
        // Task 1
        conn = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'Earth-2549',
            database: 'bookstore_lab3'
        }); 
        console.log('Connected');

        console.log('-------------------');

        // Task 2
        let [rows1] = await conn.query('SELECT * FROM books');
        for(book of rows1){
            console.log(book.title, '-', book.price);
        }

        console.log('-------------------');

        // Task 3
        let thres = 500;
        let [rows2] = await conn.execute('SELECT * FROM books WHERE price > ?', [thres]);
        for(book of rows2){
            console.log(book.title, '-', book.price);
        }

        console.log('-------------------');

        // Task 4
        let [ins] = await conn.execute('INSERT INTO books (title, author, price, stock_quantity) VALUES (?, ?, ?, ?)', ['Chopin: Complete Etudes', 'Carl Mikuli', '550.00', '3']);
        console.log('Inserted ID:', ins.insertId);
        // let [newbook1] = await conn.query('SELECT * FROM books WHERE id = ?', [ins.insertId]);
        // console.log(newbook1);

        console.log('-------------------');

        // Task 5
        let [upd] = await conn.execute('UPDATE books SET price = price * 1.1 WHERE id = ?', [ins.insertId]);
        console.log('No. of affected rows:', upd.affectedRows);
        // let [newbook2] = await conn.query('SELECT * FROM books WHERE id = ?', [ins.insertId]);
        // console.log(newbook2);

        console.log('-------------------');

        // Task 6
        let [del] = await conn.execute('DELETE FROM books WHERE id = ?', [ins.insertId]);
        console.log('No. of affected rows:', del.affectedRows);

        console.log('-------------------');

        // Task 7
        let [rows3] = await conn.execute('SELECT c.name, b.title, oi.quantity FROM order_items oi INNER JOIN orders o on oi.order_id = o.id INNER JOIN books b ON oi.book_id = b.id INNER JOIN customers c ON o.customer_id = c.id');
        for(order of rows3){
            console.log(order);
        }

    } catch(err){
        console.log('Error: ', err);
        return;
    } finally{
        await conn.end();
    }
}

main();

// Answer for Task 8
// Placeholder is used so that the query will change dynamically according to the updated value.
// For example, Task 5 and 6 will use the updated value from Task 4, so the code wouldn't need to be changed every time.