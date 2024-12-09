import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      Hello InterTecHub! Welcome to my Books Collection with user project.
      The project will alow a user to interact with different books that are created by the user him self and other fellow users.
      Logged in users can create books, access all books, make a book their favorite and update the books they created.
      
      Admins are allowed to retrieve all books as well as delete books(if they are inappropriate) created by other users. 
      They are also allowed to promote users to admin. The first user is by default admin. For other users the default role is User.

      Explore all endpoints to manage your book collection effectively!

      for more information refer the swagger documentation on github.
    `;
  }
}
