import { JwtModuleOptions } from "@nestjs/jwt"
import { registerAs } from "@nestjs/config"

export default registerAs("jwt" , (): JwtModuleOptions => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  
  return {
    secret,
    signOptions:{
      expiresIn: process.env.JWT_EXPIRE_IN || '1d'
    }
  };
})