---
title: 1000 node Cassandra cluster on Amazon's EKS
date: '2022-07-25T23:30:08Z'
lastmod: '2022-07-21T23:42:38Z'
slug: 1000-node-cassandra-cluster-on-amazons-eks
author: Melissa Logan
image: dataStacks-Matt.png
categories:
- DoK Day at KubeCon EU 2022
tags:
- apache cassandra
- Cassandra
- cluster
- data
- kubernetes
- nodes
- scaler
- workloads
---

Apache Cassandra is a distributed database that does a great job with geo-distributed workloads. K8ssandra, on the other hand, makes it possible to run it on Kubernetes, equipped with backups and dashboarding.

In line with the series of takeaways from DoK Day 2022, [Matt Overstreet](https://www.linkedin.com/in/matthewloverstreet), Field CTO at the [DataStax](https://www.datastax.com/), shares the limits and further mechanisms of running 1000 Cassandra nodes on Kubernetes.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/P6vTnhXFaDQ" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<iframe src="https://www.slideshare.net/slideshow/embed_code/key/kpDdMmuaDrAVK7" title="Embedded content" height="485" loading="lazy"></iframe>

**Matt Overstreet** 00:00

I'm going to talk about an experiment I got to do recently — to run 1000 or more Cassandra nodes on Kubernetes. I work for [DataStax](https://www.datastax.com/). I've been working on [Apache Cassandra](https://cassandra.apache.org/_/index.html) for 6 to 8 years now. I'm knowledgeable about Cassandra. However, I am not a Kubernetes expert. We use DataStax to drive our database as a service product. I know Cassandra runs on it, and it works. I wanted to know how these classic old-school gigantic Cassandra clusters would run on Kubernetes? What would be our limits? How far could we go? What would break if we tried to scale to the moon?

As a side note, I enjoyed using Kubernetes jobs combined with our test tool, [NoSQLBench](https://docs.nosqlbench.io/), to run tests on this cluster. It was surprisingly easy. I don't think I have to describe Kubernetes since probably everybody here knows it better than I do. Moving forward, Apache Cassandra is a database. It's distributed and does a great job with geo-distributed workloads. [K8ssandra,](https://k8ssandra.io/) on the other hand, is a way of running Cassandra on Kubernetes using the operator that we've released into open source. It also has backups, dashboarding, and the like. As I mentioned, NoSQLBench is a tool we use to benchmark Cassandra, although it has connectors for other back ends. Now, you may ask, why do we care? Why do I care about Kubernetes here? I spent a lot of time in the field working with people on Cassandra clusters they deployed, which they had a problem with. I've seen this as a theme in other talks, but it's a big deal. The first thing I would always do on-site when you had 10 to 100 Cassandra nodes is to go out and compare the configs because no matter if they were using Ansible, Puppet, or hand-producing, there had been multiple generations of nodes released or someone had gone in and made a manual change. That config drift caused many weird software issues. It was the first thing that you looked at. A lot of the ghost bugs would come from config drift.

With K8ssandra and Kubernetes, there is that idea of "do we want to add this abstraction layer on top of something that's already hard to run (i.e., K8ssandra)?" I would say yes. If we can destroy this category of consistency configuration problems, which Kubernetes did for us, it was so easy, and K8ssandra deployed this knowing it was uniform. This idea of 1000 nodes two would have taken weeks if it were hand configured. Further, there's some advantage to working with a hyperscaler, but Kubernetes provided a lot of it as well. There are other things that surprise me that I haven't gotten into deeply with Kubernetes, such as the visibility I got by installing a service mesh or the idea of how easy it was to roll up things like logging and see the entirety of the cluster.

Let me talk about what worked, and then I'll talk a little bit about what issues I ran into doing this. What worked is that one person, say, for example, as one engineer in one week, stood up a 1,200 node cluster; we had more than a petabyte of data in that cluster. We saw tens of millions of reads and writes per second on that cluster with P75 latencies under ten milliseconds. What worked well that may horrify people is I messed up the IP address space on the cluster, and I had to destroy the cluster at 800 nodes. I did it in five minutes. It's a superpower you want to be careful with. But one little Helm update, and I had to clean the slate to start again. As I mentioned, scaling up the load test using Kubernetes was also super easy.

Now, what didn't work? A couple of gotchas with K8ssandra that we've talked with the team about is you're not going to run into them unless you go big on a cluster. K8ssandra uses [Prometheus](https://prometheus.io/) for monitoring at about 60 nodes. We had gone past the default setup for K8ssandra. Remember, I came into this with the intention of being very naive about the setup. I didn't want to optimize and didn't want to do many configurations because I wanted to get an idea of what it would be like to start from scratch and try to scale one of these up.

The other thing with very big clusters is that K8ssandra needs a little love when deciding how to coordinate new K8ssandra nodes coming onto racks. I think that's being worked on. Further, you're only going to run into that if you're going very big. On the other hand, working with hyperscalers, particularly EKS, saved me a ton of work and resource limits. However, there were a lot of stop and request moments as we tried to grow the cluster. Adobe mentioned this as well. I thought an autoscaler seemed like a good idea. With some of these stateful workloads, the autoscaler may be more trouble than it's worth.

Lastly, much of the documentation I read was geared toward running multiple pods in a Kubernetes node.  We are running a pod or two per node with these database deployments.  One of the consequences of this is that I did not do the math very well.  I ran out of IP addresses at about 800 nodes.  I had to go back and reinspect the whole thing.  Hence, being aware if you’re going to go big with a single or limited number of pods per node is a great idea.
