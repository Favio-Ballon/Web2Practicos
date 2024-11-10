import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CancionService } from "./cancion.service";
import { AlbumService } from "../album/album.service";
import { Cancion } from "./cancion.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { CancionDto } from "./dto/cancion.dto";
import { ArtistaService } from "../artista/artista.service";
import { ImagenUtils } from "../utils/imagen.utils";
import { SongUtils } from "../utils/song.utils";

@Controller("cancion")
export class CancionController {
    constructor(
        private cancionService: CancionService,
        private albumService: AlbumService,
        private artistaService: ArtistaService,
    ) {}

    @Get()
    list(): Promise<Cancion[]> {
        return this.cancionService.findAll();
    }
    @Get(":id")
    get(@Param("id") id: number): Promise<Cancion | null> {
        return this.cancionService.findById(id);
    }
    @Post()
    @UseInterceptors(FileInterceptor("mp3"))
    async create(@UploadedFile() mp3: Express.Multer.File, @Body() cancion: CancionDto): Promise<Cancion> {
        const path = await this.uploadSong(mp3);

        const artista = await this.artistaService.findById(cancion.artistaId);
        if (!artista) {
            throw new BadRequestException("Artista no encontrado");
        }
        const album = await this.albumService.findById(cancion.albumId);
        if (!album) {
            throw new BadRequestException("Album no encontrado");
        }

        return this.cancionService.createCancion({
            id: cancion.id,
            nombre: cancion.nombre,
            mp3: path,
            artista: artista,
            album: album,
        });
    }

    @Put(":id")
    @UseInterceptors(FileInterceptor("mp3"))
    async update(@UploadedFile() mp3: Express.Multer.File, @Param("id") id: number, @Body() cancion: CancionDto): Promise<Cancion> {
        console.log(mp3);
        console.log(cancion);
        if (mp3) {
            const path = await this.uploadSong(mp3);
            cancion.mp3 = path;
        }

        const cancionActual = await this.cancionService.findById(id);
        if (!cancionActual) {
            throw new BadRequestException("Cancion no encontrado");
        }
        const artista = await this.artistaService.findById(cancion.artistaId);
        if (!artista) {
            throw new BadRequestException("Artista no encontrado");
        }
        const album = await this.albumService.findById(cancion.albumId);
        if (!album) {
            throw new BadRequestException("Album no encontrado");
        }
        return this.cancionService.updateCancion(id, {
            id: cancion.id,
            nombre: cancion.nombre,
            mp3: cancion.mp3,
            artista: artista,
            album: album,
        });
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<string> {
        return await this.cancionService.deleteCancion(Number(id));
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        if (!file) {
            console.error("Imagen no recibida");
            throw new BadRequestException("Imagen necesaria");
        }
        console.log("Imagen recibida:", file.originalname);

        try {
            const result = await ImagenUtils.upload(file, "cancion");
            console.log("Imagen subida:", result);
            return result;
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            throw new BadRequestException("Error subiendo la imagen");
        }
    }

    async uploadSong(mp3: Express.Multer.File): Promise<string> {
        console.log(mp3);
        if (!mp3) {
            console.error("Cancion no recibida");
            throw new BadRequestException("Cancion necesaria");
        }
        console.log("Cancion recibida:", mp3.originalname);

        try {
            const result = await SongUtils.upload(mp3);
            console.log("Cancion subida:", result);
            return result;
        } catch (error) {
            console.error("Error al subir la Cancion:", error);
            throw new BadRequestException("Error subiendo la Cancion");
        }
    }
}
