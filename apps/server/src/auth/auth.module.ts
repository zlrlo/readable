import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FacebookStrategy } from './passportStrategy/facebook.strategy';
import { GithubStrategy } from './passportStrategy/github.strategy';
import { GoogleStrategy } from './passportStrategy/google.strategy';
import { TwitterStrategy } from './passportStrategy/twitter.strategy';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubStrategy, FacebookStrategy, TwitterStrategy],
})
export class AuthModule {}