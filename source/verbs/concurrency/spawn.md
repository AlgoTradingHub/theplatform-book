# spawn

Schedules lambda to run on some free scheduler. Returns a join handle.

**Syntax:** ```spawn[x;y;..]```

Where:

- x is a lambda to be run;
- y;z;... are optional arguments.

```o
o)spawn[{0N!(,':x)};!10]
&ltReagent#4&gt
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

::: note
Returned handle is the reagent. You can create reactions with it, apply a get to it for synchronization or to get results. 
You can send a signal to the reagent that will stop lambdas and be its result.
:::

```o
o)h: spawn {100000{x+1}/1; "done"}
&ltReagent#4&gt
o)get h
"done"
o)
```

```o
o)h: spawn {{x+1}/1; "done"};
o)h["killed"]
o)get h
"killed"
```


::: see
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[get](/verbs/concurrency/get.md)
:::