# .o.lower

Returns lowercased string or synbol.

**Syntax:** ```.o.lower x; .o.lower[x]```


```o
o).o.lower "A"
"a"
o).o.lower["Qwerty"]
"qwerty"
o).o.lower `TEST
`test
```

If some chars requires special considerations (e.g. multiple chars) they given by 
[SpecialCasing.txt](https://www.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt)


```o
o).o.lower "SS"
"ss"
o).o.lower "É"
"é"
o)
```

This operation performs an unconditional mapping without tailoring. That is, the conversion is independent of context and language.

In the [Unicode Standard](https://www.unicode.org/versions/latest/), Chapter 4 (Character Properties) 
discusses case mapping in general and Chapter 3 (Conformance) discusses the default algorithm for case conversion.

::: see
[.o.upper](/verbs/string/upper.md)
:::
