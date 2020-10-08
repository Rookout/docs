---
id: breakpoints-conditional
title: Conditional breakpoints
---
Conditional breakpoints allows you to limit your data collection from a code snippet to only when the defined expression evaluates as true.

Add a Condition by right click on a breakpoint and choose the 'Edit' option. A right pane will open up, click on the arrow next to 'Condition', write the expression you wish to check and click 'Set' at the bottom of the pane.

<iframe width="560" height="315" src="https://www.youtube.com/embed/IkuvAH52PVA" frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen></iframe>
### Rookout provides two types of conditions:
- Simple - compare the value of one or two variables.
- Advanced - define a complex condition using logical parameters (use "&&" for AND statement,  "||" for OR statement, "(" and ")" for encapsulation).

### Advanced conditions - supported operators and functions:

| Operator  | Example  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description |
| ------------ | ----------------------- | ------------- |
| `==` | `a==1`, `b=='bbb'`, `x==y`  | 	If the values of two operands are equal, then the condition becomes true. |
| `!=` | `a!=1`, `b!='bbb'`, `x!=y`  |  If values of two operands are not equal, then condition becomes true. |
| `>` | `a>1`, `x>y`  | If the value of left operand is greater than the value of right operand, then condition becomes true. |
| `>=` | `a>=1`, `x>=y`  | If the value of left operand is greater than or equal to the value of right operand, then condition becomes true. |
| `<` | `a<1`, `x<y` | If the value of left operand is less than the value of right operand, then condition becomes true. |
| `<=` | `a<=1`, `x<=y` | If the value of left operand is less than or equal to the value of right operand, then condition becomes true. |
| `in` | `'bbb' in a` | If the value of the left operand is included in the right operand, then the condition becomes true. |
| `&&` | `a<=1 && b!='bbb'` |  If both the operands are true then condition becomes true. |
| <code> &#124;&#124;</code> | `a<=1`<code>&#124;&#124;</code>`b=='bbb'`  | If any of the two operands are non-zero then condition becomes true. |
| `()` | `(a<=1`<code>&#124;&#124;</code>`b=='bbb') && (x<y)` | Parentheses could be used for changing the precedence when evaluating the conditio |
| `[]` | `arr[4]!=4`, `dict['a']!=4`  | Set conditions regarding to a specific sequence’s element - list, dict etc. |
| `size` | `arr.size() >= 32` | Use size instead of len or length on any platform |


* Evaluating functions are currently not supported in conditions. 

### Time-To-Live:

Seting time-to-live on a breakpoint places limits on the life span of the breakpoint. The breakpoint will disable automatically past the configured limit

<iframe src="https://player.vimeo.com/video/373492033?color=af6bd6&title=0&byline=0&portrait=0" width="640" height="400" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

**Keep in mind:** 
1. The supported syntax may be different from your developing language and it can be confusing - just make sure you use the supported operators above.  
2. A condition can be invalid due to typos and wrong variables, check that your variables written correctly. 