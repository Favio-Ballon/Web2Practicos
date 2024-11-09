import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Album } from "../album/album.model";
import { Artista } from "../artista/artista.model";

@Entity()
export class Cancion {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    imagen: string;
    @Column()
    mp3: string;
    @ManyToOne(() => Album, album => album.canciones)
    album: Album;
    @ManyToOne(() => Artista, artista => artista.canciones)
    artista: Artista;
}
