# Monadic .o.typedesc

Returns type spec by internal type id.

**Syntax:** ```.o.typedesc x; .o.typedesc[x]```

```o
o).o.typedesc 320
`s`long
o).o.typedesc[45312]
`v`int
o).o.typedesc[126992]
``dict
o).o.typedesc[@()]
`v`l
o)
```

::: see
[! for type](/verbs/type/excl.md)
:::

