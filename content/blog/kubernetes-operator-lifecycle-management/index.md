---
title: Kubernetes Operator Lifecycle Management
date: '2022-11-28T15:43:46Z'
lastmod: '2022-11-28T15:50:15Z'
slug: kubernetes-operator-lifecycle-management
author: Melissa Logan
image: anynines-julian.png
categories:
- DoK Day at KubeCon EU 2022
tags:
- Carvel
- CRD
- helm
- OLM
- Operator
- Operator SDK
---

In this Talk, Anynines CEO [Julian Fisher](https://www.linkedin.com/in/julianfischer/) shares about the challenges of managing Kubernetes operator's lifecycle. Julian and his team benchmarked multiple tools that could help with that. The talk covers Carvel, Helm, OLM, Operator SDK, where the pros and cons are shared for each tool.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/_lQhoCUQReU" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<iframe src="https://www.slideshare.net/slideshow/embed_code/key/1FDdtwT2Won64K" title="Embedded content" height="485" loading="lazy"></iframe>

**Julian Fischer** 00:00

Great to be here in Valencia. I was lucky to have one of my teammates with me, Paul here and I, we traveled on our motorcycle to Valencia was a great adventure, and a great start to, you know, start this wonderful conference. So this is about Operator Lifecycle Management at [Anynines](https://www.anynines.com/), we do a lot of, you know, building and automating application development platforms with a strong focus on data service automation.

So, we've been automating databases for nearly 10 years now; we did a lot of automation and do a lot of automation based on virtual machines using [BOSH](https://bosh.io/docs/) from the Cloud Foundry ecosystem as an automation technology, which is also declarative by nature and has a lot of similarities with building operators. And as part of that, we know that you know, managing the lifecycle of [operators](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) is very important because databases are often used for years. And that means you have to guide these database instances through the lifecycle. So in this talk, we would like to, you know, have a brief look about at what does it actually mean to, you know, run operators for an extended period of time? And what are potential tools that could help us to do so?

So the first question is, what is operator lifecycle management about, and there are many facets to it. First of all, if you think about, you know, a more complicated operator, you're likely to have, you know, your CRDs, your controllers, admission controllers, you know, all those bits and pieces that assemble your operator, including container images, obviously, and they all form some sort of contract. So a certain version of a controller is, you know, capable of reconciling certain versions of CRDs and admission webhook. Efficient controllers also have certain version constraints. And of course, a lot of the magic happens within the container images. And they also version constraints. If you think about databases and their lifecycle, for example, Postgres, one of my favorite examples, we have customers who run applications for, let's say, 10 years, how do you guide a database instance, through its lifecycle for such an extended period of time? And it is, it is pretty clear that at some point, you want to take away at, say, a certain database version, let's say Postgres 9.4, you would just want to, you know, encourage your developers to migrate to a more recent version. So how do you do that with Kubernetes?

Building an operator, you also have to upgrade your operators from time to time, for example, to deprecate a certain API version. And this is basically, you know, some of the facets when you want to manage an operator over an extended period of time. In particular, one of the sub-problems in managing operators is of managing the lifecycle of your custom resource definitions. So if you, for example, again, think about a Postgres, then you'd have a CRD somehow representing your database instance. So if you introduce the first version, let's say as V1, alpha one, that's the API version of the CRD. It comes with certain capabilities, for example, a certain Postgres version. And at some point, you introduce a newer version of that CRD? Well, you want to make the new version of default, and the more versions are added, the more likely it becomes that maybe you want to remove you know, legacy versions, you know, from your Kubernetes cluster.

Now, deprecating a CRD is been possible, I think, since Kubernetes, 1.9. So you could mark a CID as deprecated. So if you, let's say, do the Postgres V1 one, alpha one, you get a deprecation warning. So the next step you could do is, you know, to stop serving this version so that you can create objects of that particular version anymore.

However, if you look into, you know, an extended period of time, at some point, you also need to migrate those objects that have been created already. Let's say we want V1 has been deprecated. It's not served anymore, but there are still service instances. What do you do with them, you need to migrate them, and it's surprisingly uncomfortable to migrate them. So, there, there is some extra work you have to put in there.

If you look at the process of upgrading such a CRD, you will see that you will have to, for example, upgrade the CRDs, the object stored in etcd, somewhat, there is a migration tool for doing that, but it's not been maintained very well, hopefully, because there will be some inherent tooling in future Kubernetes versions to take care of that. So that your old V1 alpha one service instances represented as those entities in Kubernetes, etcd can be upgraded more easily, you can do that, you know, with your own custom provided webhooks about still it's work. And they would be nice if this would be simpler.

Now, we at [Anynines](https://www.anynines.com/) want to build several, you know, operators and in many other extensions, that is, it's very likely that these operators will be deployed hundreds, hundreds of times in, in hundreds of clusters per customer. So if you think about that magnitude, use recognize that manual intervention of some sort is not desirable, it's just it takes too long, and wastes too much time of precious platform operators.

So first before digging into like building your own lifecycle management stuff, it makes sense to have a look at the tool landscape and think about, you know, technology that could do the trick for you? Well, the first guess, you know, in our researches was Helm with the slight feeling that held may not be the right tool, but because it's definitely the most popular one, it was the first one we actually considered.

So here's some of the drawbacks. It's, it's very popular, and you know, kind of mature because it's already been out there for, you know, extended period of time, it's rather easy to use, provides you with a templating mechanism, so that you can, you know, provide the end user with variables they can choose, and provide us as user provided values. It also has chart hooks, lifecycle hooks, so that you can do stuff, pre install, and post install of pre-upgrade and posting, install. There's no server-side components. So you don't have to install anything into Kubernetes cluster to make Helm work. It's purely CLI driven. And of course, there's a wide range of integration. So if you, for example, take a CI/CD tool, such as ArgoCD or crossplane, then crossplane has a different purpose by still this integration of Helm available, as it is the case with many other tools out there. So that's, that's nice.

However, if you think about managing the lifecycle of operators, you will see that as in particular, the lifecycle management of CRDs is it's not really, it's not really good. And, you know, there's discussions in Helm, on whether they should be improved. But so far, it appears that Helm is just not meant to have a focus on this. And therefore, the choice of Helm for this purpose is, it's maybe not the right one.

Also, it comes with limited dependency management, if you think about, you know, writing operators, you know, at scale, so we will have several of them, for example, we not only have the operator creating the service instance, but we also have CRDs, you know, for representing the binding between the application and, and the service instance, we call that service binding coming from the, you know, open service Broker API specification, as well as CRDs for creating backups and scheduled backups.

So, you know, it is likely that some of these components will be shared to some degree. So chart into dependencies to install, you know, an operator framework and have shared components among operators would be desirable. So both of these things no go and are showstoppers for using Helm, at least from our perspective.

Now, the other obvious choice is the operator lifecycle manager that ships with the operator SDK. It does have a server-side component, it's not really a problem, but just something that should be noted because the server-side component also has to be installed and lifecycle managed somewhat. It's designed solely for the purpose of managing operators. I mean, it's part of the operator SDK, it's kind of obvious. It also, the way you install in operator with OLM, is by creating a subscription custom resource, which also gives you the ability to parameterize the creation and the subscription a bit. But it doesn't provide you with a with the templating options such as Helm, we do.

One of the strong advantages of OLM is that it actually cares about managing custom resource definition lifecycle, in particular handling upgrades. There's, there's still some manual work left for you, but it actually helps you a bit more. We also have Paul here, one of our engineers who will be on [Slack](@slack), if you have more technical questions going into the details. And we are around the conference. And here, at least for today, and tomorrow. So reach out if you have further questions about this.

And once you have used the OLM to automate the installation of the operator, the operator SDK will also help you to package up the OLM package that you've created. Well, there's some drawbacks. I mean, it's not a general-purpose backup manager. So you have to stick with what you have to solve this problem on a platform scale with multiple tools or a combination of tools. There's no templating mechanism. So certain things like let a customer determine which labels to be set and so on will be harder to implement. There are workarounds for this, but it's not as comfortable as a templating mechanism.

There are no lifecycle hooks. So nothing similar to chart hooks. And upgrading, custom resources still has to be done automatically. There's some support for upgrades, for example, the status version, stored versions field is upgraded, after you have upgraded your CRs or, you know, manually could still means that you have some sort of automation, but you will have to provide.

The last option we've considered as Carvel. It originates from VMware Tanzu. A platform, it includes CLI and a controller, so it has both the client and server-side components. It is similar to OLM and what it can do, including upgrades of CRDs, also provides templating. The fact that it has App CR, which played the role of subscriptions in OLM, somehow also suggests that maybe it has had, at some point a stronger focus on apps. But the actual thing to consider here is that it's an early stage project. There's there's also no dependency management, which, as I said, may be desirable. And due to the early stage, there's little documentation, and it's not widely adopted yet. So let's see where this goes. But it's a promising technology. The fact that there's no artifact couple OperatorHub, I think is is it's not a big disadvantage, but it is still is one. And as I said, it's not as widely adopted.

So where do we land with, you know, operator lifecycle management, the topic is much more complicated than the few things I've been able to present here today and short period of time. So wait for some blog posts and material on our [YouTube channel](https://www.youtube.com/c/anynines) to come up in the near future about this because this is something we look into for an extended period of time.

So our conclusions are Helm doesn't seem to be focused on operators,promising but in nature, immature, and therefore for now we go with OLM. OLM potentially in combination with some sort of package manager for distributing, you know, a lot of OLM packages, a lot of operators in large platforms with a lot of Kubernetes clusters. But that's currently our educated guess for the near future.

Also to say from the perspective of developing automation for data service operations, it is surprisingly technical and complicated at this point in time, the operator SDK for example, covers only a fraction of the things that you need when automating databases. So I'm really looking forward to seeing more tooling in that space upcoming because there's so much more that can be done. So there's room for improvement. So that's it for now. If you have questions or comments, reach out. Thank you for your attention and see you soon.

15:15

Bye bye
