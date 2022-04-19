# reagent

Creates a reagent - an async participant of reactions.

**Syntax:** ```reagent[..]```

It's a polyadic function. Argument types and count depend on the reagent type. Reagents can be built-in or plugin extensions. To see complete list of built-in reagents, refer to:

::: see
[Reagents](/reference/types/reagents/overview.md)
:::

```o
o)r:reagent[`timer;1000;3];
o)react {[x:r] 0N!x};
o)
1000
1001
1001
```

::: see
[react](/verbs/other/react.md)
[close](/verbs/other/close.md)
[meta](/verbs/other/meta.md)
:::
