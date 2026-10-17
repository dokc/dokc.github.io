---
title: Can Data Become a Declarative Resource?
date: '2022-04-15T22:53:32Z'
lastmod: '2022-04-15T22:51:21Z'
slug: can-data-become-a-declarative-resource
author: Melissa Logan
image: Kubernetes-RoeyLibfeld.png
categories:
- Opinion
tags:
- application
- cloud vendor
- data
- devops
- kubernetes
- storage
---

The declarative, portable, self-healing nature that Kubernetes users are accustomed to in stateless deployments is replaced with complexity, resiliency issues, and portability restrictions when it comes to stateful workloads.

In this synergizing DoKC session, [Statehub](https://statehub.io/) head of marketing [Roey Libfield](https://il.linkedin.com/in/roey-libfeld-3803b786), head of product [Michael Greenberg](https://il.linkedin.com/in/michael-greenberg) , and DevOps lead [Uri Zaidenwerg](https://il.linkedin.com/in/uri-zaidenwerg-342a60150), discuss the challenges facing stateful Kubernetes and how to enjoy the same level of portability.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/OYzC8puQklw" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

**Bart Farrell** 00:00

Community live stream number 123. Not only that, but today is a very special day. I don't wear a costume just any day. I certainly don't wear eye makeup for very good reasons. Most of what I'm wearing right now belongs to my wife. I don't normally wear her clothes, but I make sure they're fashionable when I do. It's good to be here, and there is a reason why we are dressed up, though. As I was talking to you earlier, I am, as he said, David Garcia, and I'm playing for the stateful dead. That being said, I will be putting on my sunglasses so you don't have to see my incredible eye makeup. But we're dressed up today because all these three wonderful humans are joining us today are from Israel. In Israel, it's a very special holiday, which when American pronunciation would be Purim in Hebrew, I think it'd be something closer to 'Pu-him,' and I might be wrong on that too. I don't know, and it's a very special day where you guys dress up. From what I understand, it's like your Halloween, but it's cool because I think it's an underground Halloween because not as many people know about it, so I feel even cooler dressing up for today.

**Uri Zaidenwerg** 00:59

Here, it feels like everybody knows. You have people with swords and stuff.

**Bart Farrell** 01:07

That's true, here in the north of Spain, I think I might be the only person dressed up, right? Well, there's got to be somebody out there. But still, very nice to be here with all of you today. You are all from [Statehub](https://statehub.io/), which is one of the members of the Data on Kubernetes Community. A massive shout-out to the Statehub, which is very active in our ecosystem. They're doing great. Can we just go around and do little quick run introductions? We'll start with you, [Michael](https://il.linkedin.com/in/michael-greenberg), since you're wearing a different costume. Can you introduce yourself and tell us about your role in Statehub?

**Michael Greenberg** 01:33

I'm the head of product, which is very interesting. I presume. I do product stuff like [JIRA](https://www.atlassian.com/software/jira) tickets and design documents. Pretty much what stayed up since the beginning through various iterations, and excited to be here!

**Bart Farrell** 01:59

Good to have you, and it sounds like a very active job. Now, moving over to you, [Roey](https://il.linkedin.com/in/roey-libfeld-3803b786).

**Bart Farrell** 02:12

This pronunciation game is vicious.

**Roey Libfeld** 02:14

It's okay. Half of my American friends have been calling me Roy my entire life, and I can't fix that. So, I  manage the marketing department for Statehub and whatever development doesn't do. We've been out for six months now, and it's been a journey. It's been a lot of fun since we came up. Happy to be here with the DoKC foundation!

**Bart Farrell** 02:43

Good to have you with us. Last but certainly not least, Mr. Jenkins ([Uri Zaidenwerg](https://il.linkedin.com/in/uri-zaidenwerg-342a60150)).

**Uri Zaidenwerg** 02:49

Next month, it will be my third anniversary at Statehub. I joined them as the [DevOps](https://aws.amazon.com/devops/what-is-devops/#:~:text=DevOps%20is%20the%20combination%20of,development%20and%20infrastructure%20management%20processes.) lead, but now as a DevOps who does everything, I do solution architecture as well.

**Bart Farrell** 03:10

He is a man of many hats, although he's not wearing one. Now, today we're in it with a very flashy bow tie. I must admit that I made a massive mistake. Last week, he had already informed me that he'd be dressed up as Jenkins. I humbly mistook him for Pee-Wee Herman. I apologize for the confusion.

**Roey Libfeld** 03:28

Pee-Wee Herman is much better. We're going to go with that internally in the company.

**Bart Farrell** 03:35

Now you've got another hat that you can wear, the Pee-Wee Herman one. That being said, declarative data is something that came up. There is something we're going to talk about today, apart from just costumes and holidays is that declarative data is a very important topic that arose in our research report that we did last year, where you interviewed 500 different organizations about how they see the challenge and opportunities of running data on [Kubernetes](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/). This is what we're going to be focused on today. Get your questions out there. If there are terms that you're not familiar with, please feel free to ask. That being said, I'd like to turn it over to the three of you. Michael, if you'd like to share your screen, we can jump into the presentation. Remember, folks, take advantage. You can get your questions out here on [YouTube](https://www.youtube.com/watch?v=OYzC8puQklw&t=3204s). Also, in our [Slack](@slack), all three of these wonderful people will be available to answer them. Michael, you can take it away.

**Roey Libfeld** 04:19

We didn't have an intro because we're not planning to show big demos. I will just talk a bit about the challenge that is facing the industry. We didn't start our story with Kubernetes. We started with VMs and replication. We saw such a burning need in Kubernetes that we shifted towards it.

In Kubernetes, we found out a lot of different challenges, the complexity of the matter, and different issues from its compatibility to skill sets and the like. We wanted to talk a little bit about what we see in the industry. And now, it also fits with the [DoKC survey](/dokc-2021-report/) as to how we see ourselves fit with that. The first question will be, 'Why isn't [stateful](https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/) Kubernetes adopted as [stateless](https://kubernetes.io/docs/tutorials/stateless-application/) in general?' What are the challenges facing it then? Michael, our head of product, has been researching this topic for most of his life now. Michael is the only storage person under 40. This is why he doesn't need a costume because it's that surreal.

**Bart Farrell** 05:50

The under 40 Club is a very lonely club to be in, but you're unique. That's good.

**Michael Greenberg** 05:58

Everybody hates storage, right? Dealing with it, setting it up, configuring it, especially for replication for stuff like data protection, high availability, backups, all that now Kubernetes has kind of came out with this amazing approach of — let's have a declarative configuration, describe what you want your IT environment to look like. It will be made to fit your description. There will be mechanisms that reconcile what's happening and what you need to have.

This all works pretty well; with data set applications, you just specify your container image, how many of it you need, maybe some constraints (i.e., I want it on these nodes, not on that but the other notes) but all pretty much very generic stuff that doesn't change much from environment to environment, from cloud vendor to cloud vendor from on-prem to the public cloud and so on.

When it comes to data, it all kind of falls apart. Because then you need to specify specific storage classes that are vendor-specific. They have different properties in terms of availability and other things, in terms of availability, performance, etc. If you have an application ready to be run on-prem or on a public cloud, in a specific region, or a specific cloud vendor, you cannot easily take it elsewhere. You will be stuck with porting your configuration from one cloud vendor to another. There's no interoperability, and there's no portability of applications. That cloud-native awesomeness falls apart as soon as you need to deal with the data. Because you don't end up dealing with the data, you end up dealing with storage. (ie. I just want 10GB from a database. But where do you want it from? From a [GP2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html) or a [GP3](https://aws.amazon.com/about-aws/whats-new/2020/12/introducing-new-amazon-ebs-general-purpose-volumes-gp3/)?) And the moment you make this choice, once you kind of weld your application to a specific physical location, it will be forever because now you cannot move. You move to another region or another cloud. You get a completely different new data set.

**Roey Libfeld** 09:54

To summarize what Michael is saying, there's a reason why we're in the Data on Kubernetes Community and not the storage on Kubernetes community. Because we consume data, we don't consume storage. Storage is a physical device that is restricted to whoever sells you that physical device.

**Michael Greenberg** 10:24

On that point, Kubernetes, what it does is not only that it abstracts the physical layer, right? You probably get some VMs to run on from the cloud already. It also abstracts the cloud vendor that you're working with. So you can have cloud-native and portable applications. And the moment data comes into play, it all goes out the window.

**Roey Libfeld** 11:00

But do you think we can? Is it possible?

**Uri Zaidenwerg** 11:05

That's exactly the reason why I always wanted to work with Kubernetes. I think a lot of my other DevOps engineers, we see, at least me, see Kubernetes, as an abstraction layer above infrastructure, about blood from cloud providers. So, after I take on this huge project of deploying my application on Kubernetes, which no matter how complex it is (it could take weeks could take months) after I do that, if I want to scale somewhere else, if I have to release it over there, that's fine. That's all I need. However, let's say a new engineer comes along. All I need him to know is if he knows Kubernetes. I still feel fine with him administrating pod services as long as he knows how to debug my application in this infrastructure. But it's not the case with stateful workloads. I know different providers have different storage solutions with different features and limitations.

Some are available across AZ, and some are not. There aren't a lot of services that obstruct away the storage layer. You can either choose what the cloud is offering you right now, which is taking the easy path right now and the hardest later, or you can do a DIY solution, which is hard desk now and will be hard in the future.

I guess we know what you choose to do, which is the huge project like most DevOps teams or engineering teams don't have the knowledge required for this project; networking, and storage replication infrastructure, are tucked away behind the curtain, which the cloud provider doesn't even want you to see. I think that's the biggest issue here.

**Roey Libfeld** 13:18

We see that all the time when we talk about these types of born-to-cloud DevOps things. They were trained as DevOps in [AWS](https://aws.amazon.com/about-aws/) or got all kinds of certifications from them ([Azure](https://azure.microsoft.com/en-us/overview/what-is-azure/) or Google), and they learned like they drink the kool-aid of the cloud provider. It gives them a tool that is restricted to a certain infrastructure. And when they want to move from that infrastructure, they need certain operational flexibility. They find themselves stuck. It's either they can consume managed services that also restrict them, or they can go with a kind of DIY approach, and requires a lot of knowledge about storage and things like that, that we just don't think that people should have anymore. These are issues that were solved in many different ways.

**Uri Zaidenwerg** 14:20

The whole idea behind cloud is to let someone else solve these issues for you. You don't need infrastructure engineers and experts in your organization because they are in the cloud. They work at those companies that automate these things away. These people are being automated away. They're non-existent.

**Roey Libfeld** 14:47

It makes the difference between the stateless and stateful experiences so big that we find some don't even try the Stateful experience. Second, there is some complexity in their stack. There is another cluster, another region, or everything in the second bit. It just becomes a little bit too complex. It's also something that we saw in the DoKC survey — standardization and complexity that derives from it are some of the biggest key points that people show that stop Kubernetes from adopting Stateful workloads.

The real question is: Can Stateful deployments even come remotely close to the same user experience as their stateless counterpart? When it comes to agility and when it comes to ease of use. Michael here researches many products and stuff like that, Michael, what do you think? Is it possible?

**Michael Greenberg** 16:02

It is not impossible. Here's the thing, there is a gap in the industry, which, you know, spoiler alert, we're trying to fill regarding standardization, regarding the ability to easily provision and move around Stateful workloads by not dealing with anything storage or network related, right? Because when you try to have some persistent workload that needs to be resilient beyond the confines of your availability zone, you start running into issues (ie. You have a data problem, but you start dealing with networking issues. How do you replicate the data? How do you make sure that all of your locations are in sync if you want to move your application around, in case you want it to be portable and cloud-native and not stuck in one place?) We can't expect the solution from the cloud vendors themselves because they don't want to allow too much interoperability, too much freedom of movement of data, and the industry will close that gap. We're here to do probably just that.

**Bart Farrell** 18:05

Can we double down on that more because regarding interoperability, portability, and cloud-native bingo, if you want to win, vendor lock-in. Hearing from major cloud providers, I'm not going to name names. They're fighting against vendor lock-in, and they're okay with this. But when push comes to shove, and you look at it, and from a certain form of logic, that they want to keep everything under the same roof, push people into their solutions. Say, “we're cool with Kubernetes. but you can also use our managed container services.” How do you get beyond that? What needs to happen for them to either wake-up or for new alternatives to arise?

**Roey Libfeld** 18:48

We discussed that. But I think the first step is to market education a little bit. There is an issue with the consumption of managed services, we take solutions that solve our current problem, and we never think about any operational flexibility afterward. So, if I have a problem replicating a database, maybe I'll use a managed solution that is only applicable to that database and comes with certain capabilities but also comes with certain restrictions, or it's sometimes called providers. Most of their services like the [RDS](https://aws.amazon.com/rds/) to manage SQL and other things similar to that are restricted to their infrastructure.

One of the reasons why, if you asked me, is very simple. We are to blame. We do not look at vendor neutrality as a feature. You don't think about it in our decision-making process. When I choose a solution, my goal is to solve a problem. I don't have to think ahead of that. Suppose we start looking, like when we talk to people from the public cloud or any other, then that's them. But can I run this in Azure as well? Can I move that to Google? If the public is more aware as a community that these features matter and keeping operational flexibility is in your best interest, I think that will change a lot.

**Uri Zaidenwerg** 20:37

Of all the customers and everything I learned in my career, everything that tech can break will break, and everything that can break will break. You can take anyone's word on anything.

**Michael Greenberg** 20:55

Regarding market education, I don't know if that's the correct term here. But it used to be the case, specifically before Kubernetes, that, to run a database, you need all the cloud. It would help if you got an instance or a VM with some operating system that you're comfortable with and patch all the security vulnerabilities. Then, you would need to install the database, like binaries, the software packages themselves, and then you would need to connect the storage and then configure your *fstab* file so that they will mount and boot.

Then, it will *fsck* correctly when something happens. Do all that system administration stuff, any system administrators in the club in the crowd? Probably not anymore. So it would be like a task of a day to set up a database and AWS and the rest of the hyperscalers. Not only them, even the smaller cloud vendors.

There's also [Oracle](https://www.oracle.com/index.html), RBF, Azure, SQL; click, and you have a database. Now, what we have with Kubernetes is pretty much the same experience. You have operators that obviate entirely the need to lock yourself into a proprietary service by a cloud vendor. But we cannot still use them by inertia because we are under the illusion that it's somebody else's problem. But the problem becomes mine when it doesn't work. Last month, we had three to seven AWS outages, and the other guys aren't much better. They're amazing services. But they have one flaw: they all have people who make mistakes, and things break. With these proprietary services, you click and get a connection string. Say, you can get this with Kubernetes. You are managing your Kubernetes anyway right now. So what's the difference? Barely any. But what do you gain? If you use the correct tools on the infrastructure level, you can potentially gain and abstract the data layer as well. You get the ability not to be bound to your vendor, to a specific geographic location.

Say, two people in the garage start a company seven years later, and they're like, 'Okay, let's go to AWS us-east-1 because everybody does it, and seven years later, it's a 5,000 people corporation. They're still there, and they can't move even though their business might demand something else. They have so much data, and that's the thing that keeps them locked in.

**Uri Zaidenwerg** 24:56

I think relying on specific features for an automated thing that's automated away, like behind the curtain, as I said, provided to you by a single vendor, automatically gets you more attached to it. And which is obviously in the vendor's best interest. I'm not saying they're doing it deliberately. They will always choose to develop their own business instead of developing this thing that might take their customers away. It's probably not their highest priority. Thus, we, as consumers, need to make smart consumer decisions. We need to choose tools that will allow us flexibility like minimalist travels wherein you need to pack light and multi-purpose tools. You have it whenever you need anything, but you can still move around freely. We need to keep portability and vendor neutrality in mind. Like, whenever I deploy a load balancer on top of a Kubernetes cluster, I'll always prefer using the [Nginx](https://www.nginx.com/solutions/) solution on top of it as opposed to using a [Cloud Load Balancer](https://cloud.google.com/load-balancing/docs/load-balancing-overview) controller. Because if I take this configuration and apply it anywhere else, it will just work as opposed to something that I'll have to rebuild and figure out how to do it again on top of another infrastructure. Hence, this is why I think we need to keep vendor neutrality in mind and keep our workloads as neutral as possible so we can always deploy it somewhere else.

**Roey Libfeld** 26:59

I completely agree with him that one of the things that we see the most is companies finding themselves having to think like what you want is someone that deals with Kubernetes, developer Kubernetes, DevOps engineers for Kubernetes. However, what they see after a while, if they want to enjoy the full benefits of the public cloud, they have an AWS and Azure engineer, and these skill sets are not fungible across the infrastructure. So making a day zero decision and saying, "Okay, in our decision-making process, we think ahead. It will serve you when it comes to day two operation and stuff.” It's the reason why we created Statehub — a type of standard for storage that you can access wherever you want, however you want, and does not require you to learn all of these terrible things that Michael told us like storage, networking, and replication policies. Now, I'll let Michael introduce what we do, which is basically simplify everything and take it away.

**Michael Greenberg** 28:24

I won't bore you with too many slides. I have a certain point home that there's currently no convenient way to declare data. What you do is declare storage. The persistent volume claim mechanism is great, but it makes you declare to your containers what kind of storage they will use and where that storage will be. So if you're on AWS, you would choose to use a GP2 or GP3. On Azure, they have their storage classes that bind to actual different storage products within the Azure ecosystem. The same goes for Google cloud and so on.

First of all, the problem is with the portability of the configuration. The declare ability kind of goes away. You no longer have something that describes your application. It tells what type of binary I want to run and where is the volume that I want to use it with because, underneath the persistent volume claim, there's the persistent volume, which is an actual volume ID, like almost a LUN number that goes to a specific disk somewhere. Now, what happens if you want to move your application, even to a different availability zone, not to mention another region or another cloud, you deploy the same configuration. Even though it's consistent with the vendor you're using, you will get a blank disk. So it's not going to be your application, it's going to be your application with amnesia, it's going to be your business with amnesia — a clean slate. When you want to move to another cloud altogether, none of this will work. We at Statehub came up with a way of using the persistent volume claim mechanism to allow you to reference your data. Not specifically the physical volume and, by extension, its physical location in the world. When you run your applications and use state of storage, when they claim volume through our storage classes, it's a fully qualified kind of domain name scheme in which you have the name of your organization, company, and the name of your application or application stack. The name of the volume, this definition will point your application to the same data on any cluster anywhere in the world, no matter in which region AZ or cloud vendor it is. Now, the concerns are what happens to the application and the data access latency.

We did built-in multi-region, multi-cloud, and multi-AZ replication, which happens in real-time. It's not synchronous across large distances, but it's effectively synchronous. I won't go into details here, but you are more than welcome to ask me questions if you want to know how it all works. However, the idea is that when you want your application to run somewhere else, you will register your cluster with Statehub saying, “I have another cluster somewhere else in the world in a different cloud, and we will make sure that the data is there waiting for you to the moment when you will want to run your application there.” Then, when you run your application there, if you want to move it from somewhere else, the data will be already there, waiting for your application when it comes up. This is how we get the data close to where your application needs to run. There's a premise or concept of data locality; say you have those vendors and solutions that allow you to understand where your data is and move your container or your application close to your data and run it there. But that might not be where you need your application to run from a business perspective, right? We are obviating this approach and doing the opposite. We're bringing the data over to where your application is. By doing it as a service, you don't even need to take care of the underlying networking or connect your clusters within the same network. It all goes like when you consume a state of storage. It automatically almost magically replicates between all locations where you might need your data later on. You can just deploy your application by applying your YAML files and [Helm](https://helm.sh/) charts with the same persistent volume claim configuration; letter for letter verbatim. It's going to be the same, and it's going to refer to the same data no matter where your application is running on which Kubernetes cluster, on which region, on which cloud vendor.

**Roey Libfeld** 35:06

Just to add to that, the level of experience is so simple that even I, as someone that the closest thing you got to replication is copied and pasted Word, was able to replicate an entire cluster from one region to the world to another, to different infrastructure, and how much like four or five different databases that are connected and were completely in sync. I can do it because the only thing I needed to do was register the other cluster to state up, and the replication just started. It just recognizes what it has created, and the networking created everything for us.

Even the marketing guy can just run with it and do it in a second. There's no need for any dedicated knowledge, like all of this information that we, Michael, lost a lot of hair and hope or learned how storage works in different areas. All of these things are not needed. What the state does is turn the data into something declarative. The second you apply a single line of code, the state of the registered cluster in another region, you've created all of this infrastructure, which would have also cost you a lot. But besides that, it's just not something that you should do. It would help if you focused on developing applications, not infrastructure.

**Bart Farrell** 36:45

I have a question. Since we're talking about simplicity, as someone who can't even copy and paste on Word, I can't empathize with the previous statement and position. But thinking about that, from a simplification perspective, something that I hear with a certain degree of frequency is about how you know Kubernetes needs to become more boring, easier to use, etc. We're talking about simplicity. We're talking about the ability to save time. From a data stakeholders' perspective, what do you think are the things that data practitioners, DevOps, DBREs, etc., should be focusing their attention on and perhaps are wasting their time on these things that are being simplified by the work that you're doing?

**Uri Zaidenwerg** 37:39

You're asking what else works with a service like ours? Like, saves you time on?

**Bart Farrell** 37:48

Yes, it saved me by saving you time on certain things, enabling you to focus on things that should be a bigger priority or deserve more attention.

**Uri Zaidenwerg** 37:56

First of all, let's make one thing clear. Everybody knows this, I think. At least everybody in this industry knows that we are understaffed. No matter where you work, you're probably in need of another DevOps engineer.

**Bart Farrell** 38:12

By the way, are you hiring? Are you hiring Jenkins experts?

**Michael Greenberg** 38:20

Everyone is hiring.

**Uri Zaidenwerg** 38:23

Everyone is hiring DevOps engineers. Seriously, it's a big pain in this industry. Many startups have been popping up because of money being printed in COVID. Further, a lot of startups mean a lot of people need to scale their applications, meaning a lot of people, a lot of CTOs dealing with DevOps instead of just building applications. First of all, you have that, and then everybody wants, say when you have customers, and you're making money for each customer going into your platform, you make money from your customers using it. You need it to be available. I know a lot of companies that have DR as a task. But this task is too big, and it's not agile enough. It doesn't fit any spring because we currently work as a startup, a lot of startups. Even big companies and enterprise companies just adopted the same methodology.

You're doing Agile, and then you try to make small tasks every time you know you're trying to fit into the smallest as possible into springs. You have this DR task, which is at least two weeks long, so it doesn't fit any spring. Does it? It's a huge thing, so it always gets postponed. Even if you start small, say, 'Okay, I'll only create DR for my Jenkins.' I don't only do that. It takes a few days. So, you put that aside, complete Jenkins, and take everything aside. You continue developing more important stuff (i.e., new features) because everybody needs new features all the time. Because if not, you're not competitive enough in your market.

Then, you ask downtime after another, 'How come we don't have *DR* yet? Why do I have all this automation that can deploy everything I have in any region I want, but I still can't bring my application up there.' This is the reason why I joined Statehub in the beginning because I had this happen to me. I had this region down, I had all the automation ready, but I didn't have data on the other side to bring it all up. Once again, this is a huge thing. *DR*, it's a huge project that you wouldn't have to think of, not on day one, not on day two. You wouldn't have to maintain replication. You wouldn't have to maintain network infrastructure or storage infrastructure. You just have it. That's the biggest thing. Plus, even just redeploying Prometheus server on an existing cluster, same cluster. Let's say you want to change the Helm chart, or you think something you changed from one version.

**Roey Libfeld** 42:11

I expect that from Jenkins. It's okay. If I can summarize this just a little bit, we see with a lot of our clients that we take care of a lot of day two operations on day one. So basically, all of these things that we were talking about from replication, portability, copy management, fire drills, and disaster recovery.

**Michael Greenberg** 42:42

All the nice to haves that are actually crucial to your business.

**Roey Libfeld** 42:45

Yes, all of those things that you tell your boss, say, 'Yeah, we'll do that.' Eventually, nothing's ever going to happen or something like that. You can take care of them on day one and remain increasing your portability and flexibility

Like we said, making the right decisions at day zero and implementing them on day one. If those decisions include a lot of the day two operation, it saves you a lot of tasks. Just think that all of these tasks that you see in Day1 that we just shifted left are all perpetual things that will take time from your team on a daily, weekly, or monthly basis. However, this is a wasted time as you could have developed features and things that will bring you customers or can improve the experience of your existing customers.

**Michael Greenberg** 44:03

I have another suggestion for Bart. Instead of spending a month making your database resilient across two clouds or two regions, do it in 2-5 minutes with Statehub and go home early with your kids or your family. Live life a little. Don’t mess with storage and networks because work — you will never have less of it. The more efficient you are, the more work you have.

**Uri Zaidenwerg** 44:59

I was going to say, as a DevOps, which is understaffed, that even if you automate that part away, you'll probably have other tasks to deal with (ie. bringing more automation into the internal platform and having your developers work on cheap features faster or fix bugs faster).

**Michael Greenberg** 45:25

Knock off some JIRA tickets from the backlog, increase your velocity, get a raise.

**Roey Libfeld** 45:32

Also, with basic IT practices, you can try applications on a few different clouds. Maybe today it works well on this cloud, and tomorrow, you'll use a different one like the Kubernetes gives us this promise that we'll be able to help reversible decisions. Further, we'll be able to have self-healing things, and all of these amazing things that are similar to storage kind of like took away a little bit. But if we stop looking at storage and start looking at this data, and we start saying, 'I want this data to be served to the application, I don't want to create the connection between the data center and the application. Also, ensure that everything is in place. I want to wish upon data and let it appear.' That's the experience that Statehub wants to give, an experience that to deal with data, you don't have to know storage, network, or all of the other things that Michael mentioned.

**Bart Farrell** 46:36

With that, if I can ask a question, they were talking about simplifying things. Being in a smaller company, many of you will be customer-facing, directly contacting customers. That's something in bigger firms, and perhaps some folks don't necessarily have.

When it comes to explaining these things, and in terms of how much detail you have to get into, we noticed in the research report that perhaps some organizations are ready to save for workloads on Kubernetes and aren't even aware of it. How do you educate the customer on what they need to know about and what will add value in their case?

**Roey Libfeld** 47:11

We were at KubeCon this year and, like the previous component. In the beginning, when we explained to people, it was our first big event and expressed, “We created storage, we created this and that,” Michael started coming to people and telling them, “Your data is here. If you write this code here, it will appear here.” Then, they went like, “That's exactly what I want.” You're right, people want things to be simple. People want things to just work. It's one of the reasons why we did it as a service. But it's still a pay-as-you-go and everything, but we needed this as a service, so you'll be able to consume it and not think about all of that.

I completely agree people don't want to go into complicated DIY solutions or learn complex things. They want to have simplicity. When I show someone how I replicate a cluster in a tool, I'll tell them that I have zero experience in the matter. That's basically what they want to see. They want to see something that has been simplified in a way that you don't even think about it. In the same way that I have no idea where [Dropbox](https://www.dropbox.com/app-integrations) is holding the data that I put in it, it's available and protected. That's what's important.

**Michael Greenberg** 48:46

Dropbox is a pretty good analogy in terms of the declarativity. You don't go and mount some network folder with an IP address. A long path with a tilde and your username/home/users. Maybe 10% of the people understand what I'm talking about. But the way things used to be, you needed to point to the physical location of your data volume on the network to access it. What you do with Dropbox, say, “Hey, Dropbox, that's me. Where's my stuff?”. It just appears, and you save a file there, you go to any other computer anywhere in the world, and your data is there. As long as Dropbox knows it's you. This is the storage experience we've created for Kubernetes. Just as you declare, what is the name of the container image you want to run. You also declare the name of the data and the container that goes with it. Then, it goes with you wherever you take this configuration.

**Bart Farrell** 50:21

We are getting towards the end. There is one point that I always try to touch on with all of our speakers, some of which has been mentioned at different points throughout the conversation and we kind of actually touched on this in the beginning.

One thing is about “What is running data on Kubernetes?”; another thing is how to do it. But the bigger question, once again, customer-facing, is “Why?”. We've kind of identified some different ways in that, but if you had to choose the most important reason as to why you think organizations should be taking this more seriously, why there needs to be a stronger push for standardization, sharing practices, precisely what we do here in our community, what would be that core reason? And we'll start with Mr. Jenkins.

**Uri Zaidenwerg** 51:01

There's a spectrum. You could do everything managed, run everything managed services, and do everything yourself. I don't believe extremes are the best way to go about anything. I think you should take a more balanced approach. It would be best if you did as less as possible. Like the managed part, you need to keep as much flexibility as possible. I think the sweet point is running things on Kubernetes, we, operators, and solutions that are just deployed; developed by someone else, but are deployed in your cluster with a Helm installer or something like that, and you're still in your control. I think that's the number one reason, at least for me.

**Bart Farrell** 51:56

Anything to add, Michael?

**Michael Greenberg** 51:59

It's a chicken and egg kind of thing. But when we talk about what we offer, a lot of customers go straight to the business continuity and disaster recovery features because I'm able to get my application running somewhere else with all of its data up until the last transaction before the failure.

There are other reasons as well. For example, I have a different cloud, which is now cheaper, say, “Why won't I move my workloads there if I can get cheaper [Spot Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html)?” I can't because I don't have my data there. Well, now, you can have your data there. It all boils down to the following facets of application mobility: (1) as a core ability for you to run your business effectively (2) minimize downtime (2) be more efficient with funds (3) protect your data assets and your brand. I love saying application mobility. However, the problem is it both means a lot of things to me and nothing to most people. Thus, here we are, getting the message out.

**Bart Farrell** 53:39

Last but not least, Mr. Coy with your third hat.

**Roey Libfeld** 53:45

I think it's very simple because we should run that on Kubernetes just because we like Kubernetes. We don't want to maintain different flows for data-rich and stateless applications. We want to run everything through a single orchestration layer so that we can move, create, and enjoy all these benefits that we adopted Kubernetes for. The data is just a missing part. It shouldn't hold us back. Instead, we should ask ourselves what we can do to improve it. There are a lot of benefits to running the stateful workloads of Kubernetes, but if you ask me, the biggest one is you just want everything to be containerized in a way that you have a single skill set. Engineers who can support your entire stack and unify workflow to help release things for CI/CD better, and Kubernetes has been a proven technology. It was adopted when it came to stateless and was created for stateless. Now that we have all of these tools like Statehub and many other tools that help us simplify stateful workloads, we should run it just because it's more convenient. We don't want to have different skill sets and technologies in our stack just because one of our technologies is missing apart.

**Bart Farrell** 55:24

Nice balance between the three answers. Some of these answers will have overlaps in an area where standardization is still being established and where things are quite innovative. New ones will be developed. That's what makes this exciting, and we didn't get a question from someone in the audience, can we create a project like Dropbox with Kubernetes? As Michael shared the point.

**Michael Greenberg** 55:47

We can create something that is as resilient as Dropbox. The way that Statehub currently works is that it provides block devices, like persistent volumes, to different applications running on specific clusters. But to access it from other locations, you need to move the application around. You cannot have multiple instances of the same application replicating data both ways because this doesn't work this way. However, we are gearing up to release an object storage component [S3](https://aws.amazon.com/s3/) compatible, but again, multi-region, multi-cloud that will allow you to create a sort of Dropbox alternative geared towards the end of the year. You will be able to do that. Just point your application to a bucket that appears locally but in multiple places, and the data will be replicated in real-time between all locations.

Right now, we're a solution for persistent volumes as in disk. The object is coming soon to allow you multiple right locations for multiple applications on multiple clusters, regions, and clouds.

**Bart Farrell** 57:29

So we can anticipate 'Statebox,' or maybe it doesn't have a name yet. By Kubecon, I'll send you the invoice for that. Perhaps by the next Kubecon, the one in October and in Detroit.

**Michael Greenberg** 57:47

Perhaps, probably.

**Bart Farrell** 57:52

I don't want to get him in trouble. The product is just going to be in November.

**Michael Greenberg** 57:57

No, listen, I have an ever-growing list of features. As already said, everyone is always understaffed. So, we're hiring to get these features out.

**Roey Libfeld** 58:16

The second you break the borders and make data available is something that goes as a commodity— there are no limits. Say, if you can make data available anywhere, applications like Dropbox, things like that are an option. However, mobile salesforce requires a certain performance of consistency from remote service. They don't always use follow-the-sound scenarios where you have multiple data locations worldwide that need to chain between primary and secondary without losing their sync data. All of these things are available.

We hope that just like the dropbox question, and we hope that our users will adopt us, we'll be able to create things like that. We created a free trial that doesn't require any credit cards. We give you free 100GB, which is more than what Dropbox is giving. You can do whatever you want, and we actually would love to hear it help and support different projects. For example, we were able to replicate an entire [GitLab](https://about.gitlab.com/) cluster for one of our customers. It's a hell of a project to replicate a GitLab cluster, and the level of complexity is insane. However, since we go from the disk level, not from the application layer, it wasn't that difficult. It was creating five volumes from one side and replicating them on another.

We're excited about the things that people find out about us. It's a hell of a marketing challenge because there are so many different use cases. It's very hard to focus. But so far, from a small MSP that four people are taking, like a David and Goliath story, which can take really big customers because they don't need to worry about the infrastructure desk or small companies planning on taking costly managed services. We can solve their solution with something that charges them by the gigabyte and not hours and consumption and all of these highly complicated things. We have a lot of it, but understanding the cloud bill is beyond us.

**Michael Greenberg** 1:00:45

Imagine having a complex application. As we just mentioned, like GitLab, with more than one type of database, you need the ability and the know-how in your organization; How do you create replication for each one of those? Or you can skip the whole thing and say, 'I want to have a replicated storage' So that when I want to, if one site crashes, it would be as if I unplug a thumb drive with the volumes for all of my five different databases, plug it in somewhere else, and resume my operation. It will take like 10-15 seconds. This saves a lot. How many of you DBA people came to work in the morning just to see that the MySQL replication broke during the night because of a private primary key violation? This stuff happens all the time. It's so frustrating not having to set it up in the first place because your infrastructure takes care of the copy management and resilience in real-time, continuously replicating all your data somewhere else without the clusters knowing that they're being replicated, without the application knowing it's being replicated. It's going to save you so much headache.

**Roey Libfeld** 1:02:20

I see a future where we don't even know which cloud provider we're using. We're just looking at geo availability.

**Roey Libfeld** 1:02:34

We're very excited about the things that we see in the DoK Community because sometimes you feel a little bit crazy. We're like, nobody's noticing this league issues, why aren't there enough solutions. But we're definitely excited about the DoK Community because we see not just the need but a community that wants to solve something.

**Bart Farrell** 1:03:14

I think these are all good points. That's a very nice point to finish on, that collectively we have seen so many people from different countries. We're getting together to tackle these problems that we identified in the research report and benefit from the know-how that each one can share. That being said, another tradition that makes us different here in this community is that while we've been talking, we have our amazing artists who're behind the scenes.

I'm just going to share what he came up with—kind of getting in the Spirit of St. Patrick's Day, which is tomorrow. I don't know if there is a blimp color, but maybe it's green, perhaps it isn't. We got a nice sort of mishmash of the different topics that were discussed. Obviously, quite a few were mentioned. This is an absolute pleasure. The Statehub is a very cool place for the technology that they're doing. You can see from the quality of the human beings who work there. They are hiring. Are you hiring mostly in Israel or abroad, anywhere remote? What's the deal?

**Roey Libfeld** 1:04:17

Well, outside of Russia, I think we're gonna hire anyone. That’s the new standard, I think.

**Uri Zaidenwerg** 1:04:34

The DevOp engineer will probably hire anyone.

**Bart Farrell** 1:04:49

Gentlemen, this is a fantastic conversation. This is the first time that we actually had you on a live stream and certainly not the last. I really enjoyed it, brought a lot of freshness to this and very solid beliefs. It gave us a firmer understanding of where we're at, as well as with Roey’s dream about where we're going, where we're headed. I like that. That's a good way to finish too. Thank you all very much! We will see you all soon!

**Roey Libfeld** 1:05:11

Another reminder, we have another webinar on the 23rd, and we're gonna be joined by our friends from [Platform9](https://platform9.com/). They also do a lot of work. We are working with them intensively to solve all kinds of data issues for their clients. We're also going to talk about declarative data and how it can be done in a managed Kubernetes kind of environment, how AKs, EKs, PKs, whatever S you want, can connect together.

**Bart Farrell** 1:05:42

I'm looking forward to that. I'll be doing that from London next week for our first in-person meetup. We'll also have to start planning one of those in Israel. On the 23rd, we're going to continue the conversation, and it's going to be a lot of fun. Take a little bit deeper into some of the areas that we touched on today—looking forward to that. Gentlemen, have a good one!

**Bart Farrell** 1:06:55

Once again, thank you very much, everybody! We will talk to you soon!
