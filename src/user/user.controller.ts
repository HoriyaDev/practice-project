import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Headers,
  BadRequestException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserSchemaType, CreateUserSchema } from './dto/create-user-zod.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')

export class UserController {
  constructor(private userService: UserService) {}

  // ✅ GET /user/profile (must be placed above :id)
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.findOne(req.user.userId);
    return user;
  }

  // ✅ GET /user (get all users)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // ✅ POST /user (create new user)
  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  create(
    @Body() body: CreateUserSchemaType,
    @Headers('connection') connectionHeader: string,
    @Headers('x-api-key') apiKey: string,
  ) {
    if (!connectionHeader || connectionHeader !== 'keep-alive') {
      throw new BadRequestException('Connection is not alive');
    }

    if (!apiKey || apiKey !== 'horiya') {
      throw new BadRequestException('Invalid API key');
    }

    return this.userService.create(body);
  }

  // ✅ PATCH /user/:id
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  // ✅ GET /user/:id (this must be below profile route)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
