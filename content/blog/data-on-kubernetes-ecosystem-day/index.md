---
title: Data On Kubernetes Ecosystem Day
date: '2024-01-29T19:57:31Z'
lastmod: '2024-02-02T20:02:39Z'
slug: data-on-kubernetes-ecosystem-day
author: Paul Au
image: EcosystemDay.webp
categories:
- Events
---

*A summary of our discussion and presentations during our first-ever DoK Ecosystem Day.*

DoK is a vendor-neutral space, but we also know organizations rely on vendors for different parts of their stack. In January, the Data on Kubernetes Community gave vendors an opportunity to be shameless for its inaugural Ecosystem Day event!

Each vendor was given 5 minutes to present a lightning talk.

*The following provides a brief overview, video, and transcript of the event.*

**Ecosystem Day**

*Presented by:*

- [Cindy Ho](https://www.linkedin.com/in/cindyhoit), Senior Technical Product Manager,  Dell Technologies
- [Robert Hodges](https://www.linkedin.com/in/berkeleybob2105/), CEO, Altinity
- [Peter Shuurman](https://www.linkedin.com/in/pwschuurman/), Software Engineer, Google
- [Dean Steadman](https://www.linkedin.com/in/deansteadman/), Senior Product Manager, NetApp
- [Alvaro Hernandez](https://www.linkedin.com/in/ahachete/), Founder and CEO, OnGres
- [Edith Pucilla](https://www.linkedin.com/in/edithpuclla/), Technology Evangelist, Percona
- [Matt LeBlanc](https://www.linkedin.com/in/matt-leblanc-boston/), Senior System Engineer, Avesha

In this town hall, various DoK community members and industry leaders in the DoK landscape demonstrate how they provide value to the community and end users in 5-minute lightning talks.

**Cindy Ho - Dell Technologies: Crossing the Storage Chasm**

- How Dell delivers enterprise-class Kubernetes data storage capabilities through Dell APEX Navigator for DevOps teams that need storage capabilities that go beyond standard Container Storage Interface (CSI) drivers as they adopt a multicloud approach.

**Robert Hodges - Altinity: Helping Users Build Fast, Cheap, Modern Analytic Stacks**

- How Altinity enables customers to operate high-performance ClickHouse on any Kubernetes cluster and account and includes support for on-prem operation.

**Peter Shuurman - Google: Cost Effective Availability with GKE Stateful HA Controller**

- How Google balances cost and availability for stateful apps on Kubernetes using GKE Stateful High Availability Controller. Peter covers two stateful architectures where the GKE Stateful HA Controller can deliver the sweet spot on the cost/availability curve.

**Dean Steadman - NetApp: Intelligent Data Infrastructure for Kubernetes**

- How NetApp Astra simplifies the way to protect, move, and store Kubernetes workload across hybrid multi-cloud environments.

**Alvaro Hernandez - OnGres: Sharding Postgres on Kubernetes**

- How to use K8s operators to create sharded Postgres clusters–one of the most complex Postgres deployments–a breeze with a dozen lines of YAML (or the Web Console!) and create production-ready sharded clusters with coordinators, workers with high availability, connection pooling, and more.

**Edith Puclla - Percona: Automating Database Operations with Percona Kubernetes Operators**

- How to automate database operations using Percona Kubernetes Operators, a solution free from vendor lock-in. Learn about automation examples that significantly reduce the complexity and time involved in deploying, scaling, and managing databases, ensuring efficient and reliable infrastructure.

**Matt LeBlanc - Avesha: Breakthrough Data Gravity with KubeSlice**

- Learn how Avesha's KubeSlice enables easy connection between multicloud K8s clusters and discusses two use cases: migration and burst/partial migration.

**Rob Reid - Cockroach Labs: Mission-Critical Applications in Kubernetes with CockroachDB**

- How CockroachDB is built for the cloud and uses distributed SQL that survives any outage, scales horizontally, and ensures data consistency whether running in a single Kubernetes cluster or multiple globally distributed clusters across cloud providers.

**Watch the Replay**

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/sRqvb1JK2fw" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

**Ways to Participate**

To catch an upcoming Town Hall, check out our [Meetup page](https://www.meetup.com/data-on-kubernetes-community/events/).

[Let us know](/contribute/) if you’re interested in sharing a case study or use case with the community.

**Data on Kubernetes Community**

[Website](/) | [Slack](@slack) | [LinkedIn](https://www.linkedin.com/company/data-on-kubernetes-community/) | [YouTube](https://www.youtube.com/channel/UCUnXJbHQ89R2uSfKsqQwGvQ) | [Twitter](https://twitter.com/DoKcommunity) | [Meetups](https://www.meetup.com/data-on-kubernetes-community/)

**Operator SIG**

#sig-operator on [Slack](@slack) | Meets every other Tuesday

**Transcript**

Unknown Speaker 0:02

Go ahead and let the people in. Okay, great

Speaker 1 0:16

All right, welcome everybody. We're gonna it's going to, we are going to be on a

bit of a tight timeline, want to make sure everybody has the chance to speak but

we're just going to wait a couple more minutes before we get into some community

information and then we'll get right to the topics

Unknown Speaker 0:43

wait till 1002 And I'm going to skip put my slides up tackiness?

Speaker 1 1:25

You're just hopping in welcome. Happy to have you here. Our first ever D, okay,

ecosystem day.

Speaker 2 1:45

All right, well, 1002, I think we should just kick this off. Hi, my name is

Paul. I'm the community manager for the UK community. Today's our first DMA

ecosystem day, where we're gonna start hearing from industry leaders in the UK

landscape, see how they're providing us value to the community members and end

users. We want to thank our DoK community sponsors, our gold committee sponsors,

our Google Cloud and Percona. A couple of announcements for the events that are

taking place have a do K track at scale. And that's March 14 through the 17th.

And then also DoK day at KubeCon in Paris on March 19. So I'll be there.

Hopefully, I'll get to meet all of you as well. If you're interested in getting

involved in the community, you can scan this QR code, I'll take you to the place

to do that. And then if you're also interested in becoming a sponsor, you can do

that as well. Just a few announcements about the format. This is these are five

minute lightning talks. And we have eight people on there's gonna be a little

bit of introduction and in between time, so we're gonna limit questions to the

chat. So if you put your questions in the chat, we'll then ask our presenters to

answer those questions. And then we'll, we'll add those to a blog post their

responses along with the video of this event. So feel free to let the questions

flow in the chat. And yeah, we won't have time to get to them during the actual

event. But we'll make sure we get those questions answered. And then also, if

you want to be connected, I'll show this slide again, to any of these of our

presenters, you can fill out this form, you can use that link there that will

give us your information. And we'll connect you with with our presenters. And

this is not as it says here, not a sign up for endless emails. It's just a way

for us to introduce you to to our different presenters. All right. That being

said, we have eight wonderful presenters, and the first of them being Cindy

Howell from Dell Technologies. So I'll let her take it away.

Speaker 2 4:13

Thanks, Paul. Everybody, quickly share.

Unknown Speaker 4:21

I'll start your timer right now. Can everyone see ya?

Speaker 2 4:28

Oh great, everybody. I'm a product manager at Dell Technologies. I'm also joined

here by Brian who some of you may also know our lead developer advocate who's on

standby for any questions. Get started. So today I'll be talking about about how

Dell is helping our customers across the storage chasm, with their Kubernetes

workloads. This is specific to our Kubernetes data storage software. So Dell

primarily works with mid large sized enterprises providing services As storage

for data data intensive workloads, as many of you are aware of, although a

majority of these customers are VM based Kubernetes is becoming more and more of

a priority, there's more exploration in it, which is why we're progressing

progressing our Datastore software to make our primary storage capabilities more

Kubernetes native. And this, this started with the container storage interface,

dealt with amended the universal specification to create our own CSI drivers to

allow data persistence with our block and file storage, and more recently, our

object object storage as well. Just a couple a couple of months ago, we

introduced the container object storage interface, cosy drivers. So that's been

exciting. But with all of this, and from experience talking to customers, these

are just table stakes. For most of these customers, there are a lot of data

management problems that CSI does not currently tackle. So as for our next step,

we decided to use these CSI drivers as the foundation to build out more advanced

capabilities. And these are called the container storage modules. There you can

see them as an enhanced layer on top, further accelerating deployment testing,

for even faster deployment cycles. So today, we have seven of these modules,

they have different functionalities on top of the storage arrays, and they

intend for some of them, they introduce open source tools, and technologies that

you guys know very well, Prometheus, Grafana, opentelemetry, rustic just to name

a few. For some others, they take these enterprise class storage capabilities

that already exist in the storage arrays, and then make them Kubernetes. So

Kubernetes native, so we do the reverse there and kind of combined the best of

both worlds. For example, our replication module leverages existing replication

capabilities of this Dell storage arrays that weren't originally actually

designed for Kubernetes. Customers can pick and choose which modules they they

would like to use, and for which clusters. And among these authorization is the

most popular allows Kubernetes storage admins to apply our back rules and

instantly and automatically restrict cluster attendance usage of storage

resource. This, lets just a really quick overview. But we've seen that

Kubernetes popularity continues to grow, we have more and more customers using

these modules. And one question that we've asked ourselves and tried to focus in

on is how to make deployment operations of our software even more simple,

efficient, and scalable. Many of our customers today are new to Kubernetes,

especially in the storage realm, a lot of them, you know, are just exploring

right now. And they and then we also have staff just with a lot of different

priorities, like what do they want to use our tool for. So making the entry

point to our software as seamless as possible, has become a very top priority.

And with this, this is why we are introducing a new platform, we are developing

a unified user experience and user interface. So it's tying all those pieces

together and adding on another layer on top, built specifically to simplify

multi cloud multi site Kubernetes data storage management. This is called the

apex navigator for Kubernetes coming out later this year, and integrates

installation and deployment of our Kubernetes data soft storage software, and

provides an intuitive GUI that allows staff who aren't Kubernetes experts, not

Kubernetes savvy at all, to easily complete jobs without even needing to use

command line or having any baseline knowledge. So we're excited for what this

offer means. This year will be very exciting for us. And we're also you know,

this is just part of our continuation to build our entire portfolio to better

enable data and Kubernetes streamlined experience over and over at simplicity

and performance. So I know that was a lot in a couple of minutes. Thank you all

for any questions. Feel free to use the chat. I don't want to take up any any

more time.

Unknown Speaker 9:09

Paul, you're on mute if you're speaking.

Speaker 1 9:13

Thank you. Thank you. Yeah. Thank you. You came in, just under. So great job.

Thanks, Cindy. Yeah, again, if you have questions, feel free to add them in the

chat. And we'll try and get those answered in the blog format. Next up, we have

Robert Hodges from alternity and not take it away, Robert.

Unknown Speaker 9:37

Oh, Robert, you are also on mute if you didn't know that.

Speaker 3 9:43

Tricky. Thank you very much, Paul. I'm here to talk about building real time

analytics with Kubernetes and alternity. Alternative that's the company that's

1. I'm the CEO of the company. Let me tell you a little bit about us. So we are

database geeks. I've been working on databases for 40 years. We have 45 people

in the company worldwide decades of experience in databases, and particularly

analytic applications, the folks we typically talk to, and I think a lot of you

in the audience are app developers, you're looking in particular to build

analytics, real time, solve business problems, and you love Kubernetes. So to

wait, so we do support and services for clique, so real time analytic database.

I'll be talking about some of the pieces. But the way we got into this was we

were the develop the operator for clique house that is widely used in 1000s of

deployments worldwide. And we built an entire cloud on it. Let's talk a little

bit about that. I'm going to start with clique house, excuse me, it is a real

time analytic database. That means is designed to read vast amounts of data and

spit back answers in a second or less, by vastly mean trillions of data, or

trillions of rows of data. In many cases. It's kind of like a combination of

MySQL, an open source database that runs anywhere, and a traditional data

warehouse like Vertica, which is optimised for high performance in and reads,

and you can read some of the features here. So what can you do with a database

like this? Well, it enables you to answer questions on data that is rapidly

arriving, and where you need to get answers very quickly, either because you're

giving information to a piece of software, perhaps it's rendering a page and

needs to add something to it, or you're an analyst. For example, in financial

services, you may be trying to figure you may be a trader and trying to figure

out the best trading strategy to follow. You have an input stream millions of

rows per second of market pricing data, you're iterating through your different

visualisations are different projections of your asset positions, depending on

your trading strategies, looking at things like bid ask spreads, that's shown

graphically and allows you to set your trading strategies. So that's a typical

use case for click house, there are many others. So let me just hold on this for

a second. Where we come into the picture is if you decide that you're going to

use click house, we can help you build the application no matter where it runs.

So think you know, frame the problem, do the performance analysis, optimise

schema, this is support, we do it on any platform that you choose to run on. But

what's even better for most people is if we run it for you, and for that, we

have a alternative cloud, which runs clusters on Kubernetes. For every customer,

we spin up a separate environment one or more, you can run them in our V PCs, so

on on Amazon, Google and Azure. Or you can run in your own Kubernetes clusters

that run in the cloud or even on prem, we have secure connectivity that allows

us to come into any Kubernetes, cluster and manage clusters there. And those

clusters can then live alongside your applications. What does it look like when

you're managing these? Well, it doesn't really matter where you are, we're going

to present the same UI, which will allow you to do all the types of operations

that you need to do to run high performance analytics. This is just one example

where we allow people to scale the clusters dynamically, click OS, support

sharding. It supports replication between those between copies of the shards, we

can switch machine types, we can increase storage, all of these things we can do

with just a few clicks. And as much as possible, do them, do them while your

applications are running. So big thing in this type of in this type of system is

to be fast, but also to be able to make changes with zero downtime. What's

inside alternative cloud? Well, we're on Kubernetes. Yep. So was that a ball was

that what was that symbol?

Unknown Speaker 14:03

That was the one minute warning.

Speaker 3 14:04

Other women are warning. Okay, thanks. What's inside a lot of open source

software, I won't go into details, you can actually run this yourself.

Everything that we that we build into your stack is open source. And what we do

is we help you make it super fast on Kubernetes. So we wire together things like

CSI, networking, let you choose instance types. These are just examples of the

performance that we get such showing sub second response on Kubernetes. In fact,

we've never seen over the years of using Kubernetes. We've never seen any real

performance impact from running on that platform. Instead, it's mostly just big

advantages. So I if you want to, if you're doing analytics, building real time

systems, you've picked clockhouse. Come talk to us. We can help you in three

different ways. We can run it for you on our alternative cloud cloud platform,

we can help you build a Kubernetes cluster clusters yourself and manage them

yourself. And then we can give you software and enterprise support anywhere you

choose to run. That's us. So hope to talk to you. And you can ping me on the

DLQI slack if you want to talk to me directly. I'm out there and watching for

for messages. Thank you very much, Paul.

Speaker 1 15:17

All right. Thanks, Robert. Next step, we have Peter Sherman, Google. Take it

away, Peter.

Speaker 4 15:28

Hey, everyone, Selfridge here on Google, working on storage infrastructure.

We'll be talking about the GK staple ha controller new tool that can help you

balance cost and availability for block storage applications on Kubernetes. So

let's talk about availability. I think we can all agree availability can be

expensive. And why is that? data replication. So if you want your data to be

available during a zonal outage, you need to move your data across zone

boundaries at the application layer. All major cloud providers charge requests

or egress. And this replication can rack up depending on the data throughput

your application happens. The other challenge is extra compute. In order to

replicate your data you need to compute running in multiple zones, do you have

to replicate the data at the application layer. However, for many applications,

a single replica properly scaled is potentially capable of handling all your

reading rights. In this case, the extra compute capacity is functionally only

necessary to provide availability for your data. In order to replicate it. What

you really want to be paying for is just the storage replication and not the

compute required to replicate it. Let's go to the other end of the spectrum,

single replica apps that aren't highly available. Kubernetes does have some

automated failover capabilities and rescheduling if there's infrastructure

failures, but even this is, has conservative defaults and cluster wide defaults.

Failure detection depends on Cuba reporting and healthy replications tolerance

for node unavailability takes. In the case of block storage, the volume forced

to detach interval. The other challenge is data availability. So in the case of

his own failure, your data may be durable. For example, GCS disk, has five nines

of durability, but what you really care about is the availability of that data.

In the event that the data is not accessible, or services are unavailable in a

particular zone, your data is effectively lost for that period of time. So, cost

availability are correlated, you can either have low cost, low availability, or

high cost high availability with multiple replicas. I ideally you'd be in the

left top left quadrant here, where you'd have low cost high availability. And

the stateful, he controller can deliver a balance of that. If your application

architecture can converge to a specific model that didn't match that domain. For

single replica apps, that gives you Multi Zone data availability, and

application specific rescheduling speeds. So you can put an upper bound on how

quickly your application can work on the failover period for your application.

And for multi replica apps, you can achieve a significant reduction in cost by

moving to a single zone. But still having data availability in the event isn't

failure. So how does this work? Let's talk about what it how it's built. It's

built on regional persistent disks. So this regional persistent disk is GCPs

synchronised only replicated block storage products. And the nice thing here is

you only pay for the additional storage space. So effectively, your storage cost

is doubled. But you're not paying the costs of replicating that data. So if you

have I crossed network egress traffic, that cost line goes away. The other

benefit or the other building blocks here is the staple H A controller is

running in GK is dedicated control plane is able to detect node failure, it's

able to evict your staple replicas from a failed node and reschedule the

application on an alternate alternate node in the zone. Working alongside the

Korea scheduler, it can mature applications regional Persistent Disk fat volumes

failover, within a bounded period of time, to your new node. So you get to

control how quickly your application replicas get rescheduled after no failure.

So let's talk about two case studies where we can take advantage of this. So

first example Kafka. It's a standard three replica application. So three zones

running through it through a book as running at three zones. It was really

originally developed by LinkedIn, or Crasto network was effectively free on prem

if you own a network, network stack. But Kafka can produce vast amounts of cross

zone network traffic that occurs egress costs. The other challenges are to work

like a See, the other thing to consider here is RTL. If you move all your nodes

to one zone, you get the same RTO of a single node fails, but there is a in the

event of a zone failure, all your brokers will need to be rescheduled to an

alternate zone. So the recovery is kind of a trade off here, we got quite a

significant cost reduction for this pricing pricing model here 3%. But the the

worst case fell over time does increase. So that is a bit of a trade off to

consider. And then the other case study is a standard single replica relational

database, you may have multiple reasons to run a single replica database

certification cost optimization, but stateful, stateful stateful, HJ can take

the existing architecture and give you an upper bound and recovery time, also

giving you data durability, cost. So if you want to learn a little bit more, we

have a blog post out you can search for GK staple which a controller, there's a

link to the preview there, you can test out installing your own cluster NRG is

coming soon in a number of weeks. Thanks for your time.

Speaker 1 21:04

All right. Thank you, Peter. Appreciate it. All right. Next up, we have Dean

Stedman from NetApp.

Speaker 5 21:12

Thanks for having me. My name is Dean Steadman, I'm a product manager here on

the NetApp team. And for folks that aren't familiar with NetApp, we are a 30

year old storage company, and data services company, we really started our data

journey with our customers really focusing on, you know, helping folks, you

know, manage both structured and unstructured data. And so over the years, we've

evolved as the market has, and, you know, most recently, you know, beating,

being able to offer up our customers, our storage services as a first party

service and all three hyper scalars really allowing customers to build out true

multi cloud hybrid solutions. And then as we look to the future, we're looking

at adding in more and more intelligence into the way that folks manage and

maintain data. Now, rather than walk through kind of the boring marketing slides

that we've got here, I found that for these lightning talks, adding a little bit

of humour into it makes this a little bit more memorable for folks. So what I'd

like to do is I'm going to introduce three concepts that our team really focuses

on when we talk about managing data for Kubernetes. And so to do that, I'm going

to, you know, like I said, use a little bit of humour here, use some memes that

hopefully will lock into your brain, make you think in that app when you run

into any of these challenges. So the first theme that we kind of take a look at

is making sure that we allow customers to manage applications and data together,

and making sure that that linkage between those two is built into everything we

1. So that as you're rolling out applications, you automatically know you know,

how they're going to store, how they're going to be backed up, how they're going

to be protected, and what their performance attributes are going to be. And the

more of that that we can bake into everything from the get go easier everyone's

life is. So in all of our solutions, we take that application first mindset and

make sure that apps and data live together for easy use. Second thing here is

that if I've been in the storage industry for 20 years, I can tell you, it's not

the most exciting thing in the world to manage a bunch of ones and zeros. So the

more we can do to help customers to automate their workflows, and to build best

practices for data management into applications, so that every application is

born and deployed automatically with the right performance characteristics, the

right amount of capacity, the right replication layers, the right data

protection capabilities, the more of that, that you can inject into the left

hand side of the the deployment lifecycle, the happier everyone's going to be.

And you know, as a as an IT guy. Quality of Life of IT people is something we

don't talk about a lot. But getting rid of the boring parts of our jobs and

having the automation workflows, pays dividends. So keep that in mind. Our third

attribute here that we really make sure is that the mere existence of data

implies that you're going to need some type of data protection, and whether

that's ransomware, or whether that's backups or whether that's disaster

recovery. All of those different use cases have different requirements. from a

technology standpoint, we offer different solutions at different layers for all

of these things, really making it easy for our customers to implement data

protection in for their applications at the right level as easy as possible. So

if you've got data protected, super simple. Last year is just a little bit of a

look at our portfolio. I've kind of called out three different pillars that our

team really focuses on. The first is our ONTAP storage operating system. This is

an operating system that was born on premises and has Now migrated as I said, is

a first party service to all three hyper scalars gives our customers the same

capabilities, the same tool sets all regardless of where they're deploying. We

add into that products called Astra and trident. Trident is our CSI Driver Set.

And then Astra is a data management and data protection platform that we have

that augments that adding in additional capabilities. And then finally, we have

a set of solutions from spot, which are our observability. And data management

tools. Really helping customers focus on REITs are using both from a resource

perspective, but then also a cost perspective. And NetApp, we always try to make

things super simple to get up and running. We allow customers to start with our

Astra product suite, you can manage 10 namespaces for free forever. Super simple

to get going with the products. Give it a test drive. And if you have any

questions, I'm available in the doc Slack channel. So nice to meet everyone.

Thank you very much.

Speaker 1 26:08

All right. Thanks so much, Dean. Yeah, we're moving well on track. So we may

have time for questions at the end. But what if we keep moving to the right clip

to next we have Alberto Hernandez, Iris.

Speaker 6 26:22

Okay, hello, everybody. Let me share my screen here. All right, the screen.

Okay, thanks. Okay, so I'm going to talk to you about sharding and sharding on

Kubernetes. And I'll just dive in directly, let me briefly introduce myself

first. I am the founder and CEO of a company called Congress. Congress is the

short for on Postgres. So you can imagine what we do for people that know me,

and the post response response was painful. If you call me three times, I will

pop up anywhere you are. I've been working for passwords for quite a long time,

or even 20 years already. And I like to work on r&d research and development

trying to come up with stupid ideas. Some of them become something tangible, the

software, like, for example, staggers, which is a software I'm gonna be slightly

talking about today that we have developed as a fully open source project for

running clusters on Kubernetes. I have done a lot of tech talks around 130, or

close to 104 years of today, they're all online on my website, ah, t.es, quite

short. So you're going to check them out. There's a lot of talks at the Dlk

also. So feel free to find me over there. And I'd also like to do some

nonprofits. So I run a prosperous nonprofit foundation. And I've been elected

also as an Amazon hero 2019. Let's talk about sharding today. So very briefly,

what is sharding sharding for horizontal scaling is basically splitting the

workload, the data that I have from our potentially large database into multiple

writer instances. Most relational databases, for example, have a typical

architecture of a single primary and multiple writers sorry, a single right or

no and multiple reads. But if you really want to scale this writer node, despite

that normally scaled very, very well. But if you want to scale this writer node,

you need to split the data into multiple chunks, and direct each of those chunks

to a single writer instance, this is what it means sharding and horizontal

scaling. It allows you to do basically two things to scale the writes,

obviously, but also to reduce the blast radius. If one of your writer instances,

for example, fails on even the HA mix mechanism fails also, or there's some data

corruption, you will affect only a percentage of your users. So it's also very

good for security and availability purposes. Now, a typical sharding

architecture with a relational database like Postgres will look like this, you

will have at the bottom, all the shards, like where all the data is split into

this chunk that will go to a specific server, which potentially will have a

replica. So here we have primaries and replicas for high availability purposes.

And on top of that, you have coordinators routing, or transaction routers,

they're called differently in different technologies. That word obviously

coordinate the queries receive the query serve as the entry point, and then

spin, sorry, send queries to the appropriate shard or shards and resolve the

queries, they may also be highly available. So this is an architecture that is

easy to understand. But if you think about how to deploy this architecture is

non trivial. You need to deployment one server but n plus one. But then if you

want high availability with n number of instances, you multiply that then you

really need to go out typically at least for Posterous, connection pooling and

specific configurations and potentially specific extensions, and then functions

to build the clusters and what about distributed backups. So operationally it

becomes very complex. So what we have done at stacker is thanks by running

Kubernetes things about by the power of CRDs is to create a custom CRD that

makes deploying this whole architecture with tuning with high availability with

almost everything that I mentioned here. As simple as typing this channel. Can

you type is gentle, then you've got that sorted cluster immediately. And it's

very high club, it just talks about number of instances, the size, the versions.

And that's pretty much it, then you will get on the web console. If you use

Cypress for these, you will get a nice UI where you can see all the status of

your coordinators, the charts and all the characteristics of it. So just to

name, the features that this this supports already is, first of all, is

supporting the site to site use the sign extension for Postgres, which guess

what it does sharding. And we just take all the power of cycles and make it

extremely easy to orchestrate. It supports both highly available high

availability for both coordinators and restaurants. It does integrate connection

pooling, which is very important for situs. It supports distributed backups, so

you get a consistent backup across all your shards. And also, and this is very

unique in the industry now is not even present on Asier, at least yet. It will

use charts, you know that distribution of data may not be homogeneous, and one

chart needs to be bigger than the other one, we can achieve this with a java

file by overriding the specification for a particular service or service, and

also automated operations for restarting and restarting a cluster. So that's all

that I wanted to talk about today. I'm also available on Dlk, Slack, Twitter,

LinkedIn anywhere, ping me for any questions you may have. Thank you.

Speaker 1 31:26

All right, thank you. Barbara came in just under five minutes. Perfect. All

right. Next we have Edith bleah. From Percona. Take it away.

Speaker 7 31:39

Yeah, let me share my screen. Okay. Okay, is this baseboard? Good to go? Use a

second, I'll put the timer yet. I will set everything good. And, okay. I'm

ready. Big. Yeah. Hello, everyone. Thank you for having me. This is Ed Bucha. I

work in the side of the community at Percona. And today, I'm excited to talk

about personas contributions to the open source community, especially focusing

on the data on Kubernetes. But before starting, let's see how this is related

with they don't give this an operator see. They don't give unless operator seek

discusses gaps in information around Kubernetes operators for industry and CO

creates projects to fill those gaps. But Ghana is a member of the donkey rom

this community as a database solution company Percona works with different

databases like MongoDB, PostgreSQL, and MySQL. And when we use databases, we

talk about Stateful applications, the need to keep safe and secure our data with

Kubernetes. with Kubernetes, we deployed our database, and it became

challenging. Because we know that Kubernetes was initially designed it for the

stateless applications, and not for a stateful application like databases. We

call the things gaps with solutions. But extending the API of Kubernetes and

developing Kubernetes operators, we were able to fulfil the majority of this

gaps. Let's explore some of the use cases. Our operator can create clusters of

open source database ready to use it means that deployment complexity is

eliminated. And we include in this issue such a configuration errors both notice

starting also notes that are failing to yo yoing into the cluster. With Percona

operators, we can automatically scale backups, restore and upgrade the database.

There is no need to worry about a storage, over provisioning networking traffic

spikes, applications and services though times or data loss. We can also

integrate Percona operator with your existing infrastructure as a code tool like

continuous integration or Continuous Delivery pipelines and automate the one and

a two operations in the Kubernetes. Applications lifecycle. That always is on

Kubernetes are commonly considered complex. But with with broken operators, you

can simplify database management enabled easy migrations to Kubernetes or

respond to demand spikes in a flexible manner. It also provides a user interface

and an API that hides the complexity that Kubernetes brings from for the user.

We will see that in a moment. We put on operator we can run databases anywhere

on premise on Cloud multi cloud hybrid cloud environments are also in 1000s of

IoT devices. Also, you can move data quickly from one cloud to another cloud

without users restrictions or vendor locking. Here are our Percona As you can

find in all on GitHub, we have Percona xtradb cluster operator we have. We have

also operators for MongoDB, PostgreSQL and MySQL. What is next for Percona in

the Cloner DB space? But Coronavirus is our next step is to not ever this is an

open source solution that enables you to create a prepaid database as a service

in your infrastructure, wherever you are a platform engineer, DevOps specialist

or developer. Ares allows you to deploy and manage database clusters with a

friendly user interface, hiding the complexities of Kubernetes YAML conflicts

files and hubs configurations. areas also utilises Kubernetes operators to

deploy database cluster, you can benefit for functionalities, such as scale

esterase, restore backup, and advanced monitoring capabilities. What are our

unique benefits in our in our Percona database operators, we are completely open

source and free from vendor locking. Our operator are supported by Percona, and

the open source community. And you can find those in our Percona community forum

that is always available to help us in our website. Thank you.

Speaker 1 36:20

All right. Thank you so much, Edith. All right, we have two more speakers. Next

up is Matt LeBlanc from the vicia.

Speaker 8 36:36

Always practice, right. How you doing? My name is Matt LeBlanc. I'm a senior

Systems Engineer here at avecia. Today I'm going to talk about cube slice and

how you can use it to break vendor lock, move your your applications to any

cloud infrastructure, we're gonna be focusing on that one hybrid cloud migration

use case. But it does apply to a whole bunch of others, which we're not really

going to cover today. You know, one of the big challenges once you choose the

vendor, you're more likely to be stuck in there, whether you're originally a

Gmail user, and you end up using all of Google's ecosystems, or you started off

with an often office 365 licence ended up in Azure, or you just started with

AWS, often customers are stuck in those spaces. And the reason why is once you

start there, that data is created, all the applications are designed to be close

to the source, making it harder to move. And eventually makes it easy to break

that vendor lock. And we basically use cute slice to move your start moving your

workloads to another cloud somewhere else, any flavour in Kubernetes. And here's

an example of that, you know, we have this basic application that's running, we

have our boutique online webshop. It's a front end, storefront server versus the

right. And then we also have our payment services, the other cloud vendor out

there, and you're stuck there, right, you're gonna sue every thing inside

Google. But here's how we break that boundary, your application connectivity for

fleets of clusters without changes to the application. This is a zero trust

isolation solution. We're doing that by basically connecting your namespaces we

call that a cube slice or a slice for short. So how do we do that? Very simple.

We're going to create a disk boutique cube, slice create that slice, we're going

to add our clusters to it. In this case, we're going to connect our g k e,

Google Cloud cluster to our Oracle or OCI cluster, we're going to add that

namespace to that slice. And now once we've created that slice, and created that

secure connection, it is a is encrypted is reused role based access control. And

you have the ability to really isolate that applic application isolation

information. Now, once you have created that slice, you can then deploy that

application over in the Oracle environment that that new cluster. And once that

is up and running, you can retire that old front end service. Now the key here

is we didn't move the data, we just redeployed parts of those front end services

elsewhere, that's going to allow you to start a partial migration or hybrid

migration where you can start moving. So let's see how that works once we have

done that movement here. So first, we'll add a couple items to our cart here.

We've got the candle holder got five items, and now we have $103 in our shopping

cart. We commit that to our purchase orders complete. And now we can look in the

backend or the look at the cluster itself. If you look at that front end, that

is still that is now running on that Oracle cluster and we can check the logs

and basically see that same $103.94. Now, just quickly conclude here, you can

choose where you want your apps to run, don't let data gravity drag you down. If

you have some use cases where you want to maybe start leaving your original

vendor, we want to move to someone else, or Russia is the solution for you. If

you have any questions, please feel free to contact me my email address is

matt@vicia.io, where you can scan the QR code down below. Thanks.

Speaker 1 40:33

All right. Thanks, Matt. All right, we are to our last speaker, which is Rob

Reed from cockroach labs. Hello,

Speaker 9 40:42

let me just share my screen with you all right.

Speaker 9 40:56

Right, thank you very much. I'm Rob Reed technical evangelist at cockroach labs.

And today I'd like to talk to you about running mission critical applications in

Kubernetes on top of cockroach dB, so it'll make sense to start with distributed

SQL. And fundamentally, cockroach DB is a distributed SQL database. That means

it, it brings together a lot of the different database paradigms that we've seen

historically. For example, that means the reliability, consistency and

familiarity of databases like Postgres, and MySQL, the traditional relational

database management systems. RDBMS is, together with the no SQL databases, the

scalability, flexibility and resilience of those databases. Historically, those

two database paradigms have an overlap if we're talking about a Venn diagram,

but that's what cockroach DB brings to the table cockroach is a distributed

relational database, and it provides everything you'd want and expect from that

kind of database. It provides referential integrity, normalisation and the like.

It also provides serialisation by default, so you're guaranteed that whatever

you write into the database, all of your consumers of that database will see

out. And by adding nodes to it, you horizontally scale, not just for reads, but

also for writes, every node in cockroach DB can handle reads and writes. So

scaling is quite a seamless process. And there's no and there's no master or

primary node in cockroach dB, as you see with a lot of databases. So once scaled

cockroach DB will rebalance the data across the nodes. Essentially, you can

think of cockroach DB as being a monolithic key value store, which looks and

feels just like Postgres, we chop up the data in each table. And then those

chunks are called ranges. And we distribute those ranges to different nodes

within the cluster for resilience and scalability. And scaling might be required

across regions. In this example, we're scaling across California, Ohio and North

Virginia, you might also need to scale across clouds, cockroach DB has you

covered there as well, it doesn't really matter, cockroach DB ultimately boils

down to a single binary that you can, you can we can either host for you in a

managed service, or you can run self hosted yourself. So it also being a

horizontally scalable database with no master nodes, it's really good at

surviving multiple kinds of outage scenarios, up to including regional outages,

and even whole entire cloud outages if that's if that's your your fancy. So for

example, users in this demo in this site, they might have been talking to region

three, North Virginia, but that let's say that whole region went out. And now

we're in the realm of some of the most severe outages in history. The the worst

you're likely to see in a cockroach setup, perhaps is a missing in flight

request that can be retried. And but, but probably more likely, the worst case

scenario is you're gonna see slightly increased latencies until that region

comes back online and and consumers near that region can talk to him that

closest region. Scaling might also be required across continents, you can hide

if you can harness different database topology patterns, in order to get great

performance no matter where your users are. So for example, you can lock data to

specific regions, which I'll cover in a minute, by using the regional by row

topology, that's great for providing low Read and Write latencies to users near

that, that region, you can also use the global tables topology pattern, which

gives fast low latency writes or reads sorry, to everyone, regardless of where

they are. And we've got other products as well, I'm talking, I'm gonna talk

about serverless at the moment, because we run that on Kubernetes. We run

dedicated another offering on Kubernetes, as well, but I'll talk about

serverless. And it's a great one to try if you're looking at dipping your toes

into the world of distributed SQL. So in this example, we see one entry point, a

separation of SQL and storage, the isolation between tenant pods, a warm pool of

unassigned pods that are ready to be associated to a tenant. And it's also

running across multiple easy's although in more you're more likely You'd be

running it across multi region, that's exactly what we tend to do. And let's

just focus on tenant one for the time being. I see there's a raised hand, pull.

Gianna, do you have a question?

Unknown Speaker 45:10

That was the one minute warning.

Speaker 9 45:14

Oh, my word. So what, what I'll do, I'll blaze through this. So if 10 one needs

more space and more capacity, we bring in a pod from the hot one. If they, if

one that need goes away, we remove or remove it, and it goes back into the hot

pod pool, if the overnight usage for Telemon completely drops off, so to the

pods, and it comes back online when they do. So we've got an example of a

database running a global application, this took about 10 minutes to create. And

I'm running in the UK with low latency. And with great British pounds GBP. I'm

hitting a Ireland database. And my application is running in London. If I then

hit, a German user would experience slightly higher latency, they're still

talking to the Ireland database. And they see everything in euros, United States

high latency, but you're not going to talk to a United States database from the

1. So to simulate a United States user, I flick my VPN over and I'm now getting

really low latency. And it doesn't matter what language you're talking in the

localization table is completely global. So users, regardless of their language

can get a great experience from the app. And this is the entire database

definition for that whole app, I create a database, I enable super regions and

into those super regions I have. So I'm pinning data to the US and the EU, I

create a table called product. And whenever I see a market of Germany or France,

I asked for that data to go to the EU central Frankfurt note. And then the

internationalisation table is global. And I enable these with just one single

line of text. So it's really easy to get a fast user experience and a global

database for for your users. And we can run on Kubernetes just as just as

easily. That's it. Sorry, I probably went over a little bit there. Your one

minute morning spooked me, but I'm really glad I got it.

Speaker 1 46:59

Yeah, I'm sorry. I gave you a little extra there. Because I because the the one

minute warning, spooking. Thank you. All right. Well, yeah, thank you,

everybody, for for your presentations. These are all seem like useful tools. And

we actually do have a few minutes for questions that people did have questions.

I know, we heard a lot of information in a very short amount of time. But if

people did want to ask questions, we can make a little time for that. Otherwise,

I do have a couple more announcements I can make. I guess if anybody has

questions, please raise your hand. We will make this or this will be available

on YouTube. And then we'll also do a follow up blog post as well. Well, if there

aren't any questions, I'm going to share my screen and you can still ask

questions that they come up

Speaker 1 48:06

my, okay, this is basically a slide here. If you want to connect with any of

these, our speakers, you can scan that QR QR code, which will take you to a form

that just goes to us the DNA community. And we'll pass your information along if

you do want to connect or ask questions to any of the speakers today. Since we

have just a little bit of time, I did want to just mention, also the new

website. So we have relaunched the website, we've tried to make it a resource

for the go to resource for the Okay, information. So it's a new look and new

feel. We have a new resource library where you can access various resources. And

then also we're we have an events portal where we're going to list all the

events including events like these. And you can access all that information

here. We're always also looking for new resources or use cases. So if you have

something like that you can always reach out to me on Slack or LinkedIn. And we

can get out to the site if it's if we think it's something that will be

beneficial to the community. See, okay, well, I think that's it unless anybody

else has anything. Any last questions to make? Say? Ask. Okay, well, really

appreciate all of your time, both for our speakers and also for our attendees.

Hopefully this was useful to you all. And yeah, thanks a lot for attending. And

you know, as always, we Have these meetings once a month. And this is a little

bit of a different format. So first of our ecosystem days, but this is normally

the time for our town hall event. So yeah, thanks everybody for coming. And it's

we have, you can have a little bit of your your, your day back.

Unknown Speaker 50:21

Thanks so much, Paul. All right. Thank you.

Unknown Speaker 50:27

Bye. Bye.

Unknown Speaker 50:28

Thank you. Bye
