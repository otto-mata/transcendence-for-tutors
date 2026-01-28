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
    const token = await this.googleOauthService.signIn(req.user);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 15 * 60 * 1000,
      path: '/',
    });
    
    res.redirect(`${frontendUrl}/auth/callback`);
  }
}
