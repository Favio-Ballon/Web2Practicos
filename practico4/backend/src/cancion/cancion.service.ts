import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cancion } from "./cancion.model";
import { Like, Repository } from "typeorm";

@Injectable()
export class CancionService {
    constructor(
        @InjectRepository(Cancion)
        private cancionRepository: Repository<Cancion>,
    ) {}

    searchByName(name: string): Promise<Cancion[]> {
        return this.cancionRepository.find({
            where: {
                nombre: Like(`%${name}%`),
            },
        });
    }

    findAll(): Promise<Cancion[]> {
        return this.cancionRepository.find({ relations: ["artista", "album"] });
    }
    findById(id: number): Promise<Cancion | null> {
        return this.cancionRepository.findOne({ where: { id }, relations: ["artista", "album"] });
    }
    createCancion(cancion: Cancion): Promise<Cancion> {
        return this.cancionRepository.save(cancion);
    }
    async deleteCancion(id: number): Promise<string> {
        if (isNaN(id)) {
            throw new Error("Invalid ID");
        }
        await this.cancionRepository.delete(id);
        return "Cancion eliminado";
    }

    async updateCancion(id: number, updateData: Partial<Cancion>): Promise<Cancion> {
        await this.cancionRepository.update(id, {
            nombre: updateData.nombre,
            mp3: updateData.mp3,
            artista: updateData.artista,
            album: updateData.album,
        });
        return this.findById(id);
    }
}
