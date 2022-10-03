# Monadic .o.upper

Returns uppercased string or synbol.

**Syntax:** ```.o.upper x; .o.upper[x]```


```o
o).o.upper "a"
"A"
o).o.upper["Qwerty"]
"QWERTY"
o).o.upper `test
`TEST
```

If some chars requires special considerations (e.g. multiple chars) they given by 
[SpecialCasing.txt](https://www.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt)


```o
o).o.upper "ß"
"SS"
o).o.upper "Русский военный корабль, иди нах*й!"
"РУССКИЙ ВОЕННЫЙ КОРАБЛЬ, ИДИ НАХ*Й!"
o)
```

This operation performs an unconditional mapping without tailoring. That is, the conversion is independent of context and language.

In the [Unicode Standard](https://www.unicode.org/versions/latest/), Chapter 4 (Character Properties) 
discusses case mapping in general and Chapter 3 (Conformance) discusses the default algorithm for case conversion.

::: see
[.o.lower](/verbs/string/lower.md)
:::
