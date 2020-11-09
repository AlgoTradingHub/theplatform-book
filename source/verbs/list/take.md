## Take

Takes first `x` elements of `y`.

**Syntax:** ```x#y; #[x;y]```

where `x` is an integer atom or vector, `y` is an atom, list, dictionary, or table:

```o
o)2#1 2 3 4 5
1 2
o)1#(`a`b!(1;2))
a| 1
o)3#([]a:1 2 3 4;b:1.1 2.2 3.3 4.4)
a b
-----
1 1.1
2 2.2
3 3.3
o)
```

If `x` is an integer vector, a matrix with `count x` dimensions is created:

```o
o)3 4#1
1 1 1 1
1 1 1 1
1 1 1 1
o)
```

If the size of y is less than `x`, the verb goes over `y` again:

```o
o)2#1
1 1
o)5#1 2
1 2 1 2 1
o)4#(`a`b!(1;2))
a| 1
b| 2
a| 1
b| 2
o)
```

For negative `x`, the verb takes elements from the reversed `y`:

```o
o)-3# til 10
7 8 9
o)-1#([]a:1 2 3 4;b:1.1 2.2 3.3 4.4)
a b
-----
4 4.4
o)
```

For 0 in the first argument, `take` returns an empty list:

```o
o)0#1 2 3
`long$()
o)0#`a`b`c
`symbol$()
o)0#(`a`b!(1;2))
`symbol$()| `long$()
o)
```

::: see
[# (count)](/verbs/math/count.md)
:::
