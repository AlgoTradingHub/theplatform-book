# setenv

Set environment variables

**Syntax:** ```x setenv y; setenv[x;y]```

```o
o)setenv[`A;"AA"]
o)setenv[`B`C;("BB";"CC")]
o)getenv[`A`B`C]
"AA"
"BB"
"CC"
o)
```

::: see
[getenv](/verbs/system/getenv.md)
[set](/verbs/file/set.md)
[get](/verbs/file/get.md)
:::
