import { RMQModule } from "nestjs-rmq";

export const initRMQModule = () =>
  RMQModule.forRoot({
    exchangeName: "my_exchange",
    connections: [
      {
        login: "user",
        password: "bitnami",
        host: "127.0.0.1:5672",
      },
    ],
    queueName: "my-service-queue",
  });
