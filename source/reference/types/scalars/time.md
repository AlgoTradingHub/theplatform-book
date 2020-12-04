# Temporal types

There are eight temporal times in O:

| Type | Type letter | Typespec | Example |
| --- | --- | --- | --- |
| Timestamp | "p" | \`timestamp | 2020.12.03D11:49:00.505770835 |
| Timespan | "n" | \`timespan | 7614D12:30:21.12345679 |
| Datetime | "z" | \`datetime | 2020.12.03T11:49:00.505 |
| Date | "d" | \`date | 2020.12.03 |
| Month | "m" | \`month | 2021.01m |
| Time | "t" | \`time | 11:49:00.505 |
| Minute | "u" | \`minute | 11:49 or -11:49 |
| Second | "v" | \`second | 11:49:00 |


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
o)n: "n"$p; type n-n
`s`long
o)z: "z"$p; type z-z
`s`long
```
```o
o)d: "d"$p; type d-d
`s`int
o)m: "m"$p; type m-m
`s`int
o)t: "t"$p; type t-t
`s`int
o)u: "u"$p; type u-u
`s`int
o)v: "v"$p; type v-v
`s`int
```

::: see
[Scalar types](/reference/types/scalars/scalars.md)
[timestamp](/verbs/other/timestamp.md)
:::
