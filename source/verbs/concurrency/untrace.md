# untrace

Removes trace from a function.

**Syntax:** ```untrace x; untrace[x]```

```o
o)f:{a:x+1;b:a*2;c:b-1;c};
o)trace `f;
o)untrace `f;
o)f[1]
3
o)
```

::: see
[trace](/verbs/concurrency/trace.md)
:::
