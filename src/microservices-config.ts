import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";

export const createRabitMQModuleWithConfig = () =>
  RabbitMQModule.forRoot(RabbitMQModule, {
    uri: "amqp://user:bitnami@127.0.0.1:5672",
    connectionInitOptions: {
      wait: false,
    },
  });
