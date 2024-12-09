<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  </p>

  [circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
  [circleci-url]: https://circleci.com/gh/nestjs/nest

  # InterTecHub task-3

  ## Description

  InterTecHub task-3 is a NestJS-based application that implements authentication and authorization. It provides authenticated users and admins with various endpoints to retrieve book information and a simple entry point to the application. The project is structured with a modular approach, making it easy to extend and maintain.

  ## Project setup

  1. Clone the repository:
    ```bash
    git clone https://github.com/yonatan-tize/InterTecHub.git
    cd intertechub
    cd task-3
    ```

  2. Install the dependencies:
    ```bash
    npm install
    ```

  ## Compile and run the project

  ```bash
  # development
  $ npm run start

  # watch mode
  $ npm run start:dev
  ```

  ## Explanation

  The first user is assigned the role of admin, while all subsequent users are assigned the default role of user until an admin promotes them.

  For now, the admin credentials are:
  ```json
  {
    "email": "interTecHub@gmail.com",
    "password": "12345678"
  }
  ```

  To access all the endpoints, you can refer to the following Swagger documentation:
  [Swagger Documentation](https://intertechub-3.onrender.com/api)

  The live link is:
  [Live Link](https://intertechub-3.onrender.com)
