import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CancionController } from "./cancion/cancion.controller";
import { GeneroController } from "./genero/genero.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GeneroService } from "./genero/genero.service";
import { CancionService } from "./cancion/cancion.service";
import { AlbumController } from "./album/album.controller";
import { AlbumService } from "./album/album.service";
import { ArtistaController } from "./artista/artista.controller";
import { ArtistaService } from "./artista/artista.service";
import { Artista } from "./artista/artista.model";
import { Album } from "./album/album.model";
import { Cancion } from "./cancion/cancion.model";
import { Genero } from "./genero/genero.model";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "practico4",
            entities: [Artista, Genero, Cancion, Album],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Artista, Genero, Cancion, Album]),
    ],
    controllers: [
        AppController,
        CancionController,
        GeneroController,
        AlbumController,
        ArtistaController,
    ],
    providers: [
        AppService,
        GeneroService,
        CancionService,
        AlbumService,
        ArtistaService,
    ],
})
export class AppModule {}
