---
title: Protection against accidental deletion of PVs or Namespaces
date: '2022-11-16T17:40:18Z'
lastmod: '2022-11-16T17:40:18Z'
slug: protection-against-accidental-deletion-of-pvs-or-namespaces
author: Melissa Logan
image: portworx-scaled.jpg
categories:
- DoK Day at KubeCon EU 2022
- How To
tags:
- namespace
- PVC
---

Accidental PVC delete or namespace delete can cause the Persistent Volume to get deleted. Such volumes lose their data, and the stateful applications lose their state. By using Persistent Volume TrashCan, users can get a grace period to undo such unintended delete operation.

This talk will showcase how to overcome one of the admin’s pain points involving accidental deletions of PVCs by using advanced storage management solutions in Kubernetes.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/L-_xhkgvIDQ" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<iframe src="https://www.slideshare.net/slideshow/embed_code/key/tcNgplu2x0k7H1" title="Embedded content" height="485" loading="lazy"></iframe>

[**Veda Talakad**](https://www.linkedin.com/in/veda-talakad/)00:00

My name is Veda Tanaka. I'm a member of technical staff at [Portworx](https://portworx.com/) by Pure Storage. Joining me in presenting this to you are rd and Aditya

[**Aditya Kulkarni**](https://www.linkedin.com/in/adikulk/)00:09

I'm a member of technical staff at Portworx by Pure Storage.

[**Aditya Dani**](https://www.linkedin.com/in/aditya-dani-91014b30/)00:15

My name is Aditya Danny, we like to thank the okay for giving us this opportunity.

**Veda Talakad** 00:24

We want to share how we solved one of the pain points or problems for a Kubernetes cluster administrator the problem of accidental namespace or persistent volume deletions. So let's talk about this not so trivial problem. If you did a simple Google search for keywords like undo namespace, delete or undo persistent volume delete, look at the results it returns, you roughly 19k hits I mean 90 gates, the sheer magnitude of the result speaks for the prevalence of this critical problem that impacts business. Most of systems do plan for some sort of recovery, such as scheduled backups or snapshots. However, schedules usually create point in time copy of the data every couple of hours, or maybe at a maximum frequency of every hour. This is far from adequate to have your applications run backup instantaneously. In such a scenario because they don't have the most recent data. You might have configured a DVR, which allows you to get your applications back up and running quickly. But not all deployments justify the cost of having a DVR. So what if you could create your persistent volume such that your volume has most recent copy of the data, most recent data just before deletes, or better yet, your namespace or your applications could come back such that your application picks up the data where you left off before the release and starts to run instantaneously. We did that. Now they would explain you how exactly we did that. Thank you. Over to you.

**Aditya Kulkarni** 01:54

to solve this we present volume [trash can](https://docs.portworx.com/reference/cli/trashcan/), a way to recover accidentally deleted PVCs where the PVC is deleted, we capture the PVC state and the data right before the delete operation. We then store this capture state in the trash can. The state is retained in the trash can for a user defined duration of time, after which it is permanently deleted. This allows the user to basically go back in time and restore the state back on the volume. The resurrected volume has the same labels and volume options along with the same data as the volume had when it was deleted. From the application perspective, it looks as if the accidental delete never happened. Now let's take a closer look at how we achieve this.

When a delete request comes in for a volume, we take a snapshot of the volume and preserve the name of the PVC and the namespace along with the current data set of the volume. This snapshot is annotated with the interaction label, which causes the snapshot to be handed over to a trash can manager. The trash can manager is responsible to permanently delete the snapshot when the user defines time to live, time to expire. Using a snapshot gives the read-only protection to the volume when it is staged in the trash can.

Now storage providers can choose to not use snapshots but instead tear out the volume to cold storage, which will free up the capacity on the hot tier. The time to live for the snapshot. handed over to the trash can manager is controlled by a CRD parameter trash can minutes. This CRD parameter can be applied to a storage class like in this example, we can also use this parameter on the namespace, which will cause all the PVCs created in the namespace to borrow the time to live setting. The trash can manager monitors the cluster trash can, and whenever a volume reaches expiry, performs a delete of the stage snapshot. While the volume is staged in the trash can if a user realizes that it was deleted by mistake and wants to resurrect the volume, all they have to do is annotated persistent volume claim with a restore from trash can and scale up the application. The scale up of an application results in a volume create operation on the storage provider. The storage provider on the presence of the restore from trash can annotation on PVC, triggers a search and restore call to the trash can manager. The trash can is searched for a snapshot which matches the PVC name and the namespace name. Upon a successful find off such a snapshot, it is used to perform a restore. Now in cases where multiple snapshots are found, the latest deleted snapshot is treated as the correct one to restore from. Once the volume data has been restored from snapshot, the snapshot is deleted.

Here is an example of how restore from trash can rotation is applied on a persistent volume claim CRD. Now some of you might say, hey, Adi, all this is good, but I don't want to do this on per PVC, especially if I want to restore an entire namespace, then I would say good point. And that brings me to how to restore accidentally delete a namespace. As a namespace restore could be a long running operation than just a single volume resurrection, we need to introduce namespace states. A namespace in its lifecycle can be in three different states. One ready state, in this state all volume creates do end up creating a new volume. Two, in trash can state, in this state the namespace does not exist and has no new volume create operations will be acted on.

Three in restore state. Now in this state, all the new volume create operations will first try and select the volume from trash can. If no entry is found in the trash can a new empty volume will be created. Also, the trash can manager will pause permanent delete of state snapshots belonging to this namespace until the namespace transitions out of and restore state.

Here is an example on how to restore from trash and rotation is applied to namespace CRD, which puts the namespace in restore state. This namespace can be moved to ready state by later editing the namespace CRD and removing the restore from trash can notation.

Now I will have a detail walk us through a demo of a namespace reselect after it was accidentally deleted. Over to you are Aditya.

**Aditya Dani** 06:49

In our demo, we are going to be using a Jenkins application. As you can see there is a Jenkins deployment along with the service. And it's using a persistent volume claim. This persistent volume claim is using a storage class called Jenkins stash storage. I want to show you the storage class and the specific parameters that we have set on it, especially the parameter trash can minutes. This is currently set to 10 minutes, which means that if this PV gets deleted, it will be stored in the trash can for the next 10 minutes and can be recovered from the trash can.

I would like to show you the Jenkins UI here we have configured a couple of builds that will be running on this Jenkins. And now we are going to go ahead and blow away this namespace will delete this namespace by running the kubectl delete ns command. And that's going to clean up everything even the persistent volume claims.

Now I want you to take a note of the PV name here. We're going to search for this PV name in the [Portworx CLI](https://docs.portworx.com/reference/cli/). So if you list the volumes on Portworx CLI, you wouldn't see anything. But if you list the volumes in the trash can, you see the same PV name reference, so it's dead in the trash can and it can be restored from the trash can.

Let's check if the Jenkins UI is still accessible. And as expected, it's gone because there is no deployment no service from that namespace. So let's try to reset the namespace. So I'm going to create the namespace with an extra annotation, that annotation is restore from trash can and set to true. This annotation essentially tells the storage provider that whenever a new PV request comes in, it needs to first search its trash can and find if there is a volume that needs to be restored from the trash can before creating a new one. I'm going to show you the PVC and the Jenkins app on deployment specs. So these PVC spec is exactly the same as it was before I was using the Jenkins storage class. And the deployment is the regular Jenkins deployment. We are going to apply both the specs and the storage provider. We'll go ahead and actually reset the PVC and the volume and its data from the trash can.

Okay, so let's see for PVC has been created. It has been created. Let's go ahead and check on the Portworx CLI and see if you will see a new volume. First of all, you don't see anything in the trash can which means that we have restored from the trash can. And you now see an actual volume that is available. And that's our Jenkins volume. Let's check if the Jenkins app and the pods are up and running. Just going to do a kubectl get all and you can see that the Jenkins service is up the pods are up and running. Let's go ahead and check the UI.

I'm going to log into the Jenkins UI with the admin credentials. And there is all my bills are still there. My data is still there and we have successfully reset at the namespace and the Jenkins app from the trash can.

Okay, so what's next from here? We've proven that a common concept of trash can can be applied to cloud native workflows in Kubernetes. We would like to extend that and probably hook on to the PV deletion and creation lifecycle. So whenever the PV gets deleted, we invoke a CSI snapshot, or when a PV create is being invoked, we detect that it needs to be restored from a trash can and we enroll the CSI snapshot restore. In this way, this solution can be extended to any CSI storage provider. And a lot of and the community will also benefit from it. Secondly, we can also apply the same trash can concept to the CRD itself, so that the users don't have to keep track of the YAML files of their PVCs and the deployments and we can apply the same concept of trash can minutes wherein we will ensure that these CRs are kept in Kubernetes empty at CD until the trash can minutes have expired. I hope you liked our demo and our PV trash can concept. If you have any more questions, please do reach out to us. Thank you
