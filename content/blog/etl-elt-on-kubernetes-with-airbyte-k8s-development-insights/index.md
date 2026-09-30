---
title: 'ETL/ELT on Kubernetes with Airbyte: K8s development insights'
date: '2022-05-23T15:00:47Z'
lastmod: '2022-05-17T15:29:59Z'
slug: etl-elt-on-kubernetes-with-airbyte-k8s-development-insights
author: Melissa Logan
image: Kubernetes-AbhiVaidyanatha.png
tags:
- container
- data
- destination
- elt
- etl
- kubernetes
- logs
- nodes
- pod
- scheduler
- source
---

There are a lot of different approaches working for a spot in an attempt to solve ETL/ELT on Kubernetes. Considering that the cloud-native landscape is built for deploying Dockerized, open-source software, many of the closed-source solutions don't align with the trajectory of the community.

In this DoKC session, [Airbyte](https://airbyte.com/)'s senior developer advocate, [Abhi Vaidyanatha](https://www.linkedin.com/in/avaidyanatha), discusses how they implemented strategies as his team launched their K8s beta from the nuances behind deploying an ETL/ELT pipeline. Abhi further solidifies their development insights in accordance with the final implementation of their architecture.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/bUcm5RrY4aI" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

**Bart Farrell** 00:02

Hello everybody, we are live at Data on Kubernetes Community live stream #99. Today, our speaker is an expert in many things, and we have a few things in common. We both played drums and went to the same one-of-a-kind university — the University of California, Santa Barbara. Also, a couple of things that I want to get out quickly about our speaker [Abhi](https://www.linkedin.com/in/avaidyanatha) is that he's a professional gamer. He has a podcast dedicated to, perhaps, the second love of his life, which is Smash Brothers. You can check out [his podcast](https://www.listennotes.com/podcasts/beyond-the-metagame-a-smash-bros-podcast-ENm896I_lGz/). It's super dope.

Now, we talk about the data on Kubernetes, ecosystem, universe, etc. We often have the starting point of databases and storage. But if you'll see in the wonderful report that we launched earlier last month (before Kubecon), we talked about how the ecosystem branches out into other areas, and what we're going to be talking about today is just one of those. Once again, I'm going to drop the link right [here](/dokc-2021-report/). I believe you can see the specific points mentioned in the report on pages 9, 12, and 16, where it's spoken about the data on the Kubernetes ecosystem and other things that we find there, such as streaming, analytics, machine learning, and the like. We want to make sure that those things are incorporated into the conversations that we're having for today.

That being said, I wanted to introduce Abhi, who's a senior dev advocate at a very cool startup called [Airbyte](https://airbyte.com/). You should all be checking out because they're doing fantastic stuff. Definitely check out their [Slack](https://airbyte.com/community) as well, as it is the most dynamic Slack that I've ever seen. Somebody blogged about how cool their Slack setup and Abhi is very much a big part of that. Abhi, welcome to the Data on Kubernetes  Community! Can you give us some background about yourself and how you got into this space? Then we can see a little bit more about what's going on with ELT, ETL, and Kubernetes.

**Abhi Vaidyanatha** 02:21

Thank you, Bart. I started this space as a cloud-native database startup, [PlanetScale](https://planetscale.com/). I think you've had [Alkin](https://tr.linkedin.com/in/askdba) on [this show](https://www.youtube.com/watch?v=l-C31tk0s68), and that's where I got my first foray into the cloud-native landscape and Kubernetes. I helped develop the [Vitess](https://github.com/vitessio/vitess-operator) operator there, and it gave me a good context, specifically in the data on Kubernetes space. Then, I came on over to Airbyte and focused on community building. I got to an ecosystem where the community kind of runs itself. I can take on a lot of credit for it, but there are many reasons why I think we're all just supporting each other in a lot of cases. A lot of our engineers and the rest of the team are strictly dedicated to helping the community. We've hired user-success engineers, and one of the coolest things about Airbyte is that if you come in and ask a question, it usually gets answered immediately, whether that's by a community member, user-support engineers, or by any of our engineers in general. We take a very joint approach to addressing the community and engage with them as much as possible. Relative to the Data on Kubernetes community, most of my interaction is interacting on the Vitess project and attending Kubecon a few times there.

**Bart Farrell** 04:42

That’s a good start. One thing I want to mention is that since you’ve talked about answering questions from a community perspective, just a recommendation to folks since you’re in California and I’m in Spain, interestingly enough, Airbyte is taking the pandemic remorse work very seriously for having a very well-distributed global team. I say this because I had Abhi on the West Coast of the United States, and for any of you who don’t know this, there’s a place called New Caledonia, which is not a fictitious place. It’s in the South Pacific, between Australia and Fiji. Check it out. There are fantastic engineers from nearby that are well-distributed and able to respond to those community needs. Being able to provide a quality and timely response to their concerns while enjoying the richness of the different kinds of experiences people from different places can provide is awesome.

That being said, let’s start with determining the difference between ETL and ELT.

**Abhi Vaidyanatha** 06:45

ETL has been around for a while, more than 20 years. It came as the burgeoning landscape of large amounts of data showed up. We needed to be able not to run our analytics jobs on our production instances. Thus, we need to move all of our data, whether that's from our production databases or all of our API, as we're marketing API sales. We need to move all this data into places that can be analyzed, and in the current day, that's a data warehouse, but it wasn't always the case. People realize that ETL as a paradigm requires you to involve a data engineer every time. If you're doing that transformation step in the middle, say ETL extract transform loads, you're doing that transformation step in the middle. Whenever you have to change something about the transformation, or something breaks, you have to end up resyncing all your data and rerunning all the transformations. You got to get your data engineers involved.

ELT, on the other hand, is more lightweight. You can focus on the L part, meaning that you extract, load, and get all of your data in the destination and data warehouse. Then, with all that data, you can run your transformations there, which means that if you have all the data, you don't need to get a data engineer involved and resync your data. You can just perform all of your transformations there. With tools now like DBT, it's more of a viable strategy. Over the last four or five years, we've seen ELT as the main paradigm. Most of the closed source offerings and the main open source offerings, including us, have been mostly focused on ELT and letting other people do the transformation.

Now, let me get into the topic for today. For those who didn't catch my previous talk on Data and Kubernetes community, I will be doing a quick recap. But essentially, a while ago, I came on during one of the Kubecons.

**Bart Farrell** 09:21

You did and it feels like nine years ago.

**Abhi Vaidyanatha** 09:24

It was indeed nine months ago, and the thing is, I got to give a 15-minute snappy lightning talk about this.

**Abhi Vaidyanatha** 09:54

Now, I get to follow up on that with more context. In a moment, we hadn't gone into alpha or beta with our Kubernetes support. It wasn't alpha, but our actual architecture for what we thought our deployment on Kubernetes would look like was completely different. In that talk, I gave these ideas for our possible deployment on what Kubernetes could look like. After we've actually deployed it and shipped our beta version of deploying Kubernetes, I can tell you that it looks very different. Showing how this design evolved is a cool retrospective way to think about very specific things when we're moving from simple [Docker](https://www.docker.com/) environments to fully orchestrated environments. This is also what I think is the main focus for today; taking what we learned, seeing how we moved from that, and showing what we're going to possibly do in the future. Before I do that, I want to give a bit of context about what Airbyte is.

Airbyte is essentially a UI in front of a scheduling system that connects data sources and destinations at a high level. Whenever you set up a sync in the UI and go into Airbyte, you're asking everybody to move data from one location to another. Thus, from wherever you have data to wherever you want to move data, you can optionally perform in-flight custom DBT transformations because we integrate with DBT. However, I want to focus on moving data from one place to another at the end of the day. You go into our UI, deploy either on an EC2 instance or any VM (i.e., Azura VM), and say, "I want to move data from one place to another." On the back end, we take that request in, and we end up essentially hitting our API. The request gets sent to something called temporal — a microservice orchestration platform. Temporal handles a lot of the intermittent errors, retry policies, and scaling; asks an Airbyter worker to come up and fulfill that connection job.

I think it's important to go over this context because every one of these things you see here on the screen needs to be ported onto Kubernetes, and there are a lot of nuances that come with that. We need to have and mobilize the following:

- have a pod for the server
- have a pod for the scheduler
- expose the UI
- have a pod for the temporal cluster
- have either static or ephemeral pods for the workers
- stores or volumes; temp, config store (which stores all of the information about what data you've synced and all of your synced information); persistent, mounted, or shared volumes

There are many moving parts and things that we need to think about when migrating this architecture to Kubernetes. Before we go into that, let's recap on why we would want to move to Kubernetes and why I think the Kubernetes deployment is powerful and very viable with Airbyte.

Our source and destination containers or social destination connectors are completely containerized isolated pieces of code. And why this is so powerful is that as long as we can guarantee that the source connector and the destination connector are speaking the same language, we can guarantee an interchange of moving data from any source connector to any destination connector. Any source connector, such as the database, [Postgres](https://www.postgresql.org/), [Redis](https://redis.io/), [Elastic Search](https://www.elastic.co/), or an API, such as the [Salesforce](https://www.salesforce.com/ap/?ir=1) and [HubSpot](https://www.hubspot.com/) APIs, wherever you have data. There's an individual source connector created for that source. This source connector, this packaged piece of code, is simply responsible for ensuring that it gathers all of the data that is possibly available at this source. Most importantly, gathering all the information and in what schema the state is available. Then, this source connector will read data in, and it will essentially expose what data is available to the destination. There'sThere's also going to be some translation.

As you probably think, there will be a lot of unsupported data types and type conversions that you're going to have to do. Just in case you're doing a database to database migration, there are a bunch of conversions that are going to take place. Hence, we're going to have to make sure that the source and destination are speaking the same language again.

Since we have read the data from the source, we pass it off to an Airbyte worker. If we remember from the previous slide, we have a scheduled worker to handle all of the sync jobs. In addition to that, we will bring up these source and destination connectors that are very specific to whatever data you're syncing. The Airbyte worker will handle reading the data once it's sent out from the source connector. It'll go as what we call a message to the Airbyte worker, and then this Airbyte worker will do any in-flight operations and then pass it on to the destination connector. It's passing on the same message. The destination connector has one job — making sure that it can take in data from the source and essentially discover the structure of what data is available at the source to accurately convert that into the format at the destination. This is an overview of how the Airbyte sync process works and why I think it can be ported to Kubernetes since everything is containerized. We can map everything to pods, run any of these containers as sidecars in other pods, or run sidecars along with these containers in pods. Having everything containerized, I think, was the first step. Most people are familiar with mapping their Docker containers and naturally bring them into the orchestrated Kubernetes environment.

To recap, these are the certain issues that come into deploying Airbyte on Kubernetes. One of the issues that we first ran into in development is that we couldn't develop the ability to schedule things on different nodes, which made going to Kubernetes meaningless. Suppose you can't schedule on different nodes. In that case, you might as well just have one big VM and not use Kubernetes at all because you're not essentially taking advantage of any of the power of Kubernetes like a powerful scheduler.

One of the biggest things that we had to tackle was figuring out how to make sure that all of these pods could communicate between different nodes and that we could schedule anything on a different node. Large companies will be running into the issue of having too many sources and destinations. If you try to schedule all of these pods, as I mentioned, there will be connector, source, and destination pods. Then, there will be the scheduler, server, and all of the Airbyte architecture temporal. We are going to run into resource issues quickly. Hence, this is not an efficient deployment, and we have to think about how we can communicate across nodes. As I mentioned before, we want to emphasize why this deployment pattern is powerful. We have our Isolated Behavior in Source Connector and Isolated Behavior in Destination Connector, which is a huge prerequisite to Kubernetes.

One of the plans that we had initially, which I showcased in that talk that I gave about eight months ago, is that we have our source container and destination container on the same pod. One of the good things about having the source and destination connector on the same pod is that they can talk over essentially the local network, as opposed to having to send messages over the Kubernetes network, logs, or any other utilities. While this may be a big plus, it came with some huge drawbacks. We realize that if we have the source connector and destination connector on the same pod, it's going to be bad for scheduling, because we're going to have the worker essentially be located on the same pod. As I indicated before, we need to have all of the three containers when we're trying to run an Airbyte sync. We take the Airbyte message from the source, we pass it off to the worker, and eventually to the destination. So we would want to run the worker on the same pod, and we’d have these three containers, all on the same pod, which means that if we're trying to schedule our nodes around 4 GB and our source, destination, and worker are all 2 GB each, this means that we can't have this flexibility of having the source and destination pod come up or maybe put the worker pods on a different node. We are always stuck to provisioning big node sizes and keeping everything within one node, which is one of the issues we wanted to get away from. We wanted to leverage Kubernetes, instead of just being forced to schedule everything on one node. This case became less flexible as a paradigm.

Additionally, we were thinking about intermediate containers. Another thing that came to mind was what if we wanted to filter out PII or run a user-defined custom transformation on the messages sent from the source to the destination. We are now restricting ourselves because the lifecycle of this operation is now tied to the lifecycle of the sync since we have one point of failure. Thus, the source, worker, and destination are just going to determine everything that we can do around the sync that needs to be run in this pod. We cannot run any intermediate containers without first sending the data back out of the pod and then back in — it completely defeats the purpose of having everything co-located in a single pod. We eventually realized that even though, in theory, it would be nice to have everything located on the same pod, it just wasn't the optimal solution. It did not take advantage of Kubernetes. We would have to send data out of the pod if we wanted to do any intermediate operation, or we would have to put even more things and containers into the pod, making it more difficult to schedule. Overall, this wasn't ideal, while this design, in theory, was a cool idea. It is way too bulky.

Another proposed plan that we had and one of the plans that I showed was having individual pods for source and destination, but having individual worker containers on the pods that have a source and destination worker instead of either putting them on the same pod or having worker pods that are separate from the source and destination pods. This is pretty cool because it allows us to avoid creating individual pods for every source-destination combination. However, this can be difficult to manage because, at the end of the day, we're going to need something that's coordinating between the different pieces. In the previous example, we had the issue of messaging of sending data from source to destination solved by both of the containers being on the same pod. Nevertheless, we still need a worker coordinating just between these two pods, now that they are not in the same locations.

We did not want too many unique applications running on these pods. Further, shared persistent workers are complicated as there are some security issues with this. One of the things that we were thinking about when approaching this paradigm was that security could play an issue. When you bring up a sync in the UI, we wanted there to be direct coupling between a user and what was provisioned. We didn't want just to persist and have a permanently provisioned infrastructure. All kinds of different credentials would be going through the source and destination workers. Thus, we wanted there to be direct coupling between a user and the infrastructure that was provisioned.

To clarify, what this architecture would imply is that, say, you're syncing data from the Salesforce API or HubSpot API, then let's just say you had two destinations like Postgres and MySQL. Assuming you had combinations of sync patterns, you'd sometimes sync HubSpot to MySQL, HubSpot to Postgres, Salesforce to Postgres, or Salesforce to MySQL.What would happen is that you'd spin up these permanent source connectors and permanent pods that would direct all data. Anytime you used Postgres or synced with it or to MySQL destinations, they would go through those pods. That's why it is considered a security issue in the sense that no matter who's using Airbyte and setting up these syncs, we are going to have various credentials pass through those destinations or source pods. Security was a bit of an issue here. We weren't solving any big problems outside of perhaps scalability across nodes. Thus, if we could solve the node problem, I think these pods and containers would be a lot more lightweight.

Now, the big question is, what did we actually do? We moved those worker pods outside the source and destination pods. In the previous architecture example, we had the workers alongside the source and destination containers. We realize that for us to be horizontally scalable and theoretically, one day, be able to provision X amount of workers, we need to decouple the workers from the source and the destination. Say, if you think about whenever you're dealing with any manifests or bringing up something on Kubernetes, you want to be able to specify in your YAML file the following: (1) How many workers am I bringing up? (2) How many of each thing am I bringing up? (3) How much fall tolerance do I need?

It wasn’t very Kubernetes-like to just have the strong coupling between the workers, source, and destination pods. One of the most important and the hardest problems that we had to solve was the idea of moving; if we think about moving the data from the source to the destination, we think about that Airbyte message that we need to send. We need to send the message from the source to the destination, and we have to go through the worker. We need to figure out a way to send this across nodes and securely send this message to do it in a lightweight buffer-like fashion.

One of the things that initially came up is that Kubernetes pod logs (API logs for pods) were a very cumbersome way of accomplishing this. We don't want all of our data stored in logs. A lot of that you absolutely wouldn't want to be persisted as your pod logs would become essentially unreadable. If you had any actual errors or important things you wanted to surface, it would be impossible to read through them. Hence, we couldn't have the pods communicating over logs. Additionally, we need to make all of the components, except the server and schedulers, schedulable on any node, and we configured the server to publish its logs to cloud storage. We wanted people to be able to configure the logging and can essentially move their logs outside of Kubernetes easily.

Some of the important points to highlight from the architecture that we eventually landed on after going through those variants is that anything is schedulable on any node, except for the server and scheduler pod.

Again, we want to take advantage of scheduling like Kubernetes, the powerful ability to load and schedule evenly across nodes. We have that server publishing the logs to cloud storage. Logs from various operations are just piped into the scheduler, and the scheduler publishes both its logs and the logs of the various worker pods. Instead of having the workers live on the source and destination, this scheduler pod will work with the temporal cluster pod to bring up Airbyte workers. They're going to bring up various worker pods that will be responsible for performing the work. This scheduler pod is also responsible for the various pods' lifecycle and reporting successes and failures.

If we look deeper into this, it could get a little more complicated. We can try to break this down; the initial architecture that we went into just misses over this huge problem of having the pods communicate with each other. We did all this communication through standard-out, standard-in, and standard error. We use the Socat utility to pipe named files from one pod to another pod via shared volume. We have container sidecars with these mounted pipes on those shared volume mounts that simulate local communication between these two remote processes. We want to be communicating with our workers with our schedulers. Say, whenever we want to input configuration for a forest sync, that needs to be sent to the source container. Now you may ask, how do we do that? We have to take that config through the server, which is handed off to the scheduler. Then, we need to pipe that into the worker pod. We essentially take that in through the main scheduler process. We use Socat to pipe that into the standard in the container, and we have a named file called pipe standard that goes into the main container.

Similarly, whenever we want to take data out of the source pod and move it into the destination pod, we have to do this through standard out instead of Kubernetes logs. If we look at the main container, that’s what will be handling all this logic that pushes the data into standard out. With Socat, we push the data over the network back to the scheduler. With the server, which is really important, as I’ve mentioned before, the server and scheduler are located on the same pod. There are a lot of moving parts here, so if there are any questions about this, I’d be glad to field them.

**Bart Farrell** 36:16

I just want to know, since we often talk about the learning curve for folks that are getting into running data on Kubernetes, you came at this from a different angle. You're involved quite early days if we want to consider what was being done and what's still being done at PlanetScale. We test. We had DeepSea and a panel in Kubecon. So for you, approaching this from a different angle, did you feel you had to relearn or unlearn? What was the knowledge acquisition? What was the learning curve like for you, as a person and an organization, more broadly with everybody?

**Abhi Vaidyanatha** 36:49

Honestly, I will say that a lot of the knowledge is transferable once you've worked with the Kubernetes API. Once you've worked, for example, the language, I think there is a lot of that initial work that was done for me. Suppose you understand the concept of volume mounts and how logs are published in the API with pods and other stuff. Once again, once you learn the language, I think that language sticks with you. I was very lucky to work with Kubernetes at PlanetScale. There wasn't too much that I had to relearn. At the end of the day, I had to learn the Airbyte architecture, and we kind of just had to map the stuff that I already knew. However, I will say that the learning curve when first trying to get into writing with the Kubernetes API was massive. I don't think it would have been possible if I didn't have outstanding mentorship. I was also lucky because I happened to be co-workers with one of the founders of the Kubernetes project and Anthony, who's one of the most legendary engineers ever. I ask him any questions I want, and he helps me write them. I don't want to say that it just all came naturally. It was very difficult learning for us all.

**Bart Farrell** 38:35

I think it's a lesson that we've heard on other occasions, most poignantly from [Salman Iqbal](https://uk.linkedin.com/in/salman-iqbal-a6a5b026), who did a [live stream](https://www.youtube.com/watch?v=NSyxWt6Dx8w&t=0s) with us about backup and restore, saying that if you only treat Kubernetes as a technical challenge, you're going to have a lot of problems. If you treat it as a challenge of establishing a good network of folks who could help you out, you will have a lot more success. By circumstances, you happen to be with someone who had that experience. Most of all, making mentorship a factor so that you don't have to suffer so much on your own.

**Abhi Vaidyanatha** 39:06

I think it's important. I want to make sure that I'm covering all my bases here. I want to essentially restate why we need to be able to think about moving data across pods because, as an ETL/ELT product, we need to be able to make sure that we're moving data when we take it in from the connector pod. As it goes to the worker pod, we need to have a good story around how that data is moved. In Kubernetes, it's not necessarily straightforward to move the data. We are sending it over this network with Socat utility and using these local files with the shared volume mount that allows us to use these files as buffers. The data will go into these files, and then they'll get pulled straight out with Socat and eventually get sent over the network back to the scheduler pod. Someone could ask: Could you do this with config maps? or Could you handle file transfer with config maps in terms of the standard? When we're talking about the standard in processes, the answer is no because a lot of the files that we're sending into the source connector for configuration will be too big for the config maps.

We have a sidecar on this pod that wraps the entry point to write standards out to local named files. These local named files, as shown, are /pipes/stdout and /pipes/stderr. Then, the sidecar relays that information all the way to the scheduler. If we think about going through the lifecycle, going from start to end, the scheduler receives an API call. The scheduler needs to execute the job. We extract that entry point and pipe it back into the scheduler. After this, we allocate the ports. Using the entry point and the allocated standard down to standard ports, the scheduler configures the worker pod and instructs Kubernetes to create these worker pods. Then, we create those mounted pipes once the unit container starts on the worker pod. The scheduler will wait for the inner container to begin and copy data over the shared volume mount. This is the main part of the cycle.

We have this heartbeat container on the worker pod that constantly checks the scheduler and makes sure that it is alive. As long as the scheduler is alive, this worker pod will continue to function. We don’t want a bunch of zombie pods being created and left around. We’re constantly pinging back to this heartbeat server process, ensuring we don’t leave zombie pods while running a number of syncs.

That was the architecture we came up with about three to four months ago. However, we immediately realized that there was a huge issue in terms of horizontal scalability. We realized that we wouldn't be able to configure or scale workers horizontally. We split the scheduler into a scheduler and a worker. Essentially, the worker pod that we just described was living inside the scheduler pod. We realized there was this tight coupling between how much work we could spin up. We didn't want to replicate a bunch of the scheduler pods because we didn't need more schedulers. We need more workers. From splitting our scheduler pot, we were able to handle the load for work that comes in horizontally, and you can now scale out your syncs across different nodes. You can scale out resources you're applying to your syncs.

However, there is still some work that needs to be done. If we think about the future, you can only define how many worker pods you want; you can go in and say, “I want five to six worker pods,” depending on how many syncs you think you’re going to be running. In the future, one of the things that we’re looking forward to is being able to auto-scale this and have each sync. Bring up a dedicated worker pod for each sync.

**Abhi Vaidyanatha** 46:36

If I were to sum this up, we had this idea of having our source and destination containers located on the same pod. Then we said, "Okay, this doesn't take advantage of the scheduling; how do we take advantage of Kubernetes? Maybe, let's split them out and have the source and destination connectors on different pods".

There will be issues with handling messaging across the pods, but we eventually solved them later. However, we need to include a worker pod to handle messaging between the two. We further realized that there were going to be a lot of moving parts. We moved the worker pod out and made sure that we could schedule everything on different nodes. Then, we ran into the issue and asked ourselves how we make the pods communicate with each other. This is where we figured out that [Kubectl](https://kubernetes.io/docs/reference/kubectl/) and pod logs are not a good way to have containers communicate with each other. We need to send data into a buffer and read it into another container. It needs to be as simple and lightweight as humanly possible. We used this shared volume mount as we have this wrapper entry point around our workers. We made sure that any data sent from our connectors were handled through the shared volume mounts and with Socat. If any of this isn't very clear, I can send you the documentation on this.

Once we handle messaging between pods, we need to make sure that zombie processes and pods are cleaned up. This is where this parent-child architecture comes in, where we have this heartbeat server process that we mentioned here in the scheduler. We have it constantly sending a signal, and once it dies, the worker pod immediately knows to go down and fail.

For the future, we plan to have these worker pods in an auto-scaling situation instead of having a static number that you set in a manifest. Overall, there’s a lot. The concept being used around a shared volume mount is a unique one. When our engineers were thinking about how to do this communication between pods and how to send large amounts of data across pods, this was the solution they came up with. This wasn’t something that we took off the internet or standard practice. We found out that it was the most efficient way to move data across Kubernetes and make sure that all of these syncs are independent entities, further asserting that everything should be able to run autonomously.

**Bart Farrell** 50:57

There is a lot to unpack here. We're at livestream #99, so we've heard lots of different perspectives on running data on Kubernetes. A lot of what's still agreed, though, is that so much of this stuff is being done for the first time. Based on what you've learned, what recommendations would you make to other companies and folks out there who have different reasons for running their data on Kubernetes, in the case of Airbyte, who want to start getting more involved?

**Abhi Vaidyanatha** 52:01

One of the most important things is to figure out how Kubernetes-ready you are. From our experience,  it was the first thing that we asked ourselves, and it went like, "Can everything be split up? Can we comfortably run things in separate nodes? Can we handle networking across nodes? Are they cleanly containerized? Can they be cleanly run as individual pods or co-located containers on a single pod?" The biggest question is if you ask yourself that and you say, "We have a bunch of just simple and lightweight containers that don't need to do high traffic networking which can live on different nodes and everything is containerized," then it's kind of a no brainer and a rare case.

Once again, before implementing Kubernetes, the biggest thing you should make sure of is whether you're ready or not. However, I don't think I could speak to any specific implementations because I obviously didn't do this. I didn't do this myself. New things could come up, so you just have to be prepared to tackle such problems in unique ways. This is not something that you can write a course on. You can't go to Coursera, at least not yet. The biggest thing that I can probably speak about is the preparation. If you can do any prep work to make your life easier before trying to support Kubernetes, it will be a big help. Make sure your architecture is benefited by it. Remember the point I was making earlier about running everything on one pod. Say we ran our source, work, or destination container all in the same pod, you might consider reflecting: "What are we taking advantage of Kubernetes there?" The only purpose that we would want Kubernetes to support is to support people who are only using it. However, anyone who isn't using it would look at that and say, "I need a big VM to run this." You have to ask yourself if you're taking advantage of this powerful orchestration service. If the answer is no, then I think you should keep it simple.

In our case, we have so many moving parts that can be split up, scheduled on different nodes, run in parallel, auto-scaled, and brought up or brought down. It’s a perfect use case for bringing it onto this massive orchestration platform. But still, some issues go through.

**Bart Farrell** 55:54

One question that we got from the audience related to the heartbeat. Are you just probing a named port on the worker? Can you please talk a bit about its implementation?

**Abhi Vaidyanatha** 56:04

I can’t speak to the exact implementation but what’s going on is that we run a server process on the scheduler pod. It’s spitting out messages at an interval. I believe there’s a TCP connection that is going on there. Whenever the scheduler doesn’t reply, the heartbeat container terminates the worker pod. Does that answer the question? It’s a server on a predetermined port. The worker pods are immediately terminated whenever the schedule doesn’t reply on that port.

**Bart Farrell** 57:06

Fair enough. But we're starting to ask all of our guests now if you had to run data on Kubernetes with any person or a fictional being; since we could maybe incorporate a little bit of Smash Brothers here, who would it be and why? Who would you want on your data on the Kubernetes team?

**Abhi Vaidyanatha** 57:27

We have to think about this, someone who would be able to manage large platforms and someone adventurous.

**Abhi Vaidyanatha** 57:57

Maybe, Link from Legend of Zelda. He's good at puzzles. He's adventurous.

**Bart Farrell** 58:17

Solid answer, I respect that. While you were talking, we have our amazing graphic recorder who's lurking in the shadows. I did let him know that you were a Super Smash Brothers fan. Here, we got Mario but not as much action and the combative sort of stuff that we like to see.

**Bart Farrell** 58:47

Anyway, Abhi and I hopefully have a pending collaboration related to music coming out. Maybe 2021, if not 2022; stay tuned for that. Any other Airbyte news that you'd like to share before we finish?

**Abhi Vaidyanatha** 59:01

We have our Hacktoberfest that's going on right now. If you come in and develop a source or destination connector, you can get some cash prizes. We are trying to get people into connector development right now. All that stuff that I mentioned, none of that complexity exists when you're just developing these individual connectors. The individual connectors are isolated pieces of code, and developing them for different data sources and destinations is important. We need to be able to support everything. We're trying to work with everyone to solve that problem together.

Also, we're focusing on the future for the Airbyte cloud, which is going to the public in North America pretty soon.

**Bart Farrell** 1:00:15

Thanks so much for joining us today, Abhi! Always a pleasure having you with us.
