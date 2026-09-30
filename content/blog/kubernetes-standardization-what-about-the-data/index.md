---
title: Kubernetes Standardization - What About the Data?
date: '2022-03-15T13:24:30Z'
lastmod: '2022-03-15T13:24:30Z'
slug: kubernetes-standardization-what-about-the-data
author: Melissa Logan
image: Image-from-iOS-1.png
categories:
- Opinion
tags:
- declarative
- kubernetes
- standardization
---

The DoK recent [survey of 500 IT professionals](/dokc-2021-report/) found that most organizations are now running stateful workloads on Kubernetes. The benefits are clear: increased agility, scalability, and resilience. But to reap those benefits, organizations need to get a handle on managing all the resources first. And that includes data.

A possible solution for that lies in adopting one of Kubernetes key elements: its declarative nature applied to the data layer. In other words, to increase the adoption of Kubernetes for stateful workloads, data has to become declarative, just like the application layer.

However, it's easier said than done.

## The Problem with Data

When it was first released, Kubernetes quickly gained popularity thanks to its ability to effortlessly handle stateless workloads. On the other hand, stateful applications — those that require access to persistently stored data — had been left out.

The Kubernetes engine tried to remediate this issue by providing APIs for interacting with databases and other persistent data sources. The problem with that approach is that stateful applications usually require considerably more coordination and management than stateless ones. And with Kubernetes, that responsibility usually falls on the shoulders of the application developer.

Data infrastructure lacks the mobility to respond quickly to market shifts. According to the DoK survey,

a 2:1 majority believe that leveraging their real-time data is key to competitive advantage. The rise of real-time data is fueled by organizations’ desire to quickly react to actionable insights that drive customer satisfaction and boost revenue.

Of course, you can set up a Kubernetes cluster and fire up all of your containers quickly, anywhere. But this new cluster is a clean slate and won’t have the application state your business applications need to function. In a way, stateful applications have data that acts as an anchor and creates a gravitational pull that renders your “theoretically mobile” Kubernetes applications linked forever with a certain location. This brings us to the problem of inconsistent configurations between different locations.

Part of the solution to that issue is to make data resources declarative, the same way Kubernetes clusters configurations are.

This can be a difficult task, as evident by the number of open-source projects aimed at helping developers manage stateful applications on Kubernetes. The Kubernetes community is still trying to develop a simpler approach.

## What are the Benefits of Standardization in Kubernetes?

The big advantage of Kubernetes' declarative configuration is that users do not have to define (or even know) how Kubernetes runs and manages their applications. Kubernetes does not need to let the user know how the desired state was achieved; Kubernetes only needs to ensure that the system is in the desired end-state. This approach creates standardization for K8s users.

There are many benefits to this standardization, such as shorter release cycles and incremental changes to the application.

Because Kubernetes takes away a lot of operational activities, it allows developers to focus on business-critical features. Developers now may spend less time setting up and maintaining the infrastructure that has no direct impact on the company's bottom line.

This means that businesses can shift their technical resources from operational maintenance to quickly responding to evolving customer behavior and market shifts to adapt their technology offering.

For dev teams, it means eliminating unnecessary tasks – such as infrastructure hassles – to focus on the software they’re developing.

Another essential idea is "skills portability" arising from using standardized operating models and toolchains. Many organizations demand that developers use industry standards to limit training expenses and remove roadblocks for employees switching from project to project. When software is deployed using the same core set of cloud-native tools, it also makes finding and training talent easier and quicker.

Perhaps the most significant advantage of Kubernetes and cloud-native technologies is their ability to make skills easily transferable across organizations, which results in a substantial performance boost for both employers and employees. It's one more incentive for businesses to continue investing in Kubernetes.

In other words, what people want from Kubernetes is a standardized approach to infrastructure.

The standardization efforts so far, however, have left the data, or applications’ state out of the picture.

Today, standardization applies only to stateless Kubernetes resources but not to data, and its replication across regions and clouds. Once stateful applications are involved, the benefits of Kubernetes standardization quickly fade away, as there is no standard approach to stateful coordination and management. Every organization must cobble together bespoke solutions, requiring specialized skills and taking up resources.

## The Challenge: Standardization is Required for Data As Well

While organizations have been running stateful workloads on Kubernetes for years, it is still a challenge to do it well.

In an interview with The New Stack, [DoKC director](https://www.linkedin.com/in/mklogan/) [Melissa Logan](https://www.linkedin.com/in/mklogan/) explained that today's most advanced Kubernetes users "see these really massive productivity gains, so they want to standardize," At the same time, "they're trying to kind of figure out how to make all these things work together."

According to that same [Data on Kubernetes (DoKC) report](DoK_Report_2021.pdf), most organizations (70%) are running stateful workloads on Kubernetes, and plan to run even more. But to do that without tying up all their resources in this task, they need to get a handle on managing all the resources (including the state) first.

To do so, we will need greater integration and interoperability with the existing range of technologies, skilled staff, better Kubernetes operators, and more trusted vendors. In other words, we need a standardized approach to managing stateful apps on Kubernetes.

## The Solution: A Declarative Approach to Data

The stateful workload story on Kubernetes is 'unsettled' as the community is still trying to find an approach that could be standardized and accepted across the industry.

As previously mentioned, adopting a declarative approach could be one of the keys. Just as the application layer already is.

In the declarative approach, you declare resources you want and how you want to use them. Kubernetes takes care of the rest by bringing the system to the desired state, such as the desired number of nodes in a cluster, pods of a certain application, or a network configuration.

The next generation of Kubernetes operators should enable users to declare what is the data of their application just as simply as they declare what the container image is: to specify which data, not volume, should be used with each application, without going deep into configuring the storage itself.

*This guest post was originally published on* [*Statehub's blog*](https://statehub.io/resources/articles/standardization-in-kubernetes-what-about-the-data/) *by Michael Greenberg**.*
