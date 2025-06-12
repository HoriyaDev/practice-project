import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

constructor(private userService:UserService , private jwtService:JwtService){}

    async validateUser(email:string , password:string){

        const user = await this.userService.findByEmail(email)

        if(!user) throw new UnauthorizedException("user not found")

            const isPasswordMatch = await compare(password , user.password)
            if(!isPasswordMatch) throw new UnauthorizedException("Invalid credentials")


                return user;
    }
async login(user: any) {
    const payload = {sub: user.id }; 
    return {
      access_token: this.jwtService.sign(payload),
    
    };
  }
}
