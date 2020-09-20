# Types, casting, etc

## Types and related verbs

Each expression in O has its type.
Type in O defines value domain/set of supported values and heavily used in verbs for defining their polymorphic behaviour.
Internally it's coded using special undocumented integer value.
Following examples show some examples dealing with type handling.

```o
o) @1
160
```

**@** monadic verb returns numeric representation of internal type id. It's exact value interpreter uses internally.

_Warning!!! Avoid relying on its exact value in your programs. It may change in any later version._

The only valid operation on numeric type representation is checking for equality.

```o
o) (@2)=@1
1b
```

Now what's the recommended way of referencing types if not using internal ids?
That's what **!** monadic verb is for.

```o
o) !`s`int
128
```

That way you are referencing type id of scalar int. A single argument for **!** is called _type spec_.
First symbol in type spec defines structure (scalar,vector,etc), second symbol - scalar type name.
For scalar type name, see [Scalars](./scalars.md)

Encoding structure in type spec is done according to following table:

| Structure | Typespec | Example |
| --- | --- | --- |
| Scalar | \`s | \`s\`bool |
| Vector | \`v | \`v\`int |

Another useful monadic verb for getting typespec is **type**
It returns typespec for given value. See yourself:

```o
o) type 10#0
`v`long
```

## Good to know

**!** verb has one nice property - it might be evaluated at parse time if its argument is constant.

That's following example just assigns constant integer value at runtime.

```o
o) a:!`v`int
```

## Casting

Type casting in O is done using **$** dyadic. Its left argument defines "destination" type, right argument is the "source".

Giving just single symbol as typespec means - _leave right argument structure intact and just change its element type_.

```o
o) `int$10 20 30
10 20 30i
```

For element type names, see [Scalars](./scalars.md)

Recommended way of defining full type is using **!** verb. Like following:

```o
o) (!`s`int)$10
10i
```

Idiomatic way of ensuring two vectors have the same type is by using following:

```o
o) a:1 2 3; b:10 20 30i; (@b)$a
1 2 3i
```

And yes, internal numeric type can be given as left argument, though it's better to use it only in REPL.

```o
o) a:1 2 3; b:10 20 30i; 64$a
1 2 3i
```

Beware of collapsing lists in cases like:

```o
o) `int$(1;2.0;3)
1 2 3i
```

### Casting and over/underflows

When doing casting it's easy to get situations when value is too large or too small to be held by type.
Infinity values are used to signal that.

```o
o) `int$1000000000000 -1000000000000
0Wi -0Wi
```

Nulls/NaN are retained between types.

```o
o) `int$1.0 0n 0w
` 0N 0Wi
```
