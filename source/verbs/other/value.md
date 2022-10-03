# Monadic . (dot-value)

Returns value of `x`.

**Syntax:** ```value x; value[x]; . x; .[x]```

```o
o)value 1
1
o)value 1 2 3
1 2 3
```
```o
o)value `
,`| ,`o`repl!(`cut`upper`lower`compress`decompress`typedesc!(.o.cut;.o.upper;.o.lower;.o.compress;.o.decompress;.o.typed..
o)value `.
o   | `cut`upper`lower`compress`decompress`typedesc!(.o.cut;.o.upper;.o.lower;.o.compress;.o.decompress;.o.typedesc)
repl| `opt`version`prompt`ps1`out`xbt`ltrim`rtrim`trim`sig`peval`psend`enum2sym`fmt`rapi`inc`connect`takeAtMax`klen`keys..
o)
```
```o
o)d:`a`s`d!(1 2;3 4;5 6)
a| 1 2
s| 3 4
d| 5 6
o)value d
1 2
3 4
5 6
o)t:+d;
o)value t
1 2
3 4
5 6
o)f:{x+1}
{x+1}
o)value f
,(+;#0;1)
o)
```

::: note
For lists, `value` works like `eval`, but `eval` "executes" lists recursively, and `value` "executes" only the first level.
"Executed" means that the first item in the list is treated as a verb, and this verb is applied to the remaining items in the list.
:::

```o
o)l:(,;(!;4);(!;5))
,
(!;4)
(!;5)
o)eval l
{![4;]}
{![5;]}
o)// ! interpreted as a dyadic. So we got projections, not vectors.
o)value l
!
4
!
5
o). l
!
4
!
5
o)// : after ! indicates that monadic is used
o)l:(,;(!:;4);(!:;5))
,
((!:);4)
((!:);5)
o)eval l
0 1 2 3 0 1 2 3 4
o)value l
(!:)
4
(!:)
5
o)
```

::: see
[eval](/verbs/concurrency/eval.md)
[. (apply)](/verbs/indexing/dot.md)
[triadic dmend](/verbs/amendsdmends/trdmend.md)
[tetradic dmend](/verbs/amendsdmends/tetrdmend.md)
:::
