# Strings

String is a special type in O. Technically it is an immutable vector of bytes. 
Strings are always stored in utf8 format. Thus each symbol occupies variable number of bytes.

Being a variable coding limits supported functions for strings to:
* getting length of string in bytes
* concatenation
* packing/unpacking to/from byte vector and utf8 scalar vector
* serving as scalar in special cases

## Length of string

Getting of string in bytes in done using standard ```#``` monad.

```o
o) #"111абв"
9
```

## Concatenation

Since concatenation is easy in utf8 format, it is supported using common ```,``` dyad and works as expected.

```o
o)"111абв","222"
"111абв222"
```

## Packing/unpacking

In case if you are absolutely sure that a string contains only ASCII characters, you can cast string into vector of bytes and back again.

```o
o) "x"$"111"
0x313131
o) "c"$0x313131
"111"
```

There is one more way of generic utf8 string unpacking/packing. It is unpacking/packing into/from utf8 scalar values. It gives a vector of 32-bit integers as a result. Its usefulness is questionable though. 

```o
o)`v`int$"абв"
1072 1073 1074i
o)`v`char$1072 1073 1074i
"абв"
```

## Strings as table initializers

Due to frequent usage of strings in tables some shortcuts have been made to ease it.

e.g. when inserting strings into tables, they behave as if they were scalars.

```o
o) t:+`a`b`c!(,1;,2;,"123")
o) .[`t; (); ,; (2#10;2#20;"456")];
o)t
a  b  c
-----------
1  2  "123"
10 20 "456"
10 20 "456"

```

## Search by strings

Another shortcut to avoid too much casting is string search inside list of strings:

```o
o)("123";"456";"789")?"456"
1

```
