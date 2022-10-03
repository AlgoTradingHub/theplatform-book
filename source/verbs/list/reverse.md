# Monadic | (reverse)

Reverses the order of elements in a list.

**Syntax:** ```| x; |[x]```

```o
o)| 1 2 3
3 2 1
o)a:(1 2 3;4 5;enlist 6)
1 2 3
4 5
,6
o)|a
,6
4 5
1 2 3
o)|a 1
5 4
o)|'a
3 2 1
5 4
,6
o)
```
