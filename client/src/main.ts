import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get('PORT');
  const options = new DocumentBuilder()
    .setTitle('Car Check APIs')
    .setDescription('A collection of APIs for the Car Check Service.')
    .setVersion('1.0')
    .addTag('App')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(parseInt(port, 10));
}
bootstrap();
