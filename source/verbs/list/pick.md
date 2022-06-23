# pick

Takes an arbitrary number of arguments and produces a list as a result. Unlike [enlist](/verbs/list/enlist.md) it doesn't collapse to a vector if all elements are of the same type. Sometimes it is useful for generic list creation;

**Syntax:** ```pick[x;y;z;..]; ([] x;y;z;..)```

```o
o)pick[1;2;3;4]
1
2
3
4
o)([] 1;2;3;4)
1
2
3
4
o)
```

::: see
[first](/verbs/list/first.md)
[enlist](/verbs/list/enlist.md)
:::
