import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class FortyTwoOauthService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async signIn(user: any) {
    if (!user) {
      throw new UnauthorizedException('Unauthenticated');
    }

    let userExists = await this.userService.findByEmail(user.email);

    if (!userExists) {
      userExists = await this.userService.create({
        email: user.email,
        username: user.login,
        displayName: `${user.firstName} ${user.lastName}`,
        avatarUrl: user.picture,
        passwordHash: '',
        oauthProvider: 'fortytwo',
        oauthId: String(user.id),
        isVerified: true,
      });
    } else if (!userExists.oauthProvider || userExists.oauthProvider !== 'fortytwo') {
      userExists = await this.userService.update(userExists.id, {
        oauthProvider: 'fortytwo',
        oauthId: String(user.id),
      });
    }

    return await this.authService.loginOauthUser(userExists.username);
  }
}
