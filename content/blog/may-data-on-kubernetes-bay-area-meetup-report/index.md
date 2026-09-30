---
title: May Data on Kubernetes Bay Area Meetup Report
date: '2023-05-31T16:51:31Z'
lastmod: '2023-06-05T15:33:36Z'
slug: may-data-on-kubernetes-bay-area-meetup-report
author: Paul Au
image: dokbayarea.jpeg
hideImage: true
---

The DoK Bay Area meetup held its first official meeting on [May 17 at Bootup World in Menlo Park](https://www.meetup.com/bay-area-data-on-kubernetes-community/events/292586875/). Thanks to the hard work and support from Olyvia Rakshit and the team at Avesha, we were able to obtain a venue and meet for pizza, pop, and presentations on Kubernetes.

After 30 minutes of meet and greet, Robert Hodges of Altinity kicked off the talks with a welcome to more than 20 attendees. Here’s a quick summary of the presentations:

Prasad Dorbala of Avesha kicked things off with a presentation on [multi-cluster data management on Kubernetes using layered operators](https://altinity.com/wp-content/uploads/2023/05/BayAreaDataOnK8s-2023-05-17-Avesha-DoK-Preso.pdf). Prasad surveyed the state of Kubernetes adoption using survey data from VMware, then drilled down into multi-site Kubernetes. Avesha uses operators for everything from application management to networking that links together Kubernetes clusters across regions. The layered operator approach is powerful, as demonstrated by [Kubeslice](https://github.com/kubeslice/kubeslice). Avesha wrote it to allow users to link Kubernetes clusters across regions, then divide them into isolated “shards” that give each application the illusion of a single cluster that spans locations.

Next up, Robert Hodges of Altinity presented [Repel Boarders! How to find a Kubernetes operator that really protects your data](https://github.com/dokc/sig-operator/blob/main/operator-security-hardening/presentations/Repel%20Boarders-How%20to%20find%20a%20Kubernetes%20operator%20that%20protects%20your%20data-2023-05-17.pdf). Managing data on Kubernetes forces us to deal with a host of traditional database security issues plus some new ones from Kubernetes. Robert’s talk illustrated security threats and reviewed features users should look for in operators to protect data. The talk concluded by introducing the [DoK Operator Security and Hardening Guide](https://github.com/dokc/sig-operator/tree/main/operator-security-hardening), a new DoK project to establish guidelines for operator security. Contributors welcome!

Arul Jegadish of Opsverse gave the final talk on [Operating Data On K8s for a Cloud Agnostic DevOps Tools Platform](https://altinity.com/wp-content/uploads/2023/05/BayAreaDataOnK8s-2023-05-17-OpsVerse-DoK-BayArea-Meetup.pdf). Opsverse runs a platform to manage open source DevOps tools, with data stored in multiple backends. They use a combination of helm charts, operators, and ArgoCD, plus Crossplan to manage external resources from cloud services. The best part of the talk was a practical review of how to manage ClickHouse, VictoriaMetrics, plus PostgreSQL. Opsverse uses AI, so Arul is looking toward vector databases in future. Maybe Arul can tell us more in our next Meetup!

After presentations concluded, we spent an hour learning about each others’ Kubernetes projects and sharing ideas. Major thanks are due to the speakers, sponsors (Altinity and Avesha), and of course everyone who attended.

We’ll be scheduling the next DoK Bay Area meetup soon. If you have a talk you would like to present or a venue you can offer, please message either Robert Hodges or Lisa-Marie Namphy on the [DoK Slack Workspace](https://join.slack.com/t/dokcommunity/shared_invite/zt-1vgv7ymz7-YtLFvZicrcLP9fS3o_r2_w). Or you can send a message to us on [Meetup](https://www.meetup.com/bay-area-data-on-kubernetes-community/). We hope to see you at the next meeting!
