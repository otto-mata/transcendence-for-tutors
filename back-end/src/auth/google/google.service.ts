import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { AuthService } from '../auth.service';
import { OAuth2Client } from 'google-auth-library';
import { GoogleUserDto, GoogleAuthResponseDto } from './google.dto';

@Injectable()
export class GoogleOauthService {
  private readonly client: OAuth2Client;
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    this.client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
  }

  async signInWithToken(token: string): Promise<GoogleAuthResponseDto> {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid Google token');
    }
    const user: GoogleUserDto = {
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
      picture: payload.picture,
    };
    return this.signIn(user);
  }

  async signIn(user: GoogleUserDto): Promise<GoogleAuthResponseDto> {
    if (!user || !user.email) {
      throw new UnauthorizedException('Unauthenticated or missing email');
    }

    const email = user.email;
    let userExists = await this.userService.findByEmail(email);

    if (!userExists) {
        // Create a unique username
        let username = email.split('@')[0];
        let existingUser = await this.userService.findByUsername(username);
        let count = 1;
        while(existingUser) {
            username = `${email.split('@')[0]}${count}`;
            existingUser = await this.userService.findByUsername(username);
            count++;
        }

        userExists = await this.userService.create({
            email: email,
            username: username,
            displayName: `${user.firstName} ${user.lastName}`,
            avatarUrl: undefined, // Use default avatar instead of Google picture (can expire)
            passwordHash: '', // No password for OAuth users
            oauthProvider: 'google',
            oauthId: user.id,
            isVerified: true,
        });
    } else if (!userExists.oauthProvider || userExists.oauthProvider !== 'google') {
        userExists = await this.userService.update(userExists.id, {
            oauthProvider: 'google',
            oauthId: user.id,
        });
    }

    const token = await this.authService.loginOauthUser(userExists.username);

    return token;
  }
}
