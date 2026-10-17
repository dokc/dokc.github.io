---
title: Databases Operations and the Cloud
date: '2022-06-11T13:00:59Z'
lastmod: '2022-06-08T07:17:24Z'
slug: databases-operations-and-the-cloud
author: Melissa Logan
image: Kubernetes-BarakNissim.png
tags:
- cloud
- CSI
- databases
- high availability
- infrastructure
- kubernetes
- PV
- workloads
---

Database is one of the first-class citizens to run data on Kubernetes, and there are multi-faceted operations to run it. It further requires a data layer to improve availability, scale, and bursting.

In this DoKC session, [Ionir'](https://ionir.com/)s Director of Products and Solutions, [Barak Nissim](https://il.linkedin.com/in/baraknissim), walks us through the basics of how data is represented in Kubernetes and reviews why having a data layer is important when building a Kubernetes-native application.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/75AnPvwGWs4" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

**Bart Farrell** 00:00

We’re here for Kubernetes community live stream #129. As we go to our high-quality content, we have [Barak](https://il.linkedin.com/in/baraknissim), who is no stranger to our community. He works at a cool startup called [Ionir](https://ionir.com/). Barak, what should they know about you for people who don’t know you? How would you like to introduce yourself?

**Barak Nissim** 00:55

Hi Bart and everyone! My entire career was around cloud, data center, and IT technologies. My specialty is taking on customer roles, working with customers, and solving complex problems in their infrastructure with technology. That’s what excites me, and it’s what I’ve been doing for almost 20 years.

**Bart Farrell** 01:25

That's good, and I think that's very important to our community,  which you are aligned with, putting the end-user at the center. It's one thing to be in a lab and to be imagining how this technology is going to do this or that, but when you have to sit down with somebody and troubleshoot, It changes. As a starter question, what are some things that people could improve when it comes to being more empathetic with end-users when it comes to customer-facing? What are some of the techniques that you've used that have worked?

**Barak Nissim** 01:56

In most cases, you'll see that in the industry, say, people are approaching the technology first and not trying to understand. Usually, in customer meetings, with partners, or anyone in the industry even (it doesn't necessarily have to be a customer), you ask questions, listen, and learn from them. I think that's the top thing for everyone. It's very descriptive for the Kubernetes community.

In general, the learning aspect, like learning from each other and exploration, is what I like in this world. Not everything is said by huge market trend vendors, which have been describing the old world. However, the Kubernetes space is a great ground for innovation, learning, and investors.

**Bart Farrell** 03:03

Solid answers! That being said, today, we will be talking about cloud and database operations. What does that mean exactly?

**Barak Nissim** 03:15

I wanted to start with the basics. As we all know, the database is one of the first-class citizens to run data on Kubernetes. It's like the go-to workload that says they want value for Kubernetes. However, I want to have some sort of a walk through the basics as to how you address data and manage those layers inside of Kubernetes. Similar to the infrastructure look of things, and then travel upwards in the technology stack like how databases are done. In the cloud in general, what's the problem that most customers try to solve with that approach, and how, at least, do we see the market transitioning from some services that, specifically maybe databases as well. But in general, movement from cloud "locking" vendors kind of solutions towards Kubernetes allows you this breadth of technology and other benefits that Kubernetes brings to the customers.

Further, I also want to touch on figuring out the trends and share a little bit of what I've heard from our customers and partners that we talk to about this field. If there are any questions, I guess you're going to call them out, so feel free to stop me. I don't have my speech lined up, and I'm trying to share my knowledge and experiences. I'm more than happy if somebody disagrees, and we can create a conversation out of it. It's always a good ground for learning.

**Bart Farrell** 05:19

That sounds great. Having had you as a speaker before, you are very practical, down-to-earth, and a great teacher. Once again, if you’ve got questions, you can leave them on Youtube or take the conversation to Slack. Barak is very easy to talk to and open-minded.

**Barak Nissim** 05:39

Hi everyone, Barak here, and as Bart mentioned, we are going to data and databases in Kubernetes. Cloud in general and a little bit of how it looks in the Kubernetes ecosystem.

