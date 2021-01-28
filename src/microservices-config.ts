import { ClientOptions, Transport } from "@nestjs/microservices";

export const microserviceTextConfig: ClientOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ["amqp://user:bitnami@127.0.0.1:5672"],

    queue: "text",

    queueOptions: {
      durable: true,
    },
  },
};

export const microserviceBananaConfig: ClientOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ["amqp://user:bitnami@127.0.0.1:5672"],

    queue: "banana",

    queueOptions: {
      durable: true,
    },
  },
};
