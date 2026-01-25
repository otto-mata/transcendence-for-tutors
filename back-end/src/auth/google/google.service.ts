import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { AuthService } from '../auth.service';
import { OAuth2Client } from 'google-auth-library';

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

  async signInWithToken(token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid Google token');
    }
    const user = {
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
      picture: payload.picture,
    };
    return this.signIn(user);
  }

  async signIn(user: any) {
    if (!user) {
      throw new UnauthorizedException('Unauthenticated');
    }

    let userExists = await this.userService.findByEmail(user.email);

    if (!userExists) {
        // Create a unique username
        let username = user.email.split('@')[0];
        let existingUser = await this.userService.findByUsername(username);
        let count = 1;
        while(existingUser) {
            username = `${user.email.split('@')[0]}${count}`;
            existingUser = await this.userService.findByUsername(username);
            count++;
        }

        userExists = await this.userService.create({
            email: user.email,
            username: username,
            displayName: `${user.firstName} ${user.lastName}`,
            avatarUrl: user.picture,
            passwordHash: '', // No password for OAuth users
            oauthProvider: 'google',
            oauthId: user.id,
            isVerified: true,
        });
    } else if (!userExists.oauthProvider || userExists.oauthProvider !== 'google') {
        // Link Google OAuth to existing account
        userExists = await this.userService.update(userExists.id, {
            oauthProvider: 'google',
            oauthId: user.id,
        });
    }

    const token = await this.authService.loginOauthUser(userExists.username);

    return token;
  }
}
