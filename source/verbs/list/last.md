# Monadic last

Returns the last element from `x` if `x` is list, else returns `x`.

**Syntax:** ```last x; last[x]; _x```

```o
o)last 1 2 3 4
4
o)last 1
1
o)_ 1 2 3 4
4
o)_ 1
1
o)last ("asd";1 2 3 4)
1 2 3 4
o)last each (1; 2 3 4; `five `six)
1
4
`six
o)
```

::: crit
Do not use _ at the beginning of names. You get last after binding.
:::

```o
o)_t:1 2 3
3
o)
```


::: see
[first](/verbs/list/first.md)
:::
