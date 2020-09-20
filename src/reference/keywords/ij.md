# ij

Inner join

**Syntax:** ```ij[x;y;z]```

Where:

- x: table
- y: table
- z: indexes

```o
o) t1:((+:)`a`b`c!(1 2 3;3 4 5;6 7 8));
o) t2:((+:)`a`d`e`f!(1 2 3;3 4 5;6 7 8;("111";"222";"333")));
o) j: ij[(`t1;t1);(`t2;t2);(~`t1`a;~`t2`a)];
o)0N#.(?[j; (); 0b; `a`b`e`f!(~`t1`a;~`t1`b;~`t2`e;~`t2`f)])
a b e f
-----------
1 3 6 "111"
2 4 7 "222"
3 5 8 "333"
```
