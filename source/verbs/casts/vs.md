# Dyadic vs (vector from scalar)

Separate a scalar into a vector of elements.

**Syntax:** ``x vs y; vs[x;y]``

where `x` is a separator, `y` is a vector to be separated.

_Examples with string:_

```o
o)"," vs "a,b,c,d"
"a"
"b"
"c"
"d"
o)"" vs "a,b,c,d"
""
"a"
","
"b"
","
"c"
","
"d"
""
```

::: warn
If `y` is a string, then string `x` used as [regular expression](/regex.md)
:::

Let's see few examples about it:

```o
o)"." vs "2022.02.22"
""
""
""
""
""
""
""
""
""
""
""
o)"\\." vs "2022.02.22"
"2022"
"02"
"22"
o){"I"$x} each "[.]" vs "2022.02.22"
2022 2 22i
o)`year`mm`dd$"D"$"2022.02.22"
2022 2 22i
o)
```

_Bits vector from numeric scalar:_

```o
o)0b vs 2
0000000000000000000000000000000000000000000000000000000000000010b
o)0b vs 2i
00000000000000000000000000000010b
o)0b vs 2x
00000010b
o)0b vs 5f
0100000000010100000000000000000000000000000000000000000000000000b
```

_Bits vector from temporal scalar:_

```o
o)tm:2020.08.28D16:23:24.640379955;
o)0b vs tm
0000100100001100001011100101100010110111111110000100010000110011b
o)`date$tm
2020.08.28
o)0b vs `date$tm
00000000000000000001110101111001b
o)`time$tm
16:23:24.640
o)0b vs `time$tm
00000011100001000101011011100000b
```

_Bytes vector from scalar:_

```o
o)g: "G"$"f3eb1bab-5f59-4fc2-be35-da66c409cda4";
o)0x vs g
0xf3eb1bab5f594fc2be35da66c409cda4
o)0x vs `year$2022.02.22D22:20:22.02
0x000007e6
o)0x vs 10
0x000000000000000a
o)0x vs 10.125
0x4024400000000000
```

::: see
[sv (scalar from vector)](/verbs/casts/sv.md)
[$ (cast)](/verbs/casts/cast.md)
[$ (repr)](/verbs/casts/repr.md)
:::
