# print

Prints down a string representation of `x` without quotes. Format string contains `%` at each position to be replaced by formatted value.

**Syntax:** ```print[".. %";x..]```

```o
o)print["The final result is %\n";42]
The final result is 42
o)print["a is %, b is %\n";1;2 3 4 5]
a is 1, b is 2 3 4 5
o)
```

::: see
[println](/verbs/file/println.md)
[format](/verbs/string/format.md)
:::
