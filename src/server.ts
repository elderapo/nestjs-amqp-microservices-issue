import { Controller, Get, Module, Param } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ClientProxy, ClientProxyFactory } from "@nestjs/microservices";
import { microservicesConfig } from "./microservices-config";

@Controller()
class ServerController {
  private readonly client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create(microservicesConfig);
  }

  @Get("/")
  public async index() {
    const reversedAndUppserCased = await this.client
      .send<string>("reverse-and-uppercase", `ehhe-${Date.now()}`)
      .toPromise();

    return {
      serverPid: process.pid,

      result: reversedAndUppserCased,
    };
  }

  @Get("/test/:name")
  public async amIBanana(@Param("name") name: string) {
    const result = await this.client
      .send<boolean>("am-i-banana", name)
      .toPromise();

    return {
      serverPid: process.pid,

      result,
    };
  }
}

@Module({
  controllers: [ServerController],
})
class ServerModule {}

async function bootstrap() {
  const serverApp = await NestFactory.create(ServerModule);

  await serverApp.listenAsync(4444);
  console.log(`Server is listening process(pid: ${process.pid})!`);
}

bootstrap();
