# Dyadic _ (cut, drop)


## Cut

Cuts a list or a vector into parts. Only positive indices supported.

**Syntax:** ```x _ y; _[x;y]```

```o
o)2 4 6 _ til 10
2 3
4 5
6 7 8 9
o)
```


## Drop

Returns subset of items from a list, vector, dict and table starting with the item under index `x` (starting from the end if `x` is a negative number)

**Syntax:** ```x _ y; _[x;y]```

```o
o)1 _ 1 2 3
2 3
o)2 _ 1 2 3
,3
o)-1 _ 1 2 3
1 2
o)d:`a`a`b!1 1 2
a| 1
a| 1
b| 2
o)-1 _ d
a| 1
a| 1
o)t:([]a:1 2 3 3;b:1.1 2.2 1.5 1.5)
a b
-----
1 1.1
2 2.2
3 1.5
3 1.5
o)2 _ t
a b
-----
3 1.5
3 1.5
o)
```

You can use the key for dicts and tables in drop.

```o
o)d: `a`b`c!(1 2;3 4;5 6)
a| 1 2
b| 3 4
c| 5 6
o)`b _ d
a| 1 2
c| 5 6
o)t: +d
a b c
-----
1 3 5
2 4 6
o)`b _ t
a c
---
1 5
2 6
o)
```

::: crit
Be careful. Drop with a key may not work for a dictionary with numeric keys.<p>
And for string keys, the drop will not work at all. Instead of strings, it is better to use symbols.
:::


```o
o)d: (!5)!(`a`b;1 3;"qwerty";3 5i;`c`d)
0| `a`b
1| 1 3
2| "qwerty"
3| 3 5i
4| `c`d
o)2 _ d
2| "qwerty"
3| 3 5i
4| `c`d
```

::: warn
Drop for big data works slowly! Do not use drop with big data!
:::


