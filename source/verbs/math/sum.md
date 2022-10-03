# sum (temporary not work: use +/)

Returns the sum of a numeric list.

**Syntax:** ```sum x; sum[x]```

```o
o)sum 10 20 30
60
o)sum til 10
45
```

Returns an error for lists that are not numeric:

```o
o)sum "word"
** exec error: `sum` args: ["word"]
```

`sum` is an aggregate function, equivalent to `+/`.


::: see
[Dyadic +](/verbs/math/plus.md)
:::
