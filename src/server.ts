import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Controller, Get, Module, Param } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { createRabitMQModuleWithConfig } from "./microservices-config";

@Controller()
class ServerController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get("/")
  public async index() {
    const reversedAndUppserCased = await this.amqpConnection.request<string>({
      exchange: "my-exchange",
      routingKey: "reverse-and-uppercase",
      payload: `ehhe-${Date.now()}`,
    });

    return {
      serverPid: process.pid,

      result: reversedAndUppserCased,
    };
  }

  @Get("/test/:name")
  public async amIBanana(@Param("name") name: string) {
    const result = await this.amqpConnection.request<boolean>({
      exchange: "my-exchange",
      routingKey: "am-i-banana",
      payload: name,
    });

    return {
      serverPid: process.pid,

      result,
    };
  }
}

@Module({
  imports: [createRabitMQModuleWithConfig()],
  controllers: [ServerController],
})
class ServerModule {}

async function bootstrap() {
  const serverApp = await NestFactory.create(ServerModule);

  await serverApp.listenAsync(4444);
  console.log(`Server is listening process(pid: ${process.pid})!`);
}

bootstrap();
