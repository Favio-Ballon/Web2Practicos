import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class ArtistaDto {
    readonly id: number;
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    imagen: string;

    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @IsNotEmpty()
    generoId: number;
}
