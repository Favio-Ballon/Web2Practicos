import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class AlbumDto {
    readonly id: number;
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    imagen: string;

    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @IsNotEmpty()
    artistaId: number;
}
