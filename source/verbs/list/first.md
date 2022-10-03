# Monadic first

Returns the first element from `x` if `x` is a list, else returns `x`.

**Syntax:** ```first x; first[x]; *x```

```o
o)first 1 2 3 4
1
o)first 1
1
o)* 1 2 3 4
1
o)* 1
1
o)first ("asd";1 2 3 4)
"asd"
o)first each ("asd";1 2 3 4)
"asd"
1
o)
```


::: see
[last](/verbs/list/last.md)
[enlist](/verbs/list/enlist.md)
:::
