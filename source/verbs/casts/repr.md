# Dyadic $ (repr)

Interpret a string as a data value

**Syntax:** ```x$y; $[x;y]```

Where:
- y is a string
- x is a upper-case char as below

| Type name   | Repr string |
| --- | --- |
| bool      | B |
| guid      | G |
| byte      | X |
| short     | H |
| int       | I |
| long      | J |
| real      | E |
| float     | F |
| char      | C |
| symbol    | S |
| timestamp | P |
| month     | M |
| date      | D |
| datetime  | Z |
| timespan  | N |
| minute    | U |
| second    | V |
| time      | T |

```o
o)"F"$"123"
123f
o)"G"$"61e35154-10bc-a49a-d11f-f10e1a377000"
61e35154-10bc-a49a-d11f-f10e1a377000
o)
```

::: see
[cast](/reference/verbs/casts/cast.md)
:::