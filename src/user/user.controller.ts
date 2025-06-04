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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserSchemaType, CreateUserSchema } from './dto/create-user-zod.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

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

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
delete(@Param('id') id: number) {
  return this.userService.remove(id); // or delete(id) based on what you're using in service
}

}
