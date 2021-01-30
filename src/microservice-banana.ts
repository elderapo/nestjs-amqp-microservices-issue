import { RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Injectable, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { createRabitMQModuleWithConfig } from "./microservices-config";

@Injectable()
class BananaMicroserviceService {
  @RabbitRPC({
    exchange: "my-exchange",
    routingKey: "am-i-banana",
  })
  public async amIBanana(name: string): Promise<boolean> {
    console.log(`Checking if "${name}" is a banana...`);
    return name.toLowerCase() === "banana";
  }
}

@Module({
  imports: [createRabitMQModuleWithConfig()],
  providers: [BananaMicroserviceService],
})
class BananaMicroserviceModule {}

async function bootstrap() {
  const microserviceApp = await NestFactory.createMicroservice(
    BananaMicroserviceModule
  );

  await microserviceApp.listenAsync();
  console.log(`Banana microservice is listening process(pid: ${process.pid})!`);
}

bootstrap();
