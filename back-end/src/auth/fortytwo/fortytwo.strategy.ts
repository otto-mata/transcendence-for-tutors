import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FortyTwoUserDto, FortyTwoApiProfileDto } from './fortytwo.dto';

@Injectable()
export class FortyTwoOauthStrategy extends PassportStrategy(Strategy, 'fortytwo') {
  private clientID: string;
  private clientSecret: string;
  private callbackURL: string;

  constructor(private configService: ConfigService) {
    const clientID = configService.get<string>('FORTYTWO_CLIENT_ID');
    const clientSecret = configService.get<string>('FORTYTWO_CLIENT_SECRET');
    const callbackURL = configService.get<string>('FORTYTWO_CALLBACK_URL');

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('42 School OAuth environment variables are not set.');
    }

    super({
      authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID,
      clientSecret,
      callbackURL,
      scope: ['public'],
      skipUserProfile: true,
      passReqToCallback: true,
    } as any);

    this.clientID = clientID;
    this.clientSecret = clientSecret;
    this.callbackURL = callbackURL;
  }

  authorizationParams(options: any) {
    return {
      ...options,
      scope: 'public',
    };
  }

  getOAuthAccessToken(code: string, params: any, callback: any) {
    const paramsWithRedirect = {
      ...params,
      redirect_uri: this.callbackURL,
    };

    return (this as any)._oauth2.getOAuthAccessToken(
      code,
      paramsWithRedirect,
      (err: any, accessToken: string, refreshToken: string, results: any) => {
        if (err) {
          return callback(err);
        }
        callback(null, accessToken, refreshToken, results);
      }
    );
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<FortyTwoUserDto> {
    try {
      const response = await fetch('https://api.intra.42.fr/v2/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`42 API error: ${response.status}`);
      }

      const user42: FortyTwoApiProfileDto = await response.json();
      const email = user42.email || `${user42.login}@student.42.fr`;

      const userDto: FortyTwoUserDto = {
        id: user42.id,
        email,
        firstName: user42.first_name,
        lastName: user42.last_name,
        login: user42.login,
        picture: user42.image?.link || user42.image?.versions?.small,
        provider: 'fortytwo',
      };

      return userDto;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch 42 user profile: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
