# Billing Cycle

Billing Cycle are important calculations in subscription based business logic



# Description

Web app exposes a simple GUI to the user to input a billing cycle day and current day , the web app then communicates with the backend logic(app) which calculates the current biling cycle range of a subscriber



# Motivation

To learn Node.js

To learn Open Telemetry

To implement a algorithm to calculate billing cycle



# Getting Started

docker compose -f "billing_cycle/docker-compose.yml" up -d --build 



# Code

| Tag  | Notes                                                        | Services                 |
| ---- | ------------------------------------------------------------ | ------------------------ |
| **1**| Two nodejs based microservices web and app with logging to stdout. To showcase the business logic | App,Web                  |
| 2    | Extends  logging to  Loki                                    | + Loki      |
| 3    | Extend metrics to   Prometheus                               | + Prometheus             |
| 4    | Extend metrics to Mimir                                      | + Mimir                  |
| 5    | Extend tracing to Tempo                                      | + Tempo                  |







