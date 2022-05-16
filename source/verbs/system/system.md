# system

Executes a shell command.

**Syntax:** ```system x; system[x]```

Returns a 3-element list: (code;stdout;stderr).

```o
o)system "uname -s"
0i
"Linux\n"
""
o)
```

::: see
[os](/verbs/system/os.md)
:::