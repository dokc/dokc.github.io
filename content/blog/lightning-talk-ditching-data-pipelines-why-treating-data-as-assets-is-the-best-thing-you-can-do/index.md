---
title: 'Lightning Talk: Ditching Data Pipelines: why treating Data as Assets is the best thing you can do'
date: '2024-07-01T16:00:40Z'
lastmod: '2024-06-26T21:56:27Z'
slug: lightning-talk-ditching-data-pipelines-why-treating-data-as-assets-is-the-best-thing-you-can-do
author: Paul Au
---

Efficient data handling traditionally involves constructing robust pipelines to process information from diverse sources. However, recent open-source tools question this approach and propose an alternative: rather than detailing data processing steps, why not focus on the relationships between data objects?

This gave rise to the concept of Assets—entities like SQL tables, Parquet files, or S3 objects. Instead of defining the pipeline that creates an entity, the focus shifts to specifying how various assets interconnect and highlighting their relationships.

By using a Cloud Native orchestrator, we can now build our data platform on top of object storage, compute, and data warehouse while keeping a unified view that shows the dependencies across our infrastructure.

During this talk, we discovered the implementation of this concept using open-source tools like Kubernetes and Dagster with the potency of asset-based data management. Join us for a sneak peek into this new world!

Speakers:

- Andrea Giardini -  Independent

## Watch the Replay

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/PCLcIbPnS3c" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

## Read the Transcript

Speaker 1: [00:00](https://www.rev.com/transcript-editor/shared/ppQvDDXcYdw3sbyZPfulffYIS49CaQer5hlJ7IR3VHfQw8OtVfbFX7rmgAK3RMv6Gde3m2U6AiW78IG0XpYXMbZdDRQ?loadFrom=DocumentDeeplink&ts=0.15) Welcome to my live in Talk. My name is Andre Giardini. I'm an independent cloud native consultant and trainer, and today we're going to talk about digital data pipelines. Why treating data's assets is the best thing you can do. I am a platform engineer, and I happen to do a lot of work with data companies and data platform, and if you've worked in data for more than a couple of weeks, pretty much I'm sure all of you know what this logo is about, right? Airflow, lot of people like it, a lot of people hate it, but every time I look at airflow and the way airflow works, I cannot help to make this comparison. Let me know if you see the similarity here. For me, every time I work with airflow is very similar to every time I happen to work with Jenkins. Sure they do similar things, but there is a similarity underneath in the way Airflow and Jenkins do things.

[00:52](https://www.rev.com/transcript-editor/shared/KhbrIfp_wTmZJCYWBTSxSxvsJ7Bq5LT0OhZRPQ5K8n1Kyxw85Hm7Kf_btRTPOjICT6bbi5dOeR39RmQ8Zv773oWXyTc?loadFrom=DocumentDeeplink&ts=52.71) And I think the similarity is this one. Both of them are like a white canvas. Every time we install a new airflow instance, every time we install a new junk systems, it is like starting from scratch. We start from a white painting and we need to get started and build things on top, on top, on top on top. And now when you have a white painting, there are two things you can do. Two things can happen only true. You're either an artist and you can make an amazing masterpiece or you can just figure out that you're never becoming a good painter after all.

[01:26](https://www.rev.com/transcript-editor/shared/QiP3tH0aiTCsn1Y-94wbBaMWudPzPd2DhhcR8ln5BMwMya5GLuX2R1sw2OpeG9fiolzadUx4m1NVvUympnldjTe1n90?loadFrom=DocumentDeeplink&ts=86.46) The main problem that they see when company used airflow is that the airflow focuses a lot on how data is built, on what's the process to bring the data from the source to a usable state. Instead, what I think should be the focus of a tool that works with data is to understand how data relates to each other with airflow. Airflow is a software that's been around for a long time where data was just stored on disk or databases pretty much. But right now we live in the cloud, right? Our data can be pretty much anywhere. Our data can be a big query table, a file saved on a screen, a Postgres database, a file on storage, but it's not as simple anymore, and it's becoming more and more complicated to figure out how things are connected to each other, how all our pieces of data connect together.

[02:16](https://www.rev.com/transcript-editor/shared/cKcptv-0QptS78d_5s7hYW18ffEF84q5U8JsT_UAlBuRCXaXNQ9yUKZ-9YFrGrf3O73wm-FqlfTdwNWqou3XKDdN14k?loadFrom=DocumentDeeplink&ts=136.56) And this is why today I want to let you think about treating your data as assets rather than as workflow pipelines. Pretty much, I happen to be a contributor of an open source software called Dexter. I, I've been working with this software for a while. It's open source, it's cloud native, and I've contributed with a couple of PRS to their integrations. And Dexter really gets this thing right in my opinion. It really treats data as units of things connected together, pretty much. So in here, I just shown you two example pipelines where we can see clearly, for example, the data is being pulled by air byte. Then we do all the processing using a tool called DBT, and finally we run our Python function to make some final forecasting model. On the right, the same thing happens, but right now we are using five trends for ingesting DBT to modify the data.

[03:08](https://www.rev.com/transcript-editor/shared/JLXOvltEPW5pHVAznVpm9GA0m50iRGPDT_-P_Z3e5-A9Ylj3mO3Wfm-umnkyX8d-hEK5IxcH6J6DunXqxscAlxXpbo4?loadFrom=DocumentDeeplink&ts=188.32) And finally, we use a TensorFlow model to predict the orders, for example, and look how nice it is. The lineage here is so clear, it's so easy to understand how data connects with each other. And all this comes out of the box just by writing Python. You just need to import return data from a function import in another one and all this thing, you will get all this thing out of the box. Another thing I really love about Dexter is that it's a tool that is cloud native first with airflow, it was always like a big hack to figure out how to run your pipelines locally with airflow, it's really complicated Dexter. Instead, what it does is abstracts things that are not needed to let you focus on the pipeline. So IO managers is a great example. Are you running your pipeline locally? Well, then you're using your Docker demon in your local storage.

[03:59](https://www.rev.com/transcript-editor/shared/OMwGNZLHf068ArfegS9Q0BLCfn-dwTDckxPWdA94B6kuHZpmvTE2lDds9zYPD977s_Rj3f8bqcJwOfKo97gKRXkedmY?loadFrom=DocumentDeeplink&ts=239.92) Are you running it now in the cloud? Well, now you're using Kubernetes and you're using S3 to store your logs and your intermediate state and your pipeline does not change, not even a bit. And finally, it's the integration. Dexter has an amazing ecosystem that integrates with plenty of different tools. Of course, the major cloud providers, DBT, slack, airflow, Prometheus, d db, you name it, there's plenty of different integrations and plenty of different ways of working with it. So if you want to know more about Dexter, you can check out Dexter io. My website is andre ardini.com. I will be around the whole week, and I will be more than happy to understand your strategy around building data pipelines, about building data assets hopefully in the future. Thank you.

Data on Kubernetes Community resources

- Check out our [Meetup page](https://www.meetup.com/data-on-kubernetes-community/) to catch an upcoming event
- Engage with us on [Slack](https://join.slack.com/t/dokcommunity/shared_invite/zt-2a0ahuhsh-MdZ4OpF4nr_s4kyOwTurVw)
- Find [DoK resources](/dok-library/)
- Read [DoK reports](/dok-reports/)
- Become a [community sponsor](/join/)
