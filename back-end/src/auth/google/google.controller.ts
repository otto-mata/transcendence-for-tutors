import { Controller, Get, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthService } from './google.service';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private readonly googleOauthService: GoogleOauthService) {}

  @Post()
  async googleAuth(@Body('token') token: string) {
    return this.googleOauthService.signInWithToken(token);
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const token = await this.googleOauthService.signIn(req.user);
    // res.redirect(`http://localhost:3000/auth/callback?token=${token.access_token}`);
    res.json(token)
  }
}
