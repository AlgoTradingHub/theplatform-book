# Guids

Provide support for Universally Unique Identifiers (UUIDs). A guid type is a unique 128-bit number stored as 16 octets. It is used to assign unique identifiers to entities without requiring a central allocating authority.

Guid can be created from a string:

```o
o)"G"$"61e35154-10bc-a49a-d11f-f10e1a377000"
61e35154-10bc-a49a-d11f-f10e1a377000
o)
```

... or generated from scratch:

```o
o)-2?0Ng
16bf5b77-9713-4061-92a3-750083b68307 5209d2c9-956a-4232-9a85-26afa5168d96
o)
```

Null guid:

```o
o)0Ng
0Ng
o)
```

::: note
There is no literal entry for a guid, it has no conversions and the only scalar primitives it supports are =, &lt and > (similar to sym).
:::

There are no other limitations on storing, serializing guids, etc. in contrast to other O types.

::: see
[strings](/reference/types/strings.md)
:::
