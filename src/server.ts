import { Controller, Get, Module, Param } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { RMQService } from "nestjs-rmq";
import { initRMQModule } from "./microservices-config";

@Controller()
class ServerController {
  constructor(private readonly client: RMQService) {}

  @Get("/")
  public async index() {
    console.log("Hit index route...");
    const reversedAndUppserCased = await this.client.send<string, string>(
      "reverse-and-uppercase",
      `ehhe-${Date.now()}`
    );
    console.log("Sending index route...");

    return {
      serverPid: process.pid,

      result: reversedAndUppserCased,
    };
  }

  @Get("/test/:name")
  public async amIBanana(@Param("name") name: string) {
    console.log("Hit am I banan route...");
    const result = await this.client.send<string, boolean>("am-i-banana", name);
    console.log("Sending am I banana response...");

    return {
      serverPid: process.pid,

      result,
    };
  }
}

@Module({
  imports: [initRMQModule()],
  controllers: [ServerController],
})
class ServerModule {}

async function bootstrap() {
  const serverApp = await NestFactory.create(ServerModule);

  await serverApp.listenAsync(4444);
  console.log(`Server is listening process(pid: ${process.pid})!`);
}

bootstrap();
