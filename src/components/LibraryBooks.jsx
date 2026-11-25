import React from 'react'
import LibraryCards from './LibraryCards';

function LibraryBooks() {
    const books = [
        {
            code: "WEB 001",
            name: "Introduction to WEB technology",
            price: 1000
        },
        {
            code: "SOD 001",
            name: "Introduction to Software Development",
            price: 2000
        },
        {
            code: "POD 001",
            name: "Introduction to Product Development",
            price: 1500
        }
    ]

    const totalBooks = books.length;

    const totalPrice = books.reduce(
        (total, book) => total + book.price, 0
    );

    return (
        <div>
            <h2>List of books</h2>

            <div className="book-list">
                {books.map(book => ( <LibraryCards key={book.code} bookInfo={book} />
                ))}
            </div>

            <p>
                The total price for {totalBooks} books is {totalPrice}
            </p>
        </div>
    )
}

export default LibraryBooks