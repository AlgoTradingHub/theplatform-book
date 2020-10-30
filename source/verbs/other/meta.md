# meta

Retrieves meta information about tables - column names, types and internal type ids.

**Syntax:** ```meta x; meta [x]```

```o
o)meta ([]a:1 2 3;b:1.1 2.0 5.3)
+`column`type`id!(`a`b;`long`float;45376 45632)
()
o)
```
