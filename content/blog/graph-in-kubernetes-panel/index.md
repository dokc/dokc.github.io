---
title: Graph in Kubernetes Panel
date: '2022-12-12T10:21:44Z'
lastmod: '2022-12-12T15:22:00Z'
slug: graph-in-kubernetes-panel
author: Melissa Logan
image: IMG_0926.png
---

Graph databases are the fastest-growing data store in the world. [According to Gartner](https://www.gartner.com/en/newsroom/press-releases/2019-02-18-gartner-identifies-top-10-data-and-analytics-technolo), the application of graph processing and graph DBMSs will grow at 100 percent annually through 2022 to continuously accelerate data preparation and enable more complex and adaptive data science.

However, it is often difficult for data and analytics professionals to distinguish between different implementation models, and to fit them into their use cases. This panel speaks directly to Kubernetes users by a group of experts and provides them with the context they need to run stateful workloads.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/KtA4DvYylg0" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

**Bart Farrell** 00:00

Hello, everybody, and welcome to the graph in the Kubernetes Panel. This is a great chance to hear from a group of experts on the Kubernetes side, as well as on the graph side, see the sort of intersection between graph and Kubernetes. Two of our favorite trends, if we're talking about data management, it can be difficult for some data and analytics professionals to really understand the differences between data implementation models. So to get them, like I said, sort of figured out on the right track until we got some wonderful folks today, to join in this panel and share their knowledge. So just want to do a quick round of introductions first, and we can start with you [Feynman](https://www.linkedin.com/in/feynman-zhou/).

**Feynman Zhou** 00:37

Thank you for having me. So glad to be here. My name is Feynman Zhou. I come from Beijing, China. And now I'm currently working at [QingCloud](https://www.qingcloud.com). And I am the community manager and the CNCF ambassador. And we have developed an open source project based on Kubernetes. Name is [KubeSphere](https://kubesphere.io) and it has helped thousands of users to adopt Kubernetes in their production. And we help a lot of users with the learning curve of using Kubernetes.

**Bart Farrell** 01:16

Next up, we have a person who's no stranger to our community. [Wey](https://www.linkedin.com/in/weygu/). Can you introduce yourself?

**Wey Gu** 01:25

So this is Wey Gu from Shanghai, super excited to have this chance. I come from a team dedicated to working on an open source graph database named [Nebula Graph](https://www.nebula-graph.io). And we benefit from the work Kubernetes offered to us. And I'm personally a huge fan of Kubernetes. And then run k3s in my home lab. So I hope we can have a great talk today.

**Bart Farrell** 02:00

Sure, we will. And last but certainly not least, [Cheuk](https://www.linkedin.com/in/cheukting-ho/) from [TerminusDB](https://terminusdb.com).

**Cheuk Ting Ho** 02:04

Hello, I'm so glad to be here. I'm Cheuk and I'm based in London, UK. So TerminusDB is an open source graph database. And I can see that there's actually a lot of potential to be able to have a graph database working with a Kubernetes kind of structure. I think it will work very well, but we'll go into it in a bit.

**Bart Farrell** 02:33

All right. Sounds good. So the first question is just to get things moving. We know the graph databases are the fastest growing data store and overall popular, and we're taking that into the Kubernetes world, it can maybe get a little bit complex. So using graphs on Kubernetes isn't necessarily as known perhaps, as some other instances that we've seen in our community. Could you just give me a flavor of  the sort of use cases that you're seeing out there and what it might tell us about the potential of scaling the Knowledge Graph with Kubernetes? Can we start with you, Wey?

**Wey Gu** 03:09

So graph databases excel at many proven use cases that rely on data relationships with being written and read at scale. So one of them is the major one is the Knowledge Graph and something others like recommendation system, or real time era intelligence based control system, or in our data domain is like data metadata management, or data lineage, etc. So scaling, graph data in distributed fashion introduced slight, different challenges compared to more structured data scenarios like a tabular database. But our experience shows that a better approach is to shadow those differences.

So we actually expose our graph database in the operational-wise surface, we expose them in a quite similar way to other non graph databases. So in this way, the operation patterns and the distributed architecture actually quite fit what Kubernetes already provides us. And I can see that more and more users are putting graph databases on Kubernetes. And it's also worth mentioning that our team is providing a managed graph database service at scale, and is fully managed on Kubernetes.

**Bart Farrell** 04:41

So lots of stuff going on there. Cheuk, anything that you'd like to add?

**Cheuk Ting Ho** 04:46

I think that the benefit of having a graph with Kubernetes is that because it is, again, like scaling issues, right? Like why people love using Kubernetes, because it's so flexible, you can scale it very easily. And having a graph database, for example, what we have done in our infrastructure with a cloud service Terminus X is that we can actually scale up very easily with different processes, because you can separate the graph and the store, and the store is just like, right now we are using one store.

So you can scale up very easily to like, just have all the users access to the store. So I think, because of the flexibility of how a graph database is structured, you can kind of customize it to the way that you really want, like, you're gonna have a scalable computer. And also like, if you want, you can also scale the store as well. So, I think that was really more flexible in the most traditional databases. And also with schema, you can govern the whole data coming in, and it will be really good for collaboration when you have a use case that scales a lot, a lot of users and others, so it will be great.

**Bart Farrell** 06:12

You mentioned some of the things about Kubernetes, that people like the flexibility. Feynman, if we're talking about graph databases, or even more broadly databases in general, what are some of the features you think that Kubernetes has that is going to be allowing more and more folks to be running stateful workloads on Kubernetes?

**Feynman Zhou** 06:31

I could give a real case study for this question. As Wey has mentioned earlier, their company is providing the graph database as a service, which is all in Kubernetes. I would like to demonstrate a real use case that is Nebula Graph on KubeSphere. That is the interesting use case that I hear from the DevOps team from the company behind the NaviGraph Realsoft. As I know, Realsoft is building their database as a service platform on Kubernetes with multi-cloud architecture. I remember the name is Nebula cloud. The most important thing is that I find their DevOps team is also using KubeSphere as their Kubernetes platform, since they shared their case study in our in-person meet up. And this case also inspired me a lot.  I will share their thoughts and their considerations when they adopt Kubernetes as the underlying infrastructure when building their database as a service. Before they build the database platform.

Back to the beginning of 2021, they did a lot of investigation around running databases on Kubernetes. For example, they are considering Kubernetes maturity state for capabilities and high availability, and performance characteristics of running databases in containers and Kubernetes. I remember there are some obvious advantages they have mentioned before, for example, simplicity of deployment, and having the whole stack management by the same orchestration tool, you know, Kubernetes autoscaling and automatic re-provisioning of failed containers leading to high availability. So for example, if one of the nodes running a database fails, Kubernetes will have auto scaling and self healing, which helps you to reschedule the workloads and pass to other nodes.

When it talks about the benefits of running stateful workloads or databases on Kubernetes, I think that Kubernetes provides an operating pattern that defines custom resource definitions that are high level objects, which typically interface the capabilities as simple Yaml files, which allows you to deploy and manage your database workloads and the resources in a simple manner. As for the second part, I think Kubernetes also provides the capability to automate the data operations. For example, it provides deployment, high availability, backups, observability, patching, upgrading, and so on. All of these are out of the box on Kubernetes. So operators can encode these operations into CRD (custom resource definition). And last but not least, I think the multi-cloud possibility is also the consideration that the Realsoft DevOps team has mentioned before, since they are building their database as a service across AWS, Azure and Alibaba, Alibaba, cloud Kubernetes services.

**Bart Farrell** 10:12

Very good, very comprehensive answer with a lot of depth there. It's good to take this status a little bit further. So we can all agree that you folks are believers when it comes to running graph databases on Kubernetes. But do you think that Kubernetes makes graph databases better? And if we consider the inverse, you know, looking at it from the other direction, is graph the best technical deployment pattern that allows users to really get the most out of Kubernetes? We can start with you, Chuck, what do you think about that?

**Cheuk Ting Ho** 10:44

I think right now, Kubernetes is basically the choice for a lot of cloud applications. Because like the benefits that we have just discussed about, I think that for graph databases if, you know, because it works well with Kubernetes, I think it will be very good to empower the graph database in that case, to really make it more powerful for Cloud Service, for Cloud application. So, like if you know of course, you can run graph databases locally, or like run it in just a single container and stuff but with Kubernetes, I think it really opened up a lot of possibilities, and really make it modernized to the modern standard, the golden standard of the industry of cloud services. So I think that's the good thing about it.

**Bart Farrell** 11:42

All right. Well, anything that you'd like to add to that?

**Wey Gu** 11:47

Regarding the Kubernetes making the graph better, I think my answer is yes. And it applies in many cases and angles. But one of the most important angles that I think it's even more true is in the case of the hyper scale graph, or high accuracy, graph traffic scenarios. In those scenarios,  they will demand the states to be distributed by nature. And in this case, Kubernetes encountered the full potential of distributed graph database, where we have the auto ops decouples, expertise on scaling, failover, and tuning and the tooling brought by Kubernetes ecosystem out of both is come to enable even more modern in the office, like, we can leverage the infrastructure as a code and the data ops together with other application layer, so in this year, so most of the application, and other data stack data infra in most cases, they are already running on Kubernetes too and those and the final one is those concepts and factors being managed and operated in a in a disability database. In their DNA. It's actually simplified if we manipulate every state and meta state from the abstraction brought by Kubernetes. In fact if we manage those kinds of systems, you know, the distributed system is complicated. If we manage them barely on the operating system itself, we can run it from the binary package, but it's even more complicated. So through the abstraction from the Kubernetes, it's easier in my opinion.

**Bart Farrell** 13:37

Feynman, anything you want to add there?

**Feynman Zhou** 13:41

Yeah, as I mentioned earlier, I'm not an expert in the graph database domain, but I can give some thoughts around the Kubernetes. And running stateful workloads on Kubernetes. Apart from the most important part, the Kubernetes operator pattern, it also provides the deployment, high availability, backups and monitoring, all of the capabilities are provided by the Kubernetes operator. And we know we have some installation methods to quickly set up the workloads and resources for the stateful workloads, such as Helm charts, or [Kustomize](https://kustomize.io). I think the most important thing is that the design pattern of Kubernetes is that it provides a unified layer and a standardized API for any kinds of workloads. As you know, the stateful sets had been brought to GA around three years ago, and plus the cloud native storage, such as [OpenEBS](https://openebs.io) and something like that. It also helps you to easily manage your graph database on Kubernetes.

**Bart Farrell** 15:06

I think it's very clear that we're generating a strong amount of interest in taking this topic further. So if people want to learn more about graph databases getting them on Kubernetes, Cheuk, where are some of the best resources, the place where they should go? To be folks such as yourselves, but to get better informed about this? So it's more comfortable for them when they're making the next steps?

**Cheuk Ting Ho** 15:29

For example, if people are interested in TerminusDB, we do have resources that people can go to, to have a look to see if that works for them. I think the best way is to join our Discord channel to chat to the team. We have our superstar Robin in the team that is happy to answer your questions, if you want to see whether TerminusDB will work in my infrastructure and things like that. Also, there's lots of teaching resources on our website, as well that you could see whether the team can work for your use case where the graph database would be the choice  of your project. Check it out. That's all I can tell at this point.

**Bart Farrell** 16:19

With that in mind, I guess, every database is kind of its own world. All right. Are there things that people need to keep in mind specifically, when it comes to graph databases?

**Cheuk Ting Ho** 16:27

I think the specific thing is whether you need a graph database, right?  And lots of times, I know, folks are very passionate about the newest and the shiniest tools and the new technology. But I think, looking at your use case, if you have a kind of relatively confined and small use case that is already working well with the relational database, then maybe you don't need it. But lots of times we have seen folks really dedicate time and effort to work with us. Is that because the use case really needs the huge flexibility and complexity of a graph database? So I think that in the long run, I would really wish you could make the decision before you invest. Of course, learning is good, like, we all love learning new technology, but I think when you go hands on and really like trying to migrate your data, you have to think about this kind of decision before you really engage and invest in it.

**Bart Farrell** 17:32

Well, what would you recommend to folks who want to get more into graph databases in Kubernetes?

**Wey Gu** 17:39

You can also check Nebula Graph on our GitHub, Slack, our Discord forum. And we have some documentation and hands-on toy projects to help you understand more of what a graph can provide in a database perspective. From Kubernetes perspective, we have a playground you can check and how it can help you automate everything. And also you can check out our Kubernetes operators of the Nebula Graphs yourself on GitHub, so you can learn some patterns and the limitations and what can be done with Kubernetes plus the graph database.

**Bart Farrell** 18:31

Feynman, last but not least.

**Feynman Zhou** 18:33

Actually before migrating all of your workloads, especially for the stateful workloads to Kubernetes. I think you have to consider if you are an expert, or operator for Kubernetes. So actually, we also provide a series of Kubernetes learning resources for users, especially for the newbies. So if you want to learn more, especially for the practice of Kubernetes, for example, provisioning a new Kubernetes cluster, we have some tools like that. I'm not sure if you have ever heard about it. KubeSphere provides a cluster management and provisioning tool, whose name is [Kubekey](https://github.com/kubesphere/kubekey), which helps you to provision an all in one Kubernetes cluster with all of those add-ons you want. So if you want to dive a little bit more into Kubernetes, we also have a video tutorial website so you can check out to see what's going on there.

**Bart Farrell** 19:37

So I think when it's very clear, there's lots of stuff to learn, lots of places to do it, and lots of really helpful people to make this transition easier. Thank you all very much for joining us today. We got a lot in a short period of time. This is clearly a subject we will be taking further as we've seen as well too, with the talks we've had with Wey and also with Cheuk Ting from Terminus and always wonderful to have you Feynman someone who's very very active in the in the Kubernetes ecosystem so thank you all for being with us today.
