# Dyadic minus

Subtracts scalar/vector elements. Fully atomic.

**Syntax:** ``x-y; -[x;y]``

```o
o)2-1
1
o)(til 5)-10
-10 -9 -8 -7 -6
o)1 2 3 - 0 5 7
1 -3 -4
o)
```

::: warn
o)5 - 2
3
o)5 -2
5 -2
o)- 2 3
-2 -3
o)-2 3
-2 3
:::

Where numeric value is substracted from a dictionary or a table, the verb substracts the numeric value from numeric values in the dict/table:

```o
o)`a`b`c!100 200 300 - 10
a| 90
b| 190
c| 290
o)([sym:`a`b`c]x:1.5 2.2 0.3; y:2021 13.0 2.5)-10.34
x      y
--------------
-8.84  2010.66
-8.14  2.66
-10.04 -7.84
o)
```


::: see
[+ (plus)](/verbs/math/plus.md)
[sum](/verbs/math/sum.md)
:::
