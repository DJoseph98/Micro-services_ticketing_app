# Micro-services_ticketing_app

Basic ticketing app using micro-services architecture.

Skaffold is used to manage the local deployment of the app (Kubernete clusters of each services, event bus,..)

To re-use the logic of the codebase of the event bus, I created a personnal npm package (@djticketsudemy/common) that I am using in each services.

Technologies used :

NATS, NodeJS, MongoDB, Kubernete, Docker, Skaffold, Jest, TypeScript, Ingress
