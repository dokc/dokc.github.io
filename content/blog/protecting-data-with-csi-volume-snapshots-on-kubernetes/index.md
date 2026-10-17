---
title: Protecting data with CSI Volume Snapshots on Kubernetes
date: '2022-08-22T18:53:16Z'
lastmod: '2022-10-11T18:23:47Z'
slug: protecting-data-with-csi-volume-snapshots-on-kubernetes
author: Melissa Logan
image: Screen-Shot-2022-08-22-at-2.51.51-PM.png
categories:
- How To
tags:
- CSI snapshot
- CSI volume
- gRPC
- Portworx
- snapshot
---

The container storage interface (CSI) is a contract between different container orchestrators (Kubernetes, Nomad, etc.) and storage plugins. This contract is a set of gRPC services for provisioning, utilizing, and snapshotting storage volumes. In this talk, Software Engineer at [Portworx](https://portworx.com/) by Pure Storage [Grant Griffiths](https://twitter.com/griffithsgrant) focuses on one aspect of the CSI spec: Volume Snapshots.

The talk covers volume snapshots on Kubernetes CSI, with a deep dive on Kubernetes CSI snapshots. After covering the basics of both container schedulers, Grant deep dives into how backup systems can programmatically interact with the Kubernetes CSI snapshots client.

In the end, he demos the basics of the CSI snapshots on Kubernetes and shows how to start using CSI snapshots.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/HfroHMMYS-8" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

**Grant Griffiths** 00:00

Today we're gonna be talking about protecting data with CSI volume snapshots on Kubernetes. My name is Greg Griffis a little bit about me. I'm a software engineer at [Portworx](https://portworx.com/), a company owned by Pure Storage. And of course, I work on the CSI control play, and I do some community work as well. Previously, I was at [GE Digital](https://www.ge.com/digital/) where I did data services and platform engineering type work. I'm also a contributor to Kubernetes, CSI and Nomad, CSI as well helped helped out a bunch with Kubernetes, CSI volume snapshots, as well as a couple other features, as well.

For fun, I like rock climbing. This is a picture of me in the background and the French Alps. And I also like to do some running and snowboarding as well. Let's get going.

So what we'll cover today will cover the CSI spec. Also, go over Kubernetes CSI volume snapshots. And then we'll also cover a demo on CSI snapshots. And then we'll also do a quick discussion on our systems that are utilizing our snapshots.

So first, let's get into the CSI spec. So folks out there might be kind of familiar with the CSI spec already that I figured I'd cover it. Basically it's a contract between different container orchestrators. So things like Kubernetes, Nomad, and storage plugins themselves. So it's a contract of, basically set of g RPC services, Protobuf services for provisioning utilizing and snapshotting storage volumes. So yeah, you have like the container orchestrator something like Kubernetes Mesa, Nomad, and then those containers orchestrators communicate to CSI drivers, such as you know, RBD, Digitalocean Block Storage, GCE and a bunch of other storage plugins.

You can actually go ahead and check out the CSI spec itself. It's in https://github.com/container-storage-interface/spec. And then inside of that there's a CSI.proto. And this contains all of the different Protobuf definitions for kind of communicating over gRPC between the container orchestrator and the CSI drivers. It uses gRPC go. So you can check that project out as well.

So the main thing with CSI snapshots are there's three main controller service calls, and controller service being there's three different types of services, there's the Controller Service, which runs on kind of controller nodes, there's the node service, which is expected to run on every node in the cluster. And then there's the identity service with CSI, which is basically how CSI plugins kind of identify themselves in a system. So there's three main controller, ones for snapshotting, create snapshot, delete snapshot, and list snapshot, these are all item potent to kind of make it easier to for the controller and driver to kind of connect with each other and kind of build a establish a contract with each other.

So next, we'll talk about Kubernetes, CSI volume snapshots. So this is a huge diagram, it kind of goes over what all the different components are in a deployment. So the main ones we'll talk about today are the CSI snapshoter, and the CSI snapshot controller, as well as the CSI provisioner. So as you can see all of these sidecars, they all listen for kind of changes to objects. So the provisioner is always listening on provisioner changes, these resize, the snapshotter is listening on snapshot contents and does a create delete snapshot. And then the snapshot controller is kind of handling, you know, volume snapshot creation and that kind of stuff. Then so these kind of sidecars, they can talk with any CSI driver, and it kind of just pings the CSI. There's also the new driver registrar that's in charge of registering these nodes, these CSI drivers and all the different nodes. So that's kind of how it works in a Nutshell.

Next, we're going to get a quick overview on snapshotting for CSI with Kubernetes. As the feature name suggests, it allows for snapshotting and restoring persistent volume claims. And this feature is available for Kubernetes clusters 1.20 and above, it's GA available it's the recommended version, at least as Kubernetes 1.20. And it kind of utilizes CRDs, which are custom resource definitions. So these are external to the core Kubernetes API. The team kind of developed these API's kind of outside of the core Kubernetes API. So it also requires an additional snapshot controller deployment to operate. But if you're using a CSI driver on a managed kind of Kubernetes service, it'll will likely already install that for you. Or the CSI driver documentation will also probably tell you how to do that. Many different CSI drivers supported.

So there's the volume snapshot CRDs. So this is created a volume snapshot class is kind of similar to a storage class, if you've kind of used Kubernetes persistent storage before, it's created by an admin or an end user. And this contains all the storage plug in parameters, maybe specific features to different storage plugins provide, you can also provide secrets, whether that's for kind of encryption. And then you can also set the retain policy as well on the snapshot class. So for example, the retain policies, if it's delete, the underlying snapshot will be deleted when you delete the object itself. And then there's retain, which will go ahead and read that snapshot data if you were to delete the object. So that's kind of the more safe kind of way to do it. There's the volume snapshot, this is the end users object to dictate that they want to snapshot a PVC. And then the snapshot content is created about the CSI snapshot or, and that's a cluster wide object as opposed to the snapshot itself, which is a namespace-specific.

There's a deployment that I mentioned, snapshot controller, snapshots sidecar, snapshot, or sidecar. We talked about those already. And then there's the snapshot validation webhook. And what this is, is uncharted, it is basically ensuring that the end user is kind of creating volume snapshots correctly. So it has a whole series of different checks to make sure that you're not doing anything that could cause harm to you.

So let's do a quick demo. CSI snapshots. Terminal. So I have a little bit different files. Here. We have a generic kind of MySQL deployment right here. As you can see, it references the PVC volume claim right there. So first thing we want to do is create a PVC. So we have one right here, actually, it's called MySQL data. And it's using a [Portworx storage class](https://docs.portworx.com/cloud-references/security/kubernetes/shared-secret-model/storageclass/), because that is the the provider that I'm working with here. So I just went ahead and I created the storage class.

Next, what we're going to do is go ahead and create the PVC. As you can see, the PVC is already bound, it's ready to use.

Now let's go ahead and create our MySQL pod. It's mysql.yaml. Awesome. What's happening in the backend is it's doing a node publish volume for Portworx to kind of mount this pod, this volume inside of the pod inside of the container. So that's ready for application data.

So now let's go ahead and do a volume snapshot. But first, what we need is a snapshot class. Awesome. This snapshot class is pretty straightforward. Just take a quick look. Basic volume snapshot class, I have a retain policy as deletes and we're using the Portworx CSI driver. So now let's go ahead and create our volume snapshot. Awesome. So we have right here, a new volume snapshot, snapshot one, it is ready to use True, source PVC as our PVC. And as you can see it's all good. So we're safe to kind of just go ahead and delete our application because we have backed up the data.

So let's go ahead and do that. Oops we have to do this. I can delete the PVC as well. So that while that's running, what we can do is actually go ahead and restore our PVC. The restore has been created. And now we can go ahead and do is create our MySQL restore.

So now we have restored our pod with the restored PVC, awesome, so really quickly, just wanted to go over some systems that are utilizing snapshots. So there's many different systems and integrated CSI snapshots, I'm not going to list them all, but they're all here for you to check out. It's really cool to see all these different companies kind of utilizing the work that we did for Kubernetes CSI snapshots. So these are all pulled directly from the Kubernetes blog. So if you have another storage plugin that supports this, make sure to get it out there.

Lastly, this historic CSI driver. This is the one that I worked on, it enables Backup and Restore via CSI CRs. So create a volume snapshot car and store these in a history-compatible backup location. This is all the backups the product that I've worked on. So yeah, that's pretty much it. Thank you. If you have any questions, feel free to reach out to me on the Kubernetes slack [Data on Kubernetes Slack](@slack), or Twitter as well. Cool. Thanks, everyone.
