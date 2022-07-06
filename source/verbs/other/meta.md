# meta

Retrieves meta-information about tables, [reagents](/reference/types/reagents/overview.md) and tasks.

**Syntax:** ```meta x; meta [x]; meta[]```

```o
o)meta ([]a:1 2 3;b:1.1 2.0 5.3)
+`column`type`id!(`a`b;`long`float;45376 45632)
()
o)r:reagent[`async]
&ltReagent#3&gt
o)meta[r]
id  | 3
type| "async"
o)
```

`meta[]` returns meta-information about the current task. To get information about a specific task, pass the join handle as an argument.

```o
o)meta[]
taskid  | 0
parent  | &ltReagent#4&gt
children| ()
schedid | 1
o)h:spawn {1000000{x+1}/1;}
&ltReagent#6&gt
o)meta[]
taskid  | 0
parent  | &ltReagent#7&gt
children| (&ltReagent#8&gt)
schedid | 1
o)
```

::: see
[reagent](/verbs/concurrency/reagent.md)
:::
