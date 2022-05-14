# defn

Dynamically defines a function.

**Syntax:** ```defn[x;y]```

where `x` is a symbol vector with argument names, and `y` is a list of expressions.

```o
o)f:defn[`a`b;,(+;`a;`b)]
{[`a`b]((+;a;b))}
o)f[1;2]
3
o)
```
