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
    console.log('Google sign in start !')
    if (!user) {
      throw new UnauthorizedException('Unauthenticated');
    }

    console.time('GoogleSignIn - findByEmail');
    let userExists = await this.userService.findByEmail(user.email);
    console.timeEnd('GoogleSignIn - findByEmail');

    if (!userExists) {
        console.log('User does not exist, creating a new one.');
        // Create a unique username
        let username = user.email.split('@')[0];
        console.time('GoogleSignIn - findByUsername (initial)');
        let existingUser = await this.userService.findByUsername(username);
        console.timeEnd('GoogleSignIn - findByUsername (initial)');
        let count = 1;
        while(existingUser) {
            console.time(`GoogleSignIn - findByUsername (iteration ${count})`);
            username = `${user.email.split('@')[0]}${count}`;
            existingUser = await this.userService.findByUsername(username);
            console.timeEnd(`GoogleSignIn - findByUsername (iteration ${count})`);
            count++;
        }

        console.time('GoogleSignIn - create user');
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
        console.timeEnd('GoogleSignIn - create user');
    } else if (!userExists.oauthProvider || userExists.oauthProvider !== 'google') {
        // Link Google OAuth to existing account
        console.log('Linking Google OAuth to existing account');
        console.time('GoogleSignIn - update user oauth');
        userExists = await this.userService.update(userExists.id, {
            oauthProvider: 'google',
            oauthId: user.id,
        });
        console.timeEnd('GoogleSignIn - update user oauth');
    }
    console.log('Google sign in end !')

    console.time('GoogleSignIn - authService.loginOauthUser');
    const token = await this.authService.loginOauthUser(userExists.username);
    console.timeEnd('GoogleSignIn - authService.loginOauthUser');

    return token;
  }
}
