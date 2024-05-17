import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RoleGuard } from './role.guard';
import { Roles } from './roles.decorator';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Res() res, @Body() authenticateDto: AuthenticateDto) {
    try {
      const response = await this.authService.authenticate(authenticateDto);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json(error.response);
    }
  }

  @Post('register')
  async register(@Res() res, @Body() registerDto: RegisterDto) {
    try {
      const response = await this.authService.register(registerDto);
      return res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json(error.response);
    }
  }

  @Roles('customer') // This route is restricted to users with the 'customer' role
  @UseGuards(JwtAuthGuard, RoleGuard) // The route requires JWT authentication and role-based access control
  @Get('profile')
  profile(@Req() req, @Res() res) {
  return res.status(HttpStatus.OK).json(req.user); 
  }

  @Roles('admin') // This route is restricted to users with the 'admin' role
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('profile/admin') 
  AdminProfile(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(req.user);
  }

}
