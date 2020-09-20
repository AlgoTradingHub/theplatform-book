# filter

Returns elements from y where x expr is true

**Syntax:** ```x filter y; filter[x;y]```

```o
o)(0=x mod 2)filter x:1 5 6 8 11 17 20 21
6 8 20
o)filter[0=x mod 2;x:1 5 6 8 11 17 20 21]
6 8 20
o)
```
