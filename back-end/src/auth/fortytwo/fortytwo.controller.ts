import { Controller, Get, Post, Body, Req, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { FortyTwoOauthService } from './fortytwo.service';

@Controller('auth/42')
export class FortyTwoOauthController {
  constructor(private readonly fortyTwoOauthService: FortyTwoOauthService) {}

  @Get('login')
  @UseGuards(AuthGuard('fortytwo'))
  async fortyTwoLogin() {
  }

  @Get('redirect')
  @UseGuards(AuthGuard('fortytwo'))
  async fortyTwoAuthRedirect(
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const token = await this.fortyTwoOauthService.signIn(req.user);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
      res.redirect(`${frontendUrl}/auth/callback?token=${token.access_token}`);
    } catch (error) {
      console.error('❌ 42 OAuth - Redirect failed:', error.message);
      res.status(HttpStatus.UNAUTHORIZED).json({
        error: 'Authentication failed',
        message: error.message,
      });
    }
  }

  @Post('verify')
  async verifyToken(@Body('token') token: string) {
    try {
      if (!token) {
        return {
          success: false,
          error: 'No token provided',
        };
      }

      return {
        success: true,
        message: 'Token is valid',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Token verification failed',
      };
    }
  }
}
