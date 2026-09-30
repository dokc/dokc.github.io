---
title: Kubernetes Operators and Data Pipelines
date: '2023-06-27T16:00:51Z'
lastmod: '2023-07-26T16:19:06Z'
slug: kubernetes-operators-and-data-pipelines
author: Paul Au
image: DoKCJuneTownHall.webp
---

#### *A summary of our discussion during our DoKC Town Hall held in June.*

Data on Kubernetes Community (DoKC) [Town Halls](https://www.meetup.com/data-on-kubernetes-community/) allow our community to meet one another, share end user journey stories, discuss DoK-related projects and technologies, and learn more about community events and ways to participate.

On June 15, our Town Hall focused on two topics: 1) finding a K8s operator to protect your data and 2) migrating data pipelines into a K8s environment.

**Finding a Kubernetes Operator That Protects Your Data***Presented by: Robert Hodges, CEO, Altinity*

In our first session, Robert highlighted the increasing need for operators to provide robust security measures. He offered examples of security concerns in Kubernetes environments and outlined how operators can address these issues, such as configuring connectivity, securing ports, and managing supply chains. Robert also emphasized the importance of documentation and introduced one of DoKC’s active projects—a security and hardening guide for operators.

**Migrating PayIt’s Data Pipelines to Argo Workflows and Hera***Presented by: Matt Menzenski, Senior Software Engineering Manager, Payit*

Matt discussed Payit's challenges with AWS Glue during the build-out of a new data warehouse for a SaaS platform. He explained that his team had explored migrating from a dynamic Postgres copy of MongoDB to a next-generation data warehouse using tools like Apache Kafka, AWS S3, and Postgres operational data. However, managing AWS Glue with TerraForm proved complex and time-consuming, so they adopted Meltano and DBT for faster and more efficient data delivery to the business.

**Watch the Replay**

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/sSLFVIIEKcE" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

**Read the Transcript**

