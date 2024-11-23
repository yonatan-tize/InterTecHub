import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello There! If you want to test different routes just add one of [/dream, /hobby, /name] at the end of the current route';
  }
}
