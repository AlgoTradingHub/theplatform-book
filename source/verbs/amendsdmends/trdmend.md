### Triad . (dmend)

Applies monadic verb (third argument) to first argument indexed in depth by second one.

```o
o)a:(1 2 3;4 5 6); .[a;0 1;{x+1}]
1 3 3
4 5 6
```

For destructive updates use variable symbol:

```o
o)a:(1 2 3;4 5 6); .[`a;0 1;{x+1}]
`a
o)a
1 3 3
4 5 6
```
