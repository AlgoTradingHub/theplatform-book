# reagent

Creates reagent - an async participant of reactions.

**Syntax:** ```reagent[..]```

It's a polyadic function. Arguments types and count depends on type of reagent. Reagents can be built-ins or plugin extensions. To see complete list of built-in reagents, refer to:

::: see
[Reagents](/reference/types/reagent.md)
:::

Reagent can have optional destructor as a last argument. It will be called upon freeing reagent with reagent meta as an argument to this function:

```o
o)r:reagent[`timer;1000;3;{println["-- timer dropped: \n%\n--";x]}];
o)react {[x:r] 0N!x};
o)10260
1002
1002

o)r:()
-- timer dropped:
type      | `reagent
id        | 44i
descriptor| 0N0
rx        | ,`type!,`timer
cache     | ()
destructor| {println["-- timer dropped: \n%\n--";x]}
error     | 0N0
--
()
o)
```

::: see
[react](/verbs/other/react.md)
[close](/verbs/other/close.md)
[meta](/verbs/other/meta.md)
:::
