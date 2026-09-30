---
title: One Click to Run Apache Spark as a Service on Kubernetes
date: '2022-09-18T20:01:42Z'
lastmod: '2022-10-11T15:43:06Z'
slug: one-click-to-run-apache-spark-as-a-service-on-kubernetes
author: Melissa Logan
image: Screen-Shot-2022-09-18-at-4.00.49-PM.png
categories:
- DoK Day at KubeCon EU 2022
tags:
- Spark
---

It is still challenging to run Apache Spark on Kubernetes, especially on a large scale. People must address issues like resource isolation, queuing, and cost efficiency. In this talk, [Bo Yang](https://www.linkedin.com/in/hiboyang/) discusses these challenges and how to address them. He also presents a one-click way to deploy Apache Spark on Kubernetes.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/Rt6yAqeJnLY" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

**Bo Yang**

So, we will start with some quick introductions, and we will show you how we design the tool. Then we will share the project, and hopefully, get people to contribute.

So, Spark (for people who may not be familiar) is a very powerful tool to do data processing, and for machine learning workload. And, [Kubernetes](https://kubernetes.io/docs/concepts/overview/) as everybody knows is a good platform to run containers. And these days, when people run [Spark](https://spark.apache.org/) on Kubernetes, it can give benefits from both sides and you can even get more. For example, it makes your operation super easy. But - everything has a but.

So, you need to solve a lot of challenges. The most challenging is complexity. So Kubernetes itself already has a lot of moving pieces and a lot of tools. Spark, again has different components that work together for you to do a lot of things. For example, you need to create EKS on AWS or some other cloud, some cluster, you need to set some permission policy unit for Spark and you need to create a service account. And normally, you need to get an operator like Spark Operator running in the cluster. There are people who will use cool Kubectl to submit stuff for Spark. They need to deal with spark-submit and some configuration on the Kubernetes environment your loved one sees.

Well, we could make this easier. For example, we can make all the deployments automated, and have a single click to deploy everything. So we (don’t) need to do all this manually. And you can just focus on how to run your application. We can even deploy a spark API gateway. So as a data user totally decoupled with the Kubernetes environment the user can just use the core or command line to submit the application. They don't need to worry about all the details inside the Kubernetes.

Here is the project. So we call it DataPunch. Well, I like fruit punch so, I called the project name DataPunch. Here is one example just for Spark. So with one click, you can do all the things listed here:

You can create an IAM Role for the controller player and for your node. We'll launch the EKS cluster, it will add a new group of your machines to the cluster. And you can set up NGINX Ingress Controller, so you get a load balancer to connect to the service inside the cluster. And it can install Spark Operator and Spark API Gateway.

So now you get Spark services running.

Also to make the cluster efficient, you can install the AutoSclaer to automatically add or remove nodes from the cluster. More importantly, you can do all these things very reliably and repeatably. So that design is the tool that can run. And it can stop in the middle of any place. You can resume it and everything is the ideal product. So you can just repeat around the tool and deploy the stuff.

Here is one example of the command. You can just run: *punch install SparkOnEKS*. This single command will do everything for you. It will look at your AWS configuration, and figure out which will be easy to use, as they have kinds of senses.

Sometimes, for advanced users, if you want to customize your install, for example, you use a different Security Group, the punch, you can generate a topology *YAML* file for you. And in that topology file, you can specify your customized environment, some, for example, how many nodes, and the different [EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/). You can specify all these things there.

We have a [GitHub link](https://github.com/datapunchorg/punch). Yeah, here's a list of quick benefits you can get from this: you can make the learning curve super, super low. For new people to Spark and Kubernetes, the learning time will be days, you have to dig into different pieces than a lot of things. But with DataPunch this will become minutes, just run the Punch command, and you get a Spark running environment. You just use code to run commands for Spark applications, it's very easy to start. And for deployment time, it was reduced from hours to minutes as well. So you don't need to figure out all the different environments and the setup things manually, it can be done automatically, very quickly. And the operation, of course, is automated and repeatable now instead of manually doing a lot of things.

Here's the architecture of the DataPunch tool: So, Punch is a command right now. And it can generate some topology, each topology is a deployment for different components. And inside each deployment, you have different steps. So each step can do different things. And right now it connects to AWS and the Kubernetes, like EKS to add the stuff there. For the topology, it supports EKS, and it also supports Kafka Apache Hive Server and this kind of thing.  So for each technology, in data, you can have a topology implementation in the tool. And the tool can just install that topology for you.

This is a typical usage of this third-party command, as I, just now, can deploy Spark as a service. And bring us back the API gateway and spark CLI command to you. For this Spark CLI command, it is very similar to the spark-submit command in open-source Spark. So here is an example. You can do *sparkcli-submit* to add parameters. So, it's very easy for people who are familiar with the open source Spark commit.

If you’re to use Spark-cli, you can just use code to send the application to the API gateway, it is also doable.

Another use case for Puch right now is deploy a Data Ingestion Platform. This can show how powerful the punch tool could be. So we mentioned Punch supports different topologies. So, you can chain different topologies together and automate the whole workflow. For example, all the green area here can be deployed by Punch automatically. So with a single command to chain them together, you can get a REST API to send the Kafka data and you can deploy a Kakfa volume, you can deploy a Spark streaming application to read from Kafka and write to S3. It’s a very typical data ingestion job.

Of course, it deploys Spark Operator to run your application. And is it deploy a Hive MetaStore to manage your file, your table for your ingestion. Again, so one command, can deploy everything like this for you.

We have a great roadmap ahead of us. So currently is ready for use for some basic stuff like Spark, Hive MetaStore, and Kafka. And next, we want to make things easier to troubleshoot,, something may break sometimes. So we want to have a one-click to troubleshoot. And we want to support a more ecosystem, like a Flink or other stuff. For the long term, we want to make this service so hopefully, we have something running, they can just connect and run your workload. And we want to optimize and multi-cloud these are very, very exciting future work. So we welcome everyone to contribute to us and also try the tool and let us know the feedback.

The project is at <https://github.com/datapunchorg/punch> if you want to see it.
