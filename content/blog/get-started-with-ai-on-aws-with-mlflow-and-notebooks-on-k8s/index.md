---
title: Get started with AI on AWS with MLFlow and Notebooks on K8s
date: '2023-10-25T17:49:38Z'
lastmod: '2024-04-25T21:52:56Z'
slug: get-started-with-ai-on-aws-with-mlflow-and-notebooks-on-k8s
author: Paul Au
image: DoK-Social-Media-Town-Hall-Social-Card-Template-1.jpg
categories:
- Events
- How To
---

*A summary of our discussion during our DoKC Town Hall held in October.*

Data on Kubernetes Community (DoKC) [Town Halls](https://www.meetup.com/data-on-kubernetes-community/) allow our community to meet one another, share end user journey stories, discuss DoK-related projects and technologies, and learn more about community events and ways to participate.

*The following provides a brief overview, video and transcript for the DoKC Town Hall that was held October 2023.*

**Get started with AI on AWS with MLFlow and Notebooks on K8s***Presented by: [Andreea Munteanu](https://www.linkedin.com/in/andreea-mihaela-munteanu/), MLOps Product Manager, Canonical*

In this hands-on workshop, Andreea walks through an end-to-end project for beginners using open-source machine learning tools on the public cloud. Viewers can easily follow along by accessing the existing documentation and simply following the steps provided.

This Town Hall covered the following:

- Learn about the machine learning workflows and how to get started using MLflow with Notebooks;
- Access MLFlow on AWS;
- Experiment using Jupyter Notebooks and observe experiments on MLFlow;
- Further opportunities to scale AI projects using MLOps platforms; and
- Discuss possible integrations with the tooling and their need.

By the end of this workshop, you’ll be able to run an end-to-end project using Charmed MLFlow on K8s.

**Watch the Replay**

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/uokmILv41Ao" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

**Read the Transcript**[Download the PDF](https://drive.google.com/file/d/1W2BkrPxr8T8mwFqu-r5KUJk-qHDG8YSJ/view?usp=drive_link) or scroll to the bottom of this post.

**Ways to Participate**To catch an upcoming Town Hall, check out our [Meetup page](https://www.meetup.com/data-on-kubernetes-community/events/).

[Let us know](/contribute/) if you’re interested in sharing a case study or use case with the community.

**Data on Kubernetes Community**[Website](/) | [Slack](https://dokcommunity.slack.com/) | [LinkedIn](https://www.linkedin.com/company/data-on-kubernetes-community/) | [YouTube](https://www.youtube.com/channel/UCUnXJbHQ89R2uSfKsqQwGvQ) | [Twitter](https://twitter.com/DoKcommunity) | [Meetups](https://www.meetup.com/data-on-kubernetes-community/)

**Operator SIG**
#sig-operator on [Slack](https://dokcommunity.slack.com/) | Meets every other Tuesday

**Transcript**Speaker 1 (00:00):
Hello everyone. Welcome to the October Town Hall for the data on Kubernetes community. My name is Hugh. I'm community here at DK Data on Kubernetes and this is Monthly town hall. We do this time every month and yeah, great to be with you all today. We've got a great workshop, a very practical workshop today lined up, which is going to be fantastic. I'm looking forward to that. Before we get into it, I just have a few community announcements and things to share, so I'm just going to share a couple things with you quickly. Okay, cool. So DK community.

Speaker 1 (00:43):
First up, just thank you to our gold sponsors, Google Cloud and Poona for making all this possible. We've got a bunch of other sponsors as well. If you go to DOK community sponsors, you'll able to see all of them have a look around. There's some fantastic companies in there that help make all of this possible, all of this reality, so it's great to have them on board. There's a couple of really big events coming up that we're very excited about. One is at CubeCon this year in Chicago in November, which is very soon. We had ADOK day on November 6th, so that's going to be really, really cool. It's for CubeCon this year. They're doing a whole bunch of co-located events, so you buy an all access pass, you can go to all the different co-located events and do K Day is one of those and it's on November 6th.

Speaker 1 (01:27):
The CubeCon lasts for a few days, but that's when the 6th of November is when DOK day is, so you can register for that. Today's some very cool stuff happening there. Very excited for that. And then also that week on November 9th, which I think is the Thursday of that week, we're doing a panel as well. You can find more details on the CubeCon site there. There's a panel with some people from our community involved and then also another event coming up is the event itself is only in March next year, the Southern California Linux Expo SoCal Scale, and this is the 21st one next year, the 21st annual event. So they've been going for a while, but next the one for March next year, there's going to be ADOK track, which was super exciting, all focused on DOK data on Kubernetes and the CFP for that. The papers is open until November 1st this year, so it's just under two weeks.

Speaker 1 (02:18):
If you're interested in speaking at that, then please apply. It'd be great to get some expertise from this community in there. And yeah, the event is in March, next year's a great event. Like this is the 21st edition, so it's very well established and there's some great stuff happening in there. And then next week if you're in the Bay Area, and even if you're not, it's still happening, you can get there where there's a in-person meetup happening. The details are all, actually didn't put the link in there. I'll grab the link quickly for you. I'll the link in the chat. But the Bay Area DOK community meetup is having hosting an event with four great speakers. There's three sessions, two sessions and a lightning talk. All folks on distributed SQL and stream processing on Kubernetes. It's going to be really, really interesting. There's a meetup.com link which I will drop in the chat just after this. I'll pull it up and drop it in the chat so you can get to that. So come along to that.

Speaker 1 (03:26):
It looks like do is dropping links in the chat for you. So thank you. Do I appreciate your initiative there. Thank you because I just forgot about the links. Cool, that's coming up next week. Coming along with that and that is all our announcements for this week. Today we have Andrea Nu from canonical speaking with us doing a workshop, very practical hands-on workshop. I'm very excited for, I'll later introduce her topic, much more detail because she'll know a lot better than me. Yeah, bit getting started with AI on AWS with ML flow notebooks on Kubernetes. It's going to be really interesting, very practical, which I love. So yeah, we're going to get started with that. Now at the end we will have a stick around, there'll be we'll quiz the end where you can win ADOK T-shirt run DOK shirt. So Instagram for that at the end. But for now I will hand over to Andrea over to you. I'll stop sharing my screen.

Speaker 2 (04:23):
Thank you. Thank you. And hello everyone. I'll have to confess I'm a bit nervous. It's my first time with the DOK community, but I'm excited to be here. I'll go ahead and share my screen. Meanwhile, I maybe start introducing Canonical. We are the company behind tu, the biggest UX distribution and I'm the air product manager there. I've been working with Canonical for almost four years now. Today I'll be talking about how to get started with AI on AWS with MLO notebooks on top of Kubernetes as you've already said. Why AWS? Well, because it has all the compute power that you might need, MLO notebooks are easily accessible and on top of K because in canonically we do love cloud native applications. I would like to encourage everyone to stop or to ask questions in the chat if you want or if something is unclear, don't shy away.

Speaker 2 (05:25):
I don't like when I hold workshops in their monologues. So short, we'll talk a bit about ai, then AI on the public cloud and then we'll move towards an intro to ML flow and finally a hands-on experience, which I hope it'll be fun at the end of it I'll share all the links as well so you can have fun even afterwards get started with ai. At the moment I'm running a workshop so I feel like I'm just repeating myself a lot, but I always say you should never start with AI just for the sake of it, but identify a use case. Don't do it because I dunno, your best friend does it. Don't do it because you heard my talk and you thought it was fun. Just do it because, or begin with the use case that you believe otherwise. On one hand you'll not find return on investment on what you do, but then also you will easily get bored or frustrated.

Speaker 2 (06:21):
Back when I started, initially I found a use case that I deeply enjoyed. It was for Romanian language originally from Romania and there was no AI or no more or less text to speech for Romanian and that's what I've built. And then after that I end up doing use cases and working only on use cases. Once you have the use case, look at your data and I always say again, data is the heart of any AI project. If you don't have data, it's going to be difficult to build any project, but at the same time you have to assess your data, how often is collected, how good it is, do you have enough data volumes because otherwise you might struggle and you might find it difficult or you might find that your performances are not good, then you'll move towards the stack. And I think that's where a lot of data scientists, I dunno, do we have a lot of data scientists in the room?

Speaker 2 (07:21):
I would love to to hear that. So then a lot of data scientists love looking at the stack, but then they also get frustrated because of all the incompatibilities that go up there. And finally you build your model. That's what we all love doing, build models, we validate models, we play with parameters, we play with data sets depending on what the approach that you have, if it's model centric or data-centric and in the end you deploy your model, whereas this is, it feels like a flow that's linear. It's always a process that repeats and needs to be repeated because people's behavior changes over time as well as data does. And our model can easily become outdated To get started with ai, you can and you should always start locally on an Ubuntu workstation, but I say this because I work at Ubuntu, of course you should start on the OSS or on the environment that you like the most, ensure that you have enough resources and then as your project grows and you'll start having needs such as repeatability, reliability, you'll start introducing different tools in your stack.

Speaker 2 (08:30):
Mflow is one of them. It's I think one of the most popular tools, but we'll get to that. And then you can always scale with open source using Q Flow for example, and deploy idea with different tools as well or frameworks such as Triton or sdo. I did not mention something. I do have open source under my skin and in my heart I'll be talking and I'll be using open source tools throughout this workshop. And in general in canonical, that's what we talk about. I think they're nice to help you get started with all the big investment and they're also nice in the long run because they give a lot of flexibility. Then again, I think this is a bit obvious, but why it's important to run artificial intelligence. Well, I think it started initially with research and that's something that we see heavily in the industry, but nowadays it goes far beyond from personalized experiences to process improvement, task automation or cost savings.

Speaker 2 (09:39):
We all can easily find reasons why we should use our AI and I don't think it's necessarily needed for me to go into details, but why AI and public cloud that's maybe easier and more interesting to catch on. The truth is that public clouds are handy, they're accessible to everyone and they're quite easy to use. So they give you an environment where it's easy to install things and they support open source tools. In Konica, we do have managed or support support services, but that's not as important as important is the ease of maintenance as well as the ability to get all the capabilities of an open source ML ops platform on an environment that can actually provide you the compute power that you need. And I'll move now towards ML flow.

Speaker 2 (10:36):
Its journey started around five years ago with its first release and I think what the community did great was to actually always run surveys. The first one was six months later to understand the customer needs, user needs in order to actually improve the product and make it a user-driven product. The first release comes in the same year and I think another important milestone came when ML flow integrated with PyTorch from 2020 until now. It integrated with plenty of other tools and it's quite nice to see how easy and how seamless it works with many of them. If I look at important milestones, I think the day or the month when they announced having 10 million users, it's important because if you think of AI getting a lot of traction only in the last couple of years when I was a student, AI was really considered a unicorn.

Speaker 2 (11:38):
Whereas nowadays it's mandatory in universities, in engineering schools and computer science universities. I think there is a huge step because the educational system understood that artificial intelligence and machine learning is to stay and then this number of users just confirms it. Last but not least, in September this year we canonically released its own distribution charmed ML flow and with this I'll go to the challenges that ML flow solved and the truth is that data scientists struggle with experiment tracking with code reproducibility but also with packaged standardization. There were way too many packages or methods to package and that was frustrating but also model management because both we don't experiment once but also we don't have only one model and how do we manage and track these things was a challenge that data scientists had. So I do think that actually ML flow came with some great capabilities or some great tests by giving the ability to professionals as well as to reproduce results to have an easy way to get started.

Speaker 2 (12:50):
I remember I recorded a video a couple of days ago or a couple of weeks and actually can install workflow in less than five minutes. It took me two minutes and it's with mentioning that nowadays as a product manager, I don't have enough time to think with technology so I feel I'm a bit slow. But then it also, it is environment agnostic. You can deploy directly on your machine but you can also deploy it on Kates the way that we'll do today. That's exciting and I think that's interesting because then it gives easy a way to migrate or to look in perspective on why do I do this project? How do I think it'll evolve over time, but also it works everywhere. Sorry, anywhere if it's private or public cloud, it has no problem. So what is ML flow? Do we know what ML flow here in the room? Can we have some reaction? Some, I dunno, any kind of reaction or we don't know.

Speaker 1 (13:53):
I think everyone's muted for these but you all can respond in the chat. There's a text chat there.

Speaker 2 (14:01):
I don't. I see edit says I don't. Cool then I'll, first of all, I think we should give a kudos to edit first stopping in breaking the ice. First person who saw something in a workshop except for the speaker, I think it's a hero. So MLO is an open source ML ops platform that has plenty of capabilities, but the most important ones are that it can allow users to manage workflows as well as artifacts in a seamless manner. And I go towards the components of ML flow. It has four core projects, or sorry, four core components and Mflow checking. It's used to record queries to record and the query experiments for that. They have code, they look at the code, the data, but also the configurations and results. This is the, that actually allows reproducibility of results and if we are being very honest, it gives us an easy and seamless path to look into how to get back to an experiment that we've done.

Speaker 2 (15:05):
I know three days ago ML four project, it's an add-on that appeared after as a need and it packages data science code in the format that enables reproducibility such that it can run on any platform giving professionals flexibility to do it wherever they want. We have MLO models, which basically deploys ML models in diverse environment and model registry, which really focuses on storing managing models in a centralized repository. I think it's very interesting how ML O actually evolves over time and I would strongly encourage you to look over it, but then we'll also play with it. We'll deploy it in a couple of minutes and then we will chat about it. What's charmed ML flow you might? Well, charmed ML flow is canonical distribution of the tool and to give more context, canonical started as the company or the publisher of Ubuntu, but nowadays we have solutions across all layers of the stack.

Speaker 2 (16:12):
They're all open source and we often get this question, what's the difference between the upstream project since they're both open source? Well, we offer integrations with other tools such as Cube Flow, which is a great MOPS platform to run AI scale or with Spark, which is great for data streaming, but we also have observability capabilities. We offer timely bug fixes, ensure security patching, and then from an organization perspective we offer enterprise support or managed services and here we are, it's demo time. But before we get into that, maybe I'll take a look at what we will be using here. I have some examples of hardware that we often run AI workloads on. We'll be using an AWS instance this time that has Ubuntu on it. On top of it it's going to have micro kits, which is a canonical distribution of Kubernetes. It's a low ops, super easy to install Kubernetes distribution. I'm happy to share the link in the chat at the end, but we'll also deploy it and then on top of it we'll have ML O with Jupyter Notebook as the main. I still believe that they're the tools that data scientists and machine learning engineers prefer, but of course I'm biased. It's worth mentioning that. And also juju, which is a lifecycle management tool. I'll not make it any longer. I'll go towards my EC two instance, but while I do that I'm happy to get questions. Let's see. Technology sometimes bits me cool. I'm not sure. Can you see while my screen is too small, too big,

Speaker 1 (18:12):
That looks good to me. Too small. That may be up the front size a little bit.

Speaker 2 (18:18):
Okay, one second. Let me too small. Is it bigger now?

Speaker 1 (18:30):
That looks quite clear to me I think. Yeah.

Speaker 2 (18:33):
Okay. And also thank you hug for both the template as well as being a very helpful moderator. I was just complaining that I don't have a second screen. Cool. So I'm SSHing into my EC two instance. I think it's quite a basic activity. I use the public IP and now I'll go directly to installing or to setting up my environment. The very first step will be to install micro kits and I think what's very special about this workshop is that I can do it live with you. I hope it doesn't crash because then I will look very bad, but it's quick enough and it's seamless enough that you can do it in a one hour workshop and I expect it to take shorter. So as I mentioned, we are installing micro kit, I'm installing 1 24, but newer versions are available as well. It's packaged into a snap at the moment. If you're not familiar with it you can check it out as well.

Speaker 2 (19:38):
And with this occasion I can also share the very first link, which is the guide to deploy it. Meanwhile it installed. So I'll go to the next step, which basically I'm making my purpose run without the pseudo part always it's more convenient for my activities, nothing too fancy. I'm going to next command to have access and ownership to the crypto commands and then I'll configure my cluster and the necessary service to run on top of it. Also, I'm promised to share more details with you about micro kids. Oh not here, but in the chat. And since I heard people are not necessarily familiar with ML flow, maybe is it supported on Minicube? Yes it is. So yes it's, that's a good question. Charmed Mflow supported on any CNC conformant Kubernetes.

Speaker 2 (21:02):
And also maybe I will add something here while we are waiting, we are showing that it's runs that except for the fact that it's supported. Since we are open source, you can always post or ask us anything on our matmos channel or on this course such that they actually stayed and we will happily answer and with the words installing juju, which is, as I mentioned, an operational lifecycle manager for clouds, bare metal and Kate. Or you can also ask us on data on Kubernetes Slack channel. If you talk me, I'm there, I find it very impressive. Now I'll share random thoughts while in status, but when I started looking into AI and data science and all these things, there is no community to make feel supported and it really felt a bit of a wild fight, which is quite nice now that it's all nice and organized and I don't think we genuinely or easily do that or recognize that. Now I'll bootstrap, I'll deploy AG two controller and set it up with yes with micro K and my next step will be to add a model to the controller once this installs. So we might have to wait for a bit.

Speaker 2 (22:45):
I'm not sure, does anyone here works as a data scientist or as a data science or machine learning background? No, I see. I have a problem. Okay, it looks like it worked in the end I see someone has done some basic stuff. Did you try Kaggle competitions? That's how I upskilled myself back in the days or I dunno, hug, do you have competitions in data and Kubernetes communities community,

Speaker 1 (23:31):
Not competitions in the same way Kaggle does. I've seen those and those are great. We have a little quiz at the end of this call that's not the same at all. No, we don't have competitions like that but it's a very cool idea and yeah, maybe we should

Speaker 2 (23:49):
Also, I think quizzes at the end of the calls are nice. I do like that idea as well. Okay, so we deployed ML flow, meanwhile as you see it took us five minutes, then we will have to install Jupyter Lab on the same instance. Do you think I'll have to update, bear with me. Meanwhile I can also share this part of the guide with everyone in the audience. Also, I have to maybe share some fun projects that I've done in the past. One thing that I loved doing as a student was to predict my costs. So I used to build predictive analytics based on my costs on how would I spend my money on and that was life-changing to me. It would help me understand better and also turn into a more, I think financially responsible person. And it was just for my use case, my own benefit.

Speaker 2 (25:12):
I'll have to say also recently I've heard a very nice story from someone from Thailand actually that used predictive analytics for a crayfish farm. So they had cameras above their buckets kit and the gentleman built a model that would automatically detect if the shells of the crayfish would go down because if they're not taken out, crayfish dies and he built the model, it would automatically alert the owners if that happens. And it was quite a life-changing experience that grew the chances of crayfish to actually live longer. And these are just fun projects that I can think of. We will have more at Ubuntu Summit. We have an AIML track only with this kind of projects, which is very exciting.

Speaker 2 (26:19):
So we also installed Jupyter Lab while I was sharing random stories or random use cases. It's a simple command to install digital lab now we'll have to SSH once again to include all the necessary paths. So I'll open new tab, I got right folder where my K pair is and let me copy again my public QRL. That's an older one. There's some tests before, not 64. Cool. Let's see. Yes, it worked. Also I think one thing that we should be doing one second is to get our repository of models, sorry of examples because I'll take one example from their, I mean I'll have two examples but I'll anyway clone my repository of examples as anything else that I shared so far it's open source. I mean it's available to everyone, not open source. You can play with it, contribute to it, have fun with it. Our engineering team maintains it. I'm not saying that everything that we'll find here actually works. There are things that work, there are things that might fail but also if you run into a problem and you solve it, we would really appreciate if you contribute back to it.

Speaker 2 (28:03):
They're just examples. Some of them are easier, some of them are not that easy. Okay, let's start ju a lot and now it's the big challenge. Does it work or it doesn't work? Let's see, that's my old instance with me in the UL. For those who are not familiar, I basically started GTO lab and I took the URL with the token to be able to access it. Maybe not. So one second. Let me bear with me one moment. Let me check a couple of things. The first thing would be to ensure that actually my proxy settings are okay, that's not what I hoped for but they are. I have manually set the proxy. There's no reason for me not to. I think that happens like this always. You do it before, it works fine. Do it once again. Something breaks. Let's say I'm trying to SSH again, I, let me see. No, everything seems active and seems working. Let's try again. I'm not sure. Can you actually see my ui?

Speaker 1 (30:20):
You can just see the your terminal.

Speaker 2 (30:23):
Okay then on second because it seems like it's working but I need to stop sharing and then reshare on my ui. Bear with me for one second. Once. Okay, lemme see. Trying to find the okay. Yep, share the screen. Good. Yes, it's all good. I was just trying to ensure that I'm running fine. So

Speaker 2 (31:16):
Basically to access Trip lab, I use a Firefox browser. I will mention again, I realized I showed it but it didn't, I was not showing the right window. I think it happens always in meetings In order to do that or to use fire folks, I use the proxy, I set it on manual proxy configuration and then I changed the host and the port and then here we have two projects, actually two of them. This one is a very basic one. I'll run it and then I'll show you. And then there is a more advanced one. Also we have one that runs with Q flow because we integrate very well with Q Flow. Also we can access the UI of ML flow you have, we have also some of my older tests and then we run it.

Speaker 2 (32:23):
I wish everything was smooth. Okay, here we study environment variables. In order to do that, maybe let me reshare my terminal for one second end. Let me see which one is it because I have more open. One sec. We start a new tab, clean one actually. Cool. There we go. Okay, I'm going to a new tab making the bigger again. So in order to see the environment variables, there are two types. First, you'll need to access and configure Minio, which is our storage object solution for that. I think in both of the guys they shared with you, you'll see the nest re commands.

Speaker 2 (33:25):
There we go. So you see here the access key and secret access. Keep them in mind for a second because I cannot share two windows at the same time, but you'll see that I update them in the Jupyter Notebook. The other two ones are that I need are the mini, the S three endpoint and then the ML flow, sorry, tracking which is basically the ML flow tracking server URL. In order to do that or to run that, I'll run a cube command, which is usually this one. There we go. And then we have here the IP and the port. That's what I will use. I'll move towards the other part just also for the sake of time I realized I said, oh it won't take long, but here I am anyway, so as you maybe remember the access key, I started to mean the secret access. It's the one that I shared. Of course I suggest usually when you run in production, don't share your keys the way that I just do now, do it in a secure manner and ensure that they're securely stored for the sake of time. I won't go to the now and then I'm using a very basic example that use it scaler and then a random forced, let's see, I run it, I have a warning, I'm using some outdated.

Speaker 2 (35:16):
Let's see, why is it I do have two warnings, but then if you look here, I just see my experiment can go to it. You can see plenty of things about it. You can see the input, you can see the output, you can see all the parameters that have been set. For example, max, step six, max features G, and if we'll go here we can always readjust them. I modified one just to show you this and whenever we go back here you can actually refresh. There we go. And you'll see that one of the parameters changed.

Speaker 2 (36:05):
You could also play around here. You could see the performance of it. You could compare performances as well. You have the models part which is used for model management as well, which is important when you start doing more than one model. And except for that here you can see what model, what you used was the source, how long ago ago was created as well as how long it takes. You might say that this is not important and this is not important when you have basic examples like this one, but this becomes crucial, I'll have to say once you start having more complex projects because you'll not only have to optimize on model performance or experiment performance, but also you have to optimize on how long it takes because you don't want to train for too long on one hand, but also you don't want to waste all the resources on the other hand because at the moment the truth is that compute resources are quite scarce.

Speaker 2 (37:12):
I will stop here. There are plenty of other use examples. We have more of a complex one. Again, we go to the environment variables. Let me actually run them, we print them to ensure that we didn't do anything wrong. We install, let's say libraries. We import everything that we need. We use data about wine. I almost wonder if my colleague who built it was not French or who knows since we end up having a wine example, but then we run it, this one is nicer, it has all the details as well and all the comments so you understand what's happening to also tells us that hey, there is another version of it and then here you are. You also see that here in case you have an experiment that's not visible, it tells you that you should refresh.

Speaker 2 (38:19):
You also have the ability to add plenty of other things depending on what's important for you. Plenty of other columns in the default visualization. I do think that the UI is intuitive. You can have more than one experiment. As you can see here, I created two of them for my own fund. That would be pretty much it on my side. The other examples are available there. I will go back to one more thing. I'll take one more minute and then I'm done. Actually, I mean not done. I'm happy to get questions. There we go. When it comes to demo time, so this is what we showed or what I showed you on the screen, but then how would you scale it? Well by integrated new tools, and here I have Q Flow as an example because it cannot only show that does not only do experiment tracking by integrating with Mflow, but also it can automate pipelines.

Speaker 2 (39:27):
But then you can also use data fabric solutions. I mean I have here canonical data fabric, but you could use in general tools such as open search or MongoDB depending on your use case. For example, if you need a vector database, open search is ideal. If you want to do data streaming, you'll have to look at Spark as well. You can always consider integrated with open the open source N GC containers as well. And then you will also, or you might also want to look further than just GPUs having DGX or EEG xxi in case you have a huge project or you work as part of an enterprise. And that was it on my side. Do you have questions for me? Nope. I see Alex has no questions. Okay, then

Speaker 1 (40:25):
If you have any questions or anything that came up, just drop it in the chat. This has been recorded. We publish on YouTube afterwards and we will, if there's any questions come up that you think of later, we can always send them to Andrea and she can give us some answers to publish on the blog as well. So if you have more thoughts, please do. But yeah, thanks so much Andrea. That was fantastic. I always like practical workshop, we show you're doing stuff instead of just talking about it and that was great. So thank you so much. Yeah, I really enjoyed that. There is one question there from Sunil. You can see that Andrea, I'm new to ML ops. How is it different to DevOps pipelines?

Speaker 2 (41:07):
That's a good question and I don't want to hijack the meeting, but I will have to share one slide if you don't mind hug. That's

Speaker 1 (41:17):
Fine. Don't mind. At

Speaker 2 (41:20):
All's a practical slide, and I always define ML ops as DevOps for machine learning. And I'll have to say that for those who are not familiar, ML ops is machine learning operations and it's very similar to DevOps, but it's really focused on the activities that machine learning projects have. So you have the machine learning part, which is really cleaning the data, ingesting the data, preparing the data, and then building a model which is very different than what DevOps used to have. But then you move towards activities that are more similar to what DevOp dev or development part would do, like packaging, verifying validation, those are similar. And then you move towards operations, which are again a bit different. Usually operations in an ML project also include modern monitoring data, drift monitoring and capabilities that do not exist in DevOps simply because DevOps as a practice doesn't have machine learning models. I will have to say here that I think in the long run they're going to merge even more because there are plenty of similarities between them and usually DevOps engineers find it easy to go with or find it easy to upskill to ML ops. I can also share a blog about this topic and use and a white paper that we have, but we can go, I'll share them in the chat.

Speaker 1 (42:54):
Cool. Awesome. Thanks Il and Andrea, there's a question there. When will the TU summit be in 2024 and where it's not specifically what you're talking about but it's relevant since your economical.

Speaker 2 (43:11):
Yes, I'm happy to answer that because Ubuntu Summit is very close to I think everyone's heart in the Ubuntu community, but also in canonical where it's going to be around the end of October, no, where we are still determining, I'm pretty confident that it won't be in one of the two cities that we had, so last year we were in Prague. This year we are in Rigo, so probably in another city that's not Prague and Rigo.

Speaker 1 (43:40):
Cool. There we go. Thank you. It's lots of excitement there. Cool. Well thanks so much Andrea. Again, if anyone's got questions, you drop in the chat or you can let us know afterwards or whatever. Andrea is also on the DK slack. Cool. Thank you so much. As I said at the beginning, and as we do at the end of all of these town halls, we're heading to do DOK quiz with a the winner. We'll get DOK run DOK shirt, which is always fun. We've got a code up on the screen, so if you go on your phone, you can scan that code there with your phone and you can play on there or you can go toi.com and enter that eight digit code. They both do the QR code or internet code and then yeah, EE platform, this kind of thing. And once we've got a few people in there, we can get started with that and the questions will, they'll come up on the screen here, but they'll also be on your phone and you tap answers on, so you need your phone to play or I guess you could go to mani com and your browse and into that code as well.

Speaker 1 (44:51):
That also works. Let's see, let's get started. We've got five players in there. I think people can still join, but yeah, the faster you answer, the more points you get. And these all DOK related in the 2022 DOK report, which category of users based on the data-driven enterprise scale represents the highest percentage of respondents. If you haven't read the DK 2022 report, then it might be tricky to answer leading users, advancing users, aspiring users, and lagging users.

Speaker 2 (45:22):
Now you give me homework to read more things.

Speaker 1 (45:26):
We've got one person got that right, the advancing users. Let's see Lola up in first place. Cool, nice one. Okay, question two or five obviously first you answer the more points you get of the many benefits of running data on Kubernetes, which was reported as the primary benefit. This would also be in that 2022 report, the ability to manage all workloads in a standard way, consistent environment from dev through production, ease of deployment, ease of maintenance, ease of scalability or improved security. All of those benefits of course, ease of scalability. Oh that's weird. Cool. Which benefit was reported as the primary benefit for leading users ability to manage all workloads in a standard way, consistent environment from data through production. Did we just do this or is this the same list of benefits for leading users? Of course, ease of maintenance, scalability or improved security, ease of maintenance. This time, these are tricky questions. This week, this month Dogen sets up the quiz for us and if next time read the report before the town hall, you'll be able to get the answers right, which is the report is a primary benefit for lagging users. Same list of six benefits there to manage all workloads in a standard way. These all benefits of running data on Kubernetes of course, but yeah, primary ones for different segments. You got that Watson, it looks like that puts Watson up in first place.

Speaker 1 (47:57):
And last question, where can you learn about the many benefits of running data on Kubernetes Okon in Chicago, DO KC Town Halls 2022 DK report or do OK document community website?

Speaker 2 (48:18):
Can we select all of them?

Speaker 1 (48:22):
I have a feeling that all of them will be correct. There we go. Let's see, who's that put in the lead? I think that puts Watson on the lead. No. Oh, sorry, I didn't see that there from Simba. Simba, awesome. If you Simba, because I don't know your real name, if you could message me on the DK Slack or you, Alex Oh great. Yeah, reach out to you. The do or myself and the DK Slack or we can find you there and we can get a you. I'll find you on there. I don't see you in the DK Slack, but if you join there or I'll pop my email address in the chat here as well.

Speaker 1 (49:27):
There we go. You can drop me an email, then we can sort that out to you. Awesome. Thanks so much everyone. Well done Alex, and thanks especially to Andrea for a great talk. This will be on YouTube, you can watch it on there in the next day or so. It should be up. And then next town hall. We don't have the topic finalized yet. We're busy finalizing that now. Should have it published in the next few days. That'll be the same time next month and we will hopefully see you all there and see you on Slack. Thanks very much everyone. Bye.
