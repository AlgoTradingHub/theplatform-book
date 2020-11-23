# close

Deactivates a reagent. If `x` is an IPC or TCP reagent, `close` closes the connection.

**Syntax:** ```close x; close [x]```

where `x` is a reagent:

```o
o)r:reagent[`async];
o)react {[x:r] 0N!x};
o)r[1]
o)1
o)meta r
type      | `reagent
id        | 4i
descriptor| `value`prefix`suffix!(4294967297;1i;1i)
rx        | ,`type!,`async
cache     | ()
destructor| 0N0
error     | 0N0
o)close[r]
o)meta r
type      | `reagent
id        | 4i
descriptor| 0N0
rx        | ,`type!,`async
cache     | ()
destructor| 0N0
error     | 0N0
o)r[2]
o)
```

::: see
[reagent](/verbs/other/reagent.md)
[react](/verbs/other/react.md)
[meta](/verbs/other/meta.md)
:::
