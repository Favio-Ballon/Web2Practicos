import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CancionDto {
    readonly id: number;
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    mp3: string;

    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @IsNotEmpty()
    readonly albumId: number;
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @IsNotEmpty()
    readonly artistaId: number;
}
