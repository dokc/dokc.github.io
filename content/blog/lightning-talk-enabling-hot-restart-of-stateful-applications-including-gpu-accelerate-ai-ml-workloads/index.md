---
title: 'Lightning Talk: Enabling Hot Restart of Stateful Applications Including GPU-Accelerate AI/ML Workloads'
date: '2024-07-31T17:00:44Z'
lastmod: '2024-07-30T22:49:10Z'
slug: lightning-talk-enabling-hot-restart-of-stateful-applications-including-gpu-accelerate-ai-ml-workloads
author: Paul Au
---

This talk both described and demonstrated how stateful applications, including GPU-accelerated AI/ML workflows, can be automatically hot restarted after pod kill/eviction events that are augmented by transparent memory-snapshotting techniques. Applications with complex initializations/startup times, as well as long-running, batch-like workloads, are the best candidates for leveraging this type of operator, and representative benchmarks will be shared. This approach can be used in conjunction with Day 2 node maintenance, autoscaling, OOM issues, and Public Cloud Spot instances to obtain operational benefits, including reduced downtime, higher infrastructure utilization, and reduced computing costs. This presentation aimed to stimulate a broader discussion of additional use cases for memory snapshotting.

**Speakers:**

- [Bernie Wu](https://www.linkedin.com/in/berniewu/) - Vice President, Memverge

## Watch the Replay

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/ND4seSKpJHI" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

## Read the Transcript

Speaker 1: [00:00](https://www.rev.com/transcript-editor/shared/6Z1SUtn5px2t9gPLrkE248H86WnESxcRermW6IzMV7eAA--GoeBrOBVxSUzJ25lCFyLJ-p5zIu1eL6_NU_7IFvHTkCg?loadFrom=DocumentDeeplink&ts=0.72) First of all, I want to thank the DOK community for inviting me here to present to you guys today. And my talk is going to be about how to enable hot restarting of stateful applications running both CPU and GPU pods to accelerate AI ML workloads. And my name is Bernie Wu. I'm with a company called Member. We're based in Silicon Valley, and we are working on different types of memory virtualization and memory snapshotting issues related to AI and ml. So first of all, what I'd like to do is just describe the problem statement. What we're trying to do is enable transparent CPU and GPU snapshotting of pods running AI ML workflows. Now, a lot of people ask us, well, don't these AI ML workflows already have built-in Checkpoint Restore capabilities? They do. TensorFlow has it, PyTorch has it, et cetera. But nonetheless, we see use cases for being able to do this transparently by the Kubernetes operators to increased productivity, efficiency and sustainability.

#

[01:18](https://www.rev.com/transcript-editor/shared/e4LdjBlwN53muCEAb-3CZqVnJHLQXhp6n-uyvY7ZShjsd4qRiMhzUmOGJ3RQ8rm6Xk3Cg_oYkgIj2lXQl8kl76ijNQk?loadFrom=DocumentDeeplink&ts=78.42) At the same time, lowering costs. So use cases that we've uncovered include being able to run AI ML workloads on Kubernetes, but to also take advantage of spa instances on public clouds. People also want to be able to hot restart and rebalance GPU workloads across compute resources. Third is to automatically, for example, save and restore users, Jupyter notebooks and machine data sets. If an instance, let's say out in the public cloud gets reclaimed or they go home at night, we can automatically save the state of their Jupiter notebooks and then bring it back up the next day, that kind of thing. In addition to that, during normal operations of Kubernetes, people will experience evictions, no evictions, our pot evictions. People need a drain nose pick, a long run auto scaling. And so we wanted to build an operator that can run with those existing capabilities. And then also there are a lot of people trying to introduce batch jobs or long running, not so fault tolerant applications. And so snapshot will increase resilience.

#

[02:35](https://www.rev.com/transcript-editor/shared/rAgGjzpi9ndhhNkj12I_2n9N1sBP48Kw5kjJP_UzM-7QNzfoF5MmVyiB7EKAAxyNwpaYmPdIeDnwkKLAOXSp3nKOwBg?loadFrom=DocumentDeeplink&ts=155.13)  So the way we did this is we started off by using Creo. Now Creo is an open source project that I think came about around 2012 and is actually also, I believe in alpha mode preview mode on 1.25 for forensic container analysis. Well, we started with Creo and then we built on top of that. There's also another GPU out there from a MD that, in case you're not aware, already has a plugin, that device driver plugin for Creo. And what we've been doing is collaborating with Nvidia, NVIDIA as a Cuda driver. So we expect sometime a 12.4 coda driver just got released, but in the near future, either by 12.5 or before, you'll see a utility being released by Nvidia. We're at the same time we're doing this presentation, we're also showing this that GTC in the Bay area and there'll be a utility out there that will allow the GPU to be snapshotted checkpoint.

#

[03:45](https://www.rev.com/transcript-editor/shared/4_HllckgFvxs0QDbr0rEtrNPJkqQWCwi_K2WEh3PC1OXcO9iVPX6kAIwOou5jUxMPZNNNKK7h3_D91v-H0e5CbHanOo?loadFrom=DocumentDeeplink&ts=225.76)  And then of course, in this business, in this community, we built a Kubernetes operator to actually implement all this. So yeah, so let me describe this utility that we've been partnered with Nvidia to develop this utility that allows checkpointing and restoring of the GPU. So the GPU basically right now is opaque. So they took a little bit of a different approach. They didn't build a device driver nvidia. They have a utility that basically looks for what threads are running and implements basically its own freeze checkpoint and restore process within the GPU architecture. And so any already submitted work runs to a certain level of completion. And then what happens is this utility will dump the GPU memory to memory in an allocated area and then basically release the GPU. So you have two choices. You could either stop it completely or just checkpoint it and then continue running.

#

[05:04](https://www.rev.com/transcript-editor/shared/GOfzEoAR9JbXCN0sK2Dx8pG2ipl0TJmujSOeVn6mXCFWULgK-C2h-Axz4nqHNV3VAeycVDJ72z8xgP4EoHHqlGhCun4?loadFrom=DocumentDeeplink&ts=304.48) And then on the restore there's a reverse process. The GPUs are reacquired by the process, and then device memory is copied from the CPU memory back into the GPU memory and mappings are restored and everything, the objects and streams and contexts are all restored and then the IPIs are unlocked. So that's the general flow. And to implement this in conjunction with Creo, we had to make some modifications to Creo, which we will be contributing. And one of the things that we have to do is do the CHECKPOINTING in two stages now. So the first stage is that this is the checkpoint cycle. We're freezing the GPU and CPU together. And then we are starting, we are actually unfreezing one GPU process that will allow us to do the checkpointing operation within the GPU and start copying the memory into the CPU and then copy everything, the CPU's memory, the GPU's memory, and then any kinds of associated ephemeral files or objects and put that all onto a checkpoint image, stored typically on somebody's persistent volume out there on the Kubernetes cluster. And then we can resume from there. So that's the checkpoint process. The restore is the reverse is a two stage process. Again, we have to restore the GPU first and then let the Creo utility restored the rest of the CPU state.

#

[06:41](https://www.rev.com/transcript-editor/shared/mwN94tRSlQoguV73pZIwoG0DRDbpKbqQWWgvS6fSsCdor3h9dpSHNufebk9zqbFCXKcAg9tdwiPxvga_zojA2ZQ4bho?loadFrom=DocumentDeeplink&ts=401.93) Just implementing this on Creo we found out is not sufficient because we find that the window for checkpointing, the overhead check pointing time is excessive. So we've done some other enhancements like asynchronous checkpointing to reduce the quiescent period to allow the CPU and GPU to run resume operation as quickly as possible. We've also implemented an incremental check pointing to minimize the amount of data transfer and then also compression technology also to minimize the consumption of storage or memory as we're doing these checkpoints. And then lastly, we also have to address ephemeral files. Some stateful applications are using the local disc, e femoral files. We have to checkpoint all that. And then we have to implement this all as an operator. And then you can pick your favorite staple app and then update the manifest so that this checkpoint restore is automatically invoked. So what I'd like to do now is show a demonstration of this checkpoint restart, hot restart. We're going to drain a node and then migrate it to another node. And here in this recorded demo, we're using NVIDIA T four and we're using a TensorFlow training workflow. So if I can get this to go, yeah, sorry, this is kind of a night chart, but down below we're just showing all the nos. There's a small cluster with two workers and then up above there we're launching the operator and the TensorFlow job up in that corner, you can monitor the usage of the containers being launched.

#

[08:30](https://www.rev.com/transcript-editor/shared/KmBzZuEfcFKdlgqNsa6KqpZkyi8teXZItUHbyG27snpTlb9d5ALpeBd7B8FbMzn7VLcfXCDFABaTbn632h4yJW2bQAs?loadFrom=DocumentDeeplink&ts=510.44)  And then we turned on the logging in this upper left panel here so you can see what's going on. Basically the TensorFlow application is starting to run, it's compiling, and then pretty soon it'll go into a training cycle. You'll see these epics ticking off down at the bottom upper right there. And then on the lower panel there, what we're doing is we're doing a no drain command and we're killing the job. Right now it's at Epic seven. And then on the upper right you can see the pond being terminated by the scheduler and then restarted on the other worker automatically.

#

[09:17](https://www.rev.com/transcript-editor/shared/CvStyt2_4_ypubvSAJvp1UrTwM5z9QbP0ES1i1NwFAA-pxAkyQHQ1jC5gp-Mlwk6J_AFbWoQozMgnY6tJE2lgRMjy7c?loadFrom=DocumentDeeplink&ts=557.46)  And then in a little while you'll start seeing in the upper left side the job resume from where it left off with Epic seven and start going forward. So we're saving a lot of time by avoiding allowing hot restart now of these GPU workloads on Kubernetes. So very quickly, there are other recorded demos. You can just click on this square. We've just got a TensorFlow and bare metal. We have a Pair bricks demo, which is a HPC workload for computational biology that Nvidia has. We have our own curated memory machine, cloud batch app platform that's used for spot instance and what we call wave writing on this demo. And then this same Cooper Andes operator just saw. And then last what's ahead, we are working with Nvidia to finish up these modifications to this utility. Again, there'll be a preview release sometime between now and the 12.5 release of Cuda and we'll be contributing the changes to Creo and then we hope to be collaborating with you folks, but developing production grade operators and applications for this. Thank you very much and please contact me if you have any questions.

#### Data on Kubernetes Community resources

- Check out our [Meetup page](https://www.meetup.com/data-on-kubernetes-community/) to catch an upcoming event
- Engage with us on [Slack](https://join.slack.com/t/dokcommunity/shared_invite/zt-2a0ahuhsh-MdZ4OpF4nr_s4kyOwTurVw)
- Find [DoK resources](/dok-library/)
- Read [DoK reports](/dok-reports/)
- Become a [community sponsor](/join/)

#
