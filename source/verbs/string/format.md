# Poliadic format

Returns string representation of `x` with quotes. Format string contains `%` at each position to be replaced by formatted vаlue.

**Syntax:** ```format[".. %";x..]```

```o
o)format["The final result is %";42]
"The final result is 42"
o)format["a is %, b is %";1;2 3 4 5]
"a is 1, b is 2 3 4 5"
o)
```

::: see
[print](/verbs/file/print.md)
[println](/verbs/file/println.md)
:::
