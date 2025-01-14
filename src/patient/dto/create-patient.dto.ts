import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BloodType, PaymentMethod, UserGender } from "src/config/types";

export class CreatePatientDto {
    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        enum: UserGender
    })
    @IsString()
    @IsEnum(UserGender)
    @IsNotEmpty()
    gender: UserGender;

    @ApiProperty({
        example: new Date()
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
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        enum: BloodType,
        nullable: true
    })
    @IsString()
    @IsEnum(BloodType)
    @IsOptional()
    bloodType: BloodType | null;

    @ApiProperty({
        enum: PaymentMethod
    })
    @IsString()
    @IsNotEmpty()
    paymentMethod: PaymentMethod;

    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    job: string
}
