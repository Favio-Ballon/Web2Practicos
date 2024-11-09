import { IsNotEmpty, IsString } from "class-validator";

export class GeneroDto {
    readonly id: number;
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    imagen: string;
}
