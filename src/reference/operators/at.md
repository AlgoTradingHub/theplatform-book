# @ TypeId, At, Amend, Trap

## TypeId

Returns internal type id of its value

**Syntax:** ```@x; @[x]```

```o
o)@1
320
o)@1 2 3
45376
o)
```

## At

Applies it's right argument to the left one. Depending of left argument's type it does: indexing or calling.

**Syntax:** ```x@y; x y; @[x;y]```

```o
o)1 2 3@2
3
o)1@2
1 2
o)1 2
1 2
o)`a`s`d 2
`d
o)@[-:;1]
-1
o)@[,:;1]
,1
o)
```

## Amend

Destructively mutates it's first argument

**Syntax:** ```@[x;y;v]; @[`x;y;v]; @[x;y;v;z]; @[`x;y;v;z]```

Where: x: value to be mutated (vector, list, dict or table), y: indexes, v: function to be applied, z: values to be applied.
If x is symbol, mutation will be done inplace, otherwise makes a copy

```o
o)l:(1 2;3;4)
1 2
3
4
o)@[l;1;-:]
1 2
-3
4
o)l
1 2
3
4
o)@[l;0;,;8]
1 2 8
3
4
o)l
1 2
3
4
o)@[`l;0;,;8]
`l
o)l
1 2 8
3
4
o)
```

## Trap

Catches an signal

**Syntax:*** ```@[f;x;c]```

Where f: function to be called, x: it's argument, c: callback to be called upon exception

```o
o)@[{x+1};"2";{`error}]
`error
o)
```
