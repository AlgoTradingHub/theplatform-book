# {} Lambda

Defines user function

**Syntax:** ```{..}; {[x;y;..]..}```

Function declaration consists of two phases - defining lambda expression and binding it to some name. Lambdas include one or several expressions separated by semicolons.

## Lambda arguments

Lambda arguments are defined using **[]**:

```o
o).n.sum:{[arr] a:+/arr; a}
{[arr] a:+/arr; a}
o)
```

Currently, maximum of 8 named arguments are allowed.

Lambda arguments can be defined implicitly via using pre-defined names `x`, `y` and `z`.

```o
o)f:{x+y+z}; f[1;2;3]
6
o)f:{x%y}; f[10;5]
2
o)
```

## Locals

Local variables are defined implicitly via assignment to bindings inside lambdas that are not defined yet.

```o
o)f:{local1:x; local2:y; local1+local2}
{local1:x;local2:y;local1+local2}
o)f[10;20]
30
o)
```

```o
o).n.sum:{a:+/x; a}
{+/x}
o).n.sum [!10]
45
o)
```

Currently, maximum of 22 named local variables are allowed.

## Function/lambda application

Insert arguments in **[]** after the function name or omit brackets if there is only one argument.

```o
o).n.sum:{a:+/x; a}
{a:+/x;a}
o)arr:!3
0 1 2
o).n.sum arr
3
o).n.sum[arr]
3
```

You can also apply arguments to lambdas without binding the latter to a name:

```o
o){x*2}1
2
```

## Recursive lambdas

`o` binding is special in lambdas body. It defines reference to enclosing lambda itself.
Thus, it allows creating recursive lambdas:

```o
o)fibo:{[x] $[x&lt2;x;o[x-1]+o[x-2]]}; fibo[6]
8
```

... fibonacci with memoization:

```o
o)d:0 1!0 1; fib: {$[d[x]=0N;d[x]:o[x-2]+o[x-1];()]; d[x]};
o)fib[6]
8
o)
```

However, pay attention to clashes with locals/arguments:

```o
o){[o] o:1; o}[1]
1
o){[o] .[`o;();+;1]; o}[1]
2
o){[o] o+:1; o}[1]
2
```

## Closures

Closures are another kind of functions - they capture parent local variables. They can be used everywhere instead of simple functions:

```o
o)parent: { upval: x; {upval + x} }; closure: parent[2]; closure[3]
5
```

The fibonacci example given above can be rewritten to avoid creating global state like:

```o
o)fibo: { d:0 1!0 1; { $[d[x]=0N;d[x]:o[x-2]+o[x-1];()]; d[x] }}[];
o)fibo[6]
8
o)
```
