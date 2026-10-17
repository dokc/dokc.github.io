---
title: DoK isn't just Database on Kubernetes
date: '2022-06-27T07:07:50Z'
lastmod: '2022-06-22T12:02:39Z'
slug: dok-isnt-just-database-on-kubernetes
author: Melissa Logan
image: Kubernetes-PatrickMcFadin-3.png
tags:
- cluster
- data
- Database
- default
- kubernetes
- pulsar
- scheduler
- Spark
- workloads
- ZooKeeper
---

There are crucial parts one should consider in their infrastructure when going all-in on Kubernetes, as well as existing procedures that could deliver success once you go beyond deploying databases on it.

In this DoKC session, [DataStax](https://www.datastax.com/)'s VP Developer Relations and contributor to the Apache Cassandra project, [Patrick McFadin](https://www.linkedin.com/in/patrick-mcfadin), provides us a better understanding of what it takes to deploy streaming and analytic workloads in Kubernetes.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/OU2qjynhxsg" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

**Bart Farrell** 00:02

Welcome to live stream #135! It was 134 live streams ago that this wonderful human, [Patrick McFadin](https://www.linkedin.com/in/patrick-mcfadin) was with us to give the first live stream of the Data on Kubernetes community titled “[Is Kubernetes even ready for data?](https://www.youtube.com/watch?v=-C2KVTEA8XA)” which I think has been well answered throughout the DoK community’s history. Patrick, how are you?

**Patrick McFadin** 00:32

Hi, Bart! You totally sprung it on me. What was that all about?

**Bart Farrell** 00:38

You reap what you sow and have been with us since the beginning. You've seen a lot of things happen. You're currently writing a book, and you also have a nice new zoom background. One Team, I like that.

**Patrick McFadin** 00:50

This is [DataStax](https://www.datastax.com/)’s engineering team. By the way, we're hiring. We do these gatherings every once in a while and this One Team thing. I should have worn my One Team shirt, but I'm wearing my [Cassandra](https://cassandra.apache.org/_/index.html) shirt.

**Bart Farrell** 01:08

I'm a fan! Patrick, it's no exaggeration that you've seen the ins and outs, ups and downs, the strikes and gutters of Data on Kubernetes community. In terms of how things started initially and where we're at now, can you give your thoughts about the summary of the things we've seen and done and the next steps that are going to be taken?

**Patrick McFadin** 01:38

From the standpoint of stateful workloads, we all started with this perceived group perception that stateful workloads and Kubernetes are hard, impossible, and we shouldn't do it. I certainly had heard plenty of that. However, what's interesting to me is the more you ask about it, the more you hear that everybody's kind of doing it. The [DoK survey](/dokc-2021-report/) that we did surfaced that big time. Further, from what we learned, it's cool because people kept it a secret. After all, it was turning into a superpower. Running stateful workloads, like a database on Kubernetes, was how they were moving faster. The more they pushed into Kubernetes, the faster they were going. Speed is the key. The most important thing in app building is how fast you can put it into production. I still have yet to have anyone argue with me, and I'm waiting for that.

**Bart Farrell** 02:57

They remind me of the old boxing adage that power thrills, but speed kills.

**Patrick McFadin** 03:03

Speed, is it? Get that app out in production. I've probably spent the past year exploring beyond just the database because I think the database is what I'm finding is table stakes. For those who don't know, that turn of phrase goes on like "this is the basic, this is the default."

**Bart Farrell** 03:30

So, you’re going to raise the stakes?

**Patrick McFadin** 03:33

Well, open the door a little bit as I think we have yet another perception that needs to be crushed. Once again, I know it's being done at scale, and it's a secret superpower. It's in the volcano.

**Bart Farrell** 03:54

There are going to be a lot of metaphors to be used today for our viewers. You could ask if you're unsure about any of them. Further, this was also said in the report about the stack originated or, in terms of what we talked about, the community, database, and storage. The following also came up in the report, like looking at analytics, streaming, machine learning AI, and different use cases coming in. We're interested in exploring further. We had a couple of talks in Valencia about that as well. Patrick, take it away.

As usual, if you've got questions you want to be answered, put them in the YouTube chat or [Slack](@slack). Patrick is accessible on our Slack, so you can always reach out and get in there.

**Patrick McFadin** 04:36

Good morning, good afternoon, and good day, wherever you are in the world. Whenever you watch this, it may be late at night, and you're watching your iPad, and you're like, "I just want to learn something." Great! I'm happy you're here. My name is Patrick McFadinn, I work at DataStax, but you may know me through many other ways or mostly things like this where I do talks. I absolutely love data. I've been doing data for a long time. I did data before it was cool. Actually, data has always been cool.

However, I've done many [O'Reilly](https://www.oreilly.com/) things and Strata at the Strata conference. I used to do those more than once yearly because there used to be a lot of Stratas. Further, I've done a lot of content on Cassandra; as I said, I'm wearing its shirt today. So you may also know me from the Cassandra content I've developed over the years.

I do other kinds of data work. I have a pretty popular series, and it's old, so don't watch it. It's about solving time series problems with Apache Software. Currently, my co-writer, [Jeff Carpenter](https://www.linkedin.com/in/jeffreyscarpenter), and I are writing a book called "Managing Cloud-Native Data on Kubernetes." You can go and get a pre-read early release. Portworx has that available on their website. I'll share the [link](https://portworx.com/wp-content/uploads/2021/10/ebook-oreilly-managing-cloud-native-data-kubenetes.pdf) for your access. This talk is a product of this journey we're going through and the part where Bart and I talked about. We've been actively involved in running a database on Kubernetes. If you look at the DoK website, you will see a lot of storage or database discussions. It's low level, and we're not yet getting into this topic. Now we ask, why is this important?

When we build applications, the material provided on the screen is the functional block diagram. We want some data to go in, and then we want it to go out. This is a simple version where one data goes in, and we store it. That's called the database. Then, we get the temperature out, or you get a piece of data out.

On the other hand, if you're just running your database on Kubernetes, you're more likely to get the complex one. You want to put a piece of data in and get different kinds of data out. Then, it turns the block into a function, not a mere storage medium. Thinking of Kubernetes is not just a place to store or serve data. Now, we're into building apps; the old school way where we talked, did some whiteboard, and said, "What do we need? What does this application need?". We talked about scaling and deployment options. It's probably going to be in a cloud somewhere or Kubernetes. From those questions, it turned into a comprehensive flow map showing the things that will support our application. We have the lines going all over the place, the blocks with different components. If you notice, it's not just a database anymore. There's Cassandra in the middle, [Spark](https://spark.apache.org/) for analytics, [Ray](https://www.ray.io/) for model-building, and [Pulsar](https://pulsar.apache.org/docs/concepts-overview/) and [Flink](https://flink.apache.org/) for real-time analytics. This is a data-driven application. However, this isn't unheard of. When you're building applications, it's a team sport. I'd like to think that you will not reinvent one of these components. We have some great existing components, and you should use them. It's about assembling.

When we bring Kubernetes into this, this is where I'm going to try to mesh these two topics together. We have gone from having containers and thinking of running like a database in a container that applied some magic to that. Now, we're building these virtual data centers that serve our functionality. We have input and output. When you think about building your application in Kubernetes, you want to build out all the components that the server needs. When I input something, I get the right output. This is a developer-focused point of view. Developers, or your front-end developers, want data to be hassle-free and trade-off-free. If you're an operator and SRE, then this is your job. Architects, it would be best if you built this.

"Progress in technology is when we have the ability to be more lazy." — Dr. Luarian Charica

This is a quote from the book. Dr. Charica, one of my database professors when I was an undergraduate at Cal Poly a few years ago, was amazing. He used to say this all the time, we were in a class where we built a database from scratch, and his thing was building proper features so we could be lazy. I love this quote, and again it's in the book! Thank you, Dr. Charica, wherever you are.

**Patrick McFadin** 11:05

We are trying to consume, compute, network, and store efficiently. When we build these applications with all this complicated infrastructure, we're going to be consuming a lot of it. It's not just that we want to consume and compute network storage (we will); we want to do it efficiently. We want to do it cost-effectively because the arbitrage ultimately costs. How much do we spend to run our application? If you had an infinite budget, then there's no problem. You can do whatever you want. However, nobody has an infinite budget. As soon as you get your cloud bill, people start asking questions because it will be big. The type of things we build when we build these data-driven applications is not cheap. These are big ones.

I hope you're doing this where you're like, "I'm going to have my complete application stack running in Kubernetes," but what you're doing is something more like the flow map on the screen. Say, "I got my database and Kubernetes, and I run all my microservices. There's my autoscaler set up and go team" what about everything else? You've got this disconnected, complicated setup where you're running multiple architectures, security profiles, and authentication schemes. Remember, Dr. Charica — this is not lazy. It is complicated and hard.

Now, let's move beyond that database. I'm going to talk about a couple of technologies here, and this is meant to be just a bit of an overview of the technologies, not a deep dive. But I'm going to provide you with some functional information you probably didn't know about. If you did know about it, then you're probably doing this as a secret superpower, and you're not telling anyone. But also, just to permit you to go try this out. Many people don't think about technology being done a certain way. They just don't even think about it until somebody encourages them to do so. Then, because we're all engineers who love to do cool things, you'll do it. Here's your opportunity!

Let's start with streaming with Apache Pulsar. For those who do not know what Apache pulsar is, Pulsar is the next-generation streaming platform. I've done a lot of talks on [Kafka](https://kafka.apache.org/), so Pulsar is like the next generation of Kafka. The way I describe it is Kafka to Pulsar is like [Hadoop](https://hadoop.apache.org/) to Spark. Kafka served a certain purpose when it was built, and it was built before Kubernetes. Pulsar was built after that with some lessons learned in this next generation. Pulsar has compatibility with Kafka. It does things that Kafka does not do, such as Pub/Sub. It's turning out to be quite a beast in serving large-scale cloud-native streaming workloads. The ecosystem is built around it. Further, its compatibility layers make it easy to drop it. The great thing about streaming is that you can move it around because a lot of times, data is ephemeral. You're just pushing it from one point to the other and doing something on the way there. It's an easy thing to try out.

Why Pulsar in Kubernetes? As I've mentioned, it's a bit of a next-generation system, but it has some components built with cloud-native in mind, and I'll talk about that in a minute. For cloud-native, it goes like, how does it compete? How does it work with scaling, elasticity, and fault tolerance? Those are all important things to have in a tool that you're going to deploy Kubernetes. Too many times, we find older tools being bolted in. We throw an operator at and hope for the best. I know I'm talking a little bit about Cassandra sometimes, but it was built with cloud-native in mind for many things. Then, we had to add an operator. The project has been moving quickly towards cloud-native, a little more natively.

Moreover, for Pulsar, Kubernetes is one of the primary deployment methods. In the project, we also have [Helm](https://helm.sh/). The operator is just part of the project, and it's not like a separate project, company, or organization. It's all entry. You can see the commitment to Kubernetes inside of the project itself. The biggest thing I think is one of the reasons that got me interested is that it does separate, compute, and storage. That's a huge one because when you're scaling, those are two elements that should scale independently in any kind of large data scale.

Now, let's take a look at how Pulsar works. I'm going to introduce you to some of the terminologies. We'll start with the basics — a Pulsar instance. It is a controlled domain that can have multiple Pulsar clusters. Those Pulsar clusters are typically in a different data center or Kubernetes cluster. Some networks separate them. This idea of multi-datacenter or multi-cloud replication is built into how Pulsar works. That's a wonderful thing, especially if you love uptime. A Pulsar instance in the control plane can have this concept of multi-DC. The inside of each cluster is broken into pieces. We have a proxy for communicating with the Pulsar instance, the Pulsar cluster, and the instance itself. The proxy handles the communication between the producers, the client, and then the consumers, the clients that pull the data out of the topics. In any streaming technology, you have a producer and a consumer, and the proxy is what handles the communication with the rest of the cluster. Then, the proxy's job is to communicate with the broker. The broker is kind of the key thing here as it makes Pulsar work for most separating your compute and storage. Brokers are stateless, and so is a proxy. The stateless broker is meant to figure out, say, "Here's my topic, this is what I want to do with it," then it makes the choices on which bookies it would go to. Now, bookies are the storage component for a Pulsar cluster.

**Patrick McFadin** 19:37

The bookies are responsible for the storage component and ensuring that data is replicated, appropriately partitioned, and interfaces directly with the storage mechanism behind it, usually some block storage. Further, you can have multiple bookies as well. This is where you get some scaling. Now, the [Zookeeper](https://zookeeper.apache.org/) is also installed here, and those who've seen any of my talks know how much I hate Zookeeper with passion because it has a lot of problems. It is kind of a single point of failure. However, the Zookeeper is an important part of what Pulsar is right now. It is something that's changing. The Zookeeper is getting removed. As we speak, there are different ways to do this. Essentially, what Zookeeper does is similar to air traffic control. It's ensuring that consensus and who's doing what is centralized so that when we have stateless applications, it's storing the state to ensure that everything is appropriately coordinated.

The basic example of a Pulsar cluster and instance could run anywhere. This could run on your laptop or bare metal. It doesn't have any cloud nativeness to it other than the way you deploy it. On the other hand, for Kubernetes, it opens up some great possibilities. We have a broker, bookie, Zookeeper, and proxy service. All of these services are talking to each other over an internal network. Since they are services and they're discoverable, let's say that I need to scale something like my brokers because they are the compute component. It takes in their client communication and manages the scale (i.e., if one needs to do 10 million writes per second, they will need more brokers). As we add brokers and what's not on this thing right now is a proxy; because Kubernetes and the FCD and Kubernetes control plane can coordinate those, you can link up the proxy with the brokers automatically as you scale out. If you need to scale down elastic, then that's doable as well. Further, you're just connecting to a domain name, not an IP address, because it's a service. You're not going to need to change the configuration.

Applications, consumers, and producers connecting from a Pulsar to a Pulstar instance running in Kubernetes will suddenly know that you have more capacity. This is the kind of magic that we want to happen. It's not magic, it's computer science, but it sure seems like it. The same goes true with storage; if you want to store a lot of data, then the bookies and the storage they're attached to can grow elastically. Those are all managed by Kubernetes since these are services, names, and not just IPs. It's one of the key success factors. Moreover, to succeed with Kubernetes, get rid of and forget IPs. IPs do not exist. Use domain names. We'll have a little deep dive to touch on how we do this deployment.

It's a single YAML file when you do a deployment. However, that YAML file can be complex or tiny. It's just a matter of what you need. You can be very specific, say, you need five brokers and four bookies then present all your PVCs, or you can start with something light. For example, you don't need a proxy, and you want a straight broker. The warning I'm going to throw out about Pulsar, the pods, and everything presented on the screen is not one container. There's a lot of stuff going on here. If you use the default deployment YAML using a laptop, then your laptop will probably melt. There are many infrastructures to fire up, more like 15 different pods. There is a default like Minikube that you can run on your laptop, but this is where I fire up my Google cloud instance, and I deploy it because it's a lot easier. It's going to be big. You're not merely using Pulsar to manage your home recipe collection. You're probably going to do something big with it.

On the other side, the analytics with Apache Spark is tough because there's a lot of negative press running on any ML or analytics workloads on Kubernetes just because people don't understand it. The main reason probably is they're using defaults, or they simply don't understand that a modern version of Spark (i.e., last year) is way more adapted to working with Kubernetes. Now, one may ask, why would you even do this? Some people may also think that Spark and Kubernetes should work just because of the workloads that fit well. That is true. They tend to be a little bursty, and that's where we get into the notion that you should never use a default, meaning, whenever I do an analytics job say, "Oh, I need 100 nodes right now", that's indeed going to happen right now. That works well in Kubernetes. If you compare it to something like yarn, yarn takes a long time to spin up infrastructure. Kubernetes is much faster when it comes to creating pods, just because of the way that it works. Once again, those workloads tend to work well in Kubernetes.

As of Sparks 3.2, Kubernetes is now a primary deployment method. I don't think many people know that, and now you will after this because I'm going to show you how to do it. The other thing is that the ecosystem is starting to grow around Spark and Kubernetes. Spark alone is not going to solve this problem. Like anything else, you need storage and networking, and everyone needs to play along.

The ecosystem around Spark is catching up. There's a lot of work being done, but it's a great opportunity. We're on the bleeding edge. We're out here. Kubernetes even, though there's still a lot of work that needs to be done. Especially if you look at things like running batch jobs, the idea of running batch jobs in Kubernetes wasn't solid when it was designed back then. It was like, "I need to backup my WordPress server every day" that was the batch job with no other considerations. These are things that are changing.

Now, let's go into some of the deployment methods. First is the Apache Spark Native version. This is built-in to Spark. It assumes two things: (1) You have a pre-built Kubernetes cluster, and (2) You have a pre-built app container. It means that you will probably have a cluster specifically built for running Spark jobs. You're going to have enough infrastructure to do whatever you need to do. It doesn't have to be the way you can mix workloads. Also, in the pre-built app container (Docker image), all your code is wrapped in your application code for Spark and wrapped into a single container. What's interesting is that there's a Docker build file in the Spark distribution that you may use to build your native Spark image that will be deployed in Kubernetes. You can build your own and get super detailed on it if you want. However, there is also a default one that will just take your jar file and run with it. There's work that needs to be done here. If you're in the Spark ecosystem and already using it, this should not be a big stretch. You probably already have these things. But I'm just letting you know, and if you're interested, those are the key things you need to know.

The spark-submit command, built into Kubernetes or Spark, is how we submit jobs into our Kubernetes or Spark cluster. The change is that now the "--master k8s" tag is in there; it used to go to the Spark master node. Now, it is connecting to the API server in Kubernetes.

  - - master k8s://https://<k8s-apiserver-host>:<k8s-apiserver-port>\

The key things here are pointing it to the API server, the external IP, and the image you need. Through this process, when you do spark-submit, it will start pushing things into the Kubernetes cluster. When you send it to the API servers, it starts up a Spark driver pod. That's a big difference. The Spark driver is something that we could also call air traffic control. That's the one pod that will know what to do whenever you give it a Spark job to run. The Spark drivers primary purpose is to ensure that you have enough nodes and pods deployed, called spark executors. They're deployed enough to manage the job. It works with the Kubernetes scheduler to get that done; that's what runs your custom container. This is the warning, and if you invoke this, it will consume resources quickly.

The other option is to use the Kubernetes operator for Apache Spark. It is not a part of the Apache Spark project as Google Cloud hosted it. Its purpose is to eliminate the need to use spark-submit and be a little more Kubernetes native. This is creating a deployment YAML of the Spark application. Inside the YAML file, you can describe everything you want to run. A little difference here is that whenever you submit using kubectl instead of spark-submit when you submit that YAML file, it goes to the API server. Since you've installed these operators, they will act on it and figure out how it needs a Spark driver. From that point on, it will act like Sparks a bit. But it's letting you use a normal Kubernetes cluster, YAML files, and diffuse Argo CD. Those will work just out of the box, which is cool.

The last topic here is schedulers. We are now into the secret sauce portion of this discussion. I bet most people watching this have no idea that this exists. I say that because whenever I bring it up, people say, “Huh? That’s a thing?” Today, you are privileged to learn that this truly exists, and it’s cool! This is why I also say don’t just do the defaults.

**Patrick McFadin** 32:43

The scheduler is a key component of a Kubernetes cluster. It does all the hard work of creating the pods. Whenever you use kubectl to send your deployment YAML in (you'd submit this YAML that has a certain state that you desire), the cube scheduler's job is, say, "I'm going to filter score and assign," then it's going to look at that and realize you needed five pods with the images that don't exist. So it then goes out and looks at the infrastructure or other things like taints and whatever you've done to ensure you have some control over your Kubernetes cluster. It follows the rules. But generally, it throws over the hoop and starts creating pods. There are no frills at all, and with no frills, this is where you get into trouble with advanced workloads like Kubernetes. When you're dealing with advanced workloads like that, which have a little more need in the way they schedule, then the default scheduler is not your dog.

There are two projects I'm going to talk about. First is called "[yunikorn](https://thenewstack.io/yunikorn-alternative-to-kubernetes-default-scheduler-for-big-data-ml/)," an Apache project. The concept originally stems from a yarn unified with Kubernetes.

**Patrick McFadin** 34:29

Yunikorn is an alternative scheduler that was built for advanced workloads like Kubernetes. While it was originally built for Kubernetes, it now handles other things like TensorFlow. There's an external configuration file, and a yunikorn configuration file does so whenever you submit a job, it can match up things like a hierarchy. It assumes multi-tenancy, say, maybe one department has more, or they have one job code with a different priority than the other. It can also do bin-packing, which means it can do efficient resourcing. It is also capable of fair scheduling. It ensures that no job gets starved out, which is quite common with the default scheduler. It intercepts spark-submit, which could look at that and say, "Oh, I know what to do," and replace the scheduler. Moreover, you can be specific and say, "I want the scheduler to be yunikorn" either way is cool. It's meant to bypass the basic scheduler. It does cool things around your Kubernetes jobs. This is how to do it. It would be best if you were doing it and not running your Spark jobs on the default scheduler.

On the other hand, we also have an alternative called a "[volcano](https://volcano.sh/en/)." It was built with a little different though in mind. It was made for general purpose, high performance, and computing workloads. Basically, anything you can think of that needs some batching, including TensorFlow, Spark, and the whole range of varying ML workloads. Think of how you're going to do high-performance computing with Kubernetes. That's how the volcano is built around with a lot of similarities. Where they depart, however, is that volcano, when you do an install, it puts CRDs in your Kubernetes cluster for a job queue and a pod group. Thus, the configuration is essentially built into the YAML file, your deployment YAML. You can set up a configuration in your kubeconfig to get granular with how your cluster works; say, the nodes are GPU nodes, while the others have [pNEUMA](https://github.com/preludeorg/pneuma) awareness and all these other things. It is way more comprehensive for different types of workloads with the volcano, but you have to call it specifically, so when you build out your job, that's one of the CRDs, you have to say, "I'm going to use a batch scheduler of the volcano." Similarly, how yunikorn works, whenever you submit that job to the API server, it just ignores the Kube scheduler and goes right over to a volcano. The bin packing topology awareness and putting jobs close together, say, if you're trying to do storage affinity, prioritizing, and dependency management, it does that well. This is a crucial thing and something that the Kube scheduler will never have. Once again, those two projects you should check out!

Finally, let's wrap this up. What are your takeaways here? First and foremost, you can't say you are all-in on cloud-native if you aren't running all your workloads. You can't run half of your workloads in a cloud-native and the other half not cloud-native. This is an opportunity for you to fix this. Next is to work with tools that work with you. I'm looking at this statement as to what has native Kubernetes support thoughtfully put into it. As I mentioned earlier, Spark with the Kubernetes native. They're putting in Kubernetes native with the intent of expecting that you will be doing this, and we will work with you instead of just giving you the base tool, and you figure it out. That's how it's been for a long time, and those days are coming to a close.

Build function machines and not servers. It's this idea that function machines where you think like what's your input and output, and you build those. That's the data center. That's the digital deployment you're trying to put into Kubernetes. It also stands on thinking holistically as you architect the end solution for the developers to use. Finally, don't just use defaults. Think outside of the box. It's easy whenever you're getting started to use the same defaults, but I don't know of any system that holds up to the same defaults once you get into your specific requirements, and with analytic workloads, especially if you use defaults, you're going to get damaged. It'll hurt a lot. That's all for my talk! You can find me on [Twitter](https://twitter.com/PatrickMcFadin), [LinkedIn](https://www.linkedin.com/in/patrick-mcfadin-53a8046), and [DoK Slack](@slack)!

**Bart Farrell** 40:26

All in on Kubernetes and cloud-native! As usual, I think this is good. Over a year ago, you pushed the envelope by explaining the difference between DBA and SRE. That's the time to make a change. These paradigm shifts that sometimes for different folks will cause some uncertainty, but how you've laid it out here, particularly with the bookies, can have a positive connotation. I also dropped the links to yunikorn and volcano for people who want to check them out. You also have people who strongly agree that the Zookeeper needs to go. Friends, don't let friends use Zookeeper.

**Patrick McFadin** 41:07

I think we use Zookeeper mostly because it was a base. Similar to the idea that if you do not have a consensus protocol, one will be provided for you. But now, as more projects are thinking through, what that means is they’re replacing it like Kafka is replacing Zookeeper, and Pulsars replacing Zookeeper.

**Bart Farrell** 41:27

One question I have since you mentioned a little bit in the talk and this came up in the KubeCon, now that we’re seeing the reports and trends about the hottest topics and things like that, specifically Kubernetes at the edge and what’s that going to mean for the data on Kubernetes ecosystem, what are the things that we should keep in mind?

**Patrick McFadin** 41:54

Kubernetes, for the edge computing itself? I think this is where the multi-data center functionality comes in. You can have a small data center of something on edge with a larger data center somewhere else. Pulsar does this useful Pub/Sub thing where it can pass data from one place to another. We're getting into this world of multi-cluster Kubernetes. Some projects are helping that, and Submariner is one of them.

It's understanding how networking goes because we've been focusing so hard on storage and some on the compute but very little on networking. However, we're now shifting.

**Bart Farrell** 42:41

We’re trying to balance it out. I think it’s something that people should have on the radar because it seemed to be of significant importance to many of them and was talked about a fair amount in this KubeCon. So, we can imagine that the next one in Detroit will also have that in mind.

**Patrick McFadin** 43:02

Projects like K3s are making this work.

**Bart Farrell** 43:05

Precisely, I was at an event in Holland, and K3s were heavily featured because of what it provides and their value. We are getting to the end. Everyone, you can easily reach out to Patrick on his socials. Patrick, before we let you go, we have a [special guest](https://es.linkedin.com/in/graphic-recording) lurking in the background. While you’ve been talking, apart from his fashionable and amazing Mexican wrestling mask, he wrestled his way through an incredible piece describing the different topics that were touched on. It’s a nice summary that we can visually take away with us regarding the things we talked about!

**Patrick McFadin** 44:29

I just love your art so much!

**Bart Farrell** 44:37

Patrick is always a pleasure. We are looking forward to catching up in person and perhaps taking these topics a little bit further. We talked about this before we started, but I think there's definite interest in this. We'll be seeing this more, and it's nice to see the stack building out because, as you said, if we just stay with the database, it can get a little bit tiresome. Seeing this build out into other areas regarding analytics, Pulsar, etc., is very healthy. Also, Patrick, we'll be wanting your feedback next week because we got a live stream about database mesh, not data mesh. It's an interesting paradigm that's emerging from a speaker who's going to be joining us from China.

Once again, thank you, Patrick. Thank you, everybody, for joining today. Stay safe! We love you all.
