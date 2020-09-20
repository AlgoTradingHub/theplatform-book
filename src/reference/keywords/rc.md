# rc

Reference count of x

**Syntax:** ```rc x; rc[x]```

```o
o)a: 1 2 3
1 2 3
o)rc[a]
2
o)b:a
1 2 3
o)rc[a]
3
o)l:(a;b)
1 2 3
1 2 3
o)rc[a]
5
o)l:()
()
o)rc[a]
3
o)
```
