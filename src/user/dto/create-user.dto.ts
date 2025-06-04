import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {

    @IsString({always:true})
    @Length(2 , 6 , {groups:["create"]})
     @Length(3 , 6 , {groups:["update"]})
    firstName:string;

    @IsString({message:"must be string" , always:true})
    @IsNotEmpty()
    lastName:string;

   @IsEmail({}, { groups: ['create', 'update'] })
email: string;

}
