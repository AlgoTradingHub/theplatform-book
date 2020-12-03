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

## Current time

Try getting current timestamp and casting it to time type. Only corresponsing part is left:

```o
o)`time$ts[]
11:53:04.142
```

The same applies to date, minute, second and datetime:

```o
o)`date$ts[]
2020.01.28
o)`minute$ts[]
11:52
o)`second$ts[]
11:52:53
o)`datetime$ts[]
2020.01.28T11:52:53.574
o)
```

## Underlying values

All data types have numeric values under the cover.

to be added
