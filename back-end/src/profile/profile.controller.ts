import {
  Controller,
  Get,
  Request,
  UseGuards,
  Param
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@/guards/auth.guard';
import { User } from '@p/generated/client';

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) { }

  @UseGuards(AuthGuard)
  @Get()
  async getMyProfile(@Request() req) : Promise<User | null>{
    return this.profileService.getProfile(req.login.login);
  }

  @UseGuards(AuthGuard)
  @Get(':login')
  async getProfile(@Param() params: any) : Promise<User | null>{
    return this.profileService.getProfile(params.login);
  }
  
}
