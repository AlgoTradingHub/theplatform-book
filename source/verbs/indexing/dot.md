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
```

If the left argument is a verb or a lambda, then it is applied to the right argument.

```o
o){x+y} . 1 2
3
o)format . ("test % %";1;2)
"test 1 2"
o)
```

Works like a value for a list with a verb or lambda at the beginning.

```o
o). ({x+y};1;2)
3
o). (format;"test % %";1;2)
"test 1 2"
o)value (format;"test % %";1;2)
"test 1 2"
o)
```


::: see
[. (value)][/verbs/other/value.md)
[@ (indexing)](/verbs/indexing/at.md)
[triadic dmend](/verbs/amendsdmends/trdmend.md)
[tetradic dmend](/verbs/amendsdmends/tetrdmend.md)
:::
