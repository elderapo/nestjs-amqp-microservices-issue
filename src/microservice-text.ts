import { Controller, Injectable, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { RMQRoute } from "nestjs-rmq";
import { initRMQModule } from "./microservices-config";

@Injectable()
class TextMicroserviceService {
  public constructor() {}

  public async reverseAndUppercase(text: string): Promise<string> {
    console.log(`Reversing and uppercasing text: ${text}...`);

    return text
      .toUpperCase()
      .split("")
      .reverse()
      .join("");
  }
}

@Controller()
class TextMicroserviceController {
  constructor(private readonly testService: TextMicroserviceService) {}

  @RMQRoute("reverse-and-uppercase")
  async reverseAndUppercase(text: string): Promise<string> {
    return await this.testService.reverseAndUppercase(text);
  }
}

@Module({
  imports: [initRMQModule()],
  controllers: [TextMicroserviceController],
  providers: [TextMicroserviceService],
})
class TextMicroserviceModule {}

async function bootstrap() {
  const microserviceApp = await NestFactory.create(TextMicroserviceModule);

  await microserviceApp.listenAsync(4445);
  console.log(`Text microservice is listening process(pid: ${process.pid})!`);
}

bootstrap();
