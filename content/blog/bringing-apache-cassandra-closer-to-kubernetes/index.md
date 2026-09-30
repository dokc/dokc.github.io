---
title: Bringing Apache Cassandra closer to Kubernetes
date: '2022-07-23T23:43:18Z'
lastmod: '2022-07-24T12:33:08Z'
slug: bringing-apache-cassandra-closer-to-kubernetes
author: Melissa Logan
image: DataStacks-Jake.png
categories:
- DoK Day at KubeCon EU 2022
tags:
- apache cassandra
- kubernetes
- metadata
- object storage
- Operator
- s3
- scale
- stream
---

Aside from geo-distributed workloads, Apache Cassandra also works great as a stand-alone service. However, since Cassandra was built before Kubernetes existed, there's a mismatch in how they do things.

In line with the series of takeaways we got from DoK Day 2022, [Jake Luciani](https://www.linkedin.com/in/tjake), Chief Architect at the [DataStax](https://www.datastax.com/), discusses how they made Apache Cassandra work more natively on Kubernetes.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/pZCQxKC0_Mo" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

**Jake Luciani** 00:00

My name is [Jake Luciani](https://www.linkedin.com/in/tjake), the Chief Architect at [DataStax](https://www.datastax.com/). I will discuss one of our projects, which has become our main cloud service. It's about how we changed [Apache Cassandra](https://cassandra.apache.org/_/index.html) to work more natively on Kubernetes. I will call Kubernetes "K8s" because it's easier for me as I stutter. Now, let's talk about Apache Cassandra. Many of you probably are aware of it, or you have peer-to-peer nodes where all the nodes do the same thing. For us, it works great as a stand-alone service. There's also K8ssandra which runs pure Apache Cassandra and Kubernetes using operators. We're running Cassandra as a service with slightly different leads. We want to provide the best service we can on K8s themselves. One of its downsides is that Cassandra assumes it's running on fixed hardware, which was released in 2008-2009. We hit the mainstream. There's a mismatch between how Cassandra wants to do things and how K8s do. As I mentioned, Cassandra has all nodes and performs the same actions. They are all compact, stream, and repair. However, the problem is that you must scale all your resources simultaneously if you want to scale. You have to scale your data, compute, and network in larger chunks, which is not ideal for a cloud service as it gets very expensive.

Another issue we ran into is that all of the nodes, as you scale, become complicated for us to track. It's not a multi-tenant system. It's also not built to autoscale because it has to stream data around, and such streaming affects the nodes. We wanted to do it as a project to focus on separating compute from storage and how we can make Cassandra more native to K8s. What we learned was to scale across different axes. We wanted to scale our data separate from our CPU and memory to make it very quick and cheap.

As I mentioned earlier, Cassandra was built before all these Kubernetes existed. We wanted to look at what we can use that's built into Kubernetes and make it the foundation of running Cassandra on it. Thus, there's more focus on the Cassandra storage engine and less on how those services connect to each other's maintained metadata. We're trying to make our jobs easier by coming down to the surface area. We are comfortable talking a lot about operators as we want to get them to train this system.

On the other hand, breaking Cassandra into pieces, the key insight was to separate compute from storage. The source of truth for our data, S3, EKS, or object storage, is a foundational piece of a core cloud. We decided to make our source of truth as it allows our data to separate from our nodes, which is called serverless. You can upgrade the whole thing or scale it up, and all the data stays intact. It also means you don’t have to stream data from node to node. Each node can grab its data out of object storage. We broke off our coordination services into separate services called Stargate, which is open-source. It allows REST, [GraphQL](https://graphql.org/), CQL, [gRPC](https://grpc.io/), and APIs. Since our data lives in S3, we’re able to build separate surfaces, specifically now that compaction is its scalable service and repair. We use XCD to enforce the metadata. The key thing here, for example, is if you take a shot of the lab data set in CD, and since all the data lives in S3, you automatically get a backup.

The user app uses CQL, and the Ingress slayer goes to Stargate, then the Stargate goes to the data nodes, which flash the data to S3. Further, it also serves the data of those nodes. Another insight here is that since the data lives in S3, we can use ephemeral storage as a high-speed cache. All of our data is running off of NVMes. Our background services like compaction also run off to the cleaners, which click and clean up data that is no longer being used. We’re also using Prometheus for monitoring. We built our operators to manage this stack; S3 is our data plane, while Etcd is our metadata storage layer.
