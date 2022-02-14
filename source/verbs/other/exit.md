# exit

Terminates current process with the specified exit code.

**Syntax:** ```exit x; exit[x]```

```os
OLOG=warn tachyon -c 4 -f repl
```

```o
o)exit 10
 WARN  base > Task <main>
-- exited with code: UserError
```

::: see
[kill](/verbs/concurrency/kill.md)
:::
