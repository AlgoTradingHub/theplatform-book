# Reagent state

Subscribes to any other reagent state changes and produce such events as items.

**Syntax:** ```reagent[`state;other_reagent]```

```o
o)r: reagent[`async];
o)// create reagent to receive r state notifications
o)s: reagent[`state;r];
o)react {[x:s] println["main State changed: \n%";x]};
o)close r;
main State changed:
id     | 12
message| "Custom { kind: BrokenPipe, error: \"closed\" }"
o)
```

::: see
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
