---
title: Deploying Enterprise Databases on Kubernetes
date: '2022-01-30T17:25:26Z'
lastmod: '2022-01-30T17:24:46Z'
slug: deploying-enterprise-databases-on-kubernetes
author: Melissa Logan
image: Blog-Dok-DeployingEnterpriseDatabasesinKubernetes-16_9.png
categories:
- Opinion
tags:
- CRD
- Database
- Operator
---

“Is Kubernetes ready for stateful workloads?” is the first question that pops up when decision-makers consider deploying databases on Kubernetes. For years the answer was “don’t do it”, and for good reasons. Kubernetes was initially designed to handle the orchestration of stateless workload. But the technology has matured, and it is time to reconsider running data on Kubernetes.

There are three important technical aspects to be considered:

- Kubernetes maturity
- Kubernetes stateful capabilities
- Availability and performance characteristics of running databases in containers.

## How mature is Kubernetes?

While assessing the maturity of any technology isn’t a straightforward process, there are solid signals that can be used. Kubernetes is a CNCF graduated project, [meaning that](https://www.cncf.io/blog/2018/11/05/beginners-guide-cncf-landscape/) the technology has the  “adoption, a healthy rate of changes, and committers from multiple organizations”. Their [2020 Survey Report](https://www.cncf.io/wp-content/uploads/2020/11/CNCF_Survey_Report_2020.pdf) shows that “91% of respondents using containers report using Kubernetes, 83% of them in production”.  Since November 2017, reputed analyst firm [Thoughtworks](https://www.thoughtworks.com/radar/platforms/kubernetes) considers Kubernetes as a mature technology that companies should adopt, explaining that “it has become the default solution for most of our clients when deploying containers into a cluster of machines”.

## Is Kubernetes stateful ready?

Kubernetes stateful capabilities are often doubted, and a first-generation stateful technology named Persistent Sets (“PetSet”) is (partially) to blame. This feature [was deprecated](https://github.com/kubernetes/kubernetes/issues/41926) in favor of the current stateful technology in Kubernetes: [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/). Released for GA (“General Availability”) in 2018, it is used today across countless solutions that provide persistent, non-ephemeral, storage for Kubernetes containers. This is what makes [Vitess](https://vitess.io/) or other cloud-native databases deployment in Kubernetes possible.

Most notably, StatefulSets mount PersistentVolumes (“PVs”) into the containers. These PVs are generally provided by storage external to the Kubernetes node, either in the form of networked drives or software-defined storage solutions, like OpenEBS. In essence, the storage used in Kubernetes and in the cloud is the same EBS volumes you use on AWS, or the Persistent Disks you use on GCP; and we can expect the same level of maturity.

## Performances of running data on K8s

Surely, database performance suffers in Kubernetes, doesn’t it? Containers are wrongly perceived as “light-weight virtual machines”. They are rather extremely thin layers of abstraction wrapping the filesystem, process, and networking spaces, provided by the Linux kernel. There might be some overhead if you use only ephemeral, container storage for the data. But the overhead is negligible if you use external PV storage.

And what about the ephemeral nature of containers? Wouldn’t this affect high availability? Since containers are just “wrappers” around a process, their lifetime is tied to that of the process. In other words, containers will be as stable as the database process running inside of them.

## Why is running databases on Kubernetes revolutionizing the way you run databases?

There are obvious advantages to running databases on Kubernetes: the simplicity of deployment, having the whole stack managed by the same orchestration tool, auto-healing, and automatic reprovisioning of failed containers leading to higher availability. For example, if one of the nodes running a database fails, Kubernetes will automatically self-heal, rescheduling the workload on another node. With cooperation with the database management software, it may elect a new database primary running on a previously existing replica, and re-initialize the new node as a new replica, all automatically. But there are other, more important, reasons why you want to run databases in Kubernetes.

Most companies want to operate databases as a DBaaS (“Database-as-a-Service”). To self-provision a self-healing database, including backups, and monitoring. While this is offered by most cloud providers, doing it yourself by using Kubernetes can save significant costs, and offer additional capabilities, such as multi-cloud and cloud portability.

These capabilities are made available via [Kubernetes Operators](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/). Operators are application-specific extensions to Kubernetes that encode deployment and operations automation while exposing simple interfaces to the users. Advanced database Kubernetes operators bring, among others, the following benefits:

- A declarative approach to deployments and updates, making it 100% GitOps friendly and perfect for any company using CI/CD. Operators define CRDs ([Custom Resource Definition](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)) that are high-level objects – typically interfaced as simple YAML files – that allow to deploy and manage complex database architectures in a simple manner.
- Automate “Day 2 Operations”: deployment, high availability, backups, and monitoring; patching, vacuuming, bloat removal, reindexing, etc. Operators can encode these operations into CRDs, YAML files that allow performing these operations automatically. One example of this approach is [StackGres](https://stackgres.io) (which I Founded), an advanced operator to run Postgres on Kubernetes, which fully automates all the operations mentioned above.
- Externalization of database functionality to third-party, well-known, Kubernetes components, like the [Envoy proxy](https://envoyproxy.io/); [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) for monitoring; or [Cert Manager](https://cert-manager.io/docs/) for SSL certificate management. The database operators may rely on these components to offload database functionality, reducing the cognitive knowledge for the user to operate them, as it is more familiar, and obtaining more advanced functionality.

Running databases on Kubernetes is not only the future but also the present, as shown by leading companies such as [Goldman Sachs](https://faun.pub/three-kubernetes-success-stories-to-inspire-your-next-application-754db496f363), [Zalando](https://engineering.zalando.com/posts/2017/06/postgresql-in-a-time-of-kubernetes.html), and [Flipkart](https://thenewstack.io/how-flipkart-leveraged-openebs-for-storage-on-kubernetes/). As with any technology, careful and objective evaluation should be performed before deploying production workloads. But considering all the advantages that running databases on Kubernetes offers, companies should ensure to consider it. Unsurprisingly, the [Data on Kubernetes 2021 report](/dokc-2021-report/) found that 90% of the responding companies believe that Kubernetes is ready for stateful workloads. A large majority of these organizations (70%) run stateful workloads in production with databases topping the list. Those running 75% or more of their production workloads on it report an impressive 2x or greater productivity gains! Running data on Kubernetes was the latest frontier to have fully orchestrated infrastructure and I believe that this shift will unleash considerable value for businesses.

*This guest post was originally published on* [*TheNewStack*](https://thenewstack.io/kubernetes-will-revolutionize-enterprise-database-management/) *by Álvaro Hernández**.*
