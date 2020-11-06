# first

Returns the first element from `x` if `x` is a list, else returns `x`.

**Syntax:** ```first x; first[x]```

```o
o)first 1 2 3 4
1
o)first 1
1
o)first ("asd";1 2 3 4)
"asd"
o)first each ("asd";1 2 3 4)
"asd"
1
o)
```

`first` reverses `enlist` action:

```o
o)a:1
1
o)a~first enlist 1
1b
o)
```

::: see
[last](/verbs/other/last.md)
[enlist](/verbs/other/enlist.md)
:::
