# {} Lambda

Defines user function

**Syntax:** ```{..}; {[x;y;..]..}```

Function declaration consists on two phases - defining lambda expression and binding it to some name.
Lambda expression consist of one or several expressions separated by semicolons.

## Lambda arguments

Lambda arguments are defined using **[]** like:

```o
o).n.sum:{[arr] a:+/arr; a}
```

Maximum 8 named arguments is allowed at present.

Lambda arguments can be defined implicitly via using pre-defined \`x, \`y and \`z names.

```o
o) f:{x+y+z}; f[1;2;3]
6
```

## Locals

Local variables are defined implicitly via assignment to not-yet-defined bindings inside lambdas.

```o
o) f:{ local1:x; local2:y; local1+local2 }
{local1:x;local2:y;local1+local2}
```

```o
o).n.sum:{a:+/x; a}
{+/x}
```

Maximum 22 named local variables is allowed at present.

## Function/lambda application

Function application is done using **[]** or in case of a single argument by simply providing the argument.

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

Applying arguments to lambdas without binding it to a name is also supported:

```o
o){x*2}1
2
```

## Recursive lambdas

`o` binding is special in lambdas body. It defines reference to enclosing lambda itself.
Thus it allows to create recursive lambdas:

```o
o) fibo:{[x] $[x&lt2;x;o[x-1]+o[x-2]]}; fibo[6]
8
```

... fibonacci with memoization:

```o
o)d:0 1!0 1; fib: {$[d[x]=0N;d[x]:o[x-2]+o[x-1];]; d[x]};
o)fibo[6]
8
```

However, pay attention to clashes with locals/arguments:

```o
o) {[o] o:1; o}[1]
1
o) {[o] .[`o;();+;1]; o}[1]
2
o) {[o] o+:1; o}[1]
2
```

## Closures

Closures are another kind of functions, capturing parent local variables. They can be used everywhere instead of simple functions.
See example below:

```o
o) parent: { upval: x; {upval + x} }; closure: parent[2]; closure[3]
5
```

The fibonacci example given above can be rewritten to avoid creating global state like:

```o
o) fibo: { d:0 1!0 1; { $[d[x]=0N;d[x]:o[x-2]+o[x-1];]; d[x] }}[];
o) fibo[6]
8
```
