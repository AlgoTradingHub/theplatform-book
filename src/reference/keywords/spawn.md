# spawn

Schedules lambda to run on some free scheduler. Returns join handle that can be passed to wait function for synchronize

**Syntax:** ```spawn[x;y;..]```

Where:

- x: lambda to be runned
- y;z..: optional arguments

```o
o)spawn[{0N!(,':x)};!10]
3
o)0 0N
1 0
2 1
3 2
4 3
5 4
6 5
7 6
8 7
9 8
o)
```
