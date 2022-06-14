# Micro-services_ticketing_app

Basic ticketing app using micro-services architecture.

Skaffold is used to manage the local deployment of the app (deploy Kubernete clusters of each services, configure ingress and event bus, and other things.)

To re-use the codebase of the event bus, I created a personnal npm package (@djticketsudemy/common) that I am using in each services.

Technologies used :

NATS-streaming, NodeJS, MongoDB, Kubernete, Docker, Skaffold, Jest, TypeScript, Ingress
