import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CancionService } from "./cancion.service";
import { AlbumService } from "../album/album.service";
import { Cancion } from "./cancion.model";
import { FilesInterceptor } from "@nestjs/platform-express";
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
    @UseInterceptors(FilesInterceptor("files"))
    async create(@UploadedFiles() files: Express.Multer.File[], @Body() cancion: CancionDto): Promise<Cancion> {
        for (const file of files) {
            if (file.mimetype.startsWith("image/")) {
                const imagePath = await this.uploadFile(file);
                cancion.imagen = imagePath;
            } else if (file.mimetype === "audio/mpeg") {
                const mp3Path = await this.uploadSong(file);
                cancion.mp3 = mp3Path;
            }
        }

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
            imagen: cancion.imagen,
            mp3: cancion.mp3,
            artista: artista,
            album: album,
        });
    }

    @Put(":id")
    @UseInterceptors(FilesInterceptor("files"))
    async update(@UploadedFiles() files: Express.Multer.File[], @Param("id") id: number, @Body() cancion: CancionDto): Promise<Cancion> {
        for (const file of files) {
            if (file.mimetype.startsWith("image/")) {
                const imagePath = await this.uploadFile(file);
                cancion.imagen = imagePath;
            } else if (file.mimetype === "audio/mpeg") {
                const mp3Path = await this.uploadSong(file);
                cancion.mp3 = mp3Path;
            }
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
            imagen: cancion.imagen,
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

    async uploadSong(file: Express.Multer.File): Promise<string> {
        if (!file) {
            console.error("Cancion no recibida");
            throw new BadRequestException("Cancion necesaria");
        }
        console.log("Cancion recibida:", file.originalname);

        try {
            const result = await SongUtils.upload(file);
            console.log("Cancion subida:", result);
            return result;
        } catch (error) {
            console.error("Error al subir la Cancion:", error);
            throw new BadRequestException("Error subiendo la Cancion");
        }
    }
}
