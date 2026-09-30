---
title: SRE vs Data Engineer — Who Owns What?
date: '2020-09-05T13:10:27Z'
lastmod: '2020-09-10T14:21:40Z'
slug: sre-vs-data-engineer-who-owns-what
author: Melissa Logan
image: 1_eKwqs19IIcNLKu_gmNtJcA.jpeg
---

Photo by [Lorenzo](https://www.pexels.com/@lorenzocafaro?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels) from [Pexels](https://www.pexels.com/photo/black-and-white-business-chart-computer-241544/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)

---

[**Demetrios**](https://app.slack.com/team/U01708SV22W)

One question that I have been pondering lately is where do the requirements of an SRE end and a data engineer begin and visa versa?

[**bmath**](https://app.slack.com/team/U016TGTDD38)

In my past experiences, the Data Ops team has been responsible for moving data from one database to another, and also some transformations of the data that are well understood. SREs generally stop when the database is online and get involved if there are access issues. I’d love to hear more about how others divide the labor though.

[**Rick Vasquez**](https://app.slack.com/team/U018N6BFL49)

This is a fun question because half the reason both of those job titles exist as opposed to a DBA is companies started assuming that databases just need to be running to deal with outages.In our experience the multi tech and multi discipline flexibility that comes with either an SRE or Data Engineer depends on the company and some have even coined a new position called DBRE. We have hundreds of enterprise class customers that we deal with in varying degrees, but the same holds true everywhere, without a true DBA/DBRE everyone is just hoping things go fine as opposed to making sure things will be fine.

At Percona we look at data engineers as master manipulators of the data regardless of technology it is persisted in and SRE for config/troubleshooting of the whole stack. Neither is actually in charge of properly tuning the database(regardless of tech) and usually companies get lucky that one of the 2 knows how if there is no DBA

[**Mike Semcheski**](https://app.slack.com/team/U017UKAMUG1)

As I see it, the traditional role of a DBA is to tune the run-time configuration of the database and perhaps some domain expertise around optimization.But the reality is its a full time job just to make sure the right databases are up and running, and that tenants have the resources they’ve paid for. This is more of an SRE position.And so there’s no point of even having a DBA in the traditional sense until you’re excellent at the SRE aspect — no point in tuning a database that isn’t running.

I’m not really sure about Data Engineer’s, though.

Perhaps DE’s are in charge of aggregating data from lots of sources and making sense of it all. To do this, they would need access to multiple databases and keep them running, and so it ends up being a little bit of SRE and a little bit of DBA?

And so if I had to say which of those three hats fits me best, I’d say SRE.

[**dave-o**](https://app.slack.com/team/U016VHVS87R)

Great question. I think the guys above pretty much nailed it down. Labeling things in IT is a jolly exercise. Sometimes new labels can help Marketing or HR departments categorize things and sometimes new labels can divert people away from stigmatized creepy labels like “The Data Processing Department”. I think the lines have been blurred between the “network guy”, “programmers”, “dba”, “pc support” etc. Most infrastructure guys/gals can at least write scripts and write some code while dba’s and software/data engineers are pretty well versed in the stacks. I think a lot of it boils down to what you like to do. Strictly speaking, under the hood engineers create stuff and DevOps/SREs generally integrate existing components and maintain stuff. My two pence. Now the difference between DevOps and SREs well, that’s anybody’s guess

… and the beat goes on.

[**dave-o**](https://app.slack.com/team/U016VHVS87R)

…and of course, Universities have no programs remotely related to anything.

[**Demetrios**](https://app.slack.com/team/U01708SV22W)

These are all super helpful answers! thank you all for helping me to understand this a bit more. I am going to touch on these topics in the meetup today so I now feel super prepared!

[**Dean Stathos**](https://app.slack.com/team/U017JC1B94L)

in my mind an SRE and DataOps person are just reincarnations of ye ‘ole Business Continuity and Business Analyst roles. One deals with ensuring infrastructure is up and running (within capacity and performance thresholds) and the other deals with the data that resides in that infrastructure to make sense of it and build value out of it. The roles haven’t changed from a business standpoint, but, the names have to reflect a new paradigm world in IT…one word — cloud…

If I may, I’d like to further my comment. SRE’s create and maintain the infrastructure within the capacity and performance thresholds defined in conjunction with the DataOps (and other internal end users) requirements. Sometimes, those lines do blur because a DataOps/BA doesn’t really know how to make those requirements and eventually lean on the SRE/BC person (or even HW/SW vendor) to help.

DataOps/BA roles research and define the tools used to help them make their job faster/better/stronger/etc… Once the tools are defined, they work with the infrastructure folks to see how those tools can be implemented within the corporate IT strategy in place — in many cases these days, public cloud has become the infrastructure strategy of choice.

---

Big Thanks to Rick, Brian, Dean, Mike and Dave for helping me see the differences here.

[Join us in slack](https://join.slack.com/t/dokcommunity/shared_invite/zt-g3ui5r0g-jDKz5dhh2W1ayElqwKYYAg) to talk about these kinds of themes and so much more! Also, feel free to drop into our [weekly Tuesday meetups](https://go.dok.community/register) or catch the replays on [youtube](https://www.youtube.com/channel/UCUnXJbHQ89R2uSfKsqQwGvQ?view_as=subscriber) or in [podcast land](https://anchor.fm/demetrios6).
