import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ArtistaService } from "./artista.service";
import { Artista } from "./artista.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { ArtistaDto } from "./dto/artista.dto";
import { GeneroService } from "../genero/genero.service";
import { ImagenUtils } from "../utils/imagen.utils";

@Controller("artista")
export class ArtistaController {
    constructor(
        private artistaService: ArtistaService,
        private generoService: GeneroService,
    ) {}

    @Get()
    list(): Promise<Artista[]> {
        return this.artistaService.findAll();
    }
    @Get(":id")
    get(@Param("id") id: number): Promise<Artista | null> {
        return this.artistaService.findById(id);
    }
    @Post()
    @UseInterceptors(FileInterceptor("imagen"))
    async create(@UploadedFile() imagen: Express.Multer.File, @Body() artista: ArtistaDto): Promise<Artista> {
        const path = await this.uploadFile(imagen);

        const genero = await this.generoService.findById(artista.generoId);

        if (!genero) {
            throw new BadRequestException("Ingrese un genero valido");
        }

        return this.artistaService.createArtista({
            id: artista.id,
            nombre: artista.nombre,
            imagen: path,
            genero: genero,
            albums: [],
            canciones: [],
        });
    }

    @Put(":id")
    @UseInterceptors(FileInterceptor("imagen"))
    async update(@UploadedFile() imagen: Express.Multer.File, @Param("id") id: number, @Body() artista: ArtistaDto): Promise<Artista> {
        if (imagen) {
            const path = await this.uploadFile(imagen);
            artista.imagen = path;
        }

        const artistaActual = await this.artistaService.findById(id);
        if (!artistaActual) {
            throw new BadRequestException("Artista no encontrado");
        }
        const genero = await this.generoService.findById(artista.generoId);
        if (!genero) {
            throw new BadRequestException("Genero no encontrado");
        }
        return this.artistaService.updateArtista(id, {
            id: artista.id,
            nombre: artista.nombre,
            imagen: artista.imagen,
            genero: genero,
        });
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<string> {
        return await this.artistaService.deleteArtista(Number(id));
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        if (!file) {
            console.error("Imagen no recibida");
            throw new BadRequestException("Imagen necesaria");
        }
        console.log("Imagen recibida:", file.originalname);

        try {
            const result = await ImagenUtils.upload(file, "artista");
            console.log("Imagen subida:", result);
            return result;
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            throw new BadRequestException("Error subiendo la imagen");
        }
    }
}
