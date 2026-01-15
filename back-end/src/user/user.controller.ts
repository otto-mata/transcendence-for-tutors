import {
  Controller,
  Get,
  Body,
  Request,
  UseGuards,
  Param,
  Post,
  Patch,
  UseFilters,
  UseInterceptors,
  UploadedFile,
  Delete
} from '@nestjs/common';
import {
  UserResponseDto,
  PaginateResponseDto,
  ChangePasswordDto,
  ChangeEmailDto,
  UpdatePreferencesDto
}from './user.dto'
import { PostResponseDto} from '@/post/post.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@/guards/auth.guard';
import { User } from '@p/generated/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponseDto } from '@/app.dto';
import { isLangCode } from 'is-language-code';
import { get } from 'http';

import {TestUser1, TestUser2, TestPost1, TestPost2, } from '@/test/test.data';


@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) { }

  @Get()
  async getUsers (

  ) : Promise<PaginateResponseDto<UserResponseDto>>{
    return ({
      "data": [TestUser1, TestUser2],
      "page": 1,
      "limit": 20,
      "total": 2,
      "hasMore": false,
    });
  }

  @Get('suggested')
  async getSuggestedUsers (

  ) : Promise<PaginateResponseDto<UserResponseDto>>{
    return ({
      "data": [TestUser1, TestUser2],
      "page": 1,
      "limit": 20,
      "total": 2,
      "hasMore": false,
    });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getUserMe(@Request() req
  ) : Promise<UserResponseDto | null>{
    return (TestUser1);
    // return this.userService.getUser(req.login.login);
  }

  @UseGuards(AuthGuard)
  @Get(':username')
  async getUserFromUsername (
    @Param() params: { username : string}
  ) : Promise<UserResponseDto | null>{
    return (TestUser1);
    // return this.userService.getUser(params.login);
  }
  
  @UseGuards(AuthGuard)
  @Patch('me/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async SetUserAvatar (
    @Request() req,
    @UploadedFile() file: Express.Multer.File
  ) : Promise<UserResponseDto | null>{
    //frome getUSer(req.login.login);
    return (TestUser1);
  }

  @UseGuards(AuthGuard)
  @Patch('me/cover')
  @UseInterceptors(FileInterceptor('file'))
  async SetUserCover (
    @Request() req,
    @UploadedFile() file: Express.Multer.File
  ) : Promise<UserResponseDto | null>{
    //frome getUSer(req.login.login);
    return (TestUser1);
  }

  @UseGuards(AuthGuard)
  @Patch('me/password')
  @UseInterceptors(FileInterceptor('file'))
  async SetUserPassword (
    //Should also have the "email token"
    @Request() req,
    @Body() data : ChangePasswordDto
  ) : Promise<ApiResponseDto | null>{
    //from getUSer(req.login.login);
    //if not right password error
    return ({message: "Password changed successfully"});
    ;
  }

  @UseGuards(AuthGuard)
  @Patch('me/email')
  @UseInterceptors(FileInterceptor('file'))
  async SetUseremail (
    //Should also have the "email token"
    @Request() req,
    @Body() data : ChangeEmailDto
  ) : Promise<ApiResponseDto | null>{
    //from getUSer(req.login.login);
    //if not right password error
    return ({message: "Email changed successfully"});
  }

  @UseGuards(AuthGuard)
  @Patch('me/cover/password')
  @UseInterceptors(FileInterceptor('file'))
  async UpdatePreferences (
    //Should also have the "email token"
    @Request() req,
    @Body() data : UpdatePreferencesDto
  ) : Promise<ApiResponseDto | null>{
    //from getUSer(req.login.login);
    //if not right password error
    if ( data.language && !isLangCode(data.language))
      return ({message: "Language code is invalid"});
    return ({message: "Email changed successfully"});
  }

  @UseGuards(AuthGuard)
  @Get(':username/followers')
  async getUserFolloers(
    @Body() data : {
      page? : number;
      limit? : number;
    }
  ) : Promise<PaginateResponseDto<UserResponseDto>>{
    data.page = data.page || 1;
    data.limit = data.limit || 2;//20
    return ({
      "data": [TestUser1, TestUser2],
      "page": 1,
      "limit": 20,
      "total": 2,
      "hasMore": false,
    });    
  }

  @UseGuards(AuthGuard)
  @Get(':username/following')
  async getUserFollwing(
    @Body() data : {
      page? : number;
      limit? : number;
    }
  ) : Promise<PaginateResponseDto<PostResponseDto>>{
    data.page = data.page || 1;
    data.limit = data.limit || 2;//20
    return ({
      "data": [TestPost1, TestPost2],
      "page": 1,
      "limit": 20,
      "total": 2,
      "hasMore": false,
    });    
  }

  @UseGuards(AuthGuard)
  @Get(':username/following')
  async getUserBookmark(
    @Body() data : {
      page? : number;
      limit? : number;
    }
  ) : Promise<PaginateResponseDto<UserResponseDto>>{
    data.page = data.page || 1;
    data.limit = data.limit || 2;//20
    return ({
      "data": [TestUser1, TestUser2],
      "page": 1,
      "limit": 20,
      "total": 2,
      "hasMore": false,
    });    
  }

  @UseGuards(AuthGuard)
  @Post(':id/block')
  @UseInterceptors(FileInterceptor('file'))
  async blockUser (
    @Param() params : {id : string}
  ) : Promise<ApiResponseDto | null>{
    // return ({message: "No User With name"});
    return ({message: "User Blocked"});
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id/block')
  @UseInterceptors(FileInterceptor('file'))
  async unblockUser (
    @Param() params : {id : string}
  ) : Promise<ApiResponseDto | null>{
    // return ({message: "No User With name"});
    return ({message: "User Unblocked"});
  }

  @UseGuards(AuthGuard)
  @Post(':id/block')
  @UseInterceptors(FileInterceptor('file'))
  async muteUser (
    @Param() params : {id : string}
  ) : Promise<ApiResponseDto | null>{
    // return ({message: "No User With name"});
    return ({message: "User Muted"});
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id/block')
  @UseInterceptors(FileInterceptor('file'))
  async unmuteUser (
    @Param() params : {id : string}
  ) : Promise<ApiResponseDto | null>{
    // return ({message: "No User With name"});
    return ({message: "User Unmuted"});
  }

  
}
