import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KakaoStrategy } from 'src/strategy/KakaoStrategy';
import { LocalStrategy } from 'src/strategy/LocalStrategy';
import { NaverStrategy } from 'src/strategy/NaverStrategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy, NaverStrategy, LocalStrategy],
  exports: [PassportModule]
})
export class AuthModule {}
