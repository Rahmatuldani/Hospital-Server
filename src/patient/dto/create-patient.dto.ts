import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { BloodType, PaymentMethod, Religion, UserGender } from "src/config/types";

export class CreatePatientDto {
    @ApiProperty({
        example: "",
    })
    @IsNumberString()
    @IsNotEmpty()
    nik: string;
    
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
    
    @ApiPropertyOptional({
        example: null,
        type: String,
        nullable: true
    })
    @IsOptional()
    @IsNumberString()
    bpjs: string
    
    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    partner: string
    
    @ApiProperty({
        example: ""
    })
    @IsNumberString()
    @IsNotEmpty()
    patientPhone: string
    
    @ApiProperty({
        example: ""
    })
    @IsNumberString()
    @IsNotEmpty()
    partnerPhone: string
    
    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    partnerAddress: string
    
    @ApiProperty({
        enum: Religion
    })
    @IsString()
    @IsEnum(Religion)
    @IsNotEmpty()
    religion: Religion
}
