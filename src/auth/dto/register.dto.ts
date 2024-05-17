import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../interfaces/user.interface";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsEnum(Role)
    role: Role


}