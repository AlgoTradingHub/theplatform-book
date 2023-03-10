# 1: FileBinary (assign 1)

Reads or writes bytes

**Syntax:** ```x 1: y; 1:[x;y]```

Where:

- x is a two-element list (a string representing type and a long vector or a scalar);
- y is a byte vector.

```o
o)(8;"j")1:0x1000000000000000 // big endian
1152921504606846976
o)("j";8)1:0x1000000000000000 // little endian
16
o)("ij";4 8)1:0x000100001000000000000000 // little endian
256i
16
o)
```

::: see
[Assign 0](/reference/assign/assign0.md)
:::
