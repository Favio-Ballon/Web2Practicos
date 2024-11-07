import { Injectable } from "@nestjs/common";
import { Artista } from "./artista.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ArtistaService {
    constructor(
        @InjectRepository(Artista)
        private artistaRepository: Repository<Artista>,
    ) {}
    findAll(): Promise<Artista[]> {
        return this.artistaRepository.find();
    }
    findById(id: number): Promise<Artista | null> {
        return this.artistaRepository.findOneBy({ id });
    }
    createArtista(artista: Artista): Promise<Artista> {
        return this.artistaRepository.save(artista);
    }
    async deleteArtista(id: number): Promise<string> {
        if (isNaN(id)) {
            throw new Error("Invalid ID");
        }
        await this.artistaRepository.delete(id);
        return "Artista eliminado";
    }

    async updateGenero(id: number, updateData: Partial<Artista>): Promise<Artista> {
        await this.artistaRepository.update(id, {
            nombre: updateData.nombre,
            imagen: updateData.imagen,
            genero: updateData.genero,
            albums: updateData.albums,
            canciones: updateData.canciones,
        });
        return this.findById(id);
    }
}
