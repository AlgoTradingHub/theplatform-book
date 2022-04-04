# panic

Raises panic exception

**Syntax:** ```panic x; panic [x]```

```o
o)panic 1
** runtime error: `(apply_dyad;put;#1;(apply_monad;eval;(apply_dyad;parse;"REPL";#0)))`:
Undefined panic
o)panic "panic"
** runtime error: `(apply_dyad;put;#1;(apply_monad;eval;(apply_dyad;parse;"REPL";#0)))`:
panic
o)@[{panic["test panic"]};();{key x}]
`kind`call`message`stack
o)@[{panic["test panic"]};();{x`kind`message}]
`runtime
"test panic"
o)
```
