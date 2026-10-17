---
title: 'DoK Community Sponsor Spotlight: Apache YuniKorn'
date: '2024-02-13T23:07:02Z'
lastmod: '2024-02-13T23:08:02Z'
slug: dok-community-sponsor-spotlight-apache-yunikorn
author: Paul Au
categories:
- Community
---

The Data on Kubernetes Community (DoKC) is the global home for thousands of end users sharing best practices for running data workloads on Kubernetes including 4k Slack users, nearly 3k Meetup followers and 7k newsletter subscribers. We deliver a range of community programs to support practitioners on their DoK journey including meetups, conferences, end user roundtables, research reports, an ambassador program, and other activities to help practitioners connect and learn. Our work would not be possible without the support of sponsors who enable us to bring you these programs while sharing their knowledge and experience to foster growth and innovation with Kubernetes.

This blog series aims to highlight the organizations that support the work of DoKC - why they’ve joined; how they’re using K8s; what work they hope to achieve within the community; and so much more!

![](yunikorn_highres-297x300.png)

**Please tell us about YuniKorn and how it utilizes Kubernetes?**Apache YuniKorn is a scheduler for Kubernetes; when deployed it replaces the default scheduler. With YuniKorn, workloads are intercepted with an admission controller and redirected to Apache YuniKorn. This provides the flexibility, with known limitations, to bypass Apache YuniKorn in certain cases.

Apache YuniKorn also includes advanced scheduling options to run batch, data and AI workloads.

**Why Kubernetes?**Apache YuniKorn was designed to fill the gap that was noticed when trying to run data processing workloads on Kubernetes. Coming from a Big Data (Apache Hadoop) background, we had some specific expectations and requirements. Other big data processing engines like Apache Spark, Apache Flink, Apache Hive and others brought in more complex requirements for batch and service processing.

The Kubernetes environment did not provide a solution that was a fit for the requirements we had. Looking at the functionality we had for scheduling, provided in Apache YARN and Apache Mesos, we started building a scheduler that provided us with the same functionality for Kubernetes.

The idea behind YuniKorn was to be able to run workloads with a limited number of changes and in a Kubernetes environment, ultimately providing open source users a choice.

**What makes Kubernetes well suited for data workloads?**Kubernetes offers a lot of flexibility and reliability for running big data workloads. K8s helps to manage the application deployments and running workloads in a containerized form factor for better resource isolation and dependency management. Also, because K8s is platform agnostic, onboarding the same big data apps to the cloud doesn't need additional platform-specific requirements.

**What are the DoK-related use cases you see the most?**Data on K8s is an emerging trend, and many of the companies and users are starting their journey to migrate engines and data apps to K8s (for ex: cloud and on-prem). The K8s ecosystem is very complex, and vast, and users must carefully consider the use case requirements when building a stack on top of Kubernetes. A data on K8s platform can help to aggregate the common use cases and define a standardized open source stack that suites majority of use cases.

**What are some of the challenges? How can we overcome these?**There are many big data apps, which makes defining a common set of use cases for K8s difficult. More iterations and reviews are needed. The K8s ecosystem has more than 200 projects, so choosing the ideal project for a use case like big data can become tiresome and confusing. We believe case studies will be helpful to anyone on a journey using K8s as a data platform.

**How did YuniKorn hear about DoKC and what got you interested?**We have been interested in all types of data processing and servicing workloads. We are always looking for other communities that run data workloads on Kubernetes.

**Can you talk about your experience working within the DoK Community so far?**We are happy to participate with the DoK community so far, and were excited to host a [virtual Town Hall](https://www.youtube.com/watch?v=8B8GNE-wl-g&t=3s) to share more about YuniKorn. We are thankful to the community for the continuous collaboration and look forward to contributing more to it.

**What advice would you give to someone looking to start their journey using Kubernetes as a data platform?**Take a phased approach. For any public cloud deployments, always keep track of the budget. And remember that not all workloads can be easily migrated to Kubernetes.

**Additional Resources for YuniKorn**

- Website: [https://yunikorn.apache.org](https://yunikorn.apache.org/)
- Download links:
  - Source code releases:<https://yunikorn.apache.org/community/download/>
  - Docker images:<https://hub.docker.com/r/apache/yunikorn>
  - Helm chart:<https://artifacthub.io/packages/helm/yunikorn/yunikorn>
- How to get in touch / CTA
  - Overview:<https://yunikorn.apache.org/community/get_involved>
  - Email list: dev@yunikorn.apache.org
  - PMC chair: Wilfred Spiegelenburg wilfreds@apache.org

**Data on Kubernetes Community**

[Website](/) | [Slack](@slack) | [LinkedIn](https://www.linkedin.com/company/data-on-kubernetes-community/) | [YouTube](https://www.youtube.com/channel/UCUnXJbHQ89R2uSfKsqQwGvQ) | [Twitter](https://twitter.com/DoKcommunity) | [Meetups](https://www.meetup.com/data-on-kubernetes-community/)

**Operator SIG**

#sig-operator on [Slack](@slack) | Meets every other Tuesday
