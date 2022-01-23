# Types, casting, etc

## Types and related verbs

Each expression in O has its type. Type in O defines value domain/set of supported values and is heavily to define the polymorphic behaviour of verbs. Internally it's coded using special undocumented integer value:

```o
o)@1
320
o)
```

Monadic verb `@` returns the numeric representation of internal type id. Interpreter uses its exact value internally.

::: warn
Avoid relying on internal type ids' exact values in your programs. They may change in any later version.
:::

The only valid operation on numeric type representation is checking for equality.

```o
o)(@2)=@1
1b
o)
```

Now, what's a better practice of type referencing if not using internal ids? That's what `!` monadic verb is for.

```o
o)!`s`int
256
o)!`s`long
320
o)
```

That way you are referencing type id of scalar int. A single argument for `!` is called _type spec_. First symbol in type spec defines structure (scalar, vector, etc), second symbol defines scalar type name. For other scalar type names, see [Scalars](/reference/types/scalars/scalars.md)

Encoding structure in type spec is as follows:

| Structure | Typespec | Example |
| --- | --- | --- |
| Scalar | \`s | \`s\`bool |
| Vector | \`v | \`v\`int |

Another useful monadic verb for getting type spec is [type](/verbs/type/type.md). It returns type spec for a given value:

```o
o)type 10#0
`v`long
o)type 0
`s`long
o)
```

::: note
The **!** verb has one nice property - it might be evaluated at parse time if its argument is constant.
:::

This example just assigns constant integer value at runtime:

```o
o)a:!`v`int
45312
o)
```

## Casting

Type casting in O is done using [$ dyadic](/verbs/casts/cast.md). Its left argument defines "destination" type, right argument is the "source".

Giving a single symbol as type spec means - _leave right argument structure intact and just change its element type_.

```o
o)`int$10 20 30
10 20 30i
o)`symbol$10 20 30
`10`20`30
o)`float$10 20 30
10 20 30f
o)
```

For element type names, see [Scalars](/reference/types/scalars/scalars.md).

A better practice to define full type is using the `!` verb:

```o
o)(!`s`int)$10
10i
o)(!`v`int)$10 20 30
10 20 30i
o)(!`s`float)$0
0f
o)
```

Here is an idiomatic way to ensure that two vectors have the same type:

```o
o)a:1 2 3; b:10 20 30i; (@b)$a
1 2 3i
o)
```

And yes, an internal type id can be given as left argument but it's better to use it only in REPL.

```o
o)a:1 2 3; b:10 20 30i; (@b)$a
1 2 3i
o)
```

Beware of collapsing lists in cases like:

```o
o)`int$(1;2.0;3)
1 2 3i
o)
```

### Casting and over/underflows

When casting, you can encounter values that are too large or too small to be held by type. Infinities are used to signal that:

```o
o)`int$1000000000000 -1000000000000
0W -0Wi
o)
```

Nulls/NaN are retained between types.

```o
o)`int$1.0 0n 0w
1 0N 0Wi
o)
```
