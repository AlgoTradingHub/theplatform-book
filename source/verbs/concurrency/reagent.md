# reagent

Creates a reagent - an async participant of reactions.

**Syntax:** ```reagent[..]```

It's a polyadic function. Argument types and count depend on the reagent type. Reagents can be built-in or plugin extensions.

```o
o)r:reagent[`timer;1000;3];
o)react {[x:r] 0N!x};
o)
1000
1001
1001
```

::: see
[All reagents](/reference/types/reagents/overview.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