[Download the PDF](https://drive.google.com/file/d/1Wl9b1E2rucYmPwL4pUkB6PJRzbNevY1z/view?usp=sharing) or scroll to the bottom of this post.

**Ways to Participate**

To catch an upcoming Town Hall, check out our [Meetup page](https://www.meetup.com/data-on-kubernetes-community/events/).

[Let us know](https://forms.gle/ajhbb998SD47yr5i6) if you’re interested in sharing a case study or use case with the community.

**Data on Kubernetes Community**

[Website](/) | [Slack](https://dokcommunity.slack.com/) | [LinkedIn](https://www.linkedin.com/company/data-on-kubernetes-community/) | [YouTube](https://www.youtube.com/channel/UCUnXJbHQ89R2uSfKsqQwGvQ) | [Twitter](https://twitter.com/DoKcommunity) | [Meetups](https://www.meetup.com/data-on-kubernetes-community/)

**Operator SIG**

#sig-operator on [Slack](https://dokcommunity.slack.com/) | Meets every other Tuesday

**Transcript**

Melissa Logan (00:00:00):

Welcome to the June D O K C Town Hall. My name is Melissa Logan. I'm the director of D O K C. I am very excited to have special guests on today to talk about data pipelines on Kubernetes, as well as how to secure your Kubernetes operator to protect your data. Before we dive in, I wanted to just ask folks who are joining us today a community question. We like to start with a community question. And the question today iswhat is a podcast you have been obsessed with lately that includes our guest speakers, too. I'd love to hear from you. What is a podcast you've been really obsessed with lately? I like a lot of different podcasts. I can start <laugh>.

(00:00:53):

I've been listening to podcasts that focus on Brit Marling. So if you haven't heard of Brit Marling, she's a filmmaker and actress. She wrote the OA and stars in the OA, and she is just a fantastic person. She's so imaginative. She embraces curiosity and femininity in a way I deeply appreciate. And I just listened to a really great podcast with her on this show I've never listened to before, called Talk Easy with Sam Fregoso. And he just has this really nice, gentle way of talking that and they are actually friends. So it was such a lovely conversation to feel like you get to hear them two friends just chatting about really cool topics. So that's one that I've been really into, and I'm gonna listen to more of his podcasts too. What about other folks? What are you all, what are you all listening to? What's a great podcast that you've been obsessed with lately?

Robert Hodges (00:01:46):

I have a terrible confession. I almost never listened to podcasts, even though I know I should. I am, I spent my listening time as more Pandora and a lot of techno and, you know, sort of,

Melissa Logan (00:01:59):

I love it.

Robert Hodges (00:02:00):

Sort of back and, and trance.

Matt Menzenski (00:02:04):

Fantastic.

Robert Hodges (00:02:05):

So I'll take a, I'll, I'll be noting all the things that you all like and, and and try and catch up.

Melissa Logan (00:02:10):

That's great. You gotta share some playlists. Robert <laugh>,

Matt Menzenski (00:02:14):

I'll confess that I've never really been a podcast person either. I went through a phase where I was and the only one I think that I like, I really listened to like every episode was the You Need a Budget podcast. Oh. Cause I had gotten really into that, that app for managing finances. And so like, you know, the very short episodes and I would just binge 'em all. I need to get back into podcast though. I think about this occasionally. So I'll also be watching the recommendations

Melissa Logan (00:02:39):

There. There's never ending streams of podcasts out there <laugh> for folks who want them. I think that's the hard thing, is what I always love hearing podcast recommendations, because there are so many. So what are, what are people that, you know, I appreciate listening to. I always appreciate that <laugh>. Well, that's great. I, I've never heard that I have a budget podcast. I've heard of that, that kind of sentiment before, so that's interesting. I'll have to look into that one as well. Get my budget back in order. That'd be helpful. Alright, well if you if you have other ones, please put 'em in the chat window. We'd love to share learn what podcast you're listening to. Moving on to just some community updates for everybody. We are very excited to announce that d o k Day North America registration is now open.

(00:03:30):

 D o k day is happening November 6th. It's the Monday before the Coon event happens. It is a co-located event as part of Cub Con. The C F P and Prospectus is in fact going to be made live end of day today. So we'll be sharing that out on social media in our email, on Slack. Keep an eye out for that. We would love to see your submissions for D O K day. We are looking for topics around D O K day two d o K application development, d o k security, d o k use cases and best practices, d o k emerging and advanced. So you'll see all the descriptions for what those look like in the cfp. And it's going to be part of the, the CNCF F'S larger co-located event C F P. So you'll see D O K along with other co-located events that they're managing.

(00:04:21):

 And you'll be able to submit for our event that way. And they're hosting our event. We have a program committee that's choosing content for that event. Like everything we do, it should be vendor neutral objective. How can you provide something of value based on what you're doing with Kubernetes and data workloads. So please submit your c o p that it will close on August 6th, I believe. So you've got plenty of time to get it in by then. We will be looking for your talks. The next update I wanted to share from the D o K community front is what the operator SIG is working on. So if you're not familiar, the operator SIG was created out of a need to try to help people navigate what's happening with Kubernetes operators for for data workloads and projects that we as a community could help advance to make things better.

(00:05:11):

Because in our previous data on Kubernetes surveys, we learned that operators are just a challenge for y'all. It is a, there's a lot of complexity. Not all of them are, are as mature. They have varying degrees of quality, things like this. So we created the SIG to try to help figure out what we can do as a community to improve the landscape for everyone. Whether it's working with folks within the C N C community within Kubernetes community, trying to advance some projects there, or out external things that we're working on like white papers and, and other things like that. So, a few projects. We are closing out on one project. We've been working with the C NCF storage tag on a databases on Kubernetes White, Kubernetes white paper that coming to a close. We're doing final proofreading and editing. And the C N C F storage tag will be publishing that paper pretty soon.

(00:06:04):

You'll see it on our channels too. We'll be sharing all of that external in our community as well. Great resource if you're just getting started or really wanna dig into understanding what database on Kubernetes look like. That project's gonna close, but we have three different projects that are open. One is the operator feature matrix. This is a comparison matrix for database operators. We started with database operators. We are hoping to expand it to other types of operators, but there's enough complexity in just database operators. So we started there. Lots of opportunity to contribute. If you create a database operator and maintain one, then this is a project for anyone to get involved in. And you could submit your operator and just put all the features in there to be added to the matrix. And that'll be on the data on Kubernetes website.

(00:06:53):

Once that is once we get all the initial kind of v1 entries from folks. The second project, which you'll hear about today, is an operator hardening guide. This guide will identify common attack surfaces for databases running on Kubernetes and define a set of best practices for securing them using operators. And one of our guest speakers, Robert Hodges, will talk about that today and how you can get involved in that project. The third one that we have working on right now, distributed systems operator interface. It's a set of best practices for building Kubernetes operators for distributed systems. That's a new project. We just started talking about it, I think it was the last meeting a couple weeks ago. So very new. If you're interested in that, come learn and join and see if you wanna contribute to that. We host operator SIG meetings on a bi-weekly basis.

(00:07:45):

The next one is next Tuesday at 9:00 AM Pacific. If you want more details on that you can join the operator sig channel on the D O K slack. And there's an agenda pinned to the top that has everything you need to know, all the event logistics details in there, a calendar you can add to your own calendar. It's got all the previous meeting links and agenda notes and all of that good stuff in there. So we'd love to see more people participate and join that and help with any of these projects. And you can also propose projects too. So if you have something you are just, just so frustrated with, with operators and wanna try to fix something, this is a place for you. We also hosted an operator live operator round table for people who are building operators themselves to understand the challenges that you have when you're writing operators.

(00:08:39):

And the recap for that will be published in a blog sometime very soon. The folks at Google hosted this as members of the community, and they'll be publishing a blog on the DO K website about what that looks like, as well as some next steps. We are continuing that conversation in the D O K sig meetings on a biweekly basis as well. So if that's interesting to you, please join the operator sig. The next step that we wanna share is there are a number of D O k li local meetups being discussed right now. So there was a Bay Area meetup that was co-organized by folks in our community that was held in May. And they're talking about hosting another one in the future. And there are now people in New York and Bangalore areas looking to start local D o K meetups.

(00:09:31):

 If you're interested in helping to co organize or wanna submit a talk for that or want to be involved in some way join the D O K slack reach out to Hugh Brook. And there's also an events working group Slack channel that you can join. We host a monthly meeting to talk about who wants to do what, where, and just try to help organize people and he'll share with you what resources are available to you if you are interested in doing this. And also if you wanna host D O K content at your meetup. So you might have an existing meetup that focuses on Kubernetes. You wanna have data on Kubernetes content there. Reach out to him on Slack as well. That is, we are putting together a speaker bureau of people in our community who live in different locations who can give talks in different locations.

(00:10:18):

 So multiple ways to participate with D O K in that way. And we have a form to submit a talk, so if someone can share that form. If you have a talk you'd like to give at a D O K meetup, we're looking for end user case studies, use cases ecosystem talks, things like that. We have a form you can submit. It's on in fact the main DOK website at the bottom. It says Submit a talk. There's a form there. That's where you can get that dok.community. And on there it says, where are you? And if you tell us where you are, we'll try to put you in a, you know, local meetup somewhere, talking about D O K in your local community. And that is it for the D O K updates. Without further ado, we'll go to our first guest speaker.

(00:11:05):

 Excited to have Robert Hodges here, c e o of Alterna. He is also a co-organizer from the Bay Area D O K C meetup. He is here to talk about security threats to cloud native databases and to show what protection you should look for in operators. Really excited to have him here because this topic comes up pretty frequently in our community. Operator security is top of mind for end users as they evaluate whether to adopt an operator. It was the number one criteria noted in our 2022 survey of 500 end users. So this is very top of mind for folks, very timely conversation. And he is leading the project that I mentioned previously about operator's security hardening guide. Without further ado, I will turn it over to Robert. Welcome, Robert.

Robert Hodges (00:11:50):

Thank you, Melissa. Thank you here. Thank you di Jean. It's great to be here. And yeah, thanks for the great lead in. So I'm gonna go ahead and do a share on my screen. Let me just pull this up and you can let me know if it's, if it's visible, let me know when you see my screen. Yep, we can see it. Okay, great. So my talk is called Repel Borders and it's how to find a Kubernetes operator that protects your data. So let me just jump in and do a little bit of an intro. You've already heard what I do for a living. But I've, I've been working on databases for 40 years and Kubernetes since 2018. Our company is is an enterprise provider for Click house. It's a popular data warehouse, and open source turns out it runs very well on Kubernetes.

(00:12:42):

And the reason we know that is that we developed one of the first po, possibly the first operator for a data warehouse starting back in at the end of 2018. It, it was released in 2019. And then we took that operator and we used it to build a cloud for click house. That was actually the first managed click house in both Amazon and G C P. And so we now have this cloud. We have hundreds we run hundreds of click house clusters on it. We run about a hundred Kubernetes clusters. And then because the operator is open source, it's actually used for throughout the world. There are thousands and thousands of click house clusters that run on it. And as a result, we found that we had to think pretty deeply about security.

(00:13:35):

 We're SOC two certified, like most cloud services getting into things like FedRAMP and so security just became increasing. You know, the deeper we got into this, the more we started to think about security and that led to the talk you see today. So let's start at the top. So, Kubernetes operators basically make it possible to run data on Kubernetes. They're, they're just they're just one of those the big advances in Kubernetes that has really changed the our ability to use the platform. And the basic idea behind an operator for anybody who doesn't know what they are, is they're a resource manager on lacoss. They define a basically you define a new resource type that represents your database, and then you can control it by submitting yaml. So if it's a simple operator, you know, just doing, say my sequel with, with persistent storage it can be like a really short piece of yaml.

(00:14:34):

It could be a few lines long. You submit it to Kubernetes, it has a resource name on it. Kubernetes will identify the operator that's responsible for that resource and forward it to it, and then the operator makes it happen. So so it it means that you can, for example, set up simple databases just in a few minutes from start to finish. Now, the place where this really, I, you know, simple databases are not a big deal because you could just write a deployment or write, you know, like code the stateful sets yourselves. But in real databases, particularly data warehouses and other types of distributed data, the databases are complicated. They are large clusters. And so what you'll end up having to do to stand these up in Kubernetes is you might have to define and manage 50 or 60 or even more resources.

(00:15:30):

In some cases it's hundreds. Everything from config maps to services to you know, to, to persistent volumes, so on and so forth. So you have a larger amount of YAML that you feed into the operator, but it's still pretty simple. It's, it tends to be a couple pages of, of information that that will set up this, this complex cluster. Now, the problem is that as now that we've made it easy to run data, well, or at least possible, I should say, to run data on Kubernetes, what that means is that okay, people are gonna be interested in coming there to try and hack it. So and, and so as a result, the, the more deeply you go into the, into the operators, and the more dependent you become on them, the more you're going to depend on the operators to actually supply the security that we normally expect to, to protect databases, particularly when they're running in clouds, particularly when they're running in locations where there might be network access from the outside.

(00:16:36):

So what, what we can start with as we think about this problem is just thinking about what is the threat model that we have to deal with in databases? And this is something we've, we've had to deal with for, for decades, and databases do you know, even on enterprise networks, people can still get in, they can still see, see data. This is a traditional database threat model, but it starts on the, on the left side with, with sort of the application connections. And then goes all the way to the right side where you have to think about things like backups, which are actually a really great place to go steal data because they're often unencrypted and particularly in cloud environments, it's pretty easy to expose them by accident. So there's a host of things that that, you know, we have to deal with.

(00:17:29):

And databases by and large do a pretty good job of, of covering these things. And so we're, we're sort of used to doing things like, you know, just to take one example you know, adding encryption for application connections. One important thing to think about is that it's, it, you have a tendency to think this as, as an application problem, but if you look at the threat model, you also need to consider the fact it's, it's a this is a cluster, it's a distributed system. So we also need to consider threats that arise as the servers talk to each other. Now, when we operate in Kubernetes, this threat model evolves. We have the same issues, but we also then layer in some kind of interesting concerns, particularly if we're running Kubernetes inside a cloud. And here's just some examples of the types of, of things that can happen.

(00:18:22):

I'll just pick two exposed public endpoints. So if you're not careful, if you set up E K s, for example, which is a very popular managed click house on or excuse me, managed Kubernetes on, on Amazon, and you just run an operator and set up a, a database service, if you're not careful, you can end up creating a, an exposed public endpoint. I think every, many people here probably remember the, the, the disaster where all the Mongo da databases were exposed to the internet and could without passwords and could and or encryption could easily be accessed. Kubernetes offers a way to do that at you know, for many databases because you know, if you just you know, sort of naively set things up and set up a, a service, it may very well as a side effect create a load balancer that's publicly available.

(00:19:19):

So that's an example of, of a new concern that we get as we're operating in Kubernetes. Another one is backups, which are tend to be in object storage. You need to make sure that that's configured correctly so that only the Kubernetes cluster and the people, the, the processes generating the backups can see it and that there's no there's, there's no access. And even if there were access, that the data is encrypted. So these are just examples of the types of things that we now need to think about when we're, when we're operating in Kubernetes. So this is a bit of a mess and it's a mess in the way that security already always is. It's a lot of little things that across a wide range of concerns that have to be done right, and have to be done right in a consistent way, otherwise, you end up leaving gaps.

(00:20:17):

And so the obvious question is, well, can operators do this? This is, this is just something that I mean, the already the, the idea behind operators is to set up best practice deployments, but that should now include security. And the answer is yes. And what I'd like to do is just give a couple of examples of how operators can fix these problems. And these are things that we do ourselves in our operator and that other people are doing. So, so we can drill in and just, and just show how these are how these are not only possible to do, but they're things that you should really expect from an operator. So let's take connectivity. So connectivity is, is just a problem everywhere. It's complicated encryption set up. So this shows particular threats. The threat model for an application connecting through a load balancer.

(00:21:17):

 It could be public or non-public, but anyway, it's, it, it exposes it, it's a doorway into the, in, into a virtual private cloud. It goes, you know, routes to a service and then it gets to a database. And so we could have things like, Hey, the database needs a certificate. We need unencrypt. We need unencrypted or encrypted connections. We need to make sure that we're not accidentally exposing endpoints, exposing user credentials, or having a bunch of insecure ports that are just showing up on the on the network. So this is the kind of the attack surface and what you can do with operators. And what it's reasonable to expect is that operators just automatically take care of this. So, for example operators, they wouldn't necessarily generate the certificate, but they would give you an easy way of giving, of forwarding the certificate so it becomes available to the server along with the private key, and that you have t l s correctly configured for the database so that when connections reach it, they are they're protected in flight.

(00:22:29):

Similarly, you could, when you configure the database, you can lock down in secure insecure ports. Virtually every database has different kinds of ports that that are just kind of open. An example that's pretty wide, you know, widely appears for, for Java based implementations is things like jmx. That's a port that may or may not be protected. You may not think about it a lot when you're running in a and, you know, in your own private environment. But once you're in, in something that's in the cloud in Kubernetes and potentially accessible, it becomes pretty, pretty important. Obviously, you can pass credentials using secrets. You can correctly configure the private cloud endpoint. One of the things you want to do is have a, have a way inside the inside the operator so that these load balancers don't accidentally turn out to be public endpoints.

(00:23:24):

And then of course, you want to have t l s encryption on the connection, which may mean that as you go through these through these endpoints, you have additional server you know setup of, of certificates and things like that to allow connections. The actual configuration of the, of the endpoints themselves, or, or excuse me, the load balancers themselves in our experience tends to be somewhat outta scope for operators, but it's definitely something where the operators can at least prevent you from creating the wrong type. So these are things that, that you can reasonably look for in a, in an operator, and they're actually things which by and large we do in our own operator and, and other people do as well. So here's another example, kind of a completely, oh, here's an example of what, you know, just to give you an idea of what this might look like inside the operator.

(00:24:18):

So I mentioned that the operators are just, you know, you have a, a bit of YAML that sets things up. And this is a typical example of a YAML that's used to set up the load balancer here. So we see the, the, we have the, the service annotations. These are standard labels that are recognized by Amazon in this case. And this will create an internal load balancer, so it won't have a public IP address. And then another thing that we do is we we have special annotation for ports to ensure that these, that only the secure protocols are permitted. So this port is http s it must be that's gonna be configured properly so that it's, it's only a https there's a, this secure client says, Hey, make sure it's TLS encrypted. So, and other ports will just be shut down and not, and, and not open.

(00:25:17):

So this is the kind of, this is the way this, this works out in practice. It just makes it easy for people to get it right. I'll give another example. Supply chains. So you're, you're operators manage things which are containers of various kinds, and you wanna make sure there's some sort of program for scanning them reacting to problems, and of course signing things so you know what you're getting and, and not just random software. And you also need to consider that in real systems databases tend to have a lot of additional services that they need to work. They might be Prometheus, they might be Grafana, they might be editing tools. So those containers need to be covered as well. And not just some random software you're pulling off Docker hub. So again, in at a, in a different dimension, you'd look for you know, in the pro in the, the, the supply chain management for the for the operator that the containers are getting scanned. It's not just the operator itself, but that they contain, it has a way of ensuring that you can use scanned containers and that those are available somewhere, and that the people writing the operator are tracking dependencies for example, on systems you're dependent on.

(00:26:39):

So in general, we can kind of summarize this as a set features. I've just given two examples, but there's a bunch of security features. It's not a, it's not a huge list, but this slide shows just the things that you would expect to see, you know, ranging from making sure that default accounts are locked down and not operating with passwords all the way to things like minimizing the amount of the number of privileges you need to run inside Kubernetes itself. Like you don't want give operators privileges that could allow them to bring the cluster down, like destroy nodes or something like that. And of course, software supply chain so on and so forth. So in summary that with this, what we're looking for, what, this is something that users should look for these features and, and, you know, as people are, are developing operators, they should think about these things as features to include in the operator implementation.

(00:27:44):

So there's one other thing which is kind of a hallmark of any software that's that pays attention to security, and that's documentation. So I, on top of all these other things you would expect to see and you should ask for a hardening guide a lot of security is just configuring things. It's not actually implementation. So if you see a, an operator that has a hardening guide, that's a good sign, correspondingly, if you don't see it, you should either write one or, or ask for one to be written. So one of the things that, that, you know, in, in, in doing this work, what we realized was that there is kind of a gap on operator security. And it's not that people don't do it, but there's a lot more that there's, there's just some standard things that, that w that everybody should do or at least consider in their implementations.

(00:28:38):

And so to try and fill that gap what we've started in, in data on Kubernetes is a project to develop a security and hardening guide for D O K oper or for operators that will just give developers sort of a, a, a set of things they should say, you know, standard features that they could that they can implement and that consumers can look for. And the idea is to be kind of checklisty you know, it's just like, oh, you know, secure default accounts. Got it. And yes you know, obviously you want to you know, you'll do it in some way that's appropriate for your database, but the point is you're doing it and we would like to invite you to participate in this project. It's just getting off the ground. The next step is to write a you know, to being in writing a white paper to try and pull these ideas together and also build off without and, you know, try and build off stuff that already exists in in Kubernetes.

(00:29:39):

 One of the things that's really helpful to get the experience from people who've done multiple types of operators for databases and that will make this a better project and useful to more broadly useful. So here's some background information. I will say that one of the inspirations here is a wasp, which I think many people who do security are familiar with, but that gives a great set of guidelines for, for building applications. The idea behind this is to create something similar for, for operators, particularly operators on databases. And with that, the talk is complete. I'd be happy to answer questions but Melissa, I'll turn it back to you.

Melissa Logan (00:30:26):

Yeah, no, I'm glad that you talked about this project. As you were talking, Robert, it, it made me think the operator feature matrix that Alvar has been working on, you know, we don't have a security portion of that. I think maybe we were chatting about this last time, we should make sure that there is this, you know, what's that security checklist or does it have a hardening guide or something like that as one of the features, right,

Robert Hodges (00:30:47):

Exactly. Yeah. And yeah, one, one thing that is a really important point, so we have the, the, the operator checklist. This one for now, we're trying to just scope it to security because it's something where it feels like we can make pretty rapid progress and give people just a, you know, like a kind of a wallet sized list of Yeah, I mean, obviously there'll be more documentation behind it, but we can give people a short checklist of stuff they should look for and hopefully you know, raise the level of, of security for operators across the board.

Melissa Logan (00:31:21):

Yeah, definitely. It's a great place to start. And I see a question we have from Amit. Amit, do you wanna come on live? Can Diogenese, can you unmute and ask your question? There we go. All right. Welcome,

Amit (00:31:39):

<Laugh>. Hey, thanks Melissa. This is the great details. I think we are trying to build a similar way, operator as well. And yes, security is the key things and yes, we should take care, as you mentioned, the details from Lab to right, how to do the, like, you know, TLS to encrypt funds to the secrets and all those. Just quick question, I was trying to understand like what operator you're talking about, like what kinda framework are you using? Are you using operator, TK kinda framework or any other framework

Robert Hodges (00:32:06):

As it happens? We're not we, we started running our operator before a lot of those frameworks existed, and then they've kind of changed over time. And so, in fact, I think one of the key things here is not to be particularly prescriptive about a, about a particular framework, but instead to you know, to try and kind of the way that Oasp does to identify things that are common to all operators regardless of how they're implemented. Because we'd also like many of the, I I think one of the key things here is to ensure that the existing operators that are out there and popular can, can adopt this without having to to change their implementation. So yep.

Amit (00:32:50):

Understood. Got it. And, and Melissa, I'm sure this president is going to share, but I think Robert, I am interested on the GI link, which you just shared about the, like the recent project you started about the security of the operator. Yes. I think we like to be a part of that, so if you can share that GitHub links

Robert Hodges (00:33:06):

Wonderful. I'll Melissa, I'll just stick it into the chat. Yeah, I, hopefully I can I, I'll go ahead and share a couple links on the chat and feel free to DM me on my name Robert Hodges. You can find me on the, on the D O K Slack.

Amit (00:33:23):

Sounds good. Thank you. I appreciate your help here.

Robert Hodges (00:33:25):

Yeah, thank you Amit. Welcome.

Melissa Logan (00:33:27):

Awesome. Yeah, thanks Amit, appreciate it. I see Greg asked to drop. Thanks for joining Greg. Fantastic. Great question and we're excited to have people join that project, as I meant it is pretty new. I mean, we're just getting started, so this is a great time to, to start getting involved in that. We'll add the links into the chat window and you can also join the operator sig channel on Slack. That's where we do a lot of the, where we host conversations about this.

Robert Hodges (00:33:53):

Cool. Melissa, I'm gonna go ahead and post those links in and then I'll drop to go to my next security time

Melissa Logan (00:33:58):

<Laugh>. Sounds great. Thanks Robert.

Robert Hodges (00:34:00):

Appreciate it. Thank, thank you everybody. Really appreciate it.

Melissa Logan (00:34:02):

Fantastic. Well, great. And up next we have Matt Mazeski of PayIt. Very excited to have you on and talk about how they have been unsticking themselves from Glue. So they recently migrated all of their data pipelines to Argo workflows and Hara and just trying to get that under control just completed that. We're so excited to hear about how that is going and what challenges or pitfalls you, you ran across along the way and what kind of hope and optimism you can share for anyone who wants to do this in the future. So, welcome Matt, and please take it away.

Matt Menzenski (00:34:39):

Thank you. Thanks so much, Melissa and Diogenese and everyone to DOKC. Yeah, so can everyone see my screen okay? I'm not really a Zoom user, so thank you. Yep. thank you very much for giving me the opportunity to talk today. I'm excited to share a little bit about our journey into a Kubernetes native data ecosystem. So I'll give a little bit of background. I'll talk about our legacy data infrastructure a little bit. I'll talk about our first attempt, our first iteration of a new data warehouse, some of the challenges we ran into with a w s glue in that build out, and then a migration into Argo workflows and sort of where we are today. So first, who's pay it? We are a SaaS platform. We provide a self-service portal for essential government tasks. Depending on where you're located, if you're in the US or Canada, you might have used one of our applications to do something like renew a vehicle registration, pay personal property taxes, pay utilities or water, pay your utilities like water or refuse get a copy of a professional license. All of these like little kinds of day-to-day mundane government interactions. We're trying to sort of make easier for agency users. We also provide a self-service portal and kind of a back office tool to allow doing things like updating the status of an application, looking up payment details, issuing refunds, viewing reports, handling, you know, disputed charges, things like that. And our clients include various cities, counties, and states in the US and Canada.

(00:36:12):

Our platform we sort of pride ourselves in being cloud native. We've been deploying to Kubernetes and production since early 2016. Our platform has always run in a microservices architecture almost, almost from the beginning on Kubernetes. It's all a w s we're in E K s now. In late 2022, we migrated to get ops with Argo CD for all of our application deployments. All of our Kubernetes infrastructure is also now managed with Argo cd. We're also big in big users of Terraform. A lot of our database infrastructure, et cetera, is all managed with Terraform. I think now in total we have six environments across 14 clusters multiple production environments for US and Canada. And production could be split into a couple different clusters depending on restrictions for things like card processing, et cetera. Our US production environment is in the AWS gov cloud, and I think we're something like 130 microservices today.

(00:37:14):

Most of those are Java, A couple are node js. Our, our transactional data store is MongoDB. We have one, one big MongoDB cluster that serves most purposes. And we've started kind of slowly migrating some things away from self-managed MongoDB and into a w s document db depending on service use cases where they need special handling, our infrastructure for data a lot of it dates back to fall 2017 before we actually had a data team at Pay It, our infrastructure team stood up a database that we call the op log database, or sometimes the op log warehouse, because its source is the MongoDB operations log or OP log. If you're not familiar with MongoDB, the op log is a capped collection, which the members of a replica set used to say in sync with one another. So you write against the primary member of the replica set, it writes to the op log, and the secondaries will read the op log and apply those changes to themselves.

(00:38:17):

 And we have this sort of set of two Java services and an A W S Kinesis stream that reads messages in that operations log, publishes them to AWS Kinesis, and then this other Java service consumes those records from Kinesis and writes them as J S O N to this Postgres database. And it's very dynamic. It uses a Java o R m and it creates tables dynamically as new records are inserted. And so you sort of end up with this, not really a warehouse per se, but it's a Postgres copy of the MongoDB Upstream transactional database. This op log database, this Postgres database also has been the source for most of our financial reconciliation reporting that the data team owns.

(00:39:04):

The benefits of this approach are it's very low engineering cost because it's so dynamic and it really was great for us as an organization, it bought us a lot of time to be able to have sort of this relational analytics database without requiring the investment in the data team at that early point in the business. And you sort of basically get your data immediately, right? As changes are applied to the, you know, the up log and the members of the secondaries in the replica set, they're also effectively immediately available in this Postgres copy. So you can sort of see data as it happens, even if you're in the analytics database. However, it's got drawbacks, right? It's very tightly coupled to MongoDB specifically. A w s document, DB implements the MongoDB specification, but the operations log is not part of that specification.

(00:40:00):

It's an internal feature of MongoDB and Document DB doesn't support it, right? Document DB is separate compute and storage versus Mongo, it's pretty different. So as we migrate a service from MongoDB to document db, it no longer is able to be replicated to this analytics database. And so that's a decision we've had to do. I create a new service against document DB or MongoDB? Well, does it need to be present in this analytics database? Okay, it has to be in Mongo tvb. We don't like having that our hands sort of forced in that way. Tables are created dynamically, but you don't get anything for free around indexes or constraints. And so you often get into scenarios where, you know, there's a new database collection in Mongo and that creates a new table in the warehouse. And then people start trying to query it and they say, Hey, it's not performant.

(00:40:54):

And you have to go look at how it's being used and where you can add indexes and do it all kind of after the fact rather than be proactive about it. Also, everything is J S O, right? Mongodb is, is Beson essentially just a J s O N blob coming in through AWS Kinesis. And so this application that writes to this op log database does one level of object flattening. But if you're selecting information from this database, you'll have to do a lot of further flattening lateral joins, json n b array element, a lot of complicated queries to be able to join two tables together. And that's sort of a burden on some of the business analysts who maybe don't have that skillset. And finally, it's sort of, it works fine until it doesn't, right? It's great that it's a low cost of ownership, it's great that it's hands off and then something that goes wrong and everybody's scrambling because there's not a lot of familiarity with the processes around it because it's been hands off. So for a lot of reasons we were looking to migrate away from this. The data team has grown. We've hired a real ton of database specialist onto our team. And so we've said, okay, now's the time we're gonna build the next generation pay IT data warehouse.

(00:42:10):

 So what does that look like? Well, we had some design goals. We wanted to, to meet. The big one is support our, our needs in the future. And today right where we were finding that our current approach had served our needs well for about five years. But it's showing its age is not gonna meet our needs for very much longer. So we need to meet our needs for today and we need to build for the next five years or longer. So historically, a lot of the needs from that analytics database have been reports that the data team like Python code base runs and sends out daily to our client users to do financial reconciliation you know, a record of what was paid and what was transacted and what we will be dispersing to those clients, et cetera. However, we're also now getting to a point as a business where we wanna do a lot more bi.

(00:43:00):

 We wanna have sophisticated dashboarding tools. We wanna be exposing customizable analytics dashboards to our agency users inside our back office tool. We wanna support multiple bi front ends. So we have AWS QuickSight that we use for a lot of internal uses, and also we kind of white label in our admin tool to expose to agency users. We also have an executive team that wants to live in Tableau. So with that in mind, we wanna push a lot down into the database and rather than have it implemented in two different bis we also really wanted to support this idea of any data source is a first class data source. Remove the tight coupling that the previous database had with MongoDB. We wanna be able to support MongoDB, we wanna be able to support a w s document db, we wanna be able to support any third party data source.

(00:43:51):

We want it to be performant. We want it to be managed via automation. Like I had said on our previous slide, we have, excuse me, six environments. We wanna be able to put this in all environments and not have to have data engineers sort of manually applying database changes. And we also just want it to be manageable, period, right? The data team has grown, it's still not very big. There's three people. We wanted to be able to sort of handle all of it ourselves as much as we could. And so we started out in a way that had a lot of similarities with the previous model. So instead of this Java application that would read the op log and published AWS Kinesis, we had a new job application that would read from the MongoDB Change stream and published to Apache Kafka. I had, I had said that this first generation of infrastructure was created in 2017.

(00:44:45):

Kinesis, I think, I think was selected actually because Apache Kafka wasn't yet available in AWS GovCloud. Since that time we had adopted Kafka more broadly. And so the Kinesis use case was kind of an outlier. So we said, okay, we'll we'll adopt Kafka instead for pushing this data around. And also the previous infrastructure, the previous database had been created and put into production. I think just a couple weeks before the MongoDB chain stream A p I was like made public. And so the chain stream a p i, unlike the operations log, is a public a p i document. DB does support it. And so we thought, okay, we'll build this against the chain stream and we'll get MongoDB and document DB support. And so the Strava application reads the chain stream messages, puts those into an Apache Kafka topic. We have an Apache Kafka Connect service in our managed Kafka provider that writes that AWS s3.

(00:45:43):

And then that's kind of our data lake. And then we also have a Postgres operational data store and we'll have this AWS Redshift dimensional warehouse. And the data team had been very familiar with WS Glue. We've been using it for years for all of our sort of financial reporting jobs. And so we thought, Hey, glue is an E T L tool. We need e etl, we, it's gonna leverage glue. This is what it's built for, right? And manage everything that we can in Terraform for infrastructure and AWS resources and things within the database we'll manage with Liquibase. Liquibase is a open source tool that allows you to automate database changes from Git. And we ran into some challenges managing a w s glue with Terraform. Did I skip the slide? I did not. Okay. Managing w s glue with Terraform got really challenging, really fast.

(00:46:43):

 We had tried to implement our glue jobs as sort of small focused jobs that would do one thing and then to have a glue workflow that sort of called them all in the right order. So that one would run dependent on the previous one's success or you'd have a failure handler if the previous one failed, that kind of thing. And to do a glue workflow like this, you have all of your jobs and every job also has to have a separately defined trigger, which is the conditional, you know, run the next thing if the previous thing succeeds or fails, whatever that definition is. And you can see the diagram here. The words aren't important, just the complexity is what I wanna signal. We had 43 jobs. Each of those had its corresponding trigger something in the neighborhood of 85 or 90 resources managed with Terraform.

(00:47:34):

And we were only pulling in from the platform a tiny percentage of the data that we wanted to expose in this data warehouse, right? Like we're a payments company, we process a lot of payments. We had started by pulling in sort of the core payments collections from MongoDB. We hadn't yet pulled in any of the like customer information or the information about what accounts and bills were being paid, any of these other things. We had just been pulling in a small number of these payment collections. And our workflow was already so complex that a pull request review, just to run Terraform plan, we could take 40 minutes or an hour or more. Very cumbersome. And it became apparent pretty quickly that it wasn't going to scale very well. Cause we have 400 database collections in Mongo, maybe more. We wanted third party sources again, right?

(00:48:20):

This is very complex. And furthermore, just the developer experience was really poor. We had been coming from this a w s glue background where we were just using the Python Shell environment, just running pure Python scripts for our financial reporting with this data pipeline. We were using the glue E T L, which is PI Spark. And it was really challenging to set up a local environment to run PI Spark. We had this new J VM dependency for our local developer environment. We were having to jump through hoops to get a test in GitHub actions that would stand up the spark J V M resource and run tests. It was very hard. A w s glue, I think no longer publishes a docker image for the current version of Glue E t l. So we couldn't have a good way to replicate the glue environment locally.

(00:49:14):

And there are ways to do this within Glue with endpoints, but that was really hard to set up as well. And so we found ourselves with this workflow that really wasn't ideal. We had an existing glue job and we would copy it in the glue console, make our changes there, run it, you know, and see if it succeeded or failed. It was very difficult. And the E T L extract transform load order was also really hard for us because it was difficult to find what had failed. If you see an error, you have to go back and sort of try to replicate the data frame at that point and see what the error is. It just, we had a lot of problems. We also were just spending more time managing glue and managing this environment than we were actually solving business problems. Right? We had to write our own handlers to say, record the job success or failure record when it started. And when it stopped. All these things that sort of glue didn't provide even in the, in this workflow idea. And fundamentally that meant we weren't able to ship as often as we wanted. We had all of these complicated steps that had to happen before we could deliver to the business. Hey, here's a fact table that you can hit in your BI tool.

(00:50:34):

So what do we do? Right? We have this problem. We can't deliver quickly enough. Our workflows are cumbersome. We decided to throw everything away and start from scratch essentially, right? Remove all of the complexity, like, hey, this isn't working. That we have all these hoops to jump through only to deliver a fact table and find that in the time it took to build us to build this out, requirements have changed and they're not looking at it now, right? We wanna be able to ship quickly to the business. We want to remove all the complexity we could and focus on tools that we can use outta the box or existing open source tools, things with good documentation and good communities of practice around them. And we really just were frustrated by the pace at which we were moving. We wanted to move really quickly and we were not.

(00:51:24):

And so over sort of holidays end of 2022, beginning of 2023, we ended up on selection of some core tools that we were going to use to propel ourselves forward. Melano and D B T were really big ones for this, and I'll get into a little bit more detail in the next slide. But Postgres over Redshift was one where we said, you know what? We can do Redshift later. Postgres works great for us. Now the JSON handling is great. We know how to make it performant consistency with the other databases we own. We're just gonna go all Postgres and no glue, no Terraform.

(00:52:00):

So Melano, we actually sort of discovered by accident as we were researching data transfer specifications, or I forget what search team we were using, but we found the singer specification, which the paid tool Stitch is built on Stitch data. Singer is an open source specification around data transfer defines sources and destinations as taps and targets. And it defines a schema for data moving between these two things. Melano is an open source c l I tool built on this singer framework that adds a lot of useful abstractions over it. There are hundreds of open source connectors. It's just Python, there's no jvm, there's no additional complexity there. The user experience is great. I can run it locally, easy peasy. And it supports utility plugins. So I can invoke D B T, the open source D B T core plugin within a melano project.

(00:52:53):

I have this one mono repo that contains everything. It's deployed all at once. It's all together, it's great. But right. How do I run this C L I program? I can run it locally, that's great, but that doesn't scale. A lot of people in the Melano community run melano in production in Airflow or in Dexter. And again, we are trying to limit all the complexity that we can. So I don't wanna adopt airflow just to run this other tool, right? I don't wanna adopt Dexter just to run melano. Those are complex things we didn't wanna do. But we are a cloud native shop. We've been running on Kubernetes for a long time. We have a lot of Kubernetes experience on our platform engineering team. Let's just run melano and Kubernetes, right? Melano is published with a Docker image. It's easy to put in a container.

(00:53:40):

Kubernetes is great at running containers. Oh wait, this isn't a service. This isn't something that you start up and it's just gonna stand indefinitely there and serve requests as they come in. This is a workflow. It's gotta start and stop. Well, it turns out Argo workflows solves that problem too. It gives us a way to run workflows, jobs that start and stop and can be scheduled and can have relationships with other jobs in Kubernetes. And so we can leverage all of our existing Kubernetes infrastructure. We can use our Argo cd, git hops deployment strategies to deploy these things. Our logging just works. Our distributed tracing just works.

(00:54:18):

 And so we went whole hog with Argo workflows, and again, we ran into some complexities there. We have a lot of workflows. I think just from our data pipelines for this new data warehouse, we probably have five, 600 across our environments. And now in the last couple weeks, I think we've added something like 2000 more Argo workflows jobs. So very quickly became sort of in infeasible to manage the yml ourselves. But there's a great solution for that too with hera which is a Python package available on Pipi, the package index that provides an SDK for Argo workflows and Argo events. And so we're a data team. We do Python and we do sql. We can stay in Python the whole time. Now we can write our Argo workflow definitions in Python. We get type safety, we get validation of the arguments we're passing.

(00:55:10):

We, it's simple to script. And I can say, here's a list of inputs. Generate a workflow for each of them. And we can hook that into our get ops workflow really easily because on any of these hara resources, there's a function that produces the yaml. So I can make a pull request against my mono repo to add a new Melano job, to add an Argo workflow definition in Hara in Python that runs that Melano job. And when that PR is merged, the AMLs automatically put into the GI ops repository and it just goes out. All one PR is great. So I know I'm a little pressed for time. I'm gonna gotta try to wrap this up real quick. The short version is we are moving immeasurably faster now with Argo workflows, with Herra, with Melano, with D B T than we were with a w s glue in all of 2022, standing up the data lake, standing up the operational data store, standing up Redshift, standing up as glue pipelines with all of the effort we put into that over the course of an entire year.

(00:56:10):

And granted, we had the, we had other commitments. We really didn't have much to show for it. We had, I think, two fact tables and related dimensions that were accessible to the business users in the BI tools. And that was too few, right? That's not enough of a deliverable for that much effort since beginning of this year, I think we have exposed to the business in the BI layer 170 Mongo collections, a bunch of collections from our a w s document, DB collections, a bunch of external data sources, and we can turn data around so quickly. Now, again, I mentioned it's just really one PR to do everything to add the ano job, to add the Argo workflow, to add the D V T transforms. We can turn around a request for new data in the, in the warehouse within a day. And that's really been critical for some of the things that have come up recently where a business says, Hey, I really need to do this presentation. I'd really love to have this data, but I don't see it. We can turn it around in time now. And then it's there for everybody. It's updated automatically with the Argo schedules. It's been really wonderful for us. So thank you everyone for letting me share that part of my journey. I'm happy to entertain any questions in, in the D O K C Slack or here in the chat or wherever. Thank you.

Melissa Logan (00:57:30):

Awesome, Matt, thank you. That was really great to see your, kind of, your journey and how it's, it's so much better. Now, looking at your last slide I know we're at the top of the hour, so if you do have questions for Matt, he is on the D O K C slack. Just reach out to him there, there is a a few channels about this topic. You can join those channels or reach out to Matt directly or just let us know. We're happy to connect you with Matt. But thank you. That was fantastic. I'd love to follow up with you in about six, 12 months and see how your journey is, is still going.

Matt Menzenski (00:58:02):

Yeah, I I will love that.

Melissa Logan (00:58:03):

Yeah, I, it's always great to just kind of check in and, and you know, there's always more learning to be had with these things. So we do have just our last thing is A D O K C quiz. So Diogenese, if you wanna pull that up now, it just takes a few minutes. This is if you play, you have an opportunity to win our really cool run D O K T-shirt. I think it's really cool cause I love run D M C and just pull out your phone or your computer and you can put the, the quiz I code in your a, in the app and then you can play. So dia, do you have that quiz for us now? There we go. Okay. any players gonna join us today? Anybody gonna, oh, code again. So there we go. 1 8 0 9 3 9, 13. And just a few short questions. So as we're kind of waiting for people to join, if you read a lot of our D o K reports or listen to what we're saying on these calls, you have a pretty good chance of, of winning stuff. So join the quiz. Yeah, so Dory's got the link in there, mentee.com, put that, that code in there and you can join and we'll just go ahead and dive in. Let's start our quiz.

(00:59:26):

Okay. What is the number one criteria organizations use to evaluate operators? And we did say this on the call, so I hope you're paying attention. Security, ease of use, easy to maintain or feature set. Which one of those do you think is the number one criteria organizations use to evaluate Kubernetes operators? Okay, so security, whoever said security. That is, that's something that that's one of the reasons we were talking about creating a security hardening guide because it's such a, such a hot topic for folks. So we've got Guam number one, awesome <laugh>, congratulations in the lead. Everybody's gotta catch up here. All right, question two, what do we got?

(01:00:15):

How many Kubernetes operators do most organizations use on average? This was a bit shocking to me. We, this also came from 2022 D O K survey. This was, this was surprising to many of us as we got the the results back. But 3 29 or 1520 is right. That was it was surprising to see people using so many different operators on average. Some, in fact were using much more that many more than this. So who do we got now? Who, who anybody jump into the lead? We've got Guam still in number one spot. Okay, so last question, really quick quiz. Just for fun. What do we got here for folks?

(01:01:02):

What level do most organizations require operators to perform at? So this is based on the operator framework. One basic install, two seamless upgrades, three full cycle, four deep insights, or five autopilot. We asked this in our survey, what do people, where do people want their operators to work? So it's actually deep insights, like four and above is what people said in our survey. They really want these operators to work on a very kind of, you know, eventually automation, but very deep insight, observability layer two. So not just like, you know, basic stuff, but really advanced. That's where they wanna see their operators. So we have Guam who won. Awesome. Guam <laugh>, congratulations. Please get in touch with Diogenese on the D O K Slack. If you can't find him or can't remember his whole name, that's okay. Find me or Hugh or Diogenes or someone from the D O K C staff and get in touch with us and we will get you your t-shirt. So that is it for our call today. Really appreciate you all staying a bit longer so we can join. Thank you to all of our awesome presenters, fantastic content. If you have questions for anybody, get in touch with us on the d o k Slack and we will see you in July. Thanks everybody. Have a good one.
