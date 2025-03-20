import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from 'src/config';
import { RcpCustomExceptionFilter } from './common';

async function bootstrap() {

    const logger = new Logger("Main-Gateway")

    console.log("hola mundo primer cambio");

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api')

    // ✅ APLICAR EL PIPE GLOBALMENTE
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,  // Convierte automáticamente los tipos
            whitelist: true,  // Elimina propiedades no definidas en los DTO
            forbidNonWhitelisted: true, // Lanza error si hay propiedades desconocidas
            transformOptions: {
                enableImplicitConversion: true,  // Convierte sin necesidad de `@Type`
            },
        }),
    );

    app.useGlobalFilters(new RcpCustomExceptionFilter)


    await app.listen(envs.PORT);


    logger.log(`products microservices running on http://localhost:${envs.PORT}`);

}
bootstrap();
