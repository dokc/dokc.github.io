---
title: Datashim - a framework for declarative management of datasets on Kubernetes - Srikumar Venugopal
date: '2023-12-21T22:51:14Z'
slug: datashim-a-framework-for-declarative-management-of-datasets-on-kubernetes-srikumar-venugopal
resourceType: video
link: https://www.youtube.com/watch?v=4qBgGZz1-kE
description: Many ML pipelines depend on shared filesystems for input, output and intermediate data storage. Standards such as CSI have made it possible for applications in Kubernetes to access a variety of data storage systems. Yet, data scientists still have to deal with low-level details of data access in order to execute their pipelines in Kubernetes. Datashim is a framework that manages the lifecycle of a Dataset object, a CustomResourceDefinition that represents a source of data. Datashim takes care of the details of data access while Kubernetes pods can declaratively access the data by referencing a Dataset in their specifications. This talk will describe Datashim and the Dataset object, discuss its use in ML pipelines, and demonstrate how its pluggable architecture is designed for the development of caching, scheduling and governance plugins. Datashim is an incubating project of the Linux Foundation Data and AI Foundation
---
