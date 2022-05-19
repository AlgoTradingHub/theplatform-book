# Reagent file

Reagent for writing/reading bytes from a file.
If file exists bytes will append to file.


**Syntax:** ```reagent[`file]```

```o
o)w:reagent[`file;`:/tmp/test.txt];
o)w "x"$"write\n"
o)
```

You can read file through the get to immediately after creating the reagent.

```o
o)w:reagent[`file;`:/tmp/test.txt];
o)"c"$get w
"write\n"
o)w "x"$"append\n"
o)$get w
""
o)r:reagent[`file;`:/tmp/test.txt];
o)"c"$get r
"write\nappend\n"
o)
```


::: see
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[get](/verbs/concurrency/get.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
