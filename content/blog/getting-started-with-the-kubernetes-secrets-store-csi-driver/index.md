---
title: Getting Started with the Kubernetes Secrets Store CSI Driver
date: '2022-06-01T13:00:24Z'
lastmod: '2022-05-27T09:17:47Z'
slug: getting-started-with-the-kubernetes-secrets-store-csi-driver
author: Melissa Logan
image: Kubernetes-KimSchlesinger.png
tags:
- cluster
- CSI
- helm
- kubernetes
- namespace
- pod
- vault
- volumes
---

In Kubernetes, you might encounter difficulties keeping application API keys, access tokens, and passwords safe. There are several approaches to solve this problem.

In this DoKC session, [DigitalOcean](https://www.digitalocean.com/)'s developer advocate, [Kim Schlesinger](https://www.linkedin.com/in/kimschlesinger), demonstrates how to install Hashicorp Vault and the Secrets Store CSI Driver to ensure your application's accessibility to secrets stored in ephemeral volumes.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/aWddVU_UmDs" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

**Bart Farrell** 00:00

We’re here today with [Kim Schlesinger](https://www.linkedin.com/in/kimschlesinger), a developer advocate at [DigitalOcean](https://www.digitalocean.com/). Welcome to the Data on Kubernetes community!

**Bart Farrell** 01:44

Can you tell us a bit of yourself, how you got involved in the Kubernetes world, etc.?

**Kim Schlesinger** 01:51

I am currently a developer advocate at DigitalOcean. My actual title is Cloud-Native Developer Advocate. I give talks about Kubernetes and show off DigialOcean’s managed Kubernetes offering. Before DigitalOcean, I was a site reliability engineer at [Fairwinds](https://www.fairwinds.com/), which does consulting, and they have software as a service for container scanning and security stuff. I was on the services team. I got to work with companies that hired us to build out Kubernetes clusters, CI/CD pipelines and then teach their employees how to deploy application changes in their Kubernetes cluster. It was an interesting job just because I think it's unusual for people who work with Kubernetes to get to look into and work with different Kubernetes clusters and see different setups and use-cases. I did that for three years, before that I was a teacher. I taught primary school for about six years, and then I switched into adult education. Eventually, I went to a software coding boot camp where I got trained in tech.

**Bart Farrell** 03:09

That's amazing. It's nice to see a different transition of skills that can work in all these different areas and working for a primary school for six years. I did it not for that long, but I was once a teacher as well.

**Bart Farrell** 03:49

For everybody out there, if you can pay your teachers more, do so because they need to be better paid; they're never overpaid. That being said, I'm going to let you start sharing your screen. She has a repo that I'll be sharing [here](https://github.com/kimschles/secrets-store-demo) if you want to follow along while Kim is explaining.

**Kim Schlesinger** 04:37

This talk is called Getting Started with the Kubernetes Secrets Store CSI Driver. I'm Kim Schlesinger. I have already given you the introduction about myself. I'm excited to be part of the DoK community and give this talk.

When I came up learning Kubernetes four years ago, the prevailing wisdom at the time was never to run any stateful workloads inside your Kubernetes cluster. And the exciting thing is that, like Kubernetes, the CNCF and all these different projects have evolved in such a way that it's a lot safer. It makes more sense to run stateful stuff in your Kubernetes cluster. I learned a lot by preparing this talk, so thanks for having me.

We're going to do three things today. The first thing I'm going to do is define a couple of key terms that will help us understand what we're doing. Then, I will do a demo showing you how to use the Kubernetes secrets store CSI driver with the [HashiCorp Vault](https://www.vaultproject.io/). In the end, I'll leave some time for questions and answers.

Let's now discuss the key terms; the vocabulary that you need to understand to follow along with this talk. The big key term that I want you to walk away with knowing today is ephemeral volumes. In Kubernetes, we know about persistent volumes and persistent volume claims. In Kubernetes v1.19, we get this new thing called ephemeral volumes. These volumes are not persistent, and they have the same lifecycle as a pod. When a pod gets created, the ephemeral volume gets created. When a pod gets deleted, that volume gets deleted. The ephemeral volume sticks with whatever pod it's supposed to be with. Ephemeral volumes are good for storing read-only data, and that kind of data is stuff like secrets. So if you have API tokens that your application needs, usernames and passwords to connect with a database, or those sorts of credentials that need to be secret and only need to be read by your container, ephemeral volumes are good for that particular use case.

Ephemeral volumes came out of SIG-CSI, the container storage interface working group, where they are working on building out the ecosystem of storage plugins for Kubernetes. It became widely available; general availability of the ephemeral volumes in Kubernetes v1.19. If you're following along with this demo that I'm going to do, you want to make sure that you're running at least Kubernetes v1.19 or greater.

There are two different kinds of ephemeral volumes. The first one is the CSI ephemeral volume, while the second one is the generic ephemeral volume. They're very similar. However, if you look at those red "X" markings, there are a couple of things that make them different. Both the CSI ephemeral volumes and generic ephemeral volumes follow the pod lifecycle. As I mentioned before, they get created and destroyed with pods. The next thing that they both have is you can create those ephemeral volumes through an inline definition. I love this part. In your pod spec or your deployment manifest, you can specify that you want an ephemeral volume to be created when that pod is being created. It's nice because you don't have to have anything separate like a persistent volume or persistent volume claim.

Here's where we're getting into the differences. For CSI ephemeral volumes, you cannot specify what kind of storage class Kubernetes is going to use for that volume. I think the driver handles that. But if you're using generic ephemeral volumes, you can specify the storage class. Finally, the CSI ephemeral volume uses a third-party driver, and then the generic ephemeral volumes don't. It's a lot of theory, if you're not quite sure what all that means, no problem, the thing that you need to know about ephemeral volumes is that they get spun up and down with pods, and you can define them inside a YAML manifest.

Now, I'm going to be showing you how to use the secret store CSI driver with the HashiCorp Vault. This is [my personal GitHub](https://github.com/kimschles/secrets-store-demo). This is just a little introduction. There are slides, so the slides I just showed get rendered through marked down. There's the license, but the thing that you want is the tutorial.

[These](https://github.com/kimschles/secrets-store-demo/blob/main/tutorial.md) are the step-by-step instructions for what I'm about to do. If you're curious, we will be running some commands and creating some Kubernetes resources from these YAML manifests. We'll have to dig into these a little bit.

       1. Prepare your cluster. Make sure that you have a Kubernetes cluster up and running.

I created a Kubernetes cluster using DigitalOcean, called Data on Kubernetes talk. I need to get the kubeconfig downloaded on my machine so I can use kubectl to interact with this cluster. This is a nice command. Doctl is the DigitalOcean command-line tool. I want to make sure I can connect to the cluster and input *kubectl get nodes*. Now, I have a cluster that's running three worker nodes. I'm using Kubernetes v.1.12.8, and you can see I spun this cluster up about 25 minutes ago. We are good to go there. The next thing I'm going to do is to create a namespace where I'm going to have all of these things installed. I'm going to call that namespace demo.

Now that I have this demo namespace, that's where I'm going to install the vault and the CSI driver. That's where I'm going to deploy the application that will get secrets from those things. We're ready to go there. We've got some nice namespace isolation for this particular demo.

      2. Set up HashiCorp Vault

HashiCorp Vault is a popular project. It's an external secrets store. It's this software that runs on its own, where you can store secrets and then gather the secrets from all sorts of different places. You can use vaults to get secrets into Kubernetes and with platforms and programs.

Now, I will install this vault instance inside the Kubernetes cluster that I've got up and running. I'm going to be doing it in dev mode. Kindly take note that this is something you shouldn't do for production. You can run the HashiCorp Vault externally and connect it with your Kubernetes cluster. That's the best thing to do. During the demo, you're going to see me do things like accessing the vault and manipulating data in the vault, in which you can see the passwords and the tokens. If somebody gets access to your Kubernetes cluster, and they have the right credentials while your vault is in there, your secrets aren't very secret. Once again, I'm running vault in the Kubernetes cluster in developer mode for demonstration purposes only. Keep that in mind if you are thinking about doing this in production.

**Bart Farrell** 13:27

Real quick question, can ephemeral volumes be associated with namespaces and their lifecycle?

**Kim Schlesinger** 13:36

That's so interesting. I don't think so. I think they are only affiliated with pods and the pod lifecycle. The ephemeral volume gets spun up and down. I think I see what you're asking: "Could it be a persistent volume for a namespace or something like that?" The answer is no. It's related to the pod.

**Kim Schlesinger** 14:06

[2. Set up HashiCorp Vault]

Once again, I gave the disclaimer about HashiCorp Vault and how I'm running it in this talk. I'm using [Helm](https://helm.sh/) to install and manage HashiCorp Vaults. The first thing that I need to do is to add the HashiCorp Helm repo to my local Helm repos on my computer. I'm sure I already have this installed because I've been prepping this talk.

I'm running *helm repo add hashicorp*, and then I'm giving the [URL](https://helm.releases.hashicorp.com) of the HashiCorp Helm charts. Now, it says HashiCorp already exists. I want to make sure that I have the most updated version of that repo. I'm going to say *helm repo update hashicorp*. We will install a [dev-server](https://www.vaultproject.io/docs/concepts/dev-server) instance of the HashiCorp Vault inside the demo namespace. As I just mentioned, if you're interested in running vault externally, HashiCorp has a great guide on how to do that. I would click [here](https://learn.hashicorp.com/tutorials/vault/kubernetes-external-vault) if that's something you're interested in doing. Let's look through this, I'm going to install the vault inside my Kubernetes cluster internally, so I'm saying *helm install vault* in the namespace demo.

I'm enabling three different options:

- --set "server.dev.enabled=true" \

I want it to be in development mode so that server dev is enabled “true.”

- --set "injector.enabled=false" \

I don’t want the secrets injector enabled because we’re not using that particular feature.

- --set "csi.enabled=true"

I want to enable the CSI and ephemeral volumes so that the HashiCorp Vault can talk with the ephemeral volumes that we're going to spin up with our pods.

As we ran it, we got this message from Helm that says, "I created this helm release called vaults." It's in your demo namespace. Then, HashiCorp leaves us a message saying, "Here's the vault docs if you want to check them out." Let's see what got created with that.

If we say cube control, get a pods namespace demo, we see four different pods are running. We have this pod called vault zero — the actual vault server running. Then, we have this vault CSI provider with three different replicas. A DaemonSet creates these. Also, I am making sure that we can use the CSI driver with our vault instance.

Now that we're good to go on the installation, the next two steps that we're going to do are the following: (1) We are going to store a credential inside of the vault instance, and (2) We're going to set up the vault instance to be able to interact with our Kubernetes cluster and talk with the pods that we're going to create.

Let’s now proceed with step three.

       3. Store a credential using Vault’s Key-Value Storage

The first thing that I'm going to do is to execute (*kubectl exec vault-0 -n demo -it -- /bin/sh*) into that vault pod. Once it's finally entered, the command prompt changes. I'm inside that vault pod, and I have access to that. If we also look around, we can see all the directories inside the pod. Then, it comes with a vault executable ready to go. You can see all the different commands that you can use with the vault. I also like the "other commands" section, which is less used but still important. Now, what we're going to do is we want to store a key-value pair in the KV engine inside of this server.

In this demo, I am storing an API token. I'm going to deploy an application that needs access to that API token to do something important for the application to be up and running in the way that I want. The first place that we're going to store that secret information is inside the vault. The command I'm going to run is: *vault kv put secret/token token="a9ndf6f64ac1er"*. KV for the key-value engine, put the secret token, giving it the key and the value. The key is "token" while the string is the "a9ndf6f64ac1er*".* The secret/token path is important. Keep that in mind.

Now, let's put the token inside of the vault key-value engine. The key value gives us a timestamp. If there's any metadata, I don't have any. When was it deleted? Has it been destroyed, and has it been updated? This is my first instance of the key-value pair. If you want to see that data in vaults, you say, *vault kv get secret/token*. From there, we get the same metadata that we just saw. But now, we actually get to see the data. This is a great example of why you don't want to run vaults in your Kubernetes cluster like someone can just exec into it and see the data.

What we just did was we stored a credential using vault key-value storage. Let's go on to the next part, and then we'll do a little review of what we've done with the vault.

       4. Setup Kubernetes Auth in Vault

The next thing that we're going to do is make sure that vaults can access and do things inside the Kubernetes cluster because we want that API token credential to be shared with a pod eventually, but we have to do some setup there. Hence, the first thing that we're going to do is enable Kubernetes auth inside the vault (*vault auth enable kubernetes*).

Now it says success enabled Kubernetes auth method at the Kubernetes path. Moving forward, let's get into some more complicated things. This next command is going to set up the proper configuration for vaults to authenticate in the Kubernetes cluster. We do that by creating a file in this path auth Kubernetes config (*vault write auth/kubernetes/config \*). Then, we're pointing to all these things, such as the issuer, say, the cluster that we're in is going to be the certificate issuer. There is a token for access that Kubernetes created that we will grab. The Kubernetes hosts and addresses. Then, pointing to where the certificate authority cert is inside the Kubernetes cluster.

We’re now going to grab the command provided below:

vault write auth/kubernetes/config \

issuer="https://kubernetes.default.svc.cluster.local" \

token\_reviewer\_jwt="$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \

kubernetes\_host="https://$KUBERNETES\_PORT\_443\_TCP\_ADDR:443" \

kubernetes\_ca\_cert=@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt

Once it indicates "*Success! Data written to: auth/kubernetes/config*" the next thing that we're going to do now that we've got Kubernetes authentication setup in the vault server is that we're going to create a policy. We're going to call it app permissions. It will allow the secret store CSI driver to read the mounts and the secret itself. And so there's that transfer of data here. We're just saying, "Hey, I'm creating a policy, and it's called app permissions" that policy has access to that path where my token data is stored. The only thing I want to be able to do is to read. There is no edit, write or destroy permissions. Once again, we want it to be able to read the data.

Now, we will clear the command provided earlier and replace it with the app permissions discussed earlier.

vault policy write app-permissions - <<EOF

path "secret/data/token" {

  capabilities = ["read"]

}

EOF

Once done pasting, it will acknowledge the new policy called app permissions. For the next part, we are creating an authentication role called a database that will bind that policy that we just created, saying, "Hey, whoever has this policy can read that token data." We're going to connect that policy with a service account in Kubernetes that we will call the "app-sa" or the app service account.

We're writing a role here called database, saying, "Hey, the service account you're going to be linked to is called app-sa." This is all going to happen in the demo namespace. The policy that you've got is app permissions. Further, the TTL looks like 20 minutes. You may refer to the text below:

vault write auth/kubernetes/role/database \

    bound\_service\_account\_names=app-sa \

    bound\_service\_account\_namespaces=demo \

    policies=app-permissions \

    ttl=20m

Now that we've got it rolled up and running, we could also configure our vault instance. I'm now going to exit out of that pod. Then, let's do a quick review. What have we done? We have created a cluster, connected to the cluster, installed the HashiCorp Vault, and a vault server running inside the cluster inside our demo namespace. We did that with Helm. Then, we got into the vault server and stored that API token inside the vault. We set up the vault to have the permissions it needs, access, and configuration to communicate and work inside the Kubernetes cluster. Finally, we exit it out.

**Kim Schlesinger** 24:06

To continue, we've got a vault setup inside our Kubernetes cluster. The next thing that we're going to do is to set up the secret store CSI driver. We have here the official secrets store, [CSI Driver](https://secrets-store-csi-driver.sigs.k8s.io/introduction.html) docs. It gives us lots of information here. They're good docs, and I use them to prepare this talk.

Before I get started, I want to point out that if you're going to use the secrets store CSI Driver and want to create a femoral volume with a pod, you have choices about the external secret store you use. In this demo, I'm using the vault provider. Vault is an open-source project. It's through HashiCorp. DigitalOcean doesn't have a secrets management product like other bigger clouds do. If the vault isn't right for you, or you're running your cluster on these other clouds, then I would check out the following providers:

- AWS Provider - It will take us to another beautiful project that AWS hosts, which allows their secrets storage product to interact with the CSI driver. Instead of a vault, that's what you would be setting up.

- Azure Provider
- GCP Provider
- Vault Provider - The vault provider has its documentation, and you can see some of the commands that we’ve already run earlier. There are choices for the external secret provider.

       5. Install the Secrets Store CSI Driver

Let's get started; the first thing we're going to do is install the secret store CSI driver. Using Helm, we will add the secret store CSI driver repo to our local Helm repos. Once again, I think I already have this installed. Then, we will update that repo and make sure we have the most updated version of the software. We're going to create a Helm release in our Kubernetes cluster so that the CSI driver is running. We're going to be running this helm installation command like "I want you to create a release called CSI secret store" you're grabbing it from the secret store, CSI driver, repo, and then the secret store, CSI driver Helm chart, we're doing this in the namespace demo. The following flag is really important, enabling the secret sync. The last thing that we're going to do in the tutorial is to get the API token that we stored in the vault, and we're going to store it as a Kubernetes secret. Then, our application will be able to get that data from the Kubernetes secret. You have to have secret sync enabled to do that. You may refer to the text provided below:

helm install csi-secrets-store secrets-store-csi-driver/secrets-store-csi-driver --namespace demo \ --set syncSecret.enabled=true

After grabbing the text provided above, we got this message from Helm stating that the release was deployed. Gave us some information about how to check that the deployment worked. Now, let's look at the pods in the demo namespace. We've got three new pods, which makes me think it's controlled by a DaemonSet. However, it looks like on every node, we have this set of pods running to enable that third-party driver to have those ephemeral volumes connected to our pods. We can also talk with the HashiCorp Vault.

We finally installed the secrets store CSI driver and now let's get into the application part of it.

      6. Create new Kubernetes objects so your app can use the CSI driver to create an ephemeral volume

For the application part, we're going to create some Kubernetes objects so that an application can use the CSI driver and create that ephemeral volume that stores the API token secret. The CSI driver creates a custom resource called a secret provider class. In the manifest directory, here's a secret provider class YAML file. I messed up here, deleted some stuff, then pushed it up to the repo. I'll fix that repo after the talk.

Our custom resource is called a secret provider class. You get to specify which provider you're using in the spec here — the list of providers that we saw. I'm using the Vault one. If you are using the AWS, Azure, or GCP provider, this is where you would specify it and put in the relevant parameters. My vault address is inside the demo namespace. It's called vault, and it's using port 8200. Then, we see the role name from the HashiCorp Vault where we created that Kubernetes role, then applied the policy, and connected the policy with a service account.

**Bart Farrell** 30:01

What is the best practice to install Hashicorp Vault? (like inside K8s/outside K8s cluster)

**Kim Schlesinger** 30:12

That's a good question. I would say outside K8s cluster. I would run it externally, like on a virtual machine that's not part of your Kubernetes cluster. That way, you just have that big separation of concerns that if somebody had access to your Kubernetes cluster, they wouldn't be able to exec into the vault pod and get your data. I would definitely recommend running the vault externally.

**Kim Schlesinger** 30:43

Once again, the vault uses port 8200. This is the custom resource, the secret provider class that the CSI driver installed inside our Kubernetes cluster. We need to actually create this. To prove that I'm creating something, do we have any secret provider classes in our demo namespace?

If I say Kubectl get secret provider class in the namespace demo (*kubectl get SecretProviderClass -n demo*), and its response says, "I don't have any of those in the demo namespace," let's fix it and create one. We're going to say, "Kubectl apply the file, it's in the manifest directory, and it's called Secret provider class dot YAML" (*kubectl apply -f manifests/secret-provider-class.yaml*). Now it says, "I created a secret provider class called vault database." As you can see, that secret provider class was created in that namespace. It's running now. The namespace is aware of the vault.

The following Kubernetes resource that we need to create is a service account. We've got a YAML manifest for that. Very simple, we're just creating a service account that is called app-sa, a service account in the demo namespace. We need it for vaults to be configured properly. As we create that, I will say, "Kubectl, apply the file in the manifest directory called service account (*kubectl apply -f manifests/service-account.yaml)*". Then, if we say Kubectl, get service accounts from the namespace demo (*k get sa -n demo*), we can see we got some other service accounts there, but I just created app-sa. The last thing that I want to do is to create a pod that's running an application. We will create a deployment that mounts a CSI ephemeral volume to your pod. This is where those ephemeral volumes come into play, where when I spin up the pod, the ephemeral volume gets created with the pod, or when the pod gets terminated or destroyed, the ephemeral volume goes with it.

Let's take a look at the deployment YAML. Correction, this is a pod and not a deployment. I'm hoping to change this later on. To clarify things, it's a single pod, and I will change it to deployment eventually. From our pod spec, we are going to create a container in this pod using the BusyBox image. We're going to make sure that BusyBox is always spinning as we want to be able to exec into this container so we can see if we can find the secret and set some resource requests and limits.

Then here's how we're specifying the ephemeral volumes; we have these volume mounts and sort of saying, "I want access to the vault database, that secret provider class thing, and it's going to be mounted at this path called mount secret store, and it's read-only. I don't want you to be able to write anything about that. For the volumes, we're going to create a volume called a vault database. We're using the CSI driver and the secret stores, and we are getting the secrets from this vault database.

Now, let's proceed in creating this pod, and then we'll look in the pod and see what we can find (*kubectl create -f manifests/deployment.yaml*). We get pods from the demo namespace. Further, we also have BusyBox up and running. Let's just describe this pod (Busybox) and see what evidence we can find of the ephemeral volumes. A few things here, it looks a lot like the manifest, but it has some additional information like what node this pod lives on, timestamp, and IP address. However, this looks familiar to me: the image, BusyBox container, and the command. Then, if we look down here, we see where the vault database gets mounted — a mount secret store. We can also see where the service account information is stored in the file system. For my favorite part under volumes, we've got this CSI ephemeral volume running called vault database. Remember, there are two types of ephemeral volumes: (1) generic ephemeral volumes and (2) CSI ephemeral volumes.

We've got this ephemeral volume up and running, but the whole point of this exercise is that we want to get the secret stored in the vault and have it available to the application. We just set up the CSI driver, and we just created a secret class provider, a service account, and an actual pod running the application. The last and the best part is that we want to be able to sync that data from the vault, so with the API token, we want to store it as a Kubernetes secret. Then, we want our application to be able to access the data, the API token, through the Kubernetes secret.

       7. Sync the as a Kubernetes Secret and as an ENV var in your application pod

Let's look at what we've got so far in our namespace. For demonstration purposes, let's see what secrets exist in the demo namespace. We've got several secrets. They look like somewhere generated by the Helm looks and the CSI provider token since there are a lot of tokens here. Now, I want to create a secret that my application can read.

The first thing that we want to do is add some information to the secret provider class called secret objects. We go back to the secrets provider class, and this is the block that you need:

secret0bjects:

- secretName: kvsecret-1

  type: 0paque

  data:

- objectName: token

   key: token

I am going to uncomment the text above, and so what I'm saying is, "I want you to create a secret called kvsecret-1." When I run this command after I apply this, I want to be able to see that secret in the demo namespace. Then, you specify the secret type; for example, in this one, it's opaque, which you're saying, "You're gonna get something called a token, and the key is token." The secret will store the value of that string of letters and numbers.

First thing I needed to do in order to sync my vault data as a Kubernetes secret was to add the secret objects block in the secret provider class. Let us update the secret provider class (*kubectl apply -f manifests/secret-provider-class.yaml*). Do I have a secret yet? The secret is called kv vault dash one, and it is not here. The next thing I need to do is to configure my container to be able to get a secret as an environment variable. Suppose I go to the deployment manifest, I am going to uncomment these lines:

env:

- name: API\_TOKEN

  valueFrom:

      secretKeyRef:

          name: kvsecret-1

           key: token

Once again, I want my container to have an environment variable called API token. It will store that value by going to the kvsecret-1 and then grabbing the value from the token. To prove that this doesn't exist yet, let's exec into that BusyBox pod. In my application, I want kubectl and exert it into the BusyBox pod in the namespace demo. I'm looking for an API token as an environment variable suffice. If I say "echo API token," it's like, "we don't have anything stored for that," and it's alright. We're going to try and make that environment variable. I don't need to update the service count, so I'm not going to worry about that.

I'm going to apply the deployment YAML spec, but I'm going to get an error. Rest assured, we will fix that. It's like saying, "Hey, I can't update the pod in the way you want" that's why deployments are better than pods. I'm going to delete the BusyBox pod and then reapply the manifest. I'm going to recreate the pod as I add the environment variable. Before that, there was no secret so let's see if the secret was created.

When I created the pod, the ephemeral volume was spun up. Then, we have secret sync enabled. When the pod gets spun up, we get secrets created. When the pod is terminated, the secret goes with it, which I think is cool. It's like an ephemeral volume, creating ephemeral secrets, and they follow the pod lifecycle.

I have the secret now, and I want to know if my application has access to the API token. Let's now exec back into the pod, and we echo API to show the value. We did this complicated thing, and now our application has access to a secret stored in the vault.

Some benefits of it, instead of coding that secret by hand, if you're doing that, you might have to use something like a secret store or sops, where you encrypt a secret, and then you maybe push it to get, and you have to have a key management service on the other end. The nice thing about using something like a vault is that secrets can get updated through vaults, and then all of those changes will flow down. You'll be able to get the updated secrets that way.

Now, let's exit out of the big BusyBox pod and then pat yourself on the back. You're done. Let's do a quick review of what we did, and then we'll do some Q&A. This is Data on Kubernetes community, and I wanted to explore something in Kubernetes that used volumes that I hadn't before. I selected this Kubernetes Secrets Store CSI driver.

We talked about this idea of ephemeral volumes, which is relatively new in Kubernetes. These are volumes that match the lifecycle of a pod that gets mounted onto a pod and gets destroyed with a pod. They have benefits if you want to get read-only data, and they're not persistent volumes. You don't need to do a PVC, and you can specify the ephemeral volume inside your pod or deployment spec. Once again, there are two different kinds of ephemeral volumes. There's the CSI ephemeral volume, which we showed off today, and then the generic ephemeral volumes. You would want to use generic ephemeral volumes to specify the storage class. You would not want to use generic ephemeral volumes if you wanted to use a third-party driver because that is what CSI ephemeral volumes are for.

Furthermore, we went through step by step how to use HashiCorp Vault, where you can store secret credentials and then set up the Kubernetes secret store CSI driver so that it can connect with HashiCorp Vault and then store the secrets in those ephemeral volumes. The last thing we did was we synced that data with an actual Kubernetes secret and then set up our application so it could access that data through an environment variable. We did the demo, and now it's time for some Q&A if there are any questions.

**Bart Farrell** 45:13

First and foremost, thank you. This was fantastic. It shows that you're a seasoned veteran as a teacher. I would like to ask you something that you mentioned at the beginning, is you're talking about how four years ago, when you started on your Kubernetes journey, the notion of running stateful workloads is like, "you just don't do that, do everything statelessly," and this has been a recurring theme, obviously, in our community that's focused on stateful workloads. People talk about things that have come along the way that have made that easier, and you touched on some of them going forward and not to be predicting the future. However, based on what we see happening right now, the vast majority of organizations that we interviewed in our survey, over 90%, said that they think that Kubernetes is ready for stateful workloads. What is it you think might prevent more organizations from doing it, despite the fact that they openly admit that they think it's ready?

**Kim Schlesinger** 46:11

That is such a good question. You're asking, like, even though we see that people believe Kubernetes is ready, in practice, we still see organizations sort of slow to adopt, like running data in Kubernetes. I think it's that sort of one-liner that I was taught to never run stateful workloads in Kubernetes. I think a lot of us took that seriously. Also, the stories we told ourselves about asking what can happen to your data if you do a Kubernetes upgrade? And you don't do it quite right. Do you obliterate all of that data inside of your cluster? We were sufficiently scared. It's the attitude. It's getting folks in those organizations resistant to that kind of change to try out the new tools and see how far the data on the Kubernetes ecosystem has moved. Bart and I met a few months ago to talk about the community. I think this community is cool because it's a lot of people who are younger and who are new but part of this cloud-native generation who don't have that particular attitude about stateful workloads in Kubernetes. So I think inviting the voices of people who may be newer to Kubernetes and more open to running data inside a cluster.

**Bart Farrell** 47:36

That is a really good point. That is something we see because we have a group of very active young folks that are in our community. They don't come in with like you said, those sorts of biases. This fresh start means that you don't have to unlearn what you've learned. Once again, as a teacher, you can understand this.

From your perspective, in the technical sense, when it comes to starting to run stateful workloads on Kubernetes, what are some things that you found challenging and advice that you might be able to give to someone before they get into this, or if someone found this to be particularly challenging anything based in your experience?

**Kim Schlesinger** 48:15

I'm a bit of a hypocrite based on what I just said; I have not run any, except for what I just showed you. I have not spent time running stateful workloads in Kubernetes. I've spun up things like MySQL or MongoDB inside the Kubernetes cluster and played with it, but I have no production experience.

**Bart Farrell** 48:35

That’s fine. I highly appreciate your honesty. But I guess having said that, were there things that surprised you along the way or that it might have been a little bit trickier than you expected, anything like that?

**Kim Schlesinger** 48:54

I think even the development of the CSI SIG that's relatively new. In the entire Kubernetes ecosystem, the tools and techniques can be intimidating. I think that a barrier for me is just taking some time to focus on that particular part of Kubernetes. On the other hand, now that I know a little bit more about the CNCF and how Kubernetes operates as an open-source project like there are so many people working on ancillary projects and how the platform has developed so much in the last couple of years made me trust that the data component parts are moving in the right direction.

**Bart Farrell** 49:49

I think many people would agree with the vastness of Kubernetes and the CNCF, just seeing the mass amount of projects. The good news is that you don't have to know absolutely everything. I mean, nobody does. Even [Chris](https://www.linkedin.com/in/caniszczyk/), the CTO of the CNCF. I think the thing is to start with something, enjoy the process, don't be in a hurry, and use a support network of really helpful people and documentation, some of the things you were referring to during the talk.

**Kim Schlesinger** 50:38

Can I get a plug for you? So first of all, the community's really cool. You have an active [Slack](https://dokcommunity.slack.com/join/shared_invite/zt-10v7uncvp-jNFwulsVWvUO0SKMDTjwAw#/shared-invite/email) workspace that I appreciate. The amount of content that you are shepherding into the world is impressive. I think he did three talks this week.

**Bart Farrell** 50:56

Next week will be the same, but I thank you for that. We really have taken it to heart that precisely because of what you said that when so many people have been told that things are done in a certain way, how many times does a message need to be repeated and showed different ways for practitioners from all over the world with different backgrounds, use-cases, and end-users. It gives us the strength and credibility to make it more comfortable for folks in the future to be doing this. Any other plugs you'd like to throw?

**Kim Schlesinger** 51:33

I will be at KubeCon EU, and I'm coming to DoK day, so come and say "Hey!". I'll have t-shirts and stickers; DigitalOcean has great swag. I would love to give you some! I am looking forward to meeting some of you in person and interacting with more of you virtually.

**Bart Farrell** 51:51

Looking forward to that! Before we finish, as a tradition in our community, one thing that makes us unique is that while you're talking, we have a wonderful person behind the scenes. He's a very talented artist.

Kim, this is a fantastic talk. I'm waiting to get you back on for another live stream. You better get that in the calendar. As usual, folks, jump in on Slack if you have additional questions because Kim's easily accessible there. We will be seeing each other soon!
