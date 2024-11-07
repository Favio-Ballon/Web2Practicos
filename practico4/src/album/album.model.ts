// eslint-disable-next-line prettier/prettier
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Cancion } from "../cancion/cancion.model";
import { Artista } from "../artista/artista.model";

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    imagen: string;
    @OneToMany(() => Cancion, cancion => cancion.album)
    canciones: Cancion[];
    @ManyToOne(() => Artista, artista => artista.albums)
    artista: Artista;
}
