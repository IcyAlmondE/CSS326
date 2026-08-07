let books = [
    {title:'1984', author:'George Orwell', year: 1949},
    {title:'Dune', author:'Frank Herbert', year: 1965},
    {title:'The Hobbit', author:'J.R.R. Tolkien', year: 1937},
]

console.log(`Number of books: ${(books.length)}`)
console.log(`Second book title: ${books[1].title}`)

for(i=0; i<books.length; i++){
    console.log(`${books[i].title} by ${books[i].author}`)
}