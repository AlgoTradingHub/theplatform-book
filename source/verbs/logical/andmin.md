# Dyadic & (and/min)

Applies boolean "and" for bool args. Fully atomic.

```o
o) 010b&1b
010b
```

For number vectors, it results in calculating "max".

```o
o) 1 2 3&0 2 1
0 2 1
```
