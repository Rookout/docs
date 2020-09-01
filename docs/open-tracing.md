---
id: open-tracing
title: OpenTracing
sidebar_label: OpenTracing
---

OpenTracing is an open standard for distributed tracing, which allows to trace requests from beginning to end across multiple touchpoints and microservices
in a large stage applications.  

Common use cases:
* Microservices - follow the journey transactions takes through microservices architecture.
* Caching — troubleshooting to determine whether a request is hitting the cache. 
* Arbitration — tracing the full history of a single process,
determining its behavior when multiple services contact it in parallel rather than sequentially.

Different tools implements OpenTracing standard by providing a timeline view of requests using the OpenTracing terminology (spans, tags, span context etc...).
Rookout can integrate with such tools and fetch tracing data. 


Rookout Tracing information is available for Java and Python applications that implement OpenTracing. \n
For more information, contact us at support@rookout.com