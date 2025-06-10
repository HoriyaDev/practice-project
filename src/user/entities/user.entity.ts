import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('user') 
export class User {
@PrimaryGeneratedColumn()
id:number;

@Column()
firstName:string;

@Column()
lastName:string;

@Column()
email:string;

@Column({ nullable: true })
password:string;

@BeforeInsert() 
async hashPassword(){
   if (this.password) {
     this.password = await bcrypt.hash(this.password, 10);
   }
}


}
