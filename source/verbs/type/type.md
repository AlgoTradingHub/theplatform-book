# Monadic type

Returns type spec of its argument.

**Syntax:** ```type x; type[x]```

```o
o)type 1
`s`long
o)type 1.0
`s`float
o)type 1 2
`v`long
o)type "a"
`v`char
o)d:`a`b!(1;2)
a| 1
b| 2
o)type d
``dict
o)type flip d
``table
o)
```

See the full list of scalar types [here](/reference/types/scalars/scalars.md).
