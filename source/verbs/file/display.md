# Monadic 0N!

Write to console and return.

**Syntax:** ```0N!x```

Returns x after printing its unformatted representation to the console.

```o
o)0N!"first\nsecond"
"first\nsecond"
"first\nsecond"
o)println "first\nsecond"
first
second
o)
```

With 0N! you can see the current vаlue of any part of the expression. It useful for debugging.
```o
o)*/0N!1+0N!!5
0 1 2 3 4
1 2 3 4 5
120
o)
```

::: note
Results of print, println, show and `0N!` can be redirected. `-1!` works like `0N!` but non-redirectable.
```o
r:reagent[`async];
oldout:@[{.o.out};0N;0N];
//redirect stdout to `async reagent
.o.out::r;
0N!"test 0N!";
-1!"test -1!";
//stop redirecting
.o.out::oldout;
println "";
println get r;

"test -1!"

"test 0N!"
```
You can redirect STDERR  with `.o.err`. `-2!` write to STDERR and return result without redirection.
:::


::: see
[println](/verbs/file/println.md)
[show](/verbs/file/show.md)
:::
