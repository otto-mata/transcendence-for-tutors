import { Injectable,
        UnauthorizedException
        } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import { User, Prisma } from './generated/prisma/client';
import "dotenv/config";

@Injectable()
export class AuthService{
  constructor (private prisma: PrismaService,
              private jwtService : JwtService){}
  
    async createUser (
    data : Prisma.UserCreateInput
  ) : Promise<User> {
    return this.prisma.user.create({data});
  }

  async LoginUser (
      login : string,
      password: string
    ) : Promise <{access_token : string}> {
      const user = await this.prisma.user.findUnique({where : { login : login}});
    if (user == null || user['password'] !== password)
      throw new UnauthorizedException();
    const payload = {
      login : user['login'],
      password : user['password']}
    return {
      access_token : await this.jwtService.signAsync(payload
    )};
  }
  
  async RefreshToken (
    tokken : string
  ) : Promise<{ access_token : string }> {
    try {
    const data = await this.jwtService.verifyAsync(tokken, {
         secret : process.env.JWT_SECRET 
     });
      if(!data || !data['password'] || !data['login'])
        throw new UnauthorizedException();
   return {
     access_token : await this.jwtService.signAsync({
       login : data['login'],
       password : data['password']
     })};
  }
  catch {
        throw new UnauthorizedException();  
    }
  }
}
