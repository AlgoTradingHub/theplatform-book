# spawn

Schedules lambda to run on some free scheduler. Returns a join handle that can be passed to wait function for synchronizing.

**Syntax:** ```spawn[x;y;..]```

Where:

- x is a lambda to be run;
- y;z;... are optional arguments.

```o
o)spawn[{0N!(,':x)};!10]
<Reagent#4>
0 0N
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
