<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Project setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yonatan-tize/InterTecHub.git
    cd intertechub
    cd task-2
    ```

2. Install the dependencies:
    ```bash
    # dependency
    $ npm install
    ```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Endpoints
```
POST /books: Create a new book and return the newly created book.
GET /books: Retrieve all books in the collection.
GET /books/:id: Retrieve details of a specific book by its ID.
PUT /books/:id: Update the details of a book with the given ID.
DELETE /books/:id: Delete a book with the given ID from the collection.
GET /books/favorite: Retrieve all books where the favorite field is set to true.
GET /books/random: Retrieve random books from the collection (1 up-to 10 books randomly).
PUT /books/favorite/:id: Mark the book with the given ID as favorite or remove it from favorites.





