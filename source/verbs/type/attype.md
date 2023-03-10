# Monadic @ (type)

Returns internal type id of an argument.

**Syntax:** ```@x; @[x]```

::: crit
Avoid relying on these ids in production!
:::

```o
o)@1
320
o)@"s"
46400
o)@([]a:1;b:"a")
126988
o)d:`a`c!(1;2)
a| 1
c| 2
o)@d
126992
o)@flip d
126988
o)
```

::: see
[@ (indexing)](/verbs/indexing/at.md)
[@ (triadic amend)](/verbs/amendsdmends/tramend.md)
[@ (tetradic amend)](/verbs/amendsdmends/tetramend.md)
:::
