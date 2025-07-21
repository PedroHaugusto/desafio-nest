import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "./swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const specs = swaggerJsdoc(swaggerConfig);
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();