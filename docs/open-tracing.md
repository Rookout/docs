---
id: open-tracing
title: OpenTracing
sidebar_label: OpenTracing
---

OpenTracing is an open standard for distributed tracing, which allows tracing of requests from beginning to end across multiple touchpoints and microservices
in a large scale applications.  

Common use cases:
* Microservices - follow the journey a transactions takes through microservices architecture.
* Caching — troubleshooting to determine whether a request is hitting the cache. 
* Arbitration — tracing the full history of a single process,
determining its behavior when multiple services contact it in parallel rather than sequentially.

Different tools implements OpenTracing standard by providing a timeline view of requests using the OpenTracing terminology (spans, tags, span context etc...).
Rookout can integrate with such tools and fetch tracing data. 

Click here to learn more about [OpenTracing](https://opentracing.io/)

**Fetch tracing data**
1. Set up a Breakpoint. 
2. Make sure the Tracing checkbox is checked in the Breakpoint Editor -> Collection section. 
3. Trigger the Breakpoint and open a message
4. On the right side of the message pane, click on the Tracing tab.

Rookout Tracing information is available for Java and Python applications that implement OpenTracing.
For more information, contact us at support@rookout.com.