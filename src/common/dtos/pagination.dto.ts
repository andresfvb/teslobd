import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";



export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type(() => Number)//Convercion of data
    limit?: number;


    @IsOptional()
    @Min(0)
    @Type(() => Number)//Convercion of data
    offset?: number;

}