I want to break down how data is represented, specifically in Kubernetes clusters. I will touch on the CSI driverflows and workflow (how data is requested or served). Although, you can look at it as provisioned or mounted on Kubernetes or for Kubernetes pods all the way from the application level to the underlying infrastructure.

We're going to talk about different data services, the needs of data-related workloads from the infrastructure, why we use data and the benefit of presenting data to pods. We're also going to move briefly to the chain and discuss how consensus is met in different distributed models. I didn't want to make a talk specifically about this, so I'm going to present a couple of concepts or buzzwords. Some things that you could keep in mind when you think about moving your databases from whatever to Kubernetes or, in general, data-related workloads to distributed systems like Kubernetes. We’re going through the alternatives we have right now, exploring the options and learning a little bit about the trend we see in terms of a platform for databases. We also have some scaling options and ideas that I have pulled up together on the last slide about aspects of things about operating data in the cloud itself.

For the first part, I will try to walk you through the elaborated slide to understand the flow. In essence, the upper side is the application side. For example, [Postgres](https://www.postgresql.org/) is a representative for a workload running inside of a pod. This pod is just the application level of things. We’re going to the breakdown or the abstraction that Kubernetes makes together with the CSI drivers and plugins, all the way to the backend or the infrastructure for that specific data point.

If something is not clear, let me know. I have another hidden slide that is more flow-wise, but we generally have our Postgres pod. Essentially, you download the Docker image, Docker hub, or whatever your repo is. This content is immutable, and it’s just a registry. This is just the part that runs the service of Postgres, and then inside of that pod, you can see the mount points, similar to the basics of Linux; mounting devices to a specific operating system. But this is abstracted like we’re doing virtualization but the same for Kubernetes. The pod or the Postgres doesn’t know that it runs inside Kubernetes or what other operating system is running it.

You have the file system level, and this is like the high-level connectivity that the app does. For example, it writes to files, creates files, etc. If you go one layer below that, you have the devices mounted inside that pod. In general, this is where the data is persistent. This is how we redirect the data out of the ephemeral content of the pod. Then, we redirect that data using that mount to a different location. This location is provided by [PVC](https://kubernetes.io/docs/concepts/storage/persistent-volumes/). The PVC represents the request for the storage or data that is satisfied by a PV. Once these two components are aligned, the request and the system say that this is what answers that specific request, and you get a status that is called a bound. A PV is bound to a PVC. The system can start working and writing to that PV. All up until this level, everything is abstracted and completely in the world of Kubernetes. In other words, everything is a resource within Kubernetes.

Another interesting part of this CSI revolution that happened a few years ago is that we can have components that satisfy this PV with something that is completely abstracted. For example, where the PVC is represented at this level, and the system needs to provide a PV to answer it, certain stages and processes are happening within the Kubernetes clusters. They have two faces; one is towards the PVC and the abstraction level, while the second is towards the physical or virtualized world, depending on where you run. In this manner, it creates that resource to be satisfied. Thus, all the way to the PV, it’s all abstracted. In the back-end, you’re getting a CSI plugin that talks to your storage vendor or external provisioner that attaches the PV object to something in the physical world; a specific volume. It can be an EBS volume or whatever storage vendor you are working within your environment.

In the back end, outside of this, all the way down here (File system to CSI Node Plugin) is in the Kubernetes world while the Replication, HA SDS system is the storage world. The storage world is external to the Kubernetes abstraction. You have multiple data services or data-specific tests on the storage level, which can be deduplication or replication, ensuring that the storage is highly available, or sharing the volume between multiple nodes. For example, if you're not running any shared storage solution, every PV that you create can be satisfied by the local node file system. Then, you're just going to use host deals or MTDs, whatever you configure in your environment. You're using that only from the specific node, and if you want, if your pod needs to be rescheduled or you have a dial HA scenario, then this data is ephemeral. This is exactly the problem we're trying to solve, and the CSI mechanisms help us talk in the same language or request. I don't want to go into the specific details about how you would publish a volume and how to mount the volume directly to the pod. That is the magic that Kubernetes and CSI do together. The good thing to understand here is that you have two systems working together throughout this CSI plugin, and they talk together in a very sleek way. There are no hiccups. The Kubernetes knows what to ask with the PVCs and storage classes. The service and storage size knows how to respond and satisfy that request based on all these metrics. Once again, this is the flow from the higher abstraction level, the application in most of the Kubernetes world. We're talking about the application layer, as I believe we don't necessarily understand or plan the underlying infrastructure good enough in most situations, hence the need for me to break it down.

But in essence, questions such as why we need a data platform or a data solution for workloads are very similar to what we're doing in the VMs world or even in the bare metal world. Data brings you persistence, and it further helps you do high availability, backup, and restores — also, ransomware as we hear about it a lot from the backup and recovery industry. Data brings companies a competitive advantage as it is the sensitive and most valuable asset. Companies have their data, and the workloads revolve around data. We see that running Kubernetes without data is like dancing at two parties. It's a phrase in Hebrew. Not quite sure if that translates well to English.

**Bart Farrell** 17:44

That’s the nice part of this community, and we get that cultural richness from different languages.

**Barak Nissim** 17:49

We have this phrase called a "dance in two weddings" as it is tough to do it in a single night. This is why we want to create Kubernetes as the platform to run all the workloads for the enterprise. We also need data or data systems in Kubernetes to make sure that we have a unified approach to looking at our infrastructure and protecting it. Further, to ensure that you have high availability, not only for your NGINX and front ends but also for your databases. This is the challenge that we're trying to solve, specifically in Ionia, but there are a lot of vendors out there in the industry. If you look at it, it's like the top things that data can help in the Kubernetes platform or space.

When we talk about cloud and multi-cloud in a multi-environment, we see that in many environments with our customers, Kubernetes is so easy to create, deploy, manage, use, and operate. Customers have multiple environments like on-prem in the cloud or multiple stages in test prod. Sometimes, even in an upgrade process, it's far easier to create new Kubernetes clusters and move your workloads instead of upgrading and running maintenance.

We see all these aspects, which is the field that data actually plays. It can give you the benefit of doing it at the infrastructure level rather than implementing costly and other complex solutions out there. I briefly mentioned what it means to run data on top of Kubernetes. This is like what we expect from a data management platform on top of Kubernetes. It's very basic and high-level. We got the Kubernetes platform here. Essentially, you need a solution that aggregates your local or physical resources and abstracts and presents them to the Kubernetes layer. It doesn't matter if it's local or external storage. The purpose of a data solution for Kubernetes needs to be talking the Kubernetes language. It needs to be distributed, easy, and fast to consume. You have to be descriptive in the way that you use it. You have to work with the CSI and the PVC/PV model. This is what we want to bring into the play.

**Bart Farrell** 21:12

Great layout for establishing the scene! When you're meeting with a customer, how do you go about figuring out exactly where they're out with all this kind of stuff? What kind of diagnostics to implement to ensure that they're prepared to make the decisions they're going to be making? Because sometimes, I imagine for some people that we saw in the research report, everyone is at a different maturity level when it comes to talking about data on Kubernetes. What are the things that you seem to encounter there? How do you approach figuring out exactly where they're at with all this?

**Barak Nissim** 21:50

We see that customers are far more open to understanding the value or the position of Kubernetes as the next-generation platform. They are willing and interested in solutions to move databases or heavy data workloads towards Kubernetes. The conversation starter that we have with most customers is they want to modernize their existing environment, and we see another trend here. I didn't plan to talk about it, but it's also relevant to this talk.

In the world of [KubeVirt](https://kubevirt.io/), where customers are more involved in the market today, customers are planning or thinking about running virtual machines together with pods, Kubernetes pods, or old-school pods on the same platform.

Today, there's an open-source, but different vendors are running this in enterprise and commercial solutions like Kubevirt, which allows you to run VMs with pods on the same Kubernetes platform. It is a bit of a shift in how customers are looking at Kubernetes for understanding running their workloads on top of Kubernetes and getting the same benefits for VMs. Then, the storage and data conservation uplift from ephemeral usages to more databases and transactional kinds of workloads. This is pushing customers to explore running data in Kubernetes.

The other thing is simplifying operation costs as well. We see customers interested in a hybrid approach where they're running primary databases on instances or VMs. Still, in their test and dev environment, they want to run something less costly and easier to configure and run. Then, they're looking for Kubernetes. They're probably running whatever tests and devs are already in Kubernetes, and they want to present that as part of the platform as well. There are a lot of work streams or "tailwinds" for data on Kubernetes. Specifically, we talk about databases as first-class citizens, like what I mentioned before. It makes sense that customers are going into that first, bringing your application or the front end closer to your back end, which means managing all these in one platform. There's a lot of power in it.

**Barak Nissim** 25:14

That's the storage data side. As I mentioned earlier, I want to move slightly higher to the conversational technology level (from infrastructure to the application connectivity). There are a few concepts here, and I want to ensure everybody knows this. This is also important when you design distributed systems and specific data, as databases are even more specific.

First of all, we have a CAP theorem that talks about the three major characteristics of data approach services. At a high level, it means consistency, availability, and partitioning. Consistency refers to how data is being kept consistent. On the other hand, availability touches on what happens if some connectivity is broken or how you address high availability in terms of nodes running in your cluster. Lastly, partitioning is how you operate in a network failure. The concept is that you can only pick two. There is no perfect solution that operates in a utopian world where you can have consistency, availability, and partitioning awareness.

How you choose the two will further define the solution you decide to run that is designed for your environment. It goes down to how you want to plan on disaster recovery, high availability, or run consistency in your cluster. As we mentioned earlier, some databases are more built for availability or to ensure that the data is far more consistent. Some databases are eventually consistent and comparable to a metric when you pick up your data-related solution. Once again, this is the CAP theorem. It shows how you balance your environment's consistency, availability, and partitioning.

On the other hand, the concept of consensus refers to how you ensure that all nodes agree and are in line with the same data in a distributed system or environment. This is very important in databases. We have here two teams, namely Raft and Paxos. Raft is a leading protocol, while Paxos is just a mutation of Raft. You can look at it simply; it has leaders and followers. Let's say in the bottom of your Raft, and you have in all your clusters with ten nodes. It doesn't matter if it's a database or not. It could be any data-related workload. Now, you have your nodes, and they have to answer a specific question. In essence, Raft is about the allocation of leaders and followers. If you ask a question for a specific follower, it will ensure that it gets the right consensus in your environment. Further, it also talks about how leader election is done. There are a few metrics about it that depend on latency, availability, etc. All nodes talk to each other. There is a leader who stands as a single source of truth. But there's also a different consensus mechanism in the backend, which can be based on the majority of what the entire node network needs to be completely in sync before you get the specific answer. This is how Raft assures that when you ask a specific question, you're getting the absolute right answer. This is how data kept its consistency across nodes.

There's a different kind of protocol and way of transferring this consensus. Each product or solution does it differently. Some of these are gossip protocols considered chatter between the nodes. You also have primary and secondary ones. Different protocols arbitrate and move data around or the consensus around the nodes. It would be best to keep in mind these high-level things when picking a specific data workload.

Now, if I go a bit higher in that stack, we have our databases like a major data-consuming world (i.e., [MongoDB](https://www.mongodb.com/), [CouchDB](https://couchdb.apache.org/), PostgreSQL, [MySQL](https://www.mysql.com/), [Redis](https://redis.io/), etc.). Most of them are open-source. Each cloud provider has its flavor of open source solutions where they do the maintenance, upgrades, etc. The examples mentioned above are one of the top databases I got from Docker Hub. We also have the commercial ones, namely [Oracle](https://www.oracle.com/index.html), the SQL, and MySQL.

Further, I also want to touch briefly about running databases. Earlier, I discussed the importance of data consistency, availability on scaling, and managing them to ensure that you’re not only throwing a pod with a database process running on it. Instead, you have to make sure that the entire database layer is synchronized and managed. In line with this, specifically in the world of databases, it’s essential to have an operator-led approach. Sensitive workloads and other specific data are very sensitive, so one cannot just move around data without making sure that it is not corrupted or consistent. Hence, the operator is a key and crucial component when running databases on top of Kubernetes.

There were a lot of sessions in DoK about operators, specifically for databases. The operator is there to ensure that the machine of database pods or workloads is easily configured. A lot of operational tasks are maintained within those operators. Say, if you want to scale, upgrade, change the version, or even have advanced monitoring for specific best practices, you’re getting that from a database package as there are multiple providers out there for operators. This is the right way to deploy production-ready enterprise-grade databases on Kubernetes. Before the operator world became as strong as it is today, I tried to run databases, and every time you have to upgrade or change the workload, it could potentially create corruption and problems in the database. This is why I think operators are the standard today. This is where you start running databases on Kubernetes.

However, what’s more interesting is that the operator world is very similar to what you see in the cloud, not Kubernetes container-native but cloud-native. If you want to run your Aurora or DynamoDB, their service is very similar to an operator. They will bring you scaling, easy provisioning, support metrics, and similar best practices. I also think this is what we learned together with our customers. Since the cloud-native database world came out a lot sooner than Kubernetes reached a maturity level, many customers went to the cloud for this kind of service. They went to the Redshift, Aurora, and so on. Such an option was the easiest one and less costly out there. You offload and hand out their databases for somebody else to maintain.

Now, we’re starting to see a lot of customers that are starting to be more open to a database as a service on top of Kubernetes because the operators are getting to a very mature level where they are almost head to head with what the cloud providers are bringing. If you own the Kubernetes space and have your operator, that is nearly the same as what you’re getting from the cloud provider. Another barrier has dropped down when customers want to look at Kubernetes as a platform of choice. Then, you get the benefits of Kubernetes which is simple. You can do multi-cloud and the abstraction level of it. You can run whatever you want today on Google and tomorrow move to AWS with no lock-in, and performance is something that you can maybe control easier. There’s a lot of visibility into that. As I mentioned in the introduction, this is an interesting take that we see from our customers today. They are looking to redesign or rethink how they do data on the cloud and move it to data in Kubernetes. This is a crucial point. Once again, as I previously discussed, the database operator world is growing and getting stronger than ever. We have the top three high-level operators in the market today, namely Cassandra, PostgreSQL, and MongoDB. They are very stable and mature operators who provide services on top of Kubernetes for specific workloads.

The point I want to try and fold all the stories into words is the fact that these are just databases. As we mentioned, Kubernetes is the platform for your entire workload. Sometimes, when you have an enterprise application, it’s not only a single database. You have multiple databases and data-oriented workloads that are running. It could be [Elasticsearch](https://www.elastic.co/), CouchDB, PostgreSQL, or MongoDB, all serving the same application. You might encounter a tendency to get stuck with a lot of operators. They manage, and each has its expertise, language, or even way of thinking. This is why I think it’s very important to try and think of a joint model where you can have your Kubernetes native data layer — the basic infrastructure, managing the messenger, resiliency, and the high availability to connect it to a higher level operator role. Once you take the good of both worlds, you can get many benefits. Specifically, high availability, scaling, and multi-cloud. These are the places where if you only run an operator without a robust data platform below that, specific tasks like scaling may take a lot of time. If you think about it, if I’m connecting both worlds and you want to scale a specific database, you can see online that, in most cases, it’s based on the backup and restore of a specific volume. If you have a big database, it can take time as there is a lot of extra work you should be doing, like paying for a third-party kind of placement for your backups. However, if you have a data platform on top of your nodes, you can do that by cloning or moving between clusters. You may also have high availability as part of your infrastructure. You don’t have to invest and build high availability in each of the application levels you have, and you’re getting a solid solution from your software development on the storage side of things.

When you want to run both of these things together, you can get high availability and resiliency from your infrastructure instead of investing in replication and other data copy or moving operations. We like to think this way when we talk to our customers as they’re saying that some technology they would rather get from the infrastructure instead of the application level. This is why I started from top to bottom and from bottom to above when I did this talk because everything is one unified story. It’s not merely one-sided. This is how we see things.

On databases, enjoy that because your application needs data. It has to be resilient. It has to be clear for the application where the data is and not pay for latency and other things that can come from unoptimized infrastructure. These are the high-level points that I mentioned. If there are any questions, I’m more than happy to give my answers.

**Bart Farrell** 43:13

We've been around as a community for about two years, and I wish we had his presentation two years ago. It lays out these foundations in a simple and practical way to approach them. I would like to know when you're talking to customers because a lot of what we try to explain is to increase the adoption of data on Kubernetes; people inside the organizations need to be better prepared to have these conversations. What you've laid out makes everything very clear regarding the advantages of where things are now. As you said, operators are reaching a higher level of maturity than before. However, regarding the doubts that you think are occurring in some companies, say, "Kubernetes is okay, but data is my critical mission. It's the most valuable thing that I have as an organization, so I will keep that out as I don't want to be responsible if something goes wrong." That's something that we frequently hear. Have you encountered the same thing as well? If yes, could you talk about that? If not, what are the other kinds of resistance or lingering doubts you were able to observe?

**Barak Nissim** 44:17

With all the survey reports that we see and the talks with customers, I think Kubernetes remains complex with its knowledge gap. There are still pieces in the solution that are not 100%, even in its alternatives; if you deployed AWS in 2021, that wouldn’t have been perfect. However, the pace of new things coming into Kubernetes makes each gap that we see get answered very quickly. The most pushback that we see from customers is from the operational side of things, and this is why operators are very important as many customers may say, “I’m running on RDS. I don’t want to manage that as the data is complex.” It’s similar to a wild beast that nobody wants to tame. But we see that it gradually changes because customers understand how they do things. Four or five years ago, they might not have picked what they did today. There are solutions out there to make it easier to tame these databases. Mostly, it is from the operational side. The gap in running data workloads on Kubernetes is getting less pushback.

Besides, in every other industry, tons of other data-related workloads are less risky to put inside of Kubernetes. In the next 2022 and 2023, those are going to be the years of data on Kubernetes because this is running. This is how customers are modernizing their infrastructure. We see that new workloads are cloud-native, and cloud-native is getting a synonym as Kubernetes. The developers who have learned the values of Kubernetes in the DevOps space want to get the same in their production environment. This is the way that technology matures and moves from dev tests. Say, one morning, and people will ask, “Why isn’t it on Kubernetes?”. Similarly, from 10 to 15 years ago, people just woke up one morning and said, “Why is this workload not on VM?” “Why are we paying for a physical server?” “Why are we paying for all this operation?”

We’ll see this history repeating. People will wake up and ask themselves why they are running on whatever local or cloud provider in that specific country. It’s a trend as well. We see that Kubernetes is the interlink between all of these places. It’s the way to go.

**Bart Farrell** 48:06

I agree, and as you said, there have been other changes in the past, but these transitions and people are resistant to change. There’s going to be a lack of understanding. Also, the previous conversation I was having with someone today about the arrival of the Stateful sets a few years ago sort of started opening people’s eyes to this possibility. From there, we see more adoption and other ways of making it easier.

**Barak Nissim** 48:36

I’m getting a kind of mental note for myself here because we talked about the Kubevirt world, which is also connecting and sometimes mitigating that request. We see a lot of customers, or even in Kubecon, there are a lot of sessions where customers decide to go that way as it allows them to run VMs as something that they know and replace the infrastructure with Kubernetes. Maybe that’s a good next session to do, like KubeVirt and data on Kubernetes.

**Bart Farrell** 49:09

That sounds good. Let's get that in the calendar. Another thing you mentioned too is the workload. Traditionally, we think about databases and storage. We're starting to see analytics, streaming, machine learning, and AI. These other things are also becoming part of the ecosystem. The general feeling is, "it's easier to have everything all in the same place and let's find a way to make this work," and that's also reassuring to see the stack get broader. It's promising in terms of adoption.

**Barak Nissim** 49:41

The breadth of solutions Google probably will extract and get smaller as we go and converge as we see a few more leaders moving into the market. But this is what’s interesting in our field, and there’s no vendor lock-in. This is how you do things and mainframe, there’s only one provider, and that’s it. There are multiple solutions, and each has its advantages and disadvantages. This is what makes the market move.

**Bart Farrell** 50:10

I couldn't agree more. Barak, this has been amazing. Is there anything else that we need to know in terms of Ionia? News or anything that may come up?

**Barak Nissim** 50:19

Nothing special; we’re here if you’re interested in having more conversations. I’m also running a product, to be honest, so if you’re a customer and you’re willing to talk with us, we’re very interested in hearing from you and extending our help. We’re always open for conversation. This is not just in a commercial way.

**Bart Farrell** 50:51

Good to know! Once again, thank you very much, Barak, and to everybody who joined! We can always continue the conversation on [Slack](@slack) if you have any questions or comments.
