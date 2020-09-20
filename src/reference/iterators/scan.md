# \ Scan, For, While

## Scan

Does pretty much the same as "over", but returns same-sized structure.

**Syntax:** ```f \x```

```o
o)+\1 2 3
1 3 6
o)+\011b
0 1 2
```

Scan with initial value. "Scan" but with explicitly given initial value.

```o
o)10*\1 2 2
10 20 40
```

## For

Applies monadic verb to right argument left argument times.

**Syntax:** ```x f\y```

```o
o)5{x+1}\10
10 11 12 13 14 15
```

## While

Applies monadic verb to right argument while left argument returns true value.

**Syntax:** ```c f\x```

```o
o){x<100}{x*2}\1
1 2 4 8 16 32 64 128
```

Scan "converge" \ "fixedpoint". Repeatedly applies left argument monadic function until result stops changing and accumulates all intermediate results:

```o
o){x%2}\100
100 50 25 12 6 3 1 0
```
