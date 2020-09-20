# . Value, Dot, Dmend, Trap

## Value

Returns value of it's argument or eval if it's a list

**Syntax:** ```. x; .[x]```

```o
o). `a`s`d
`a`s`d
o). `a`s`d!(1 2;3 4;5 6)
1 2
3 4
5 6
o). 1
1
o).(+;1;2)
3
o)
```

## Dot

Applies second argument to a first argument, rolling up a list

**Syntax:** ```x . y; .[x;y]```

```o
o)(`a`s`d!(1 2 3;4 5 6;7 8 9)) . (`a;1)
2
o){x+y} . (1 2;3)
4 5
o)
```

## Dmend

Applies v to a indexed in depth by x. If v has two arguments - passes y as second one
**Syntax:** ```.[a;x;v]; .[a;x;v;y]```

```o
o)a:(1 2 3;4 5 6); .[a;0 1;{x+1}]
1 3 3
4 5 6
o)a:(1 2 3;4 5 6); .[a;0 1;{x+y};9]
1 11 3
4 5 6
o)a
1 2 3
4 5 6
o).[`a;0 1;{x+y};9]
`a
o)a
1 11 3
4 5 6
o)
```

## Trap

Catches an signal

**Syntax:** ```.[f;x;c]```

Where f: function to be called, x: it's argument list, c: callback to be called upon exception

```o
o).[{x+y};(1;"2");{`error}]
`error
o)
```
