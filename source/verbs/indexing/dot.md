# Dyadic . (dot-apply)

Indexes left argument (vector/list/dict) in depth by right argument.

**Syntax:** ```x.y; .[x;y]```

```o
o)(1 2;3 4).(0 1)
2
o)a:((1 2 3;4 5);(6 7 8 9; 10)).(1 0 2)
8
o)(1.1 1.2;1.3 1.3 1.3).(0 2)
0n
o)

::: see
[@(at)](/verbs/indexing/at.md)
:::
