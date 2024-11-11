import { Controller, Get, Param } from "@nestjs/common";
import { CancionService } from "./cancion/cancion.service";
import { AlbumService } from "./album/album.service";
import { ArtistaService } from "./artista/artista.service";

@Controller()
export class AppController {
    constructor(
        private cancionService: CancionService,
        private albumService: AlbumService,
        private artistaService: ArtistaService,
    ) {}

    @Get("search/:name")
    async get(@Param("name") name: string): Promise<any> {
        const canciones = await this.cancionService.searchByName(name);
        const albums = await this.albumService.searchByName(name);
        const artistas = await this.artistaService.searchByName(name);

        const resultado = {
            canciones: canciones,
            albums: albums,
            artistas: artistas,
        };

        console.log(resultado);

        return resultado;
    }
}
