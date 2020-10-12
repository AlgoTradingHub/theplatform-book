# count

Returns the number of items in a list, dictionary or table.

**Syntax:** ```count x; count[x]```

```o
o)count til 10
10
o)count "one"
3
o)count `a`b`c!1 2 3
3
o)count flip `a`b`c!1 2 3
1
o)count([]a:`a`b`c;b:1 2 3)
3
```

Returns 1 for everything else:

```o
o)count 0
1
o)count `ten
1
o)count({x+1})
1
```

To count elements of nested structures use `each`:

```o
o)count(1 2;3;45 67 89)
3
o)count each(1 2;3;45 67 89)
2 1 3
o)count `x`y`z!(1 2 3;`a`b`c;1.1 2.2 3.3)
3
o)count each `x`y`z!(1 2 3;`a`b`c;1.1 2.2 3.3)
x| 3
y| 3
z| 3
```
