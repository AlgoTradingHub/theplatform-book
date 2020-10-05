### Dyadic | (or/max)

Applies boolean "or" for bool args. Fully atomic.

```o
o) 1b|010b
111b
```

For number vectors, it results in calculating "max".

```o
o) 1 2 3|0
1 2 3
```
