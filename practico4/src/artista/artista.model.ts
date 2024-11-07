// eslint-disable-next-line prettier/prettier
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Genero } from "../genero/genero.model";
import { Album } from "../album/album.model";
import { Cancion } from "../cancion/cancion.model";

@Entity()
export class Artista {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    imagen: string;
    @ManyToOne(() => Genero, genero => genero.artistas)
    genero: Genero;
    @OneToMany(() => Album, album => album.artista)
    albums: Album[];
    @OneToMany(() => Cancion, cancion => cancion.artista)
    canciones: Cancion[];
}
