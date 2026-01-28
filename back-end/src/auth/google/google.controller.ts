import { Controller, Get, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { GoogleOauthService } from './google.service';
import { GoogleTokenDto, GoogleUserDto, GoogleAuthResponseDto } from './google.dto';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private readonly googleOauthService: GoogleOauthService) {}

  @Get('login')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Post()
  async googleAuth(@Body() body: GoogleTokenDto): Promise<GoogleAuthResponseDto> {
    return this.googleOauthService.signInWithToken(body.token);
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: { user: GoogleUserDto },
    @Res() res: Response,
  ) {
    try {
      const token = await this.googleOauthService.signIn(req.user);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
      
      res.redirect(`${frontendUrl}/auth/callback?access_token=${encodeURIComponent(token.access_token)}`);
    } catch (error) {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
      res.redirect(`${frontendUrl}/auth/callback?error=${encodeURIComponent(error.message || 'Authentication failed')}`);
    }
  }
}
