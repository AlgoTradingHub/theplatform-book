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
id  | 3
type| "async"
o)close[r]
o)meta r
id  | 3
type| "async"
o)r[2]
** I/O error: `reagent send`:
-- channel is closed
**
```

::: see
[reagent](/verbs/other/reagent.md)
[react](/verbs/other/react.md)
[meta](/verbs/other/meta.md)
:::
