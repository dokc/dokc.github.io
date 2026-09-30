---
title: Kubernetes Needs Deep System Integrations
date: '2022-03-14T14:28:38Z'
lastmod: '2022-03-02T09:42:44Z'
slug: kubernetes-needs-deep-system-integrations
author: Melissa Logan
image: IMG_0509-scaled.jpg
categories:
- Opinion
tags:
- Database
- kubernetes
- Operator
- Oracle
---

Cloud juggernaut Kelsey Hightower recently [shared](https://twitter.com/kelseyhightower/status/1409297909774831618) that the Google team had, against all odds, created a Kubernetes operator for Oracle database. "Here we are, we have officially crossed the chasm," said Kelsey. But have we really?
> Last month our team released El Carro, a tool that automates running Oracle databases on Kubernetes.

Never thought I'd mention Oracle databases and Kubernetes in the same sentence, but here we are, we've officially crossed the chasm. <https://t.co/UFKI0oiQ7Q>
— Kelsey Hightower (@kelseyhightower) [June 27, 2021](https://twitter.com/kelseyhightower/status/1409297909774831618?ref_src=twsrc%5Etfw)

While putting stateful workloads into Kubernetes used to be a challenging task, this is no longer the case with StatefulSets. The Kubernetes ecosystem has worked diligently and specifically on improving stateful sets, although it's not perfect, it is appropriate for most stateful workloads.

Looking at successful companies leveraging cloud-native paradigms, what stands out is how well vertically integrated they have become. Leveraging hardware the way it is used best, while still giving users the experience they are asking for. For example, the necessity of AWS Nitro was born as such - with a need to integrate deep in the stack to effectively accomplish high-performance virtualization. Google [augments](https://www.youtube.com/watch?v=zYU_c5xdUCs&t=116s) the block write sizes for open source products it hosts to better align with the underlying media. Microsoft built custom chassis with SAP to enable HANA in ways unavailable in the market before then. Deep ecosystem integration with a purpose is a winning play and it’s one that the hyperscalers keep calling over and over.

There are some great stories about companies who have deeply integrated their offerings with Kubernetes, most are NewSQL projects which look to distributed compute to solve problems. CockroachDB, TiDB from PingCap, YugabyteDB, and many others started development in the cloud-native world and are compatible with the most popular wire protocols, so why haven't we seen massive migration to them? The simple answer is they fundamentally approach data storage differently than a traditional DBMS. Practitioners often haven't pushed their DBMS to the vertical scaling limit and don't see the need for horizontal scalability often arguing that it brings more complexity than benefits.

We see incredible projects like StackGres from OnGres, the Kubernetes operators by Percona, Apache Cassandra, and even MongoDB and Oracle are getting into the Kubernetes game.

Then we have companies like MariaDB who are committed to vertical integration into Kubernetes, with over six storage engines each with a unique deployment style, some capable of MPP operations, others capable of shared-nothing horizontal scale-out. That's a lot to learn even if you are a MariaDB consultant, leveraging Kubernetes is the not-so-secret sauce that enables SkySQL to soar no matter how MariaDB is deployed. Now MariaDB, open source all this goodness!

I've been advocating about the need for mainstream database providers to not only create Kubernetes operators, but directly develop the database with Kubernetes awareness and even better, an actual deep integration. I guess this is a long way of saying, it’s your move, Oracle. Don’t let us down!

*This guest post was originally published on*[*TheNewStack*](https://thenewstack.io/kubernetes-needs-deep-system-integrations/) *by Rick Vasquez**.*
