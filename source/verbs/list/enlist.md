# Monadic enlist

Takes an arbitrary number of arguments and produces a list as a result. If all elements are of the same type, the result will be collapsed to a vector.

**Syntax:** ```enlist[x;y;z;..];  enlist[x];  enlist x```

```o
o)enlist[1;2 3;"asd"]
1
2 3
"asd"
o)enlist[1;2;3;4]
1 2 3 4
o)a:0
0
o)b:enlist a
,0
o)c:enlist b
,,0
o)type each(a;b;c)
`s`long
`v`long
`v`l
o)
```


::: see
[first](/verbs/list/first.md)
[pick](/verbs/list/pick.md)
:::
