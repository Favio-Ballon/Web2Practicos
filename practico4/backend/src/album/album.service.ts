import { Injectable } from "@nestjs/common";
import { Album } from "./album.model";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album)
        private albumRepository: Repository<Album>,
    ) {}

    searchByName(name: string): Promise<Album[]> {
        return this.albumRepository.find({
            where: {
                nombre: Like(`%${name}%`),
            },
        });
    }

    findAll(): Promise<Album[]> {
        return this.albumRepository.find({ relations: ["canciones", "artista"] });
    }
    findById(id: number): Promise<Album | null> {
        return this.albumRepository.findOne({ where: { id }, relations: ["canciones", "artista"] });
    }
    createAlbum(album: Album): Promise<Album> {
        return this.albumRepository.save(album);
    }
    async deleteAlbum(id: number): Promise<string> {
        if (isNaN(id)) {
            throw new Error("Invalid ID");
        }
        await this.albumRepository.delete(id);
        return "Album eliminado";
    }

    async updateAlbum(id: number, updateData: Partial<Album>): Promise<Album> {
        await this.albumRepository.update(id, {
            nombre: updateData.nombre,
            imagen: updateData.imagen,
            artista: updateData.artista,
        });
        return this.findById(id);
    }
}
