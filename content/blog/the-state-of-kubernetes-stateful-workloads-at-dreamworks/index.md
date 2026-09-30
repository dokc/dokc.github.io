---
title: The state of Kubernetes stateful workloads at DreamWorks
date: '2021-10-26T21:22:39Z'
lastmod: '2021-10-27T16:23:21Z'
slug: the-state-of-kubernetes-stateful-workloads-at-dreamworks
author: Melissa Logan
image: DoKC-Head-of-Content-Sylvain-Kalache-and-Dreamworks-Data-Service-Lead-Ara-Zarifian.jpg
categories:
- DoK Day at KubeCon NA 2021
- End user
tags:
- Database
- End user
- multi-cluster
- Operator
---

Interviewed by DoKC Head of Content Sylvain Kalache, Dreamworks’ Data Service Lead Ara Zarifian discusses how the company is managing stateful workloads on Kubernetes, key benefits, and challenges. DreamWorks currently runs 370 databases on over Kubernetes 1200 pods. Ara shares about the innovative standard they developed for Kubernetes operators. This innovation allowed them to grow the number of databases hosted on Kubernetes without needing to exponentially increase their DBAs headcount.

This talk was given as part of [DoK Day at KubeCon NA 2021](/dok-events/), watch it below. You can access the other talks [here](https://youtube.com/playlist?list=PLHgdNuGxrJt2twht-2suDZaV2zlptDJIf).

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/wGnMcoZH31o" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

[**Sylvain Kalache**](https://twitter.com/SylvainKalache) 0:00

Welcome.

**Ara Zarifan** 0:03

Sylvain, thank you for hosting.

**Sylvain Kalache** 0:06

Ara Zarifian is the head of data service at DreamWorks, where he directs the development of the database platform that is hosted on Kubernetes.

For those who don't know DreamWorks, it's an American animation studio that produces animated films and television programs. Ara actually started to develop this container database as a service platform at DreamWorks in 2017. And then he went to work as an SRE at NASA, but then his heart brought him back to DreamWorks where he took on the role of cloud architect to develop the company presence in other data center, and in the cloud.

Let's get the conversation started. You are a Kubernetes user since 2017, what stateful workload are you running on Kubernetes? And if you have any interesting numbers such as the number of clusters, amount of data, QPS this sort of thing, please share them.

**Ara Zarifan** 1:36

Well, first, thanks for the introduction. And thanks for hosting. So almost all of the stateful applications that the data services team at DreamWorks deploys today, as you mentioned, are deployed to Kubernetes. This includes database types like Cassandra, Couchbase, Consule, Kafka, Elasticsearch, Redis, RabbitMQ, MongoDB, and Zookeeper. This list should include Postgres soon as well. As far as interesting statistics go, we're running around 370 databases with over 1200 pods.

**Sylvain Kalache** 2:14

As DoKC [Melissa Logan](https://twitter.com/melissa_b2b?lang=en) said this morning; Data on Kubernetes is a thing. And organizations are running all sorts of stateful workloads on Kubernetes. From storage, databases, archive, backup streaming, and so on. We've also seen users that are running nearly their entire stack on Kubernetes, including their stateful workloads. Do you have anything around machine learning? We've seen that a number of organizations who are really advanced with Kubernetes, and they see Kubernetes as kind of like the next thing when it comes to hosting machine learning workloads.

**Ara Zarifan** 3:11

So as far as machine learning workloads go, that hasn't been necessary in the purview of my group. We have had other teams across the studio show interest in using Kubernetes for those kinds of workflows. But you know, that kind of work hasn't been taken on by my team.

**Sylvain Kalache** 3:34

Right, so as I mentioned, Ara’s specialty is databases. But it's quite interesting that the almost entire stack of DreamWorks is on Kubernetes. I think that really reflects what we have seen in the [Data on Kubernetes 2021 survey](/dokc-2021-report/). Why did you decide to move stateful workloads to Kubernetes? What were the driving reasons that push you to do that?

**Ara Zarifan** 4:05

The introduction of Kubernetes was really like the natural evolution for the database as a service platform that we have been working on for quite a while. So when the initial work for this, this database as a service platform started, the problem statement was fairly simple. How do we run a lot of database clusters on bare metal, on prem infrastructure? We kind of look to Linux containerization Docker as the first piece of the puzzle. With the first Docker-based iteration of the platform, we knew that there were several weaknesses that we wanted to address. There were specific parts of the provisioning process that we were still either doing totally manually or using bespoke automation. This included things like selecting specific hardware based on available resource capacity determining available IP addresses and configuring container networking, carving out local volumes for persistent storage, creating and updating DNS records. With these kinds of weaknesses around even basic things like reacting to a node outage or something like that was difficult. With Kubernetes, there was an obvious way to kind of check off all of these boxes, scheduling workloads, head it off to the cube scheduler, IP address management, and container networking configuration became a function of the CNI, storage provisioning, we offloaded that to our storage driver. The management of DNS records, based on the current state of things that were running in Kubernetes was handled in an automated way using a controller that we've been using called external DNS. So it really solved all of the gaps that we had in our bare Docker-based implementation.

**Sylvain Kalache** 6:11

Doing containers in production in 2017 was definitely being a pioneer. Back then people were “oh, cool containers! It's a very cool toy!”. But then when you wanted to do something, anything production-related then they were like “well….”. Even running stateless workloads on containers at the time was a bold move. Then Kubernetes came as like, the Messiah: “we can solve all of these issues that we're having with containers”.

So maybe, let's take a step back. So why did you decide to use containers for stateful workloads? Stepping out of the Kubermnees topic here. Because in your answer, I understand that you started with Docker containers. What were the reasons that you had in mind for that?

**Ara Zarifan** 7:10

The reasons are fairly simple. If we want to colocate, let's say like 10, 15 different Kafka clusters, on the same set of physical machines. Machines that maybe have 128 physical cores, and a terabyte of RAM. We had to use something, whether it be VMs, or containers to kind of isolate environments container containerization,which was kind of gaining traction. And it seemed like a good way to sort of package database applications, we can release, or build new images to capture or to match new version releases and things like that. It was a mechanism that we used to isolate and colocate many database clusters.

**Sylvain Kalache** 8:15

You mentioned that the reason why you joined DreamWorks a second time was to expand the company’s footprint in other data centers and the cloud. So, what was this transition to hybrid driven in a significant way by Kubernetes?

**Ara Zarifan** 8:39

No, not really, actually, it's kind of, although there's something to say about it. Because of the way we had approached deploying databases on-prem. Moving into an environment like Azure, where you can just set up a managed Kubernetes cluster, and you have the sort of same interface to interact with, to deploy the databases that you've been deploying on-prem for a year or so, the transition into a cloud environment was very, very seamless. It was just another hosted Kubernetes. It was It wasn't driven by that, but it very much facilitated expanding into different environments, I think demonstrates the power of a common API across both on-prem and cloud environments.

**Sylvain Kalache** 9:44

We just released the [DoK 2021 report](/dokc-2021-report/), you can download it on the [DoK website](/). We surveyed about 500 organizations, and we had an almost nearly identical distribution between on-prem, private cloud, and public cloud. Kubernetes is a way to be hybrid, but also to avoid this famous vendor lock-in. And that's true for stateless and stateful workloads. So now that you've been doing this for years, can you share about the benefits of really using Kubernetes? Which became the standard way to pretty much deploy anything at DreamWorks. We found that that productivity spike was something that organizations running Kubernetes at your scale were experiencing. And here I'm speaking about 75% of their production workloads on Kubernetes. The reports show these organizations being as much as two times more productive. So is better productivity something that you experienced? Have you seen other benefits?

**Ara Zarifan** 11:14

All the manual work and custom automation that I was referring to previously, all of that simply evaporated with the adoption of Kubernetes. And our goal of being able to scale to support a very large number of database clusters, without needing an explosion in the headcount required to manage those same databases, was really made possible by that move. And kind of another overlooked benefit has been kind of the consolidation of technologies used within DreamWorks. So Kubernetes was already being used in the larger platform services organization at DreamWorks, prior to the Data Services team adopting it. Our SRE team, which manages stateless microservices, had adopted it years prior. So by standardizing on a common platform the two teams are able to share ideas and build upon a common set of core technologies. It's become very common for us to collaborate on building out some underlying feature with the platform itself, advances that one team makes, benefit the other as well.

**Sylvain Kalache** 12:45

Standardization is definitely a huge reason why organizations are moving to Kubernetes. And actually, the more you migrate to it, the more you can capitalize on that. It's quite interesting that you say that “using Kubernetes enabled more collaboration between teams”. I'd like to hear more about DBA. Do you think that the fact that that we bring more standards to the data management will empower the management to become more streamlined and straightforward? If we think about the way we manage storage and compute today; it's very easy. For databases, it's still quite complicated, not only for databases but stateful workloads in general. So do you think that data management will become more of a commodity? And therefore, teams will be able to focus on more interesting problems more closely linked to the business?

**Ara Zarifan** 14:00

For sure. When we were first building out this platform, it really felt like we were kind of at the cutting edge of doing what Kubernetes was capable of accommodating as far as workloads go. We sort of saw a lot of the conventional knowledge and talks about avoiding running stateful workloads in Kubernetes. But for us, the benefits as you said, consolidated on a set of core technologies that multiple teams can use, allows us to kind of focus. We are not missing managing some of the more menial work that had gone into the way that we were deploying databases previously, a lot of the sort of manual decision making that DBAs had to conduct to spin up a new database cluster. All of that has been taken on by automated controllers. And it's allowed them to kind of think about higher-level problems. It has allowed us not to occupy the mental bandwidth to handle some of the more menial operational tasks.

**Sylvain Kalache** 15:50

All of this sounds amazing; I think the audience is like, “okay, let me put everything on Kubernetes!”. But wait a second, it cannot be that easy? I'm sure you face a lot of challenges, outages, can you share about this? Because moving to Kubernetes, is the future of infrastructure, but at what cost? What problems did you face? How did you solve them? Any interesting outages that you can share?

**Ara Zarifan** 16:25

Sure, when I think about nightmarish outages, they actually predate Kubernetes. For some of the challenges that we faced, I'll provide a bit of context first. So we actually decided to build our own operator or set of operators. And that initially, when we were kind of thinking through how we leveraged Kubernetes, for database deployments we had a lot of different vendors that we had relationships with that were providing or intending to provide their own operators for the different databases and stateful applications that we were using. But we wanted a way to be able to ensure operational consistency across the different database types that we support. So we ultimately decided to build our own operator. The way we kind of sought to maintain that consistency across types, application types. We took an approach that was a little bit different from some of the operators that we had been saying, our goal was to decouple implementation-specific logic from the operator itself. So rather than tying the operator to a specific set of database types, we try to encapsulate database type specific implementation details into the underlying container images, using a standard that we developed internally. So to give an example, while taking a backup of a Couchbase cluster, might look different than taking a backup of a Cassandra cluster, we wanted the operator to be able to not necessarily know about that, we wanted to be able to interact with the underlying containers in some general way to take a backup and it would be able to do a common set of operations across different database types in kind of a generalized way. So one of the challenges to get this platform off the ground was building images that were compliant, and actually coming up with the standards themselves, that govern how those images were to behave. So there was a lot of upfront cost associated to support different database types. There's going to be a lot of differences across them: the way they discover peers, the way they handle nodes crashing, etc. There was a lot of upfront investment to make sure we had images that could be interacted with by a generalized operator that would allow us to run databases in this way.

**Sylvain Kalache** 19:27

Interesting. It’s the first time I have heard about this paradigm of building a one can-do-it-all operator and adapting the images so that it works. You said that you took this decision back when vendors were not developing their operators. And basically, you had no choice. Do you still believe that this technical decision was the best?

**Ara Zarifan** 19:54

At that point, a lot of our vendors were at least planning on releasing their own operators in the near future. So it wasn't an approach that we decided on because of the lack of options. We knew that those were in the pipeline. But we decided on this approach, again, to make sure that we didn't have to train our DBAs to understand how to use all these different operators. We wanted a common spec to define a database in a generalized way. The thing that this has helped us with is when we need to onboard a new database type, let's say one of the development teams comes to us and says “we need database X supported by you guys”, then the work is simply a matter of creating a new compliant image. It wouldn't have to necessarily involve changes to the underlying operator, or significant changes, I should say.

**Sylvain Kalache** 21:13

For those in the audience that don't know about operators, they are basically an extension of Kubernetes, that allows users to do day to day operations specific to each application. So if we take the example of a database, it would be for needs such as applying a patch, an upgrade and you need to shut down nodes of the database in a specific order, which may be different, let's say from Postgre to Couchbase. Kubernetes cannot manage natively. You have to embed this piece of logic in operators. Operators are actually the main barrier of adoption for data and Kubernetes. We found out through the survey, that [40% of respondents](/dokc-2021-report/) who believe Kubernetes is not ready for data on K8s is because they believe there is a lack of quality operators.

What you are sharing with us is reflecting what we found out in the survey as well: the lack of standards is making the management of operators extremely complicated because everybody – vendors or end users – are developing it with their own tech standards. So it's very hard then to streamline every time you use a new operator, you need to learn something new. This is why you decided to build a one fit all operator and then make your images compatible with that. Is your operator something that's open source? Or if not, are you thinking about it?

**Ara Zarifan** 23:02

This is an interesting question. So we actually sold the intellectual property for the operator in the past. It's very recent, in the past couple of months, to a storage company. We're still collaborating on the development of that operator, where we're providing feedback with new features that we had envisioned originally. So I don't know if it's open source. And this is not in our domain, unfortunately, anymore.

**Sylvain Kalache** 23:50

But so it sounds like we're hitting the spot, right? If a company was willing to acquire the IP, it sounds like you did something amazing and solved an industry issue considering that Kubernetes is an open-source project. I hope that this company will think about making this an open standard. What's your personal opinion on the fact that vendors or the Kubernetes community should come together to develop standards for operators? And do you think operators are kind of the endgame, or is it only a milestone toward something more elaborated?

DoKC’s member [Rick Vasquez](https://www.linkedin.com/in/rickvasquezii/) wrote an [article on the new stack on the topic](https://thenewstack.io/kubernetes-needs-deep-system-integrations/). He argues that operators are a good first step, but that ultimately databases will need to better integrate natively with Kubernetes. So how, how do you see operators standard playing? Is it something that you've seen emerging or something that's not there at all yet?

**Ara Zarifan** 25:16

It's hard to say whether something will completely replace it. I think the amount of logic that needs to be encoded in the way a database interacts with Kubernetes that when we were developing the operator ourselves like that, there were specific things that we kind of thought, “oh, man, I wish, wish Kubernetes had better support for this kind of abstraction”. So I think the emergence of additional abstractions may sort of ease the number of things that operators have to implement themselves. The further-reaching the standards progress the less and less there will be for operators to implement themselves that that would reduce the sort of sprawl in the quality of operators, or, I shouldn't say quality, but just the variation across operators that, that you'd see it as you examine this sort of operator landscape. So I think the development of additional abstractions would go a long way to kind of limiting how much operators have to implement themselves, which may make them you know, more palatable to end-users.

**Sylvain Kalache** 26:51

Variation, I think, is the right word. I think today, it's a bit too much “do it as you want”. Also, and there's a [great article in The New Stack](https://thenewstack.io/kubernetes-when-to-use-and-when-to-avoid-the-operator-pattern/), where the writer argues that operators should, most of the time, only be developed for stateful needs and not for stateless. So the writer was explaining that a bunch of companies writes operators for stateless use, which should not be the case, because Kubernetes should handle that. It is similar to using a hammer for nails, then use it for screws, the tool work, but it's not the best one. So I think there's also a misunderstanding about what operators are for, and it’s really something we should clarify.

Looking at questions from the audience... Sounds like you are a very accomplished company when it comes to running stateful workloads on Kubernetes. One of the questions is: what type of Kubernetes technologies are you using to make this possible? Are you using statefulSet? What type of backend storage are you using? Is there any SAN involved in your infrastructure?

**Ara Zarifan** 28:44

We use a couple of different storage drivers. The one we're commonly using now is [Portworx](https://portworx.com/). And I don't know, the audience members, level familiarity with it, but it essentially allows us to use local storage that's present on the compute hosts that comprise like a Kubernetes cluster to create a storage pool that Kubernetes can then carve volumes out of. Portworx has a product that takes the locality of storage into account when scheduling the actual workloads. So previously I said, workload scheduling was handled by cube scheduler, it's being offloaded to that storage scheduler. So yes, that's that's been our strategy for storage predominantly.

**Sylvain Kalache** 30:08

Portworx is a platinum sponsor for the data and Kubernetes community. So, thanks to them, we can make this [DoK Day NA 2021](https://youtube.com/playlist?list=PLHgdNuGxrJt2twht-2suDZaV2zlptDJIf) happen. We are grateful to have them on board. We are really seeing Kubernetes shifting the industry to create new paradigms to make this kind of container focused architecture made possible and it's something that has to be done by the open-source community, but also by vendors and, and we've definitely seen a lot of great thing happening with Portworx.

If you had a magic wand, what would you ask it so that you could better and your data on Kubernetes? Your wildest dream?!

**Ara Zarifan** 31:38

I don't know if you'll get a very wild answer. One of the things that we wanted to model with custom resources has been the relationship between different database clusters. So think, perhaps cross data center replication or something like that. But we wanted to represent these relationships in it also in a generalized way. But oftentimes, those kinds of relationships are going to span multiple Kubernetes clusters, right? If you have a database that's deployed in datacenter, data center X, and another one deployed in datacenter Y, that is generally going to involve separate Kubernetes clusters.

So one of the things that I've been looking at for, for some time, and I've been hopeful that progress would be made by community-driven efforts, has been sort of the standardization of multi-cluster or federated environments. The last KubeCon I attended, I went to the talks on KubeFed, I've had deep interest in seeing how that develops. There have been a lot of companies I've seen in the last couple of years that have put out products or developing products to support some various facets of multi-cluster environments. But if we were to have an overarching community-driven standard for how to approach these kinds of topologies, it would make planning and modeling, these sort of like cross-cluster abstractions that span Kubernetes clusters, much less challenging.

**Sylvain Kalache** 33:37

That's actually not the first time I hear about this cross-cluster data center issue. Can you share what is the actual issue? Is it a networking issue? Is it like a design issue? What are the challenges that make this difficult at the moment?

**Ara Zarifan** 34:02

Let's use a hard example, let's say we wanted to set up Kafka clusters and enable some sort of like geo-replication using something like mirrormaker. And we wanted to define that declaratively using some API, we would need some kind of like federated view of our environment. We would need to know the current state of cluster X and Y in a commonplace to be able to define that higher-order relationship across those clusters so that that federated view is, I think, something that things like KubeFed could provide. That sort of thing that I've been seeing, I think, I think the problem is multi-cluster probably means different things to different people. So you have different products that may address it from a networking perspective. They allow routing between pods in one cluster to another or something to that effect. But if you want something that federates state, gives you a federated view of everything that you have running everywhere, across all of your Kubernetes infrastructure, that sort of thing. You don't want to make an investment on something like that, and then realize a year later that they're moving away from that approach, like what happened with KubeFed be one. The role of something like that would be so integral to how you're doing everything, but it's something that you would want to have some sort of staying power, some sort of clear community-driven direction. That'll make you feel okay, relying on it.

**Sylvain Kalache** 36:08

So it's not something you'll build and then sell to another company? I think DreamWorks may become a software company after all, right? That's your new business model!

So it's very interesting to speak about a declarative way to state what you want. And we spoke about the benefit of having a standard way to deploy your application. Do you see new technology patterns emerging thanks to this new data management concepts that are coming out of DoK?

**Ara Zarifan** 37:12

The way I kind of see this paradigm shift, for us anyway, has been, has mainly been the way Kubernetes has influenced the way we think about different workflows. It's reduced the cost associated with spinning up new environments, so much to the extent that we have new possibilities that are available with us with regards to how we devise new sort of operational workflows. But yes, as you said, I'm curious to get your thoughts as well.

**Sylvain Kalache** 37:50

When cars appeared, people were scared about them. And so the constructor would put a fake head of a horse on top of it so that people would think, “it's just like a horse, with a different shape”. And so people would get used to it, which obviously, is completely wrong, right? What would you do that? And so I think in some ways, it's what is happening today with that on Kubernetes is that we are moving existing paradigms, products, technology to Kubernetes. But really, I believe that we are going to see new ways, new products, new technical implementations that were previously not possible because we didn't have this orchestrated container power. And so, one idea that may or may not be relevant is about data privacy and compliance. Could containers be a way to safeguard user privacy by using containers that we could move, potentially across different services or products? Facebook has been in the news, a lot of issues around privacy. So I'm just curious, if some of you in the audience have ideas, please share them on Twitter on our slack. We'd love to hear from you. So I'm going to take one more question from the audience. A question from [Patrick McFadin](https://www.linkedin.com/in/patrick-mcfadin-53a8046/) asking: “what do you feel is important for vendor interoperability in Kubernetes”?

**Ara Zarifan** 39:57

Vendor interoperability. I think it kind of relates to what we were talking about before. If, if I'm understanding the question correctly. I think it's difficult because there just aren't any standards to govern interoperability. It's something that I hope progresses with the emergence of new sort of, like core abstractions to support that kind of interoperable operability across operators.

**Sylvain Kalache**

I've got a message from Bob that we need to wrap up. Do you want to share anything you know, maybe you're hiring or this type of thing like anything that you want to share? Now is the time.

**Ara Zarifan**

No, I don't have anything to share. Thank you for hosting silver added pleasure talking with you. Thank you very much. I hope I will we see a lot of new topics emerge in this area over the next few years.

**Sylvain Kalache**

Thank you Ara, that was extremely interesting. Passing the mic to [Bart](https://twitter.com/birthmarkbart)!
