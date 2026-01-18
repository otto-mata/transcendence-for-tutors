import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleOauthService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

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
        });
        console.timeEnd('GoogleSignIn - create user');
    }
    console.log('Google sign in end !')

    console.time('GoogleSignIn - authService.loginOauthUser');
    const token = await this.authService.loginOauthUser(userExists.username);
    console.timeEnd('GoogleSignIn - authService.loginOauthUser');

    return token;
  }
}
