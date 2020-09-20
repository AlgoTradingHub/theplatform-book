# [] Call, Indexing, Sequence, Arguments

## Call, Indexing

Calling or indexing x with arguments enclosed inside ```[]```

**Syntax:** ```x[y;z;..]```

```o
o)l:1 2 3;
o)l[2]
3
o){x+y}[1;2]
3
o)
```

## Sequence

Creates a sequence of expressions, evaluates each one and returns result of the last expression, or error if it occurs during evaluation

**Syntax:** ```[x;y;..]```

```o
o)[a:1+2;b:a+7;b]
10
o)
```

## Arguments

Specifies arguments for a lambda

**Syntax:** ```{[x;y;..] .. }```

```o
o){[x;y;z] x+y+z}[1;2;3]
6
o)
```
