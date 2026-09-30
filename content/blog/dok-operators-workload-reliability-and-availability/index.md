---
title: 'DoK Operators: Workload Reliability and Availability'
date: '2023-06-21T22:39:24Z'
lastmod: '2023-06-21T22:39:24Z'
slug: dok-operators-workload-reliability-and-availability
author: Paul Au
image: RUNDOK-sticker-black.jpeg
hideImage: true
tags:
- Operator
---

On May 24, Akshay Ram and Michelle Au from Google led the DoK Operator Roundtable, representing both the Kubernetes project and Google Kubernetes Engine (GKE) as a managed Kubernetes provider. DoK roundtables unite operator developers for an informal deep dive into challenges that come up when writing operators and using them in production. The goal of the roundtable was to explore challenges projects are facing when writing operators, and to find opportunities where the Kubernetes project could address those gaps.

About 10 developers attended the roundtable, representing various operators such as CloudNativePG (Postgres), Druid, QuestDB and private services. A pre-session survey was sent to attendees, with the results showing the following top challenge areas in decreasing order:

- Reliability and availability of the workload
- Kubernetes API + controller design principles
- Testing and keeping up with Kubernetes and dependencies
- Security best practices
- Scalability of operators

Based on the survey results, we decided to focus this roundtable session on workload reliability and availability. Here are some of the discussion highlights:

**CloudNativePG / Postgres**

![](Screenshot-2022-05-14-at-3.14.26-PM-300x75.png)

CloudNativePG gave some history on their journey to Kubernetes, with the biggest challenges being learning and embracing the Kubernetes paradigms as well as storage portability. However, with the advent of Local PVs and CSI features, they were able to realize the benefits of building on top of the Kubernetes platform. While they found that not all Postgres concepts could be easily mapped to Kubernetes concepts, such as backups, they continue to evolve Postgres to adapt to these new paradigms. Simple to use security features such as TLS with automatic certificate rotation was called out as a great Kubernetes-ecosystem benefit that cannot be easily replicated outside of Kubernetes.

**Stateful Pod Management**

The group also discussed the challenges with managing stateful applications where pods have dynamic asymmetric roles (such as the primary/replica architecture) using existing Kubernetes workload APIs. Challenges include managing ordering requirements during initialization, updates and upgrades, and different operations required for different roles. Because of these challenges, the CloudNativePG operator decided to manage pods directly instead of using StatefulSet, essentially creating an extension of Kubernetes StatefulSets. Future roundtable discussion topics should explore if Kubernetes could better support these use cases so that operator developers don’t have to reinvent the wheel.

**Druid**

![Apache Druid](druid-1_highres-300x83.png)

With Druid, we discussed how the distributed architecture and use of object storage lends itself well to Kubernetes and can greatly simplify data availability and reliability management. However, there are still opportunities for improvement with data tiering. One use case discussed was using ephemeral fast storage as a cache for durable storage in cloud environments. We identified improved Local PV management for ephemeral storage as an area that would facilitate this use case. The good news here is that the Google team is planning to address how to [recover workloads using local PVs](https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner/issues/202) from data loss in the cloud. In addition, future opportunities to seamlessly integrate ephemeral local SSDs as a cache tier for durable block, file, and object storage backends would simplify the user experience and could eliminate the need to explicitly manage Local PVs altogether.

**Conclusion**

As always, the session ended too soon with many topics just scratching the surface. We thank all the participants for spending the time to provide feedback and engage in lively discussion. We would love to continue discussions in the following areas based off of community interest:

- Demo by Google with Local PV improvements;
- Data tiering (eg node-local caches backed by durable network storage);
- StatefulSet and PDB improvements to better support primary/replica architectures;
- Experience with Kubernetes cluster upgrades and managing PDBs; and
- App replication vs storage replication tradeoffs.

### Ways to Participate

If you’re interested in learning more or joining the conversation, check out the Data on Kubernetes Community Operator Special Interest Group (SIG). DoKC Operator SIG is a working group interested in Kubernetes operators for managing data workloads.

- Copy the invite from the [**Shared DoKC Calendar**](https://calendar.google.com/calendar/u/2?cid=Y19mOTBjMjdhMzRmNDRiMzA3ODE1YjQyNjM2YmM0NjQ0ZTBlZWY2NjdhZWQ3NGE4YTY5NzcwM2U2MDg5NTg1MmE1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20). Meetings are held every two weeks.
- [**Meeting notes/agenda:**](https://docs.google.com/document/d/1Uyk5qQ4KhpI-YnLdG72V66dO9Hxv_kqTK_CrMHS9EFc/edit#heading=h.nxcx7r52ocev) review past sessions or submit a topic for discussion.
- Join #sig-operator on [**DoK Slack**](https://dokcommunity.slack.com/join/shared_invite/zt-10v7uncvp-jNFwulsVWvUO0SKMDTjwAw#/shared-invite/email).
