import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    app.enableCors({
        origin: "http://localhost:5173", // Replace with your frontend URL
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    });

    const uploadDirs = ["./uploads", "./uploads/image", "./uploads/song"];
    uploadDirs.forEach(dir => {
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }
    });

    await app.listen(3000);
}
bootstrap();
