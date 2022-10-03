# Symbols

Symbols are entities similar to those of Lisp. They mostly serv the same purpose - referencing variable names and representing keys in dictionaries.

They are defined by backticks followed by an optional name. Names can contain UTF8 letters, digits and dоts:

```o
o)`a
`a
o)`abc
`abc
o)
```

Symbol vectors:

```o
o)`a`b`c
`a`b`c
o)
```

A dictionary with a symbol vector as a set of keys:

```o
o)`x`y`z!(1 2 3)
x| 1
y| 2
z| 3
o)
```

A symbolic file handle used to refer to a file:

```o
o)`:folder/file.txt
`:folder/file.txt
o)
```
