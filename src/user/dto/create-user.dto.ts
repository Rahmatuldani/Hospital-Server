import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserGender, UserRole } from "src/config/types";

export class CreateUserDto {
    @ApiProperty({
        example: ""
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        example: new Date("2000-01-01")
    })
    @IsDateString()
    @IsNotEmpty()
    birthDate: Date;

    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    birthPlace: string;

    @ApiProperty({
        enum: UserGender
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(UserGender)
    gender: UserGender;

    @ApiProperty({
        enum: UserRole
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;
}
