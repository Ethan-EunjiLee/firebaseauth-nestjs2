import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FirebaseRetryController } from './firebase-retry/firebase-retry.controller';
import { FirebaseRetryService } from './firebase-retry/firebase-retry.service';
import { FirebaseRetryModule } from './firebase-retry/firebase-retry.module';
import * as admin from 'firebase-admin';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [AuthModule, UserModule, FirebaseRetryModule],
  controllers: [AppController, FirebaseRetryController],
  providers: [AppService, FirebaseRetryService],
})
export class AppModule {}
