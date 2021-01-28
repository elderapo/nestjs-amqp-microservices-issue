import { Controller, Injectable, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { RMQRoute } from "nestjs-rmq";
import { initRMQModule } from "./microservices-config";

@Injectable()
class BananaMicroserviceService {
  public async amIBanana(name: string): Promise<boolean> {
    console.log(`Checking if "${name}" is a banana...`);
    return name.toLowerCase() === "banana";
  }
}

@Controller()
class BananaMicroserviceController {
  constructor(private readonly bananaService: BananaMicroserviceService) {}

  @RMQRoute("am-i-banana")
  async amIBanana(name: string): Promise<boolean> {
    return await this.bananaService.amIBanana(name);
  }
}

@Module({
  imports: [initRMQModule()],
  controllers: [BananaMicroserviceController],
  providers: [BananaMicroserviceService],
})
class BananaMicroserviceModule {}

async function bootstrap() {
  const microserviceApp = await NestFactory.create(BananaMicroserviceModule);

  await microserviceApp.listenAsync(4446);
  console.log(`Banana microservice is listening process(pid: ${process.pid})!`);
}

bootstrap();
