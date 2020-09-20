# & Where, And

## Where

Copies of indexes of a vector

**Syntax:** ```&x; &[x]```

Where x: vector of numbers

```o
o)& 1 2 3
0 1 1 2 2 2
o)&[1 2 3]
0 1 1 2 2 2
```

## And

Boolean and

**Syntax:** ```x&y; &[x;y]```

Where x,y - scalars or vectors

```o
o)1&2
1
o)1&0
0
o)1 2 3 0&1
1 1 1 0
o)
```
