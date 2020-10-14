# enlist

Takes a arbitrary number of arguments and produces a list as a result. If a type of each
element is the same - result will be collapsed to a vector

**Syntax:** ```enlist[x;y;z;..]```

```o
o)enlist[1;2 3;"asd"]
1
2 3
"asd"
o)enlist[1;2;3;4]
1 2 3 4
o)
```
