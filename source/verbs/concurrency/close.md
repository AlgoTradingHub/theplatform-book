# close

Deactivates a reagent. If `x` is an IPC or TCP reagent, `close` closes the connection.

**Syntax:** ```close x; close [x]```

where `x` is a reagent:

```o
o)r:reagent[`async];
o)react {[x:r] 0N!x};
o)r[1]
1
o)meta r
id   | 3
state| `running
type | "async"
o)close[r]
o)meta r
id   | 3
state| `closed
type | "async"
o)r[2]
** I/O error: `reagent send`:
-- channel is closed
```

::: see
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[meta](/verbs/other/meta.md)
:::
