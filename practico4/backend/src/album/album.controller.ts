import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { ArtistaService } from "../artista/artista.service";
import { Album } from "./album.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { AlbumDto } from "./dto/album.dto";
import { ImagenUtils } from "../utils/imagen.utils";

@Controller("album")
export class AlbumController {
    constructor(
        private albumService: AlbumService,
        private artistaService: ArtistaService,
    ) {}

    @Get()
    list(): Promise<Album[]> {
        return this.albumService.findAll();
    }
    @Get(":id")
    get(@Param("id") id: number): Promise<Album | null> {
        return this.albumService.findById(id);
    }
    @Post()
    @UseInterceptors(FileInterceptor("imagen"))
    async create(@UploadedFile() imagen: Express.Multer.File, @Body() album: AlbumDto): Promise<Album> {
        const path = await this.uploadFile(imagen);

        const artista = await this.artistaService.findById(album.artistaId);

        if (!artista) {
            throw new BadRequestException("Ingrese un artista valido");
        }

        return this.albumService.createAlbum({
            id: album.id,
            nombre: album.nombre,
            imagen: path,
            artista: artista,
            canciones: [],
        });
    }

    @Put(":id")
    @UseInterceptors(FileInterceptor("imagen"))
    async update(@UploadedFile() imagen: Express.Multer.File, @Param("id") id: number, @Body() album: AlbumDto): Promise<Album> {
        if (imagen) {
            const path = await this.uploadFile(imagen);
            album.imagen = path;
        }

        const albumActual = await this.albumService.findById(id);
        if (!albumActual) {
            throw new BadRequestException("Album no encontrado");
        }
        const artista = await this.artistaService.findById(album.artistaId);
        if (!artista) {
            throw new BadRequestException("Ingrese un artista valido");
        }
        return this.albumService.updateAlbum(id, {
            id: album.id,
            nombre: album.nombre,
            imagen: album.imagen,
            artista: artista,
            canciones: [],
        });
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<string> {
        return await this.albumService.deleteAlbum(Number(id));
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        if (!file) {
            console.error("Imagen no recibida");
            throw new BadRequestException("Imagen necesaria");
        }
        console.log("Imagen recibida:", file.originalname);

        try {
            const result = await ImagenUtils.upload(file, "album");
            console.log("Imagen subida:", result);
            return result;
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            throw new BadRequestException("Error subiendo la imagen");
        }
    }
}
