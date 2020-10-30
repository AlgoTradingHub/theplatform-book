# enlist

Takes an arbitrary number of arguments and produces a list as a result. If all elements are of the same type, the result will be collapsed to a vector.

**Syntax:** ```enlist[x;y;z;..]```

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

`enlist` action is reversed by `first`:

```o
o)a:1
1
o)a~first enlist 1
1b
o)
```

::: see
[first](/verbs/other/first.md)
:::
