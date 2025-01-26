import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

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
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
  })
  .build()

  const documentFactory =  SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, documentFactory)
  
  app.enableCors();
  app.setGlobalPrefix(prefix)
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const firstError = errors[0];
      const firstConstraintKey = Object.keys(firstError.constraints || {})[0];
      const firstErrorMessage = firstError.constraints?.[firstConstraintKey];
      return new BadRequestException(firstErrorMessage || 'Validation failed');
    }
  }))
  await app.listen(port);
}
bootstrap();
