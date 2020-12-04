# Temporal types

There are five temporal times in O:

| Type | Typespec | Example |
| --- | --- | --- |
| Timestamp | \`timestamp | 2020.12.03D11:49:00.505770835 |
| Datetime | \`datetime | 2020.12.03T11:49:00.505 |
| Date | \`date | 2020.12.03 |
| Time | \`time | 11:49:00.505 |
| Second | \`second | 11:49:00 |
| Minute | \`minute | 11:49 or -11:49 |



## Current timestamp

Getting current date and time is done using standard ```ts``` intrinsic.

```o
o)ts[]
2020.01.28D11:52:53.574067653
```

## Casting examples

```o
o)p: ts[]
2020.12.02D15:51:57.123456789
o)`timespan$p
7641D15:51:57.123456789
o)`datetime$p
2020.12.02T15:51:57.123
o)`date$p
2020.12.02
o)`month$p
2020.12m
o)`time$p
15:51:57.123
o)`minute$p
15:51
o)`second$p
15:51:57
```

## Helpful

```o
o)p: ts[]; type p-p
`s`long
o)n: `timespan$p; type n-n
`s`long
o)z: `datetime$p; type z-z
`s`long

o)d: `date$p; type d-d
`s`int
o)m: `month$p; type m-m
`s`int
o)t: `time$p; type t-t
`s`int
o)u: `minute$p; type u-u
`s`int
o)v: `second$p; type v-v
`s`int
```

::: see
[Scalar types](/reference/types/scalars/scalars.md)
[timestamp](/verbs/other/timestamp.md)
:::
