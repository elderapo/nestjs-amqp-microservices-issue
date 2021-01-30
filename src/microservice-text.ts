import { RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Injectable, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { createRabitMQModuleWithConfig } from "./microservices-config";

@Injectable()
class TextMicroserviceService {
  public constructor() {}

  @RabbitRPC({
    exchange: "my-exchange",
    routingKey: "reverse-and-uppercase",
  })
  public async reverseAndUppercase(text: string): Promise<string> {
    console.log(`Reversing and uppercasing text: ${text}...`);

    return text
      .toUpperCase()
      .split("")
      .reverse()
      .join("");
  }
}

@Module({
  imports: [createRabitMQModuleWithConfig()],
  providers: [TextMicroserviceService],
})
class TextMicroserviceModule {}

async function bootstrap() {
  const microserviceApp = await NestFactory.createMicroservice(
    TextMicroserviceModule
  );

  await microserviceApp.listenAsync();
  console.log(`Text microservice is listening process(pid: ${process.pid})!`);
}

bootstrap();
