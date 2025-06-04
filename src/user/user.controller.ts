import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
  Headers,
  BadRequestException,
  
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserSchemaType, CreateUserSchema } from './dto/create-user-zod.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { HeaderDto } from './dto/header.dto';
import { throwDeprecation } from 'process';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll() {
    return 'hyyyyyyy';
  }
@Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  create(
    @Body() body: CreateUserSchemaType,
    @Headers('connection') connectionHeader: string,
    @Headers('x-api-key') apiKey: string,
  ) {
    // ✅ Validation for headers
    if (!connectionHeader || connectionHeader !== 'keep-alive') {
      throw new BadRequestException('Connection is not alive');
    }

    if (!apiKey || apiKey !== 'hyyy') {
      throw new BadRequestException('Invalid API key');
    }

    return {
      email: body.email,
      connection: connectionHeader,
      apiKey: apiKey,
    };
  }




// @Post()
// create(@Body() createUserDto: CreateUserDto){
//   return this.userService.create(createUserDto)
// }



  // @Patch()
  // @UsePipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     groups: ['update'],
  //   }),
  // )
  // update(@Body() body: CreateUserDto) {
  //   return body;
  // }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return id;
  }
}
