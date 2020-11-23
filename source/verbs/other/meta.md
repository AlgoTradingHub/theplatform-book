# meta

Retrieves meta information about tables and [reagents](/reference/types/reagents.md).

**Syntax:** ```meta x; meta [x]```

```o
o)meta ([]a:1 2 3;b:1.1 2.0 5.3)
+`column`type`id!(`a`b;`long`float;45376 45632)
()
o)r:reagent[`async]
<Reagent#3>
o)meta r
type      | `reagent
id        | 3i
descriptor| 0N0
rx        | ,`type!,`async
cache     | ()
destructor| 0N0
error     | 0N0
o)
```

see :::
[reagent](/verbs/other/reagent.md)
:::
