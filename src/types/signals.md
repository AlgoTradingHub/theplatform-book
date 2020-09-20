# Signals / Error handling

Signalling in O means throwing an error. The idea is similar to raising exceptions in other languages.
That is signals are meant to break normal calculation flow and report an error.

Trapping a signal means running a function and expecting any error occurance. Conceptually it is similar to "catch" clause in other languages.

## Signals

Technically signalling is done using **'** monadic verb.
Its argument is any value describing error.

```o
o) a:10; { { '(`s;1); set[`a;0] }[] }[]
'`s
1
o) a
10
```

## Trap

Trapping is done using **@** and **.** triads.

**@** triad runs first argument monadic function with its second argument.
In case when function fails or signals, entire expression becomes equal to third argument.

```o
o) @[{x};1;`err2]
1
o) @[{'x};`err1;`err2]
`err2
```

Another possible usage is trapping with third argument being a function.
When signal occurs, it leads to third argument function execution with signal value as argument.

```o
o)@[{'x};`err1;{x}]
`err1
```

Runtime errors are also caught using traps. Trapping runtime errors results in a signal value with error text message as its value.

```o
o)@[{x+y};1;{x}]
"** exec error: +: invalid args [1;]
      |--> [REPL::1] @[{x+y};1;{x}]
                         ^"
```

**.** triad is pretty much the same expression except its second argument can be list/vector.
It is used as several arguments for trapped function. Thus it allows to use function with arity greater than 1.

```o
o).[+;(1;2);`err2]
3
o).[{'y};(1;`err1);{x}]
`err1
```
