// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Put, Delete, Param, Body, UploadedFile, UseInterceptors, BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { GeneroService } from "./genero.service";
import { Genero } from "./genero.model";
import { GeneroDto } from "./dto/genero.dto";
import { ImagenUtils } from "../utils/imagen.utils";

@Controller("genero")
export class GeneroController {
    constructor(private generosService: GeneroService) {}
    @Get()
    list(): Promise<Genero[]> {
        return this.generosService.findAll();
    }
    @Get(":id")
    get(@Param("id") id: number): Promise<Genero | null> {
        return this.generosService.findById(id);
    }
    @Post()
    @UseInterceptors(FileInterceptor("imagen"))
    async create(@UploadedFile() imagen: Express.Multer.File, @Body() genero: GeneroDto): Promise<Genero> {
        const path = await this.uploadFile(imagen);

        return this.generosService.createGenero({
            id: genero.id,
            nombre: genero.nombre,
            imagen: path,
            artistas: [],
        });
    }
    @Put(":id")
    @UseInterceptors(FileInterceptor("imagen"))
    async update(@UploadedFile() imagen: Express.Multer.File, @Param("id") id: number, @Body() genero: GeneroDto): Promise<Genero> {
        if (imagen) {
            const path = await this.uploadFile(imagen);
            genero.imagen = path;
        }

        const generoActual = await this.generosService.findById(id);
        if (!generoActual) {
            throw new BadRequestException("Genero no encontrado");
        }
        return this.generosService.updateGenero(id, genero);
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<string> {
        return await this.generosService.deleteGenero(Number(id));
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        if (!file) {
            console.error("Imagen no recibida");
            throw new BadRequestException("Imagen necesaria");
        }
        console.log("Imagen recibida:", file.originalname);

        try {
            const result = await ImagenUtils.upload(file, "genero");
            console.log("Imagen subida:", result);
            return result;
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            throw new BadRequestException("Error subiendo la imagen");
        }
    }
}
