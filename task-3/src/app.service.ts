import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      Hello InterTecHub! Welcome to my Books Collection project.
      The following are the available endpoints:

      - POST /books: Create a new book and return the newly created book.
      - GET /books: Retrieve all books in the collection.
      - GET /books/:id: Retrieve details of a specific book by its ID.
      - PUT /books/:id: Update the details of a book with the given ID.
      - DELETE /books/:id: Delete a book with the given ID from the collection.
      - GET /books/favorite: Retrieve all books where the favorite field is set to true.
      - GET /books/random: Retrieve random books from the collection.
      - PUT /books/favorite/:id: Mark the book with the given ID as favorite or remove it from favorites.

      Explore these endpoints to manage your book collection effectively!
    `;
  }
}
