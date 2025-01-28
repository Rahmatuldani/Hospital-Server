import { ApiProperty } from "@nestjs/swagger";

export class AppDto1 {
    @ApiProperty()
    data: string;
}

export class AppDto2 {
    @ApiProperty()
    np: string
    
    @ApiProperty()
    password: string
}