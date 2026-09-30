---
title: Data Compliance Across Multiple Regions with KubeSlice
date: '2024-01-23T19:53:04Z'
lastmod: '2024-02-02T20:02:49Z'
slug: data-compliance-across-multiple-regions-with-kubeslice
author: Paul Au
image: KubeSlice.webp
categories:
- Events
---

*A summary of our discussion and presentation during our first DoK Talk in January.*

Data on Kubernetes (DoK) Talks are virtual events presented by Data on Kubernetes Community members sharing best practices, use cases, and other practical advice to help end users on their DoK journey.

*The following provides a brief overview, video, and transcript of the DoKC Talk that was held in January 2024.*

**Data Compliance Across Multiple Regions with KubeSlice**

Presented by:

[Prasad Dorbala](https://www.linkedin.com/in/prasad-dorbala/), Chief Product Officer, Avesha

[Olyvia Rakshit](https://www.linkedin.com/in/olyviar/), VP Marketing and Product UX, Avesha

In this DoK talk, Olyvia and Prasad discuss the challenges of data compliance across industries and regions with specific legal requirements, such as GDPR and CCPA. They will cover the current traditional drawbacks, and introduce KubeSlice, an open-source solution that enables connectivity, management, control, and workload placement across many clusters and regions.

This talk covered the following:

- The challenges of data compliance regulations;
- The drawbacks of globalizing traditional approaches, such as high costs and underutilization of clusters;
- How to construct the right solution for compliance with Kubernetes;
- An introduction to KubeSlice, an open-source solution that simplifies multi-cluster compliance management on Kubernetes.

**Watch the Replay**

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/dq4AnNYP5m0" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

**Ways to Participate**

To catch an upcoming Town Hall, check out our [Meetup page](https://www.meetup.com/data-on-kubernetes-community/events/).

[Let us know](https://forms.gle/ajhbb998SD47yr5i6) if you’re interested in sharing a case study or use case with the community.

**Data on Kubernetes Community**

[Website](/) | [Slack](https://dokcommunity.slack.com/) | [LinkedIn](https://www.linkedin.com/company/data-on-kubernetes-community/) | [YouTube](https://www.youtube.com/channel/UCUnXJbHQ89R2uSfKsqQwGvQ) | [Twitter](https://twitter.com/DoKcommunity) | [Meetups](https://www.meetup.com/data-on-kubernetes-community/)

**Operator SIG**

#sig-operator on [Slack](https://dokcommunity.slack.com/) | Meets every other Tuesday

**Transcript**

Speaker 1 ([00:03](https://www.rev.com/transcript-editor/shared/3A1u1NwNMxHEAEsbhigYGRnOC6jB0bvR8jAGF6Vb51YK_SMGN_TP6E0bsQdCdcwmeh2P-Gg80U2JBZyBY66jGkvhJto?loadFrom=DocumentDeeplink&ts=3.12)):

That's fine if you want to record as well. Sure.

Speaker 2 ([00:24](https://www.rev.com/transcript-editor/shared/4x4RIgk_LXBX-2ua8fCbqHNVAeiZbhiBip5YbVy-LEB2l6vRCwfbuoc9-XXJwqNAIWK5GphixZ2x5YBnop5HbLoVgWY?loadFrom=DocumentDeeplink&ts=24.065)):

Okay. All right. Looks like we've got a bunch of people. Hi everybody. My name's Paul Ow here at the DOK community. Welcome everybody to our first doc talk, which is a new series. We're starting with the goal of sharing best practices and insights for DOK. So at DOK, we're the go-to resource for practitioners who want to learn to run data workloads on Kubernetes, where that's databases streaming our analytics. And today we have Prasad dola and Bolivia REIT from Aisha and they're going to do a talk on data compliance across multiple regions with Goop slice so you all can take it away. Oh actually, sorry. One more thing. If you have questions, go ahead and place them in the chat and I'll facilitate those questions throughout the chat and you're welcome to add those questions throughout the talk so we can get them answered in real time. Alright, now you can take it away.

Speaker 3 ([01:36](https://www.rev.com/transcript-editor/shared/nwq6uSjpcd1ehSsueRJ8XvxtZ7R7NKv134z0dJHlhBE_NCrU3lGhYiK0cbCAU_yUmQtrITB7Pj2xtqy3auIxOVb4E3k?loadFrom=DocumentDeeplink&ts=96.12)):

Thank you. Paul, you want to share Prasad?

Speaker 4 ([01:39](https://www.rev.com/transcript-editor/shared/i7FNP1D6nmcHIsdW441N23cBIUQfqFl5zlenzlt7Amzv2yDK2hJ2aloYF0R94AkKSNya4n557JM60MdvPbq36VYHM0Y?loadFrom=DocumentDeeplink&ts=99.2099999)):

Yeah, why don't you introduce yourself?

Speaker 3 ([01:41](https://www.rev.com/transcript-editor/shared/l2_z-F2SHc8B-MSnx5O_CL0gm6dLhY-TTBxQx89UWreZUMlfaVs-_djmNf4Sd5OWa5dwcBYBZ9UhfrtSSqU5LsU4dOk?loadFrom=DocumentDeeplink&ts=101.73)):

Oh, thank you. Thank you Paul. So I'm Olivia Sid, I run marketing and product user experience here at Aisha Prasad.

Speaker 4 ([01:53](https://www.rev.com/transcript-editor/shared/mZtA7NdAy9xVA0b8WZVWoYxKTV0QMK-qqLSPCvZsiz4wCBOHeA_rtE69YlYG2KyfbYPPdtMQMl3S_MKgW2uNYJ885no?loadFrom=DocumentDeeplink&ts=113.91)):

Hi guys, my name is Prasad. I'm a co-founder for Acia and I run product in working with Olivia. We both design as to how things happen in Aisha.

Speaker 3 ([02:12](https://www.rev.com/transcript-editor/shared/VESGqyXtCKrhFTQm0exhGNnymtVeXjj-dHM4fMq01VhqlWRtk7EN7T1MIpMgF6w0IM-sDtezCAZ1AY1Od5_oY-jraqA?loadFrom=DocumentDeeplink&ts=132.84)):

So today's topic, data compliance across multiple regions with cube slice. We were just discussing earlier that compliance regulations is such a vast topic and it's important to understand this or discuss this in the context of the industries and the regions that you operate. And when we talk to some of our customers, especially the large global ones, compliance and regulations, they face these challenges and they have to navigate through the intricacies of these pretty much a daily operational basis. So today we are going to delve into some of those legalities and regulations and laws and what do you need? What kind of frameworks do you need to implement these in your organization?

Speaker 3 ([03:17](https://www.rev.com/transcript-editor/shared/G88CyU2S53xjPRHPNQ1s-ci2kxvRstzD-E3mUVWUsXgxKOlEU7Ub8VoMJ7juJHkMxF7BpR6zBXcK4oVSqeypGKxyFTk?loadFrom=DocumentDeeplink&ts=197.645)):

When we talk of compliance, again, like I said, it's region specific or it's industry specific. Some of those are listed on the slide here. And let's say if you talk of regional specific laws, you have GDPR, which is a very European specific, where there are strict data privacy laws in Europe where data needs to reside within the eu and then I live in California. In California you have the California Consumer Privacy Act where there are strict laws regarding storing personal information and businesses and e-commerce and retail businesses have to take into account CCPA. If you operate for California consumers, if you you're in healthcare, you have hipaa, there are again very strict laws for storing patient information and patient sensitive data. So your security controls and your network controls have to take into account how who interfaces with the data and how you store patient related information.

Speaker 3 ([04:39](https://www.rev.com/transcript-editor/shared/5q7xSozV4Pb_z2Y3G233R3OiX9Yr3193JHEAiZun9ekHBrA1wsRnSQ5_SV8y17IjZGoMY0hTb3N0YSazf5wKdzpfPaE?loadFrom=DocumentDeeplink&ts=279.13)):

When we talk to our financial services customers, those that deal with credit card information, so you have P-C-I-D-S-S, which is the payment card interface and the data security standards that govern those. So how do you transmit the credit card information and that needs to be secure and that needs to be stored in a secure manner. You have FedRAMP for cloud providers where there are strict security assessments and then there is SOCs for publicly listed companies. So the list is endless. There's so many regulations and compliance challenges and issues that businesses have to deal with and we will talk about some of those as we go along. And what are those specific challenges? So first of all, like we said that they are region specific. These laws are industry specific, so navigating through them and then businesses need to move fast, they need to be agile.

Speaker 3 ([05:53](https://www.rev.com/transcript-editor/shared/k6IrOYSbI7t-yHO5DskGGx4QgGJKxTkfBDKZyM89Ff3aNdV3dJ69b4ksR3QfiwshtOLuJXP_kC1nzTQC5H_z06jZo4w?loadFrom=DocumentDeeplink&ts=353.5)):

So compliance should not slow you down. So what of frameworks do you use so that you can be compliant and be agile about these measures and these controls that you need to put in place and what's the risk of not doing them? You don't want to land up. We often discuss on the front page of newspapers for the wrong reasons. You don't want to be to have those breaches and those data privacy, the news that the leaks that we often read about. So ensuring data privacy and data protection across regions, across jurisdictions and navigating through all of these are big challenges and we bring a product called cube slice and we'll talk about how we provide that unified framework that helps with some of those challenges. Next slide. Prasad? Yes,

Speaker 4 ([07:06](https://www.rev.com/transcript-editor/shared/2x7hMntnE9xI02F_yCL6BlGzGZDhaRpfXa_G6pjhq0g0HAf2m_CXhh8EoxPNcagoFpw_UNFuO3Yoduwy64AxN-oyvbQ?loadFrom=DocumentDeeplink&ts=426.26)):

Thanks Olivia. As Olivia described the controls, I think in general we have to think it as people, process and technology. Not only do we have to focus on technology, what are the processes which are built around it and who is actually accessing what and do we have proper training for the people to make sure that whatever framework you have put, if the insider threats are very real. So if you don't have the right training material for other people when you're onboarded, that's another thing which we run into all the time. So technology plays an important role, but people process or should also be considered. So if you look at technology for all of these compliance, one of the key factor is you can tout that you are compliant, but at the end of the day you are the compliant infrastructure is actually attested by the auditors.

Speaker 4 ([08:31](https://www.rev.com/transcript-editor/shared/0XA-ggnuhO8FMKqaJb6Vq57Pw6eYKPpX6PwWZCgvqWeiFaGKHhlPtEbA7hctBE94XXTggAeaLBLZwEImyaPJhyGjjVA?loadFrom=DocumentDeeplink&ts=511.25)):

So you want to show the evidence to the auditors to make sure that you are compliant so that they can give you the third party assessment done and then they give you the certification that you're compliant. So infrastructure should be able to get you all the telemetry which is needed for audit purposes. And if all the business logic people are the ones who are going to do all that, it is impossible. As Olivia mentioned, speed is important. So the framework should have certain foundational things and it's a shared responsibility, business logic and as well as infrastructure need to play together to make it happen. So the vectors which we see more of a lot of people is how do you authenticate and authorize who is actually using what, the identity management as to who is actually touching, who is the person and what role they play.

Speaker 4 ([09:39](https://www.rev.com/transcript-editor/shared/Qn0FuvJcp8ttUvOcHHJ3h0HQ2yJyeLvZYkH5H68lCd0f6C5mOemiLLeEwGtKs2PjD0LRJm3_71a7ZKQwd29DgnvUybs?loadFrom=DocumentDeeplink&ts=579.39)):

So what privileges they have to touch, which part of the data which they have. That's one key vector you need to have. And then when you have data, is the data encrypted at rest and as well as encrypted in transit? One important factor. And then there are many scenarios where even if you're encrypting it, who is the public key and private key who is the key? Sure is also important because what we have found is that the keys which are issued in US may not be legally bound in keys, which are if European data is there. So you have to fake focus on based on the local jurisdiction laws, you have to give the keys associated with that. So when you have aggregation of clusters or aggregation of Kubernetes environments, these are all important factors which you need to consider. So that's something, and I would tell you many almost all have to have a DR strategy.

Speaker 4 ([11:00](https://www.rev.com/transcript-editor/shared/PSfLwmL6V8dS8I7DOZuu29PGr6wyZ0rK1i_nrQwYphTeNKfgpWXOZbviq5mXOTbrcyWtbxllAgXGz-CfAeF8dTKtm7o?loadFrom=DocumentDeeplink&ts=660.63)):

Recovery is very critical because of reputation and availability is a factor for everything. So now when you do a DR and disaster recovery, where do you store the other side of the equation? Is it fitting the right framework from a standpoint of recovery point of view, there are many contracts which we have seen which force them to have X amount of miles far apart. When you go across region or those are important factors you need to put the more the distance it is, then the RPO comes into play recovery point objective as to how fast can you recover from a data standpoint, not the RTO, but RPO is very critical to be focused on then many, many organizations do analytics on their data. So what is the masking from a standpoint of how are you masking data? What is the privileged data? First, identifying what data is privileged data and then what is the general data is also one important factor.

Speaker 4 ([12:25](https://www.rev.com/transcript-editor/shared/yZnMEkarpO3ThGdc7mlzGLFte-5CaxhSpD1OGZfDSJnfyCMpdz7WMop2YX1vFPpWE4ezeDEzoNABAkqV4JeDcNsvEOk?loadFrom=DocumentDeeplink&ts=745.96)):

And then you need to mask the data, which is privileged. And other important factor which we have seen time and again, is that retention strategy. We as an operations team would want to have less amount of data because from a speed standpoint, the more data you have, the slower the systems will become. So then you have to change the approach of what is operational data and what is called data, how do you put it in warehouses, and then where do you put your data in the warehouses and how do you encrypt it and mask it? Those are all the factors. There are many businesses which have a seven year retention strategy, but you can't have an operational data that large because the petabytes of data which you have, then your queries are going to be smaller, slower. How do you make sure that you have the right performance impact, whether it is three months retention or a six month retention, that's always a challenge which businesses drive. So those are all the things which you need to focus on right from at the end of the day, cost is an important factor and efficiencies are important factor.

Speaker 4 ([13:52](https://www.rev.com/transcript-editor/shared/y1HCawpSOGb41_p7HZMMIqSNDJ_rwH6AtJ-KZxCnT-Ha1Tt3W6Wf6N5Pmz1pXg4yI2PAaXXqGOZEssYPL9_D07gy02k?loadFrom=DocumentDeeplink&ts=832.57)):

And while you have these different frameworks in play, how do you keep the consistency when you do something here in a side? Do you have the same kind of framework and B side consistency? And then many organizations have grown out from a single cluster, they're all multi cluster, they're actually tens and hundreds of clusters, which they have. And then everything is producing data. And then how do you harmonize that? That is an important factor which you need to consider. Any questions so far?

Speaker 3 ([14:31](https://www.rev.com/transcript-editor/shared/K2p4rOAjC3W844z8z1_5hg2ZSnY2VuN1gi0SWyeOiIeCSmV-LPJkAkD9djc2cJuHr-ctDXU8iPj3FM_liOrG1-o2BYU?loadFrom=DocumentDeeplink&ts=871.96)):

So when you talk of a multi cluster scenario, so you're talking about these important things that need to be considered right? Authentication, encryption, masking, retention. So you have to implement each of these data strategies on each cluster on each region according to the laws, right?

Speaker 4 ([14:52](https://www.rev.com/transcript-editor/shared/yHdJgUtbFPOG8inq65Iwn1jqdD2pB7om4h5zmkvCgtCCkmo5NSaW5_zi3AWNt_waro4SaSE-ze6w0to2yyjOwFj_EwQ?loadFrom=DocumentDeeplink&ts=892.61)):

That's right. Yeah. So that's an important factor. We all talk about CICD, how do you deploy in different locations, but each location will have its own challenges. For instance, we are working with one other customer, which is actually doing betting systems. So every state has different betting rules, so do you follow them? And then how do you make sure that you can put the policies such a way that it only affects that infrastructure in one place, but the infrastructure is coming and going and then you want to make sure there is consistency maintained. So those are all factors. Now, as you said Olivia, if you have many instances, operational cost is going to be quite high. So you want to have a single source of truth to make sure that the propagation happens properly. And then consolidation from an infrastructure standpoint is everybody's worried about compute is very expensive. These are compute hungry. So you want to have a framework which is a single source of truth and then be able to propagate across,

Speaker 3 ([16:26](https://www.rev.com/transcript-editor/shared/EwpkWyyL7SWQT5VuWdUx6XUfvp6NobCjtq_LihbpBDLSlM25AJ0x_oJ3TycZbCyUijNX_2RMGHfonaVhLrPNf8axDUE?loadFrom=DocumentDeeplink&ts=986.6)):

Propagate all the policies

Speaker 4 ([16:31](https://www.rev.com/transcript-editor/shared/lUeuC1Gxfh7TMGlYXXzfl9nZyDaZJVwCBqSOR9j6Uho_3Uuqgsf9G3sgue1pgYCCKJZIttMMAf2S9JjFpe9uwd8Kd2Y?loadFrom=DocumentDeeplink&ts=991.25)):

Right Now while we talk extensively around what are all the controls you need to have, everybody is going to Kubernetes as a containerized, applications for their agility and speed and whatnot. All the good things which we talk about in Kubernetes and stuff. So when we put data on Kubernetes, there are certain primitives which we have in the Kubernetes, how do you utilize the primitives and then construct a solution to be able to fit the requirements from a compliance standpoint, that's important for us to look at, right? So yes, we have RAC inside a cluster and then when you have an RAC and then team is extending it from one cluster to another cluster, do you have the same set of RA rules across? That's something which we need to think into consideration. There are different workloads which people are putting inside cluster. Now how do you segment them to be compliant workloads, noncompliant workloads, do you put cluster different for compliant workloads than cluster for noncompliant workloads?

Speaker 4 ([17:56](https://www.rev.com/transcript-editor/shared/06Vq1ONVWG6u0bJjpgnhExfjs63g4S7KVrCc7V0KI8b28M8B_wqOr-jg3tqzyy72Mol-PEh0dydsAIrKxv7GXOnCAc0?loadFrom=DocumentDeeplink&ts=1076.76)):

There are situations you put it, but there are situations where you want to consolidate it because of the fact that you don't want to have underutilized resources in different places. But how do you do segmentation inside? Is the namespace the right segmentation because it is a soft segmentation, not a hard segmentation. How do you achieve hard segmentation inside a single cluster? That's something which you need to think through from a networking standpoint. And there are many workloads which you want to target a specific set of nodes from a resource standpoint, compute intent, and as well as geographically. I mean hybrid is a new norm. A lot of companies whom we have experienced, there are some workloads on-prem, there are workloads in the cloud. So when you're bridging those two things, there are ways, how do you deploy it to be on-prem or node targeted kind of workloads?

Speaker 4 ([19:10](https://www.rev.com/transcript-editor/shared/evjVsXdc5vpMr3i6Y7lt6DW9fZGWJcmHwV4kcdQEdnVpdJC15SV1iUf8j05ZLBT7YXHjP55bhisfUekCktH3QGkQr-I?loadFrom=DocumentDeeplink&ts=1150.83)):

I was talking to a customer in uk, we have three data centers nearby and they wanted to say, Hey, I want to be able to target a specific topology aware workload placement so that I can know that particular data center has external depend. Like for instance, they have retina based access control so that people who are going into that data center are kind of controlled. So there are certain workloads they want to target. They have a control plane which is governing all different data centers. That's where their single cluster is. And then having different nodes in different data centers. And then workloads are targeted to a specific data center because of the data center characteristics. So the topology awareness is something which we have today in the latest versions of Kubernetes. Not only that, we also have topology routing. How do you utilize that to be able to route the traffic?

Speaker 4 ([20:34](https://www.rev.com/transcript-editor/shared/1dD3ztQRxcDpyz8BeSzLHqUDrPiH-Wnale94_x15zUwSNl2kdGJRW-8fsILv3G3CXjyypr8Ss1R2YI8BpipBam6aUZs?loadFrom=DocumentDeeplink&ts=1234.5)):

Those are all the factors. As I mentioned to you before, you need to have evidence gathering. Evidence gathering is how do you get audits? Not logs are one important factor for application standpoint, but from an infrastructure standpoint, how do you get audit logs in play so that you can prove to the auditors that you have controls in place and as well as there is no breach or there is no dark spot or things which you don't know of. So how do you control those audit logs or something? So as is put the logo here, these are the chisels. You have all these things to chisel with your solution which you want to bring in. So that's what we talk about in a holistic way. Let me just introduce you, what is cube slice? Cube slice is a way of consolidating different clusters, fleet of clusters together and then provide various services like network services and as well as policies associated with that network services to be able to make use of infrastructures, be it in a single cloud or be it in a different cloud, be it in a hybrid scenario, have a unified way of deploying workloads and then have certain guardrails in play.

Speaker 4 ([22:16](https://www.rev.com/transcript-editor/shared/n9oASUc-t_zMoFuzyYiWHiGHRvFNWoKhZHES8nO_Uu1L3yh5LQJBX7Iz1rWR1mOOFAAiMBAfMvrhQ4cF0Jj5StjRJ90?loadFrom=DocumentDeeplink&ts=1336.3599999)):

That is what we do from a cube slide standpoint, that there are many ways people call it, some people call it a super cluster as a construct of each cluster. It has its own control plane but instead of worker nodes. But how do you consolidate that from a single control plane standpoint? So I would say I would use the word control plane loosely. It is not the Kubernetes control plane, but it is the control plane for all the fleet of customer management, which is what we bring to the fleet of clusters. That super cluster controller is in fact a Kubernetes cluster itself, has all the single source of truth from your ci CDs can be going directly into that and then go and then do a deployment across a different fleet of clusters. So it gives you benefit of observability, it gives you the zero trust from a standpoint of cluster communication and from service to service standpoint.

Speaker 4 ([23:34](https://www.rev.com/transcript-editor/shared/P9RK_V_NefVZkJa18xRoDZXu_s_SsufVU4kcehFWJfDXCg2w1opDsMLBddMyfbN8VeAN7hjUnqjqkU0XvMEI3oGNQgU?loadFrom=DocumentDeeplink&ts=1414.06)):

And it also has a policy management as to how you define where the workload needs to be and how it can communicate to what. So that is what cubes slice is. It is not necessarily, it's not a service mesh, it is an augmentation to service mesh. It is foundational from a networking standpoint. You can add on top of it any kind of a service mesh if you would want. So we are agnostic about CNI and we are agnostic about distribution of Kubernetes. Any Kubernetes versions can be used from a cube slice standpoint. Why did we do this? There are many reasons why people use this kind of framework, be it not everybody is ready for full stack deployment in every cluster. The full stack deployment is operationally expensive and there are situations where you would want to have only a certain set of workloads, which for certain are needed, but it's a phone home kind of a scenario where people can reach out to the home to be able to use certain set of information like for instance, a product catalog or analytics or your data warehouses and stuff like that which are out there, but there are different workloads which are closer to the customer and as well as certain very geographic specific behaviors which you want to encapsulate and then you put it inside that, but have the overall system communicated.

Speaker 4 ([25:20](https://www.rev.com/transcript-editor/shared/RXDm6V1j56wOgRBj4EbHlGO3kkLPzVHCFa6Zl_me2QMrSyEH0oVaIjJXlxI3G4NxcOi61RXbtAGMnIjIJp82LyXnSjk?loadFrom=DocumentDeeplink&ts=1520.1199999)):

So those are all the factors which we have in cube slice. And when you create a slice, you can treat it as a team or a compliance set of workloads. So you have to define RBAs at that granular level, not at the cluster level. So you can combine multiple namespaces together to form this slice construct. And the controller takes care of propagation of any config needed across all the clusters. So this is an operator driven model. So essentially it protects you from config drifts if people actually go underneath the hood and then try to change something in the cluster since there is a single source of truth, all that configuration is put back where it's supposed to be, I used to call it a fat finger problem. Somebody actually did something funny from a YAML standpoint and then didn't realize that it's not supposed to go to the cluster, but it goes into that cluster and then you don't want to have an impactful situation from an audit standpoint as well as config drift standpoint. So those are all the factors which result into it.

Speaker 3 ([26:46](https://www.rev.com/transcript-editor/shared/ixffERKAM_Ws4RV-YyVsIHFKBuemCgS6UcjIQkxX2zt1Dud7hcm35y7xidHztJyk2kCLmBIfEh8q9Ydtk6xwbptklk8?loadFrom=DocumentDeeplink&ts=1606.025)):

Right.

Speaker 2 ([26:47](https://www.rev.com/transcript-editor/shared/FpFcBAq0qBElyFufl0jBfe8sTp6-JB3rn5G_t1skvxS5ppDbQGZDohvMXv55hUz0czvQS2e0OzmTcOJSszCsgTqdRCs?loadFrom=DocumentDeeplink&ts=1607.58)):

Can I jump in there for a sec? So what's the most common do you think challenge that people are trying to solve of these different factors? Or is it pretty broad across the spectrum?

Speaker 4 ([27:03](https://www.rev.com/transcript-editor/shared/7xzfEWObAz_KWpnQZaQrRDyzzghQorLOquRw3JJ-uLeJKVuXzxaRlqNAWWExb79PwzMBfKbqyRRZ6DpmsPg6pVA3tto?loadFrom=DocumentDeeplink&ts=1623.27)):

There are two important challenges which people are trying to solve. One is our back basics of who is actually touching, what do I have the right consistency in play. So that is one thing. The second most important challenge which people are talking about is the data residency angle. Where does my data reside now when I request a PV on demand of an object store, do I really have a topology marking on it? If I don't, I don't know where that PVC or a claim is coming from. It may be coming from different geographic location where I should not be storing the data. So how do you control from a PV and PV management standpoint on-prem? It's easier, but when you go into cloud, that becomes even more challenging.

Speaker 3 ([28:08](https://www.rev.com/transcript-editor/shared/Qo8Oj3sn8bZFQrnFWCEiQPW0hU8Po9pbUpf6G6ZdxONgP4QVEY-7wXVk37_LNAgA0FhFoul0xJCIM8CMI7Lru0F8fsM?loadFrom=DocumentDeeplink&ts=1688.64)):

And I would add a third to that, it's the ease of operations. So we were talking about different compliance regulations. So say you're doing GDPR in Europe, you're doing CCPA in California, how do you have that one control plane, one unified framework that's applying the right set of policies in Europe and the right set of policies to your workloads in California. This slice that you see, this unified cluster like Prasad mentioned, you can almost program it in a declarative way with policies and it can apply it to the right set of workloads in the right region, in the right context. So that's the power and the ease that we bring that. And I think P also mentioned this earlier that you can do this in the application business logic, but here is a way where your infrastructure becomes smart. So we are using those Kubernetes primitives and giving you a way for the infrastructure also to have some of that intelligence and in a regional context in your vertical industry specific context and apply it across different workloads across different regions. So it's the ease of use as well.

Speaker 2 ([29:33](https://www.rev.com/transcript-editor/shared/I7g_DYQ2qdHMFyL3Xl1poJOmlKKyFlxDbjaixvBXbSsVrhgbgDbVaWzyLvnZME4u-ADMXOjKEaQatNsgTIel8HFZ0gI?loadFrom=DocumentDeeplink&ts=1773.57)):

Do you have to mark the data, some sort of metadata, so what type of information is being stored so it knows how to and where to store the data in an appropriate place.

Speaker 4 ([29:45](https://www.rev.com/transcript-editor/shared/01ueJuJJnESjIrjq3L-02kQpQ_CR6kZUqtCNgcFqUVOWcVxI_56ggu8C4GKNts323udIVhd7Utl3rdR-wMdWpTTPLn0?loadFrom=DocumentDeeplink&ts=1785.88)):

So it's an important thing of all. So it is workload dependent, which is producing the data. Now that producer of the data would ask you, I want to have a storage component to be able to store that storage component. I'll actually talk about it in one of the slides. I think that is an important factor that when somebody is asking you or the workload is asking the infrastructure, I want to have storage to store certain data. You need to understand what are you asking and who are you asking? And then do you have the residency requirement? And based on that you would provide the PVC or the pv, which is marked with that topology awareness. So that's the way it works. I'll show you an example as to how this is a very common problem. The question which I keep asked is how much is in the manifest file from the deployment standpoint and what is the workload which is actually asking that, can I put it in the deployment workload to be able to consume that?

Speaker 4 ([31:15](https://www.rev.com/transcript-editor/shared/H7PXsAQApUvlZdY0BTV2OFFU2BM-ZyQVUwWXf4r-Xj3nXeMgw2WlvpT04NSbJaR4v8cJ2nuhkTDfpKoOfDpkxkR8QjQ?loadFrom=DocumentDeeplink&ts=1875.64)):

So that's an important factor to augment Olivia's statement, single pane of glass or single source for that. Think about it in a situation where you have multiple clusters and then you have to provide audit logs each one of them to your auditor. So how difficult is it to collect different audit logs on different sources and then be able to provide that as an evidence, right? So how do you consolidate that? Well, you can have cabana and all kinds of things, but you put it there, but do you have all the right markings in place? So those are all factors which you write in which cluster produced it and which application produced it, who is touching it and all that stuff. So those are all important factors we need to think through.

Speaker 4 ([32:13](https://www.rev.com/transcript-editor/shared/GE8vaCpQBOQfqWwyfGetXNaCw1kXCtqRvg2aPq_PWf3oZEHSTle94B7jCxN6Nc2c4e7VRH0eXpNBGmGsXpFN7L3cEsY?loadFrom=DocumentDeeplink&ts=1933.48)):

Now let me get you the foundation. When I talked about single control plane, we talked, what we have built is a capability which is essentially a controller, which is, I mean everybody in a multi cluster scenario has some form of controllers which is actually registered with the cluster and then you have all the control for that cluster fleet of clusters. But what we have done is we have taken that construct and then extended it to policy driven frameworks. How do you bring policies and then be able to deploy workloads with the policy built into it? So that's how we do from a single control plane standpoint, which is different from Kubernetes control plane. I just wanted to be very clear. Our control plane is a controller, which is essentially for managing the business logics for how the deployment works is just on a Kubernetes, it's an overlay on top of existing Kubernetes.

Speaker 4 ([33:25](https://www.rev.com/transcript-editor/shared/uUQ95JT9hD_EQNYk3fwhX-gQ7LVO62jZr_4KjOHsKwCbJndmaq4njmNJWISkIKc8vNhHQmR1lHZbToC9nBwNGsYBsII?loadFrom=DocumentDeeplink&ts=2005.4)):

So now this is exactly what you were asking about Paul, right? No affinity and storage policy, storage policy. And then so obviously there are certain workloads which have storage needs which are kind of high performing storages. And there are a certain set of nodes where you tie those storages, which you want to put, how do you define it at the deployment level so that when you have a storage policy, you just tell it at the deployment, manifest the way here, say that this is my storage class, which I'm going to have and this is my topology awareness zone, which I need to have and this is where the PV need to attach to. So that way you have the location awareness and then you tell the workload to saying that I want to have PV based on that. So then you know that the workload is actually stopping there and then where it is getting stored. Does it answer your question now, Paul? Yeah, yeah, right. So that's what we enable through a compliance standpoint from a storage affinity and storage topology awareness standpoint. And then we take use of topology routing to be able to say which workloads can communicate to what. And then these are kind of complex way of defining routing inside the topology aware routing for service to service communication standpoint.

Speaker 4 ([35:28](https://www.rev.com/transcript-editor/shared/UEfoxtMC1wF0w8_XIJout2SRGolXSFlowaYhnZOMl3wY30VhpYH83bXP-1XydU_lZPXngyNqPTGQfmffTibcqsS09bk?loadFrom=DocumentDeeplink&ts=2128.85)):

And then one other important factor is policy placement and policy decision, right? When you are deploying it across multiple fleets or clusters, some decision need to be made as to where this workload needs to land, not just by the capacity of the workload or the cluster, but also based on geographic residency requirements. Look like does this workload, which has certain behavior be allowed to deploy it in? So we have a person who has a casino workload and Kansas allows it, but some other state doesn't allow it. So do you deploy it? Do you keep GitHubs per state or do you keep that policy in somewhere else so that your deployment velocity is increasing? So that is what we facilitate when you have fleet of clusters which are associated with that. And then we put that into the category of understanding the placement policy and defining it once because people are constantly changing the workloads. And then if somebody may make a mistake of not putting the right markers in the declarative way, then you unnecessarily you go the workload in a different places, then you have this capability available that actually defeats the purpose of compliance. So those are all the factors which we look at it from a placement standpoint.

Speaker 4 ([37:30](https://www.rev.com/transcript-editor/shared/OhP95zDiCN6doWFoMAAtthyjbGk07i5ryZiDNU7LZjZBLXrkEMJ_DNm6xYPgoxQz8bDUTKSfkb4kMnCsxfy3UCIRWUY?loadFrom=DocumentDeeplink&ts=2250.105)):

I think this is, once again, crypsis is an open source project. Not everything, it's an open core. Not everything is available in open source, but foundationally, a lot of these things are available in open source. But there are certain things which we are very specific to certain set of customers which we have built which are policy driven. So those are things which we are in an enterprise version. But Olivia, do you want to add anything more?

Speaker 3 ([38:04](https://www.rev.com/transcript-editor/shared/BkRbpZY9aZ_sfT5fUyogKn-2K_y7S1Hft1PNEyL_oDvG3BZVds7LueQ9CmguuCD_OqwvLCbvY9auf2enSblEZHOesFo?loadFrom=DocumentDeeplink&ts=2284.62)):

Yeah, no, thank you. I mean, just to sum it up, so we went through various the compliance regulations region wise or industry wise, and we presented this construct called cube slice that we are bringing to the community where you can literally empower the infrastructure to very declaratively through various scenarios that Prasad described, enforce these regulations and be compliant. And you can create these compliance slices with the different constructs that Prado was showing, whether it's topology awareness or whether it's it's workload placement or whether it's simple RAC who has access to what. So there are different constructs that you can program a slice with and literally within minutes apply it to a whole global deployment that you have across clusters and compliance management becomes a whole lot easier with it. So I would just sum it up that way.

Speaker 4 ([39:17](https://www.rev.com/transcript-editor/shared/_iXMHiewyoT7hnDRprkdv5SP1xwYQbMB9Z6R9WfkWXLE-hkvGVsM4svAgTBa1Ko6uJPjkZ9kqU5tdsV0kQBI7uFzPIw?loadFrom=DocumentDeeplink&ts=2357.98)):

Thank you,

Speaker 3 ([39:20](https://www.rev.com/transcript-editor/shared/hz7urZ-8hKPqmluxd75z17d4GJ78NeeBlIcQapWzbJcnyXcRuUp50RyyZKdzF-RsZkOm5ltYQH4d4IS-KTYlUrlDV8g?loadFrom=DocumentDeeplink&ts=2360.56)):

Paul.

Speaker 2 ([39:21](https://www.rev.com/transcript-editor/shared/rDO_GK778FYcA0YeDtyURc95637kOqIS-5aQDOZaV5GZ0_vSpIgbESVkBTfa3xhupw85si4vRvNVmwqJrGhddTZsMlg?loadFrom=DocumentDeeplink&ts=2361.28)):

Okay, great. Yeah. Does anybody have any questions or Prasad or Olivia or did we get the question answered during the chat? I mean this is a pretty interesting topic as we were talking about before, it's not just the technology but also the policies that are important when talking about this sort of compliance issue. That's definitely a complex issue to solve. So it seems like this makes it a little bit easier or a lot more easier.

Speaker 4 ([39:56](https://www.rev.com/transcript-editor/shared/NgPeJsV6KqfaMo3HMIOQlWk5Mh6nMo9m-wUvYXraTTvrJ2ek9oOqcbe08FKS5szuGfQSHPLhx2TzsFBgsjlDWqEbzn0?loadFrom=DocumentDeeplink&ts=2396.11)):

Yeah, no, I think I used to spend a lot of time getting the evidence gathered for the auditors, which they come every quarter and then literally spend inordinate amount of hours trying to gather it from different places and then providing it, oh, this is relevant, this is not relevant, this and that. So that's painful process. So process is very, efficiency in the process is very important because you just don't have that much time to go then. But on the other hand, it's a necessary evil if you don't have the attestation, whether it is SOC two, whether it is hipaa, whether it is whether you're GDP or compliant and all that stuff, right? All that is very critical. Does it support hybrid cloud soap? Yes, it does. As long as it is Kubernetes in both ends or any number of ends. We are agnostic about whether it is on-prem or whether it is in cloud.

Speaker 4 ([41:04](https://www.rev.com/transcript-editor/shared/rNHwiqdQnC33eQV1fYy8GU_kIQNJqtTVYHyAYV6dQTzU4rMsSF6qos8stWcFZoBO0Ek5X5EwtXMrC4rQ2frO9MbhzrA?loadFrom=DocumentDeeplink&ts=2464.27)):

And in fact, many of our customers have some compliant workloads on-prem, but they have certain workloads in the cloud, which is all of them are private clusters. They have a private link going from or private link. I used it from an Azure standpoint, but any other facilities you have from across clusters, by the way, the tunneling across the clusters are all encrypted. When we talk about zero, security is literally everything is secure. And then we actually have a networking function for every pod apart from the pod network. We actually create a overlay network for every pod so that you can do much more tighter network isolation from a traffic standpoint. We utilize on pods, we have multiple interfaces. One interface is your lifecycle management for pod network from your API servers and other stuff like that. But the data path is the overline network where we use to communicate across and that is entirely encrypted.

Speaker 2 ([42:27](https://www.rev.com/transcript-editor/shared/zFTuO-xIQ599NMEUFU3Lyllkj3rSiHOTSlVx149wqU2sZ6Muy9DfihcF4HL3ggqqjY9RQx9EoSOnZ3jkei0AKwwYkgE?loadFrom=DocumentDeeplink&ts=2547.71)):

I have a question about so forth like HIPAA data. How do you take into account things like BAAs with the data centers? Is that something that's built into coop slice or is that sort of an agreement you have to make with the data center beforehand? Yeah,

Speaker 4 ([42:47](https://www.rev.com/transcript-editor/shared/45U8DzXhyaehsK7x0-F7RQR-7B0iSVQjRoIk4Cr6RT5KsPb4m3zOim04yQO53opMmdWtAZNfbLk9lFyioRDwtEjOQ9o?loadFrom=DocumentDeeplink&ts=2567.69)):

It's a combination, right Paul? Yeah, as you know, workloads generate PII information personal. And then where is it getting stored? You need to make sure that your workload, when the workload is in Kubernetes, what's your PV and PV claim look like and how do you make sure that the PV claim, which is essentially encrypted at store, is what you have defined it to be. Then you only want the target to be that, right? But once you goes into the thing, who actually accesses it, whether it is encrypted, whether it's somebody's taking care, there is a shared responsibility you need to say, but we facilitate to a largest extent as to make sure that it lands in the right place and once it is in the right place, they have the right mechanisms to be able to DLP data loss protection standpoint. They have other mechanisms to actually handle that.

Speaker 2 ([44:02](https://www.rev.com/transcript-editor/shared/6589-2Z32xhb8bjbsvTSLSG1sno31-cnMkHKJ8VcAAzoimCjW1JrTzhI71dhau99KiA2YFyOcv0Ll4HQFc8JdVyOuRE?loadFrom=DocumentDeeplink&ts=2642.84)):

Okay, great. Are there any other questions from anybody out there? Okay, well thank you so much Olivia and Prasad. That was really interesting and yeah, we're glad to have you. And you can actually catch, well, I don't know if you'll be in attendance, but we have on this Thursday we'll have the first ever ecosystem day, which is where we're going to hear from industry leaders in the DOK landscape and see how they provide value to the community members in a five minute lightning talk format. So it's going to be fast and we're just going to get a lot of information from a lot of different people. So please do check that out on Thursday at 10:00 AM Pacific standard time. You can go to our meetup page. I should have had a slide for that. Sorry, I'm just going to add to the chat real quick. Or you can go to the brand new website, which we just launched at DOK community, and go to the events page and you'll see all the upcoming events linked there. So that's this Thursday at 10:00 AM So really hope to catch everybody there. And yeah, thanks everybody for joining and thanks again, Olivia and Prasad. That was great. Thank you very much, Paul. And yeah. All right, everybody, have a nice morning. Afternoon everyone. You are evening. Bye. Thank you.

Speaker 2 ([45:39](https://www.rev.com/transcript-editor/shared/hawwxUlrw6N8-hALqT1zrDsfVCclehHPqm_fEQMTz4Z0XRRAVi1brtgU2Lg-7OgmVByPJFyIBooFQKTBAkWBbGbU2_w?loadFrom=DocumentDeeplink&ts=2739.27)):

Bye.
