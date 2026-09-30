---
title: Designing Stateful Apps for the Cloud and Kubernetes
date: '2022-04-11T13:59:59Z'
lastmod: '2022-04-11T13:59:39Z'
slug: designing-stateful-apps-for-the-cloud-and-kubernetes
author: Melissa Logan
image: Kubernetes-Evan.png
categories:
- How To
tags:
- Cassandra
- Database
- FiloDB
- kubernetes
---

Almost all applications have some kind of stateful part. How do we navigate a cloud-based world of containers where stateless and functions-as-a-service are all the rage? As a long-time architect, designer, and developer of very stateful apps, Evan takes us on a journey through the modern cloud world and Kubernetes, offering helpful design patterns, considerations, tips, and where things are going.

[Evan](https://www.linkedin.com/in/evanfchan/?originalSubdomain=ca) has been a distributed systems, data, and software engineer for twenty years. He led a team developing the open-source distributed time-series database FiloDB. He has architected, developed, and ran large-scale data and telemetry systems at companies including Apple.

In this talk, Evan shares how Kubernetes is shaking up stateful app design. What kind of state is there, and what are some important characteristics.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/MJc3eFnsSBU" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

**Bart Farrell** 00:13

Welcome, everyone to another meetup of the Data on Kubernetes community. My name is [Bart Farrell](https://www.linkedin.com/in/bart-farrell/). If you are new to the community, you can always check us out on [Slack](https://go.dok.community/slack). You can check us out on [Twitter](https://twitter.com/DoKcommunity/) and [LinkedIn](https://www.linkedin.com/company/data-on-kubernetes-community/). We are going to be talking about working with stateful workloads and stateful applications in a [Cloud Native](https://www.cncf.io/) environment with Evan today. That being said, Evan Chan, who are you?

**Evan Chan** 02:19

Hey, everyone. Thank you, Bart, it's great to be here in the Data on Kubernetes community. My name is Evan. I'm a senior data engineer at [UrbanLogiq](https://urbanlogiq.com/) in Vancouver, BC, Canada. I've been doing data work, data architecture, data pipelines, and data engineering for a long time. I was an early member of the [Spark](https://spark.apache.org/) and [Cassandra](https://k8ssandra.io/) communities when Spark was not 1.0 and I loved working with data and working with other people that work with data.

**Bart Farrell** 02:58

When was the first time you considered data on Kubernetes?

**Evan Chan** 03:17

It did feel like for a long time that when you heard about [Kubernetes](https://kubernetes.io/), it was about stateless. People thought databases and data are kind of separate. I feel this is more recent. But that's when you started hearing about people running data workloads on Kubernetes. They started adding features, persistent volumes, StatefulSets, and that's when things started to gel. Now you have whole companies and an ecosystem that's coming alive around that. And I'm getting into that, I'll be talking about state, what is a state? Where does it live and what does that mean in the context of Kubernetes?

**Bart Farrell** 04:36

If you want to jump right into your presentation, we can take it from there.

**Evan Chan** 05:06

I'm a senior data engineer at UrbanLogiq. We make online data solutions for the government that helps them plan and do transit better. I'm the creator of a distributed time-series database called [FiloDB](https://github.com/filodb/FiloDB), which is distributed [Prometheus](https://prometheus.io/) that is in use at Apple. I've been doing big data for a long time, especially with the Spark and Cassandra communities.

**Bart Farrell** 06:57

If somebody out there wants to create their database, what are some things they should keep in mind?

**Evan Chan** 07:19

There are so many databases out there. Not just the type of database, but in general, what do you want to invent and what abstractions do you want to build on top? Kubernetes is becoming a good platform for doing serious data work because it is starting to provide some really interesting abstractions. Not everyone always needs to invent or reinvent or redo every hard problem in databases through the systems, and a lot of people rebuild on top of existing platforms.

**Bart Farrell** 08:36

There are so many databases out there. What's the unique selling point? What's the added value that you're going to be providing?

**Evan Chan** 08:49

When we started the FiloDB project four years ago, Prometheus had just come out. We love the query language. Prometheus is designed to be a single node and we wanted something scalable or distributed. So we started working on that. At that time, there wasn't anything, now there's more stuff out there. That's an example. The state is maybe the hardest problem in distributed systems. What kind of state do we have? There are so many different types. There are the traditionally structured tables, which fit into your SQL database. We have a ton of semi-structured data with logs, with JSON. We have graphs and networks, which are becoming increasingly important in machine learning. We have a lot of unstructured data. We have configurations and passwords. We have a lot of domain-specific data, such as machine learning models, parameters, and features. What are the characteristics of the state that you have? Is it mutable or is it immutable? How does it change? How temporary, permanent, or ephemeral is it? What are the persistent characteristics you want? What about availability and latency? How fast do you need it? Do you need it all the time? Is it okay if it’s not available some of the time? And there's the notion of consistency, which I won't go into. A couple of years ago, we all thought of Kubernetes as this, “stateless thing”, and the idea is you put up your applications to Kubernetes, and then, the state gets punted. This is what I call a Kubernetes stateless. This is like the traditional app; it shows up, but it doesn't keep any of its data. It will interact with a lot of outside entities. It might be talking to some [Postgres database](https://www.postgresql.org/) and RDS or it's talking to [Mongo](https://www.mongodb.com/), and cloud storage, like [S3](https://aws.amazon.com/s3/). The app is doing a lot of recent writes to these different entities and all the state is kept in those entities. This is the classic stateless pattern. Where's my state? Kubernetes has containers, and a container has read-only disk images, which are the files you have and it builds up. You have a temporary local disk and memory. You are reading and writing to and from cloud storage, and you have something else that is sending requests or events or so forth. We find that the memory and local disk are not persistent. They're kind of ephemeral. If the container fails or gets restarted, or something happens, then that memory and the temporary local disk are gone. This is why we keep all of our data in some external, like cloud storage, which is external to the container. But wait, I thought stateless will solve all my problems? This pattern can work for a lot of scenarios. Here's the thing, all your state is pushing other services, you find that you have to work with a lot of these services and the costs start adding up. If every state change involves the network, you start to add log latency. You have to deal with recovering the local state. There are many ways around this. Most of the cloud providers try to sell you their services, like [Dynamo](https://aws.amazon.com/dynamodb/), and [Kinesis](https://aws.amazon.com/kinesis/). You start being tied to certain clouds and keeping the state consistent across the cluster can be tricky. There are a lot of issues that have to deal with by the state. This whole talk is about what are some other patterns that we can use to deal with the state. I want to compare a little bit between stateless and serverless. In a container-based environment like Kubernetes, you have the memory and local disk, where you can cache and keep track of some state that is not persistent and disappears, but you can use it. The difference is serverless, compared to what are called stateless Kubernetes, there is still a state but it's not permanent. The memory and local disk can be used. But when you have a serverless environment, you're serving a function where the life cycle is a lot shorter, it is like one invocation. Even the spaces that are temporary in a Kubernetes container are not available to you. In a serverless environment, you have to be truly stateless, where everything has to go in and out through another cloud service.

How can we take advantage of this local ephemeral state within your container? You have memory and a local disk. This is what we call a local state; it is local and we can use it to our advantage, even though it's not persistent. We consider a two-tiered approach where we can keep track, we can build up some state that is local and then we can reduce the I/O, we can do things that can improve the performance, and the latency of our applications. But the problem is that this goes away. If we take advantage of this local state, how do we deal with it going away? That's one of the big challenges with working with the state and the classic pattern that we want to bring up is using what is called a log pattern. This is writing a series of events and we can compose our state using events. You can say that my events from 0 to n build up the state in my application. And this is powerful because then with a log pattern, we can have checkpoints; and the checkpoints correspond to the state at a certain time in cloud storage. Using this pattern, we can recover data if we lose some temporary local data, as long as we have this log that is persisted somewhere. It's the foundation of all modern databases and data systems. Let me go into an example. In FiloDB for example, we built the architecture on top of Cassandra and [Kafka](https://kafka.apache.org/) and what happens is that millions of time series events that are small, like your metrics, come in through Kafka and they go into each node. We use a large amount of memory and a local disk to cache things and to build up a representation that is a lot more compact. We take the metrics that contain tags and a timestamp value, and we build up compressed columnar chunks. We turn millions of samples that come in per second and we turn them into thousands of writes. We decrease the right amplification by several orders of magnitude before writing to Cassandra. It takes some time to build up for which we have a significant amount of local state. What happens when we might lose this data, is we use a Lucene Index which is on disk. We persist in this and we're writing it, but at the same time, if we lose this node, we would use Kafka as a write-a-log. We would have a checkpoint that says, okay, this is the last time we wrote this big batch of stuff to Cassandra and from that time onward, if we lose any data that is local and temporary, we can read the data back from Kafka and recover that. That's a use of a log pattern to recover your temporary local data. You can think of this log pattern as a kind of stream processing pattern, where you are taking logs, building up some state, and outputting data, and this is also called an event processing pattern.

**Bart Farrell** 20:11

What do you think is the trickiest concept for folks to grasp? What are the questions you find that are frequently coming up when talking about these things?

**Evan Chan** 20:56

A lot of it is in the details. When I talk about logs at a very high level, it makes sense to people. But when you start getting to details, like how recovering data works or how checkpoints work, a lot of those things start to become complicated. A part of it is getting experienced, like dealing with data, databases, and checkpoints.

**Bart Farrell** 21:50

How do we map a generic database on bare metal versus a containerized StatefulSet based database? Does this mean one pod is one node?

**Evan Chan** 22:14

We'll talk about this(in the upcoming slides). I'm about to launch into the StatefulSets. Persistent Volumes are a storage attraction that is persistent and survives pod restarts. The local disk temporary storage is not, and that means the memory is not persistent, but now we have something local that survives restarts. Persistent volume seems like a local volume, you can use Standard POSIX File IO. It is mounted and you configure it with YAML. You can configure what kind you want. There are tons of different options out there. There are local persistent volumes that are a hard drive, attached to the node that the container is on, and with StatefulSets, you get that back. There are ones that are networked and attached to one part at a time. These are things like [EBS](https://aws.amazon.com/ebs/) and [Azure Disk](https://azure.microsoft.com/en-us/services/storage/disks/). Each cloud provider has its own but other solutions are out there like [Ceph](https://docs.ceph.com), [ScaleIO](https://www.dell.com/en-us/dt/storage/powerflex.htm#tab0=0), and [OpenEBS](https://openebs.io/) which are great solutions. You can tune them but you can often get performance that is close to the local disk. You have replicated shared network storage where multiple pods can attach and share data. There are a lot fewer of these. The classic one is [NFS](https://www.ibm.com/docs/en/aix/7.1?topic=management-network-file-system), but there are other ones like [GlusterFS](https://docs.gluster.org/en/main/). I think everyone's familiar with this. But you can configure your parameters, the type of volume that you want, and what kind of storage you have. And the provisioner is what type of thing it is. In this case, it is [EBS](https://aws.amazon.com/ebs/). You can configure your storage characteristics at deploy time. Your application just has to worry about it being a local disk. StatefulSets are an abstraction in Kubernetes that remembers the persistent volume that is attached to your pods. Let's say, a pod fails or you're upgrading, it will detach the persistent volume, then it will allocate a new pod, and it will make sure to attach that previous storage again so that you get back your state. The usual pattern of upgrades changes. The upgrade cycle changes, it goes through the pods and makes sure that the PV is detached and then attached again. Sometimes it can take a while to detach your persistent volumes.

**Bart Farrell** 26:26

How long is a while as time is a very relative concept?

**Evan Chan** 26:35

It depends heavily on what type of attached volume you have. I'm talking about network ones. The local ones are a lot faster. For example, if you use EBS, it can depend on how much you provision. If you provision less bandwidth or storage, it might take longer to detach. People will over-provision to guarantee a better detachment time.

**Evan Chan** 28:10

You might want to run stateful services and database yourself to save money. They want to run your straight SQL database on persistent volume and handle that yourself to save some money because it's cheaper than using RDS. If you're doing data engineering, you'll be working with machine learning models. Data engineering involves a lot of files, it could be models, local files, CSV files. Throwing away that state could be expensive, so using persistent volume is a great way of keeping your data transformations alive for a lot longer and lowering your recovery time. You might want to use local state to cache things, maybe you're pulling files from S3, and having that local cache saves you from a whole bunch of networks out to S3. If you design for persistent volumes, the cool thing is that it is one abstraction, you can take this design that works with local files, and you can use it on any cloud. Going into different clouds is re-configuring your YAML. Let's go into this common cause of replicated databases. For a standard database, you have a leader pod and a couple of follower pods. The whole idea here is that with traditional database replication, you get better availability and you have this backup. The thing that you need to think about and take care of is what happens when one thing fails and you would want to be notified. Let's say the leader fails, the follower has to bring it back up. Depending on the exact database, you might need to issue some commands to reconfigure things for a while. There were times when depending on the database and changing network settings was very manual. Now, there's a lot of automation built around it; there are Kubernetes operators that can help people do this kind of thing. There's one for PG and it will automate a lot of this by having multiple replicas, leaders, followers, and replication. If you're running [Apache](https://www.apache.org/), Cassandra, Cassandra has multiple replicas for each shard, and it needs to be set up in a certain way. That didn't map well to the way that the Kubernetes StatefulSets work. Things need to be laid out a certain way. You want the replicas to be in different racks to minimise transfer failures. People have started coming up with operators for things like Cassandra because some of the operations, like setting it up, would be pretty painful otherwise. Here is a brief history of databases. In the beginning, people had one server and one disk. After a while, this was not adequate. People built bigger servers with a lot more memory and the disks got bigger. People would spend tons of money on these. It's the same model, single server, and all the database scale with this memory and storage. People sunk tons of money into these storage solutions that would distribute over a network, but the model was still the same, you have a single server. This became very limiting after a while and people found out this was not enough. To scale, we started turning to distributed systems. Now every database has figured out a way to replicate and share its data. Now things get a lot more complicated.

You have the other model where you have replicas. The idea is, let's use commodity hardware, let's scale out to a lot more nodes. Things get a lot more complicated because now every data application or database has to figure out how to coordinate, replicate and distribute. This is the hardest problem to solve. The big point here that I wanted to make was, around 20 years ago Google came up with their distributed storage, and then Yahoo followed with Hadoop. This was a really big breakthrough. It's not just about big data processing. The really big breakthrough is the power of replicated file storage. It was [HDFS](https://hadoop.apache.org/), and what HDFS did, is it said, here's this storage abstraction where I have a giant network disk, I don't need fancy hardware for it. I don't need to buy a RAID array, I don't need to buy a fibre channel, and tons of nodes can share this. It is storage that is replicated and I know that it has a very good guarantee of safety. I put stuff on there and I don't have to worry about it. This common layer that had this powerful storage abstraction, tons of applications started building on top of it, MapReduce first. You started to have [xBase](https://www.xbase.com/) and other things came along, like [Storm](https://storm.apache.org/releases/2.1.0/Setting-up-a-Storm-cluster.html), Spark, [Pig](https://pig.apache.org/), and [Mahout](https://mahout.apache.org/) for machine learning. This abstraction where you have these files turned out to be so powerful because it allowed all the updated applications on top to not worry about that layer. They just used the storage and they were just worried about how to build this for their stuff. This turned into a huge basis of the modern, big data ecosystem. It's all built on top of this file storage abstraction. The key takeaway here is we don't need to reinvent distributed coordination and replication in every data system. We can use this abstraction, and that brings us to stateful Kubernetes. We have this powerful abstraction, we have a Cloud-Native storage abstraction that you can configure at deployment time. It means that applications don't have to worry so much about the replication part and things like that. It has a disk that is out there and it is done for you. Kubernetes is also extensible which can make this work as it has operators, it has [CRDs](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/). This needs to be done at upgrade time and you can automate that. At the time when we started, the persistent volumes and StatefulSet weren't there. If I was to design it now, I would design the solution around persistent volumes. We did a lot of stuff so that our Lucene local disk files would be persisted somewhere and I don't have to do that anymore. We would put the files on the local disk and forget about it. I would put the log on the local. When I say local, what I mean is the PV. For persistent reasons, it would not be local, or it could be local. A lot of the things where we would punt off to cloud services like Kafka, we could have a lot of that local. That changes the cost equation, it means that we have a lot of our state on how we persist and recover it. The model becomes simplified, and you can use this as a building block. For example, in your app, you can use your local disk and things like local key-value stores like [RocksDB](http://rocksdb.org/). There are a lot of embedded databases that can be built to their apps and things like Lucene and machine learning models files. You can build that into your PV and you can use one of the replicated ones like OpenEBS and this takes care of your replication and your failover. It uses different shards. You can think about having this local thing and using the storage as an abstraction. You can use different kinds of clustering layers to help you coordinate in your different apps.

**Bart Farrell** 40:27

In one of our meetings when we were talking about, Is Kubernetes ready for data? Patrick McFadden from [DataStax](https://www.datastax.com/) was saying as a quote “Friends don't let friends shard” why do you think he would say that?

**Evan Chan** 41:09

The way people had solved a lot of scaling stuff, they sharded their databases. There are trade-offs but of course, you could have the pie and eat it too. A lot of people want, for example, a distributed SQL solution. What you have to realise is that a lot of the distributed databases that were built out to be distributed, use a different data model. A lot of them are not databases where you store your data, and you can run all kinds of queries on it. Cassandra is like that. It's good at certain things, but it has to fit your data model. I used to think, “why do people shard?” But for a lot of applications sharding works well. And if it works for you, go for it.

**Evan Chan** 43:19

I think there are many ways to do it. You have a lot more pain when you're trying to merge stuff from different things. So it works for certain use cases, and it's not going to work for other use cases. And for those other use cases, maybe you need to just pay money and have to dispute it.

**Bart Farrell** 44:00

It was the same thing about the timing question earlier: what's your budget? It's not the only factor. But it's one to keep in mind.

**Evan Chan** 44:09

I think some layers will help you route your data like I pointed out [Akka](https://akka.io/) because it helps you route your data and get things from different places. And so there are also ways you can build your application that way. To help bridge these different things.

**Bart Farrell** 44:33

We got another question. What options do you suggest for meetings? Zero RPO requirements around stateful apps?

**Evan Chan** 45:23

So, do they want zero recovery time? Well, I would say that there's never such a thing, as absolute zero recovery time. But you can get close to it.

**Bart Farrell** 45:40

They clarify here by saying, no data loss.

**Evan Chan** 45:43

There are general patterns out there. The log pattern that I mentioned is a good one. To make sure you don't lose data, you have to use an abstraction, like logs to protect the transient state that you have. You rarely have zero transient states. So it's more about how do you minimise the gap in your transient state. And what I would say is, the further away things are, the more transient state you're going to have. Because it takes longer to reach that persistence. You can try to minimise the gap by moving to something that uses a local disk, or persistent volume, that can help minimise the gap. If those things minimise the latency, like how fast you can write, and the smaller your transient status, the more you can minimise the gap. You can try to make it as close to zero as possible. It just depends on how much internal resource you're willing to throw at the problem. So, I want to talk about this machine learning case. I can have a pipeline that writes some data, say models, or training jobs, you can write it to a shared persistent volume. On Amazon, they call it [FSx](https://aws.amazon.com/fsx/). And then I can serve this using Kubernetes pods that mount this volume. People would use HDFS for a lot of use cases like this. But this is a way that you can do this on Kubernetes. Having a shared volume makes it a lot easier to map distributed jobs to serving trading models. And when asked about data on Kubernetes, a really exciting area opening up is going to be machine learning on Kubernetes. This is not an either-or, but this is a trade-off for cloud data services versus persistent volumes. So we have cloud data services in which replication and distribution are handled by a service or database. With persistent volumes, you can configure how things are replicated, you can decide on a new application, or you can configure several replicas for network PVs. But they are usually local to a pod.You are comparing a standard POSIX API whereas this is different from a database service API. And you have closer to local disk latency. But you have different considerations for handling your data. So that's about it. And in conclusion, think about your state, what kind of state you have and the characteristics you need. Know that there's a wide spectrum of design. You can stick to the serverless or the stateless model by using cloud services. Be adventurous, and don't be afraid to venture into using more local states. And take advantage of everything that Kubernetes offers you with persistent volumes. That's about it.

**Bart Farrell** 54:01

What is the most complex thing, in your opinion, about working with data?

**Evan Chan** 54:16

Specific to Kubernetes or in general?

**Bart Farrell** 54:18

Let's think about it in general first, and turn it over to Kubernetes.

**Evan Chan** 54:23

It's definitely like a recovering state and not losing data, as someone had asked about how do you minimise that? This is the challenging thing. It is easy to work with data if you don't care about throwing it away. But not losing data is a big deal. And I think this is why I like working with it. It is hard in that way. Especially moving data, streaming data is even harder. It's recovery and checkpointing. And then the other part is for distributed data. How do you keep it consistent? How do you balance consistency and availability and other things?

**Bart Farrell** 55:23

Would you say the same thing would apply in the Kubernetes Space?

**Evan Chan** 55:28

I think it does. But I think this is one of the stories that have abstractions. We have folks like OpenEBS and other people who are trying to take on the hard problems of how do we keep from losing data. Once, you have to get it to their platform or persistent volume first. But I think that helps solve part of the problem and makes things easier because that's one less thing that you have to think about If you have to get something there. Once it's there, the data gets replicated and preserved.

**Bart Farrell** 56:17

We got another question. How to proceed with moving existing databases, such as [MySQL](https://www.mysql.com/), etc, into Kubernetes?

**Evan Chan** 56:38

Well, I don't think there's anything magic about running them on Kubernetes unnecessarily. You would think about the storage aspect and what are the characteristics that you want to get. It depends on where you are migrating from. Is it already in some cloud or are you migrating from RDS? Or are you migrating from some bare metal? When you think about the characteristics, like for bare metal, you're used to certain reliability, and when you move to the cloud, you could use the most reliable, pristine volume implementation and pay more for that. But you have to realise the trade-offs. You move into something that might be a little less stable. So, is your backup and replication game up to speed? You have to triple-check those operational aspects and think about the storage characteristics.

**Bart Farrell** 57:59

Apart from machine learning, do you expect in the upcoming six months in the rest of 2021, any new things on the horizon for the data and Kubernetes space?

**Evan Chan** 58:13

You mentioned one of your questions about multi-clusters, and that's interesting. I think that is still a field that is probably underexplored. It is how do we backup data across clouds. For example, Cassandra is popular for this reason. It is a multi-cloud. But, it can replicate across clusters. This is something that we'll see more movement on. Maybe we'll have custom operators and things like that which can coordinate. It's just you need to coordinate things. Like if Amazon loses a whole data centre. How can we make sure that my cube cluster and some other geographic regions are up to speed and can recover it? So it's like coordinating that stuff? You know, I think we'll see movement in space.

**Bart Farrell** 59:15

We have a tradition, where we always have somebody in the background, who's creating a visual representation of things that we're talking about.

[Ardiluzu](https://www.linkedin.com/in/graphic-recording/) was creating a visual representation of the things we were being talked about. This was a well-rounded talk with very concrete examples. Thank you very much, Evan.

**Evan Chan** 1:01:05

Thanks so much for having me on and I love that graphic.

**Bart Farrell** 1:01:11

We'll be sending that to you. Evan, thank you very much for being such a wonderful guest.

**Evan Chan** 1:01:21

Thank you so much. All right. See you later.

**Bart Farrell** 1:01:25

Bye. Cheers.
