# trace (temporapy not work)

Traces function evaluation.

**Syntax:** ```trace x; trace[x]```

```o
o)f:{a:x+1;b:a*2;c:b-1;c};
o)trace `f;
o)f[1]
|  |  |  f[1]
|  |  |  f = 3
3
o)
```

::: see
[untrace](/verbs/concurrency/untrace.md)
:::
