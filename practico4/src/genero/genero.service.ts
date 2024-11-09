import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Genero } from "./genero.model";
import { GeneroDto } from "./dto/genero.dto";

@Injectable()
export class GeneroService {
    constructor(
        @InjectRepository(Genero)
        private generoRepository: Repository<Genero>,
    ) {}
    findAll(): Promise<Genero[]> {
        return this.generoRepository.find({ relations: ["artistas"] });
    }
    findById(id: number): Promise<Genero | null> {
        return this.generoRepository.findOne({ where: { id }, relations: ["artistas"] });
    }
    createGenero(genero: Genero): Promise<Genero> {
        return this.generoRepository.save(genero);
    }
    async deleteGenero(id: number): Promise<string> {
        if (isNaN(id)) {
            throw new Error("Invalid ID");
        }
        await this.generoRepository.delete(id);
        return "Genero eliminado";
    }

    async updateGenero(id: number, genero: GeneroDto): Promise<Genero> {
        await this.generoRepository.update(id, {
            nombre: genero.nombre,
            imagen: genero.imagen,
        });
        return this.generoRepository.findOneBy({ id });
    }
}
