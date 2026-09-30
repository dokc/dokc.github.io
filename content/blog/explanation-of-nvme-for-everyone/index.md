---
title: Explanation of NVMe for Everyone
date: '2021-05-19T19:00:17Z'
lastmod: '2021-05-19T19:11:37Z'
slug: explanation-of-nvme-for-everyone
author: Melissa Logan
image: NVMe.png
tags:
- NVMe
---

I was talking to a friend recently about his computer build and one thing struck me. He had bought an NVMe drive not because he knew what it was or how it differed from anything else but because he felt overwhelmed by information when trying to research it. Due to this he just made his purchase based on the advice of a popular youtube channel. Working with storage professionally I was a bit taken aback by the lack of simple, plain english, easily accessible information on what the actual differences are. This blog is going to be my effort to clear the air and provide the layman's guide to understanding what NVMe is as a technology and why it matters to you. This should be applicable all the way from DIY computer builders people setting up enterprise architectures.

\
So what is NVMe? Simply put **NVMe is a protocol that your Kernel uses to talk to a storage device**. In other words just like humans use language to communicate, computers and computer parts need to use language to communicate information. The languages that computers use are referred to as protocols. Historically computers have used SCSI and ATA (the ATA from SATA) to communicate with their storage devices like hard drives or older SSD drives.

\
What NVMe is not is a type of slot on a motherboard. One common misconception is that there is such a thing as an NVMe type connector; this is simply not the case. Motherboards that are NVMe enabled come with **an m.2 PCIe slot that needs to be able to speak the NVMe protocol and act as a bridge between the larger computer and the storage drive you install**. Not all m.2 slots can speak NVMe and so even though a drive might physically fit in a slot if it can’t speak the language then it simply won't work. Interestingly enough just like other protocols NVMe is also not restricted to work solely on a m.2 slot. Just like you can use ISCSI to transmit SCSI over default port 3260 on a network you can also transmit NVMe over a network with default port number of 4022. This is called NVME-OF or NVMe over fabric. In theory you could transmit data using NVMe over pretty much any interface as long as that interface was able to understand the NVMe protocol. There are even tools out there that sit on top of older ATA or SCSI interfaces and act as translators allowing them to interact with data over NVMe interfaces.

\
Now that we understand that NVMe is a protocol and not a type of hardware slot or cable how does this affect us? Is it any faster or better then the others and if so why? Without getting into too much technical detail, **NVMe takes advantage of a number of modern improvements in storage technology**. Back in the day when spinning discs (hard drives) were the main way data was stored there were a number of considerations that needed to be taken into account for any protocol to work efficiently. The drives themselves had massive limitations as there were actual moving heads across magnetic platters. This required a number of extra layers like a request queue between the actual storage device itself and the computer. **Essentially instead of just speaking the protocol language directly to the Kernel the storage device would have to play a game of telephone translating the communication into something the Kernel could understand**. This did work and at the time was relatively efficient if we consider the limitations of the time. Modern non-mechanical drives don't necessarily need any of this extra help. **This allows NVMe to remove a lot of this unneeded middle management in the communication chain making it much faster and much more efficient in how it handles data transfer**. Basically it skips the game of telephone and allows both parties to talk directly with a single driver layer. \
In conclusion NVMe is just a protocol or language that is very efficient and allows for faster communication between the Kernel and storage device in a computer. When building a computer or designing architecture all you need to do is make sure that the hardware you are using can speak NVMe. That's it if you know that you can go forth and be successful.
