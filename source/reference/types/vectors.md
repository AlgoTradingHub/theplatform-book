# Vectors

Vectors are just sequences of same type vаlues. They consist of typed arrays with such benefits as constant-time indexing and SIMD instructions used for parallel computing.

The only exception is generic vectors or simply Lists. Each item of a list can contain any datatype in AST.

A vector can be created from a sequence of scalars separated by spaces:

```o
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

Vectors can form dictionaries and tables:

```o
o)`a`b`c!(1 2 3)
a| 1
b| 2
c| 3
o)([]a: 1 2 3; b: 1.1 2.2 3.3)
a b
-----
1 1.1
2 2.2
3 3.3
o)
```

## Enumerated vectors

Conceptually, an enumerated vector is a subset of a symbol vector.

Each enumerated vector has additional information - domain symbol. Domain symbol defines global (usually) variable name containing a vector of symbols that form a domain. Only symbols belonging to this domain can appear in enumerated vector.

This results in an important advantage - each enumerated vector item can be represented with a fixed-size integer. Technically, each enumerated vector is i32 vector. This results in quick indexing and is especially beneficial for mapped vectors.

An example below demonstrates "sym" domain with 3 symbols and creation of enumerated vector "a" with 4 items.

```o
o)sm:`a`b`c; a:`sm$`a`b`c`a; a
`sm$`a`b`c`a
o)
```

... if you try casting a symbol vector with symbols that are not present in domain, you will receive an error:

```o
o)sm:`a`b`c; `sm$`a`d
** runtime error: `cast: invalid vаlue.`:
true
o)
```

On the contrary, null symbol is considered to be a part of each domain:

```o
o)sm:`a`b`c; a:`sm$`a``c; a
`sm$`a``c
o)
```

Enumerated symbols require special treatment when saved to disk. An enumerated vector has no domain defined after "getting" it from file. Thus, you need to save domain vаlues to disk as well. Casting enumerated vector "b" with domain "sym" assigns domain to vector like this:

```o
o)a:`sm$`c`b`a;
o)f:`:/tmp/o_enum1.dat; f set a;
o)fsym:`:/tmp/o_sm_enum1.dat; fsym set sm;
o)b:get f; sm: get fsym;
o)b:`sm$b;
o)b
`sm$`c`b`a
o)
```
