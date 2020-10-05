### Tetradic @ (amend)

Applies dyadic verb (third argument) to first argument indexed by second one.

```o
o)a:1 2 3; @[a;2;+;1]
1 2 4
```

For destructive updates use variable symbol:

```o
o)a:1 2 3; @[`a;2;+;1]
`a
o)a
1 2 4
```
