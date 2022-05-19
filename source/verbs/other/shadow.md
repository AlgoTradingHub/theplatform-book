# shadow

Creates variables that are visible down the stack.

**Syntax:** ```shadow `x; x::y``` ```.x:y```

Allowed only inside lambda's body, otherwise it doesn't make sense.

```o
o)f:{s::20;};
o)f2:{shadow `s; s::10;f[];s};
o)f2[]
20
o)
```

```o
o)a:42;
o){shadow `a; a::2; show a;{show a; {show a}[ ] }[ ] }[ ]
2
2
2
```

::: warn
Always use the verb `shadow` in pair with `::` otherwise you will use a local variable.
:::

```o
o)a:42;
o){shadow `a; a:2; show a;{show a; {show a}[ ] }[ ] }[ ]
2
2
0N0
```
For shadow variable it is more convenient to use names that start with a dot.

```o
o){.a:2; show .a;{show .a; {show .a}[ ] }[ ] }[ ]
2
2
2
```

::: see
[lambdas](/reference/lambda.md)
:::