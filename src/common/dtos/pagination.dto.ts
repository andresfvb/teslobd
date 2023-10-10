import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";



export class PaginationDto {

    @ApiProperty({
        default: 10,
        description: 'How many do you need'
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)//Convercion of data
    limit?: number;

    @ApiProperty({
        default: 0,
        description: 'How many do you nwant to skip'
    })
    @IsOptional()
    @Min(0)
    @Type(() => Number)//Convercion of data
    offset?: number;

}