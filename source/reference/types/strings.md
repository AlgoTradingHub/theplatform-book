# Strings

String is a special type in O. Technically it is an immutable vector of bytes.
Strings are always stored in UTF-8 format. Thus, each symbol occupies a variable number of bytes.

Being a variable coding limits supported functions for strings to:
* getting length of a string in bytes;
* concatenation;
* packing to/unpacking from a byte vector and UTF-8 scalar vector;
* serving as scalar in special cases.

## Length of string

Getting string length in bytes in done wath a standard ```#``` monad:

```o
o)#"111абв"
9
o)
```

## Concatenation

Since concatenation is easy in UTF-8 format, it is supported using a common ```,``` dyad and works as expected:

```o
o)"111абв","222"
"111абв222"
o)
```

## Packing/unpacking

If you are absolutely sure that a string contains only ASCII characters, you can cast string into vector of bytes and back again.

```o
o)"x"$"111"
0x313131
o) "c"$0x313131
"111"
o)
```

Another way to do generic UTF-8 string unpacking/packing is doing it into/from UTF-8 scalar values. It results in a vector of 32-bit integers. Its usefulness is questionable though.

```o
o)`v`int$"абв"
1072 1073 1074i
o)`v`char$1072 1073 1074i
"абв"
o)
```

## Strings as table initializers

Due to frequent usage of strings in tables some shortcuts have been made to ease it.

E.g., when inserting strings into tables, they behave as if they were scalars:

```o
o)t:+`a`b`c!(,1;,2;,"123");
o).[`t; (); ,; (10;20;"456")];
o)t
a  b  c
-----------
1  2  "123"
10 20 "456"
o)
```

## Search by strings

Another shortcut to avoid too much casting is string search inside a list of strings:

```o
o)("123";"456";"789")?"456"
1
o)
```

::: see
[like](/verbs/string/like.md)
[string search](/verbs/string/ss.md)
[string search and replace](/verbs/string/ssr.md)
[parse](/verbs/string/parse.md)
[print](/verbs/file/print.md)
[println](/verbs/file/println.md)
[format](/verbs/string/format.md)
:::
