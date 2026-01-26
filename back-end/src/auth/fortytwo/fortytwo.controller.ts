import { Controller, Get, Post, Body, Req, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { FortyTwoOauthService } from './fortytwo.service';
import { FortyTwoVerifyTokenDto, FortyTwoVerifyResponseDto, FortyTwoUserDto } from './fortytwo.dto';

@Controller('auth/42')
export class FortyTwoOauthController {
  constructor(
    private readonly fortyTwoOauthService: FortyTwoOauthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('login')
  @UseGuards(AuthGuard('fortytwo'))
  async fortyTwoLogin() {
  }

  @Get('redirect')
  @UseGuards(AuthGuard('fortytwo'))
  async fortyTwoAuthRedirect(
    @Req() req: { user: FortyTwoUserDto },
    @Res() res: Response,
  ) {
    try {
      const token = await this.fortyTwoOauthService.signIn(req.user);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
      res.redirect(`${frontendUrl}/auth/callback?token=${token.access_token}`);
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        error: 'Authentication failed',
        message: error.message,
      });
    }
  }

  @Post('verify')
  async verifyToken(@Body() body: FortyTwoVerifyTokenDto): Promise<FortyTwoVerifyResponseDto> {
    if (!body.token) {
      return {
        success: false,
        error: 'No token provided',
      };
    }

    try {
      const payload = await this.jwtService.verifyAsync(body.token);
      return {
        success: true,
        payload,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Token verification failed',
        message: error?.message ?? 'Invalid token',
      };
    }
  }
}
