# Intrinsics

Language provides several builtin verbs with "readable" names.
Due to builtin nature those verbs cannot be overriden / overwritten. Parser will emit an error in case you attempt to override verbs like that.

```o
o) sect: {x}
** parse error: attempt to override func intrinsic
```

## Variable shadowing

Variable shadowing is used to "shadow" global variable. Technically shadowing creates a new global variable binding which temporarily override existing binding
with the same name. However this binding is visible as global only in current function and down in its calling stack.

Thus shadowing is done in a stack-like manner.

```o
o) f: { s::10; }
{s::10; }
o) { shadow `s; s::0; f[]; s }[]
10
o) s
** exec error: undefined symbol: `s
```

Each nested function application call shadow the same names, dropping shadowing on function leave:
```o
o) f1: { s::10; };
o) f2: { shadow `s; f1[]; s };
o) { shadow `s; s::20; f2[]; s }[]
20
```

Shadowing variable, but not assigning any value to it leaves it bind to generic nil value:
```o
o) { shadow `s; s }[]
o)
```

It's worth noting that shadowing works only in functions. Trying to use ```shadow``` in global scope results in an error:
```o
o) shadow `s
** exec error: shadow: must be used in lambdas
```

## Quoting

```quote``` monad serves single purpose - to parse given expression, but avoid its evaluation.
That is it returns parsed expression as generic nest lists (aka AST).
```o
o) quote 1+2
+
1
2
```

In case when you want to evaluate nothing but some AST nodes special monads exist.
```unq``` - "unquote" evaluates its right argument and substitutes its value into its place (short form is ```::``` monad verb) and 
```unqs``` - "unquote_splicing" to evaluate right argument and get list or vector to insert all its values in-place.

When nesting ```unq```/```unqs``` only the innermost one gets evaluated.
See example below.

```o
o){ r1:1; r2:2; quote (::(::(::(r1;r2;"123213";10))))+s+d }[]
+
(::;(::;(1;2;"123213";10)))
(+;`s;`d)

o){ r1:1; r2:2; quote (::(::(unqs(r1;r2;"123213";10))))+s+d }[]
+
(::;(::;1;2;"123213";10))
(+;`s;`d)
```
