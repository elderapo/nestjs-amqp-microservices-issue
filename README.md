# How to reproduce:

```bash
git clone git@github.com:elderapo/nestjs-amqp-microservices-issue.git
cd nestjs-amqp-microservices-issue/
yarn

docker-compose up -d # To start `rabbitmq` server

# Run these in 3 different consoles
yarn start:server
yarn start:banana-microservice
yarn start:text-microservice
```

And visit `http://localhost:4444/` & `http://localhost:4444/test/banana` few times in different order.