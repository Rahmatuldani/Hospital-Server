import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    data: string;
}