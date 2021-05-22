import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
