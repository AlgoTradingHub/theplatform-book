# Vectors

Vectors are just sequence of same types. They are consists of typed arrays, with such benefits: constant-time indexing,
SIMD instructions using for parallel computing.

The only exception is generic vectors, or just Lists. Each item of such list can contain any datatype in AST.

Vector can be created from sequence of scalars separated by space:

```o
The O language interpreter 0.1.0
o)1 2 3
1 2 3
o)`a`s`d
`a`s`d
o)1000101b
1000101b
o)(1;2 3;"foo";`bar)
1
2 3
"foo"
`bar
o)
```

## Enumerated vectors

Conceptually, they are subset of symbol vectors.

Each enumerated vector has additional information - domain symbol. Domain symbol defines global (usually) variable name containing vector of symbols forming a domain. Only symbols belonging to this domain can appear in enumerated vector.

This results in an important advantage - each enumerated vector item can be represented with a fixed-size integer. Technically each enumerated vector is i32 vector. This leads to quick indexing and is especially beneficial for mmapped vectors.

Example below demonstrates "sym" domain having 3 symbols and creation of enumerated vector "a" having 4 items.

```o
o)sym:`a`b`c; a:`sym$`a`b`c`a; a
`sym$`a`b`c`a
```

... trying to cast symbol vector having extra symbols not found in domain results in an error:

```o
o)sym:`a`b`c; `sym$`a`d
** exec error: cast: invalid value.
      |--> [REPL::1] sym:`a`b`c; `sym$`a`d
```

On the contrary, null symbol considered to be a part of each domain

```o
o)sym:`a`b`c; a:`sym$`a``c; a
`sym$`a``c
```

Enumerated symbols require special treatment when saved to disk. Enumerated vector has no domain defined after "getting" it from file. Thus saving it to disk needs domain values saved as well. Casting enumerated vector "b" with domain "sym" assigns domain to vector as seen below.

```o
sym:`a`b`c;
a:`sym$`c`b`a;
f:`:/tmp/o_enum1.dat; f set a;
fsym:`:/tmp/o_sym_enum1.dat; fsym set sym; \
b:get f; sym: get fsym; \
b:`sym$b;
o)b
`sym$`c`b`a
```
