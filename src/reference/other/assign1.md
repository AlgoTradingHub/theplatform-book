# 1: FileBinary

Read or write bytes

**Syntax:** ```x 1: y; 1:[x;y]```

Where:

- x: is a two-elements list of types string, long vector or scalar
- y: byte vector

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
