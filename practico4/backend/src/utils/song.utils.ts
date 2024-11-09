import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class SongUtils {
    static async upload(file: Express.Multer.File): Promise<any> {
        const uploadPath = `./uploads/song/`;
        const name = `${file.originalname}`;

        // Se verifica si el directorio existe, si no se crea
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        const filePath = path.join(uploadPath, name);

        // Se guarda
        fs.writeFileSync(filePath, file.buffer);

        return `song/${name}`;
    }
}
