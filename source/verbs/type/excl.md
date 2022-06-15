# Monadic !

When applied to type spec returns corresponding internal type id.

**Syntax:** ```!x; ![x]```

```o
o)!`s`int
256
o)!`v`int
45312
o)!`v`long
45376
o)!``dict
126992
o)
```

See the full list of scalar types [here](/reference/types/scalars/scalars.md).

::: see
[.o.typedesc (inverse function)](/verbs/type/typedesc.md)
[! (til)](/verbs/math/til.md)
[! in dicts](/reference/types/dicts.md)
:::
