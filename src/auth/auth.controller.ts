import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

class LoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

@ApiTags('로그인 API')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '로그인 API', description: '로그인한다.' })
  @ApiBody({ type: LoginDto })
  @Post()
  login(@Req() request: Request) {
    const { email, password } = request.body;
    return this.authService.login(email, password);
  }
}
