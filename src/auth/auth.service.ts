import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(email: string, password: string) {
    if (email === 'test@test.com' && password === 'test') {
      const payload = { email: email, sub: '0' };
      return this.jwtService.sign(payload);
    }
    throw new UnauthorizedException('인증되지 않은 사용자입니다.');
  }
}
