---
title: Operating FoundationDB on Kubernetes
date: '2022-08-16T21:50:54Z'
lastmod: '2022-09-29T23:06:57Z'
slug: operating-foundationdb-on-kubernetes
author: Melissa Logan
image: IMG_0913.png
categories:
- DoK Day at KubeCon EU 2022
tags:
- Database
- FoundationDB
- multi-cluster
- Operator
---

FoundationDB is a free and open-source multi-model distributed NoSQL database developed by Apple, with a shared-nothing architecture. In this talk, Apple Site Reliability Engineer [Johannes M. Scheuermann](https://www.linkedin.com/in/johannes-maximilian-scheuermann-513289110/) shares how to run the FoundationDB on Kubernetes. Which is something the company does on a large scale. Johannes talks about what the [FoundationDB operator](https://github.com/FoundationDB/fdb-kubernetes-operator) can do and how it does it up to the upcoming features on the roadmap.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/Kf3kquvuing" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<iframe src="https://www.slideshare.net/slideshow/embed_code/key/1TUHlfTHtrp8wl" title="Embedded content" height="485" loading="lazy"></iframe>

**Johannes M. Scheuermann** 00:00

Welcome to operating [FoundationDB](https://www.foundationdb.org/) on Kubernetes. I'm a FoundationDB Site Reliability Engineer here at Apple, where we run FoundationDB at a massive scale. And I have worked in the Kubernetes ecosystem since the end of 2014. And just a few words about FoundationDB itself. So FoundationDB is a distributed transactional key-value store, which is great for read-only or read-heavy workloads. And on the right side, you can see an architectural diagram of FoundationDB. And you can also read more about it in the [FoundationDB paper](https://www.foundationdb.org/files/fdb-paper.pdf) that I can share later on in the Slack channel. And the important thing here is that if a separated transaction and storage system, and when I refer to the transaction system in this talk, I actually mean the transaction system and the log system together.

So after the 7.1 release, there is only limited DNS support. And the idea is to have DNS support for the connection string. And that's just a little bit more tricky in a Kubernetes environment where your pods can get rescheduled recreated and get new product keys, for example.

Another interesting fact is that most major and minor versions are not compatible, which means you have to upgrade all versions or all processes at the same time. Otherwise, there might not able to communicate together.

Otherwise, FoundationDB offers automatic recovery and data this redistribution, which means if any process or node or fault, domain, for example, receives a failure, the system is able to recover itself. And everything is open source in FoundationDB under the Apache 2 license.

The Kubernetes operator that we [built at Apple](https://github.com/FoundationDB/fdb-kubernetes-operator) is also open source. So you're welcome to take a look at that and try it out. And ideas to run FoundationDB clusters on top of Kubernetes. And currently, it's managing bare Kubernetes pods, PVCs, and services. But there's something we may want to rearchitect the future. All required tooling for the operator is currently injected at runtime by init containers. So all FoundationDB libraries that are required, or Command Line tooling will be actually copied by the init container inside of the Kubernetes operator, which makes it a little bit easier to roll out the operator and have a lean or small image.

And one interesting thing is how we actually do upgrades with the Kubernetes operator because I guess that's something that's a little bit special compared to most other operators in the stateful world. And the first step that we actually do is update the sidecar containers. We have a sidecar in the main container, and the main container actually runs the FoundatioDB process and the sidecar container that is updated, then copies the new version in the main container, and then the FoundationDB monitor configuration file will be adjusted to point to the new binary, this has the benefit that we can now restart all processes in the cluster at the same time. And then they just pick up the new configuration, and they just take the dynamically copied version of FoundationDB.

And we actually take benefit here of the fact that you can update images in a running pod, for example, without requiring the patch to restart fully. And this is the benefit that we can orchestrate the way how we update our clusters to ensure that all or at least the majority of processes are updated and have the new binary available. After that we replaced the whole transaction system in a single step. And that's normally pretty fast because you log system shouldn't have a multiple of terabytes for example, otherwise your database is probably lagging behind. And that has the benefit of actually like recover or reduce the number of so called recoveries in FoundationDB, and the experience from the user perspective is much better than when we were if for example, a rolling upgrade in a transaction system. In parallel, we recreate all storage pods with the new image and that is per default done by full domain – zone by zone – in a rolling upgrade fashion.

And there is a lot more, the operator itself supports multiple different ways how you can run FoundationDB on Kubernetes. So, for example, you can run FoundationDB across multiple Kubernetes clusters, or you can run it across multiple namespaces or multiple different Kubernetes clusters in a HA configuration. And each configuration requires actually that all processes can communicate together so you have a mesh communication. And each Kubernetes cluster has a dedicated operator. And those operators are synchronizing over FoundationDB itself. And they're writing to a specific key value space.

And one thing that we discovered is that we have to provide a way how to make debugging easier. And that was the reason why we built that pretty early on the kubectl plugin. And one of the most important features here is kubectl FDB analyze, which will print out all potential issues with the clusters. And that was, in practice a super useful feature, or pattern to help human operators to figure out why the cluster is in a non-desired state, for example.

And how do we gain confidence? The first thing is pretty obvious, write unit tests and integration tests. And, and the next step is then to write end-to-end tests, and actually run multiple chaos experiments to gain more confidence and understand how your operator will behave under different failure domains.

And besides of that, we have multiple safety checks in our operator just to be sure that we not get in a state where we possibly lose data or availability, because that is something that you don't want to lose as a data service, obviously.

And some of the future works are already in progress. Like, for example, a pod topology spread actually supports, I think, in the news Kubernetes release, the minimum fault domains. We also try to implement a coloring approach that will reduce the number of logical fault domains and allows us to map logical fault domains or an actual physical fault domain to give us a little bit more flexibility on how we can run FoundationDB on top of Kubernetes.

We also want to prevent the accidental deletion of clusters and pods. I think we heard that in a previous talk. And we just don't want that someone writes “kubectl delete FTB –all”  for example, and then all your FoundationDB clusters are gone. But it's also a little bit more to think about how we actually implement that because webhooks can lead Kubernetes clusters to instability if you are not programming it correctly.

And we are always looking for better support for multi-cluster workloads. Other than that, we try to implement the FoundationDBProcessGroup CRD. And that sounds a little bit weird. But the idea is to have something as a wrapper around all the resources that are required for running FoundationDB or FoundationDB process. And that allows us to handle better deletion or exclusion logic. And that is something that we want to tackle probably this year. And also, we have to implement better HA support for the kubectl plugin to allow operators to look into HA clusters in a better way.

In addition to that, we want to implement more features for backup and restore. So currently, we have basic support for backup and restore. But we want to have more features for that. And you can probably find more of all of that in the GitHub issues of the FoundationDB operator. And we also want to make use of the Management API. That is something FoundationDB-specific that was added in 7.0, and the idea is that we don't have to call any external binaries because that gets pretty tricky in memory handling if you call another process from your operator. And it's much easier to just have a library that can directly be called.

That's it. If you have any questions, feel free to ping me in the [DoK slack](@slack). And yeah, thanks for listening
