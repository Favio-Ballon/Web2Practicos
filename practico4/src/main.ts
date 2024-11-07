import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    const uploadDir = "./uploads";
    if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir);
    }

    const uploadDir2 = "./uploads/image";
    if (!existsSync(uploadDir2)) {
        mkdirSync(uploadDir2);
    }

    const uploadDir3 = "./uploads/song";
    if (!existsSync(uploadDir3)) {
        mkdirSync(uploadDir3);
    }

    await app.listen(3000);
}
bootstrap();
