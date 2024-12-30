import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = configService.get<string>("port")
  const baseUrl = configService.get<string>("baseUrl")
  const prefix = "api/v1"

  
  const swaggerConfig = new DocumentBuilder()
  .setTitle("Hospital API Services")
  .setDescription("Hospital API server endpoint")
  .setVersion("1.0")
  .addServer(`${baseUrl}/${prefix}`, "Development Server")
  .build()
  const documentFactory =  SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, documentFactory)
  
  app.enableCors();
  app.setGlobalPrefix(prefix)
  await app.listen(port);
}
bootstrap();
