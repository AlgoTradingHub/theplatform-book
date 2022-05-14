# Reagent sync

Much like as async reagent, but waits ACKs on every send.
Is used for ensure that message has been delivered.

**Syntax:** ```reagent[`sync]```

::: warn
Avoid using sync reagent in the same task because it causes an deadlock.
:::

```o
o)s: reagent[`sync];
o)spawn {react {[x:s] println["value from sync reagent has been received: %";x]}};
o)s[123];
value from sync reagent has been received: 123
```

::: see
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
