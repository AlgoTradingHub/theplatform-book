# {} Lambda

Defines user function

**Syntax:** ```{..}; {[x;y;..]..}```

Function declaration consists of two phases - defining lambda expression and binding it to some name. Lambdas include one or several expressions separated by semicolons.

## Lambda arguments

Lambda arguments are defined using **[ ]**:

```o
o).n.sum:{[arr] a:+/arr; a}
{[arr] a:+/arr; a}
o)ff:{[a;b] */a+!1+b-a}
{[a;b] */a+!1+b-a}
o)
```

::: note
Currently, maximum of 8 named arguments are allowed.
:::


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

::: note
Currently, maximum of 22 named local variables are allowed.
:::

```o
o)f:{local1:x; local2:y; local1+local2}
{local1:x; local2:y; local1+local2}
o)f[10;20]
30
o)
```

```o
o).n.sum:{a:+/x; a}
{a:+/x; a}
o).n.sum [!10]
45
o)
```

::: warn
Be careful with the implicit use of arguments and local variables `y` and `z`. In this case the lambda expects more than 1 argument.
:::

```o
o)fxz: {z:2; x*z};
o)fxz[3]  //projection
{{z:2; x*z}[3;;]}
o)fxz: {[x] z:2; x*z};
o)fxz[3]
6
o)
```

::: note
When using nested lambda, the scope of the local variable is limited to the lambda of the first nesting. 
If you need to extend the scope to all nested lambdas, use the [shadow](/verbs/other/shadow.md).
:::

```o
o)a:42;
o){a:2; show a; {show a; {show a}[ ] }[ ] }[ ];
2
2
42

```

Using `::` you can create/change variables in non-local lambdas scope.

```o
o)(a;b):42 24;
o){a:2; b::3; show a,b; {show a,b; {show a,b}[ ] }[ ] }[ ];
2 3
2 3
42 3
o)
```

::: note
`::` must also be used if you want to change the vаlue of a local variable using this local variable.
:::

```o
o)(a;b):42 24;
o){a:2; b::3; show a,b; {a::a*a; show a,b; {show a,b}[ ] }[ ] }[ ];
2 3
4 3
42 3
o)
```


## Projection

When lambda or verb expects 2 or more arguments but gets less - 
the result is a lambda projection on the arguments provided.

```o
o)add2: +[2;]
{+[2;]}
o)add2 10
12
o)f: {[a;b;c] a*a+b-c};
o)g: f[3;;4]
{{[a;b;c] a*a+b-c}[3;;4]}
o)g 5
10
o)
```

Sometimes the projections help to indicate the specific arrity of the verb.

```o
o)r: reagent[`async];
o)r [10]
o)// get r - monad
o)get r
10
o)//to get from chennel without lock use get[100;r] - dyad
o)//to catch error use trap
o)//the next trap uses the default monadic get, and we have an "invalid type" error
o).[get;(100;r);{x`message}]
"invalid type: [`s`long]"
o)//the next trap uses the projection of dyadic get, and we catch an correct "timeout" error
o).[get[;];(100;r);{x`message}]
"timeout elapsed"
o)
```

## Function/lambda application

Insert arguments in **[ ]** after the function name or omit brackets if there is only one argument.

```o
o).n.sum:{a:+/x; a}
{a:+/x; a}
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

::: see
[return](/verbs/concurrency/return.md)
[shadow](/verbs/other/shadow.md)
:::
