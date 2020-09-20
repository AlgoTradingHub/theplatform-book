# upsert

Update or insert table

**Syntax:** ```upsert[x;y;z]```

Where:

- x: table
- y: table to be upserted
- z: two element list of key symbol vectors

```o
o)a:(+:)`a`b`c`d!(!10;!10;!10;!10);
o)b:(+:)`a`b`c!(8+!5;8+!5;10+!5);
o)upsert[a;b;(`a`b;`a`b)]
a  b  c  d
-----------
0  0  0  0
1  1  1  1
2  2  2  2
3  3  3  3
4  4  4  4
5  5  5  5
6  6  6  6
7  7  7  7
8  8  10 8
9  9  11 9
10 10 12 0N
11 11 13 0N
12 12 14 0N
o)a:(+:)`a`b`c`d!(!10;!10;!10;!10);
o)b:(+:)`a`b`c!(8+!5;8+!5;10+!5);
o)upsert[`a;b;(`a`b;`a`b)]
`a
o)a
a  b  c  d
-----------
0  0  0  0
1  1  1  1
2  2  2  2
3  3  3  3
4  4  4  4
5  5  5  5
6  6  6  6
7  7  7  7
8  8  10 8
9  9  11 9
10 10 12 0N
11 11 13 0N
12 12 14 0N
```
