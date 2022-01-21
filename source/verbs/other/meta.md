# meta

Retrieves meta information about tables and [reagents](/reference/types/reagents.md).

**Syntax:** ```meta x; meta [x]```

```o
o)meta ([]a:1 2 3;b:1.1 2.0 5.3)
+`column`type`id!(`a`b;`long`float;45376 45632)
()
o)r:reagent[`async]
&ltReagent#3&gt
o)meta r
id  | 3
type| "async"
o)
```

::: see
[reagent](/verbs/other/reagent.md)
:::
