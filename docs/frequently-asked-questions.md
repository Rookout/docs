---
id: frequently-asked-questions
title: Frequently Asked Questions
sidebar_label: Frequently Asked Questions
---

<details>
    <summary><span style="font-size:1.3em;￿">No App Instances connected</span></summary></summary>
        <br>

* Check connectivity. See [Test connectivity section here](https://docs.rookout.com/docs/sdk-setup.html) 
* Check that you used the right Token. See "Where can I find my Token" question below.
* Ask speak to an engineer in the IDE chat. 
</details>

<details>
    <summary><span style="font-size:1.3em;￿">I don't see debug data</span></summary>
<br>

* Check if your breakpoint is valid. [Click here for explanation](https://docs.rookout.com/docs/breakpoints-status.html)  
* Check if your application is connected
    * See "What app instances are connected?" below.
    * If you don't see your instance connected, see "No App Instances connected" above.
* Trigger your application. The data will be shown once the relevant line will be executed.  
</details>

<details>
<summary> <span style="font-size:1.3em;￿">What does my breakpoint color means?</span></summary>
* [Click here for explanation](https://docs.rookout.com/docs/breakpoints-status.html)  
    
</details>

<details>
<summary><span style="font-size:1.3em;￿">Why do you need my sources?</span></summary>
<br>
* Rookout does not have any access to your source code at all.
* The only Rookout component with access to your repository is the developer’s browser itself.
* The only thing we do see at Rookout’s services is a SHA256 being calculated both in the browser and in your app deployment.
* This calculation is performed in order to make sure the code running in production and the code is seen by the developer in Rookout’s FE are synced in 100%.
* We send the file’s name and the line number you applied the non-breaking breakpoint at. 
</details>

<details>
<summary><span style="font-size:1.3em;￿">Do you have performance impact?</span></summary>
<br>
* Until a specific Breakpoint is set- there is zero performance impact. he Rookout SDK loads and listens on a port - consuming no resources from the running app.
* Once a Breakpoint has been set, Rookout performs bytecode manipulation, practically adding a code line that would print data to a local logger.
* This code line is equivalent to a developer adding a code line that prints a log line. We add the code in memory directly.
* The impact of hitting a Breakpoint depends on the amount of extracted data, and the depth of the data within the local stack frame.
</details>

<details>
<summary><span style="font-size:1.3em;￿">I have security concerns</span></summary>
<br>
* We are SOC2 (Type 2) compliant.
* please find this security specifications on our [website.](https://www.rookout.com/security/)
</details>

<details>
<summary><span style="font-size:1.3em;￿">How can I fetch data from specific enviroment/instances?</span></summary>
<br>
* [Click here for explanation](https://docs.rookout.com/docs/projects-tagging.html)
</details>

<details>
<summary><span style="font-size:1.3em;￿">Where can I find my Token?</span></summary>
<br>
![alt text](/img/screenshots/token-gif.gif "Title")
</details>

<details>
<summary><span style="font-size:1.3em;￿">How can I add users to my organization?</span></summary>
<br>
![alt text](/img/screenshots/invite-gif.gif "Title")
</details>

<details>
<summary><span style="font-size:1.3em;￿">What app instances are connected?</span></summary>
<br>
![alt text](/img/screenshots/instances-gif.gif "Title")
</details>

<details>
<summary><span style="font-size:1.3em;￿">What programming languages do you support?</span></summary>
<br>
* Python 2.7
* Python3
* PyPy
* NodeJS
* Electronﬁ
* JVM based languages
    * Java
    * Kotlin
    * Clojure
    * Groovy
    * Scala
    * ColdFusion


</details>