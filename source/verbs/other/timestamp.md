# Monadic ts

Returns current timestamp.

**Syntax:** ```ts[`utc]```; ```ts[]; ts[`local]```; ```ts[`instant]```

```ts[`utc]``` returns the current timestamp of the UTC time zone.

With the ``` `local``` or without argument - the timestamp for the current time zone.

With the ``` `instant``` argument, the result is the number of microseconds since the platform started.


```o
o)ts[`utc]
2020.02.12D09:33:44.365124088
o)ts[`local]
2020.02.12D11:33:47.428896927
o)ts[]
2020.02.12D11:33:50.868108644
o)
```

::: see
[Temporal Types](/reference/types/scalars/time.md)
:::
