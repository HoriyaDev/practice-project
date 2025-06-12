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

@Column({ unique: true })
email:string;

@Column({ nullable: true })
password:string;

@Column('text', { array: true, default: ['user'] })
roles: string[];

@BeforeInsert() 
async hashPassword(){
   if (this.password) {
     this.password = await bcrypt.hash(this.password, 10);
   }
}


}
