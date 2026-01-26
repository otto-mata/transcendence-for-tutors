import { Controller, Get, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { GoogleOauthService } from './google.service';
import { GoogleTokenDto, GoogleUserDto, GoogleAuthResponseDto } from './google.dto';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private readonly googleOauthService: GoogleOauthService) {}

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
    // res.redirect(`http://localhost:3000/auth/callback?token=${token.access_token}`);
    res.json(token)
  }
}
