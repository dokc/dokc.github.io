---
title: How to build a cloud-native event-driven app and deploy to Kubernetes
date: '2022-11-28T18:39:17Z'
lastmod: '2022-12-07T23:17:48Z'
slug: how-to-build-a-cloud-native-event-driven-app-and-deploy-to-kubernetes
author: Melissa Logan
image: How-to-build-a-cloud-native-event-driven-app.jpg
categories:
- How To
---

In the following tutorial, we will explore and learn the foundations of building an event-driven app based on a cloud-native approach. We will develop several cloud-native microservices, deploy them over a minikube cluster, and install [Memphis](https://github.com/memphisdev/memphis-broker), which is a cloud-native real-time data processing platform that will enable communication between the services. Finally, we will run the entire application on a Kubernetes cluster.

The chosen use case is a food-delivery application like Doordash.

## The technology stack we will use

![](Screen-Shot-2022-11-28-at-1.19.41-PM.png)

- [Node.js](https://nodejs.org/en/) as our primary dev-lang
- [MongoDB](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=gs_emea_israel_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624530&adgroup=115749707943&gclid=Cj0KCQjw6_CYBhDjARIsABnuSzpM5YbZ-c8mKM1wnZ_TyBJ263zgReMiVuhdHjL7PRJPWk2cShVHaiEaArfJEALw_wcB) for order persistency
- [Memphis](https://memphis.dev/) is a message broker for developers
- [Kubernetes](https://kubernetes.io/) will host our microservices

![](Screen-Shot-2022-11-28-at-1.20.24-PM.png)

## High-Level Plan

1. Install Minikube using the brew package manager.
2. Install [Memphis](https://github.com/memphisdev/memphis-broker) over Minikube.
3. Clone “[the Door-Dash-like-app](https://github.com/yanivbh1/FastMart)” GitHub repo. We will call it Fastmart
4. Review the code, the different services, and how they interact with each other.
5. Deploy “Fastmart” over Kubernetes.
6. Order food!

## Let’s start!

1.**Install Minikube**

Installation commands of Minikube are available here

<https://minikube.sigs.k8s.io/docs/start/>. Minikube is a local Kubernetes, making it easy to learn and develop Kubernetes-native apps.

Once the Docker engine and minikube are installed, run the following command:

**1. minikube start**

![](Screen-Shot-2022-11-28-at-1.05.53-PM.png)

Verify that minikube has started correctly by running the following command:

![](Screen-Shot-2022-11-28-at-1.06.02-PM.png)

A healthy output should look as follow

![](Screen-Shot-2022-11-28-at-1.06.07-PM.png)

2.**Install Memphis** by running the following command in your terminal

![](Screen-Shot-2022-11-28-at-1.06.13-PM.png)

Once Memphis Helm notes have appeared, it means you have a healthy, running Memphis cluster.

3.**Clone** the tutorial repo
![](Screen-Shot-2022-11-28-at-1.06.16-PM.png)

### System Architecture, Code, and Flow

# **How to build a cloud-native event-driven app and deploy to Kubernetes**

### ![](Screen-Shot-2022-11-28-at-1.06.31-PM.png)

### Architecture

Follow the numbers to understand the flow.

Our app has three main components: order, email, restaurant.

1. **Order service.**

Exposes REST endpoints that allow clients to fetch the food menu, place an order and track the order in real-time.

A new order will be saved in MongoDB with the status “Pending” and will be produced (Pushed) into the “orders” station

![](Screen-Shot-2022-11-28-at-1.06.37-PM.png)

![](Screen-Shot-2022-11-28-at-1.06.42-PM.png)

The code responsible for communicating with Memphis will be found on every service at the same path.

![](Screen-Shot-2022-11-28-at-1.06.47-PM.png)

- When initializing the app/service for the first time, a memphisConnect object needs to be created. Producer/Consumer entity as well.
- Username and ConnectionToken can be generated using Memphis UI or CLI.
- To produce or push data/events/messages to Memphis station, we use **producer.produce**

- To consume or pull data/events/messages from Memphis station, we use  **consumer.consume**

![](Screen-Shot-2022-11-28-at-1.06.50-PM.png)

![](Screen-Shot-2022-11-28-at-1.14.19-PM.png)

![](Screen-Shot-2022-11-28-at-1.14.24-PM.png)

2. **Email service**

The email service is responsible for notifying the customer about the different stages of the order.

The email-service consumer receives messages from two stations: orders and notifications.

As soon as an order is inserted into the station, the email service notifies the client with an order confirmation and, listens for new notification requests from other services.

![](Screen-Shot-2022-11-28-at-1.14.30-PM.png)

3. **Restaurant service.**

The restaurant service is responsible for fulfilling orders.

1. Consume orders
2. Process orders
3. Change orders status at the MongoDB level to “Accepted”
4. Using constant sleep time to mimic the preparation of the food by the restaurant
5. Change orders status at the MongoDB level to “Delivered”
6. Sending notification to the customer

![](Screen-Shot-2022-11-28-at-1.14.36-PM.png)

5. **Deploy the app over Kubernetes**

While in the root folder,  **run** **kubectl apply -f k8s-deployment.yaml**
This command will apply a manifest, telling Kubernetes how to deploy, run, and manage our application within Kubernetes. Once apply finished successfully, run the following command and check the output.

![](Screen-Shot-2022-11-28-at-1.14.41-PM.png)

You should receive an output as follow.

![](Screen-Shot-2022-11-28-at-1.14.45-PM.png)

As we can see, not all pods started.

Let’s understand why. Please replace email-service-x with the name of the email-service pod you have in your station.

![](Screen-Shot-2022-11-28-at-1.14.49-PM.png)

We should see a similar output.

![](Screen-Shot-2022-11-28-at-1.14.52-PM.png)

It appears that the services try to connect to “Memphis” with the user “fastmart” which does not exist and we are required to create it.

The simplest way to add a new user would be through the UI, but let’s do it via CLI.

Install Memphis CLI, you can follow the tutorial [here](https://docs.memphis.dev/memphis-new/cli/installation).

![](Screen-Shot-2022-11-28-at-1.14.59-PM.png)

![](Screen-Shot-2022-11-28-at-1.15.03-PM.png)

To target the CLI to our local memphis cluster, we need to:

**1)Generate a root password**

![](Screen-Shot-2022-11-28-at-1.15.07-PM.png)

**2)memphis UI URL** ![](Screen-Shot-2022-11-28-at-1.15.11-PM.png)

**3) Connect the CLI with Memphis**

![](Screen-Shot-2022-11-28-at-1.15.14-PM.png)

![](Screen-Shot-2022-11-28-at-1.15.18-PM.png)

4) Add the user “fastmart”

![](Screen-Shot-2022-11-28-at-1.15.22-PM.png)

\*\*Soon after we will create the user,

the pods will restart automatically and reconnect with Memphis.\*\*

![](Screen-Shot-2022-11-28-at-1.15.30-PM.png)

Station overview

![](Screen-Shot-2022-11-28-at-1.15.34-PM.png)

**6)Order food!**

To expose the orders-service through localhost, run the following command.

![](Screen-Shot-2022-11-28-at-1.15.38-PM.png)

Get the menu.

![](Screen-Shot-2022-11-28-at-1.15.41-PM.png)

Output.

![](Screen-Shot-2022-11-28-at-1.16.04-PM.png)

Run this command to pass an order.

![](Screen-Shot-2022-11-28-at-1.16.08-PM.png)

An email should arrive shortly at the email address specified above.
