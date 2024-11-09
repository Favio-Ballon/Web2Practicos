import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Artista } from "../artista/artista.model";

@Entity()
export class Genero {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    imagen: string;
    @OneToMany(() => Artista, artista => artista.genero, { cascade: true })
    artistas: Artista[];
}
