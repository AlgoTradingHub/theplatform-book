# mv (move)

Moves or "consumes" local or global variable or upval (captured value in closures).

**Syntax:** ```mv x; mv[x]```

By moving or consuming it means literally taking value out of its binding symbol. Moving value leaves generic null in its binding.
 Used for optimization mostly by helping to keep internal rc count 1. That allows to guarantee mutating values in-place greatly improving performance in some cases.

```o
o) t: +`a`b!(!10000; !10000); // simulate large table
o) t:10#{ 0N!rc x; @[`x; `a; +; 1]; x } mv t
1 1 1
a  b
----
1  0
2  1
3  2
4  3
5  4
6  5
7  6
8  7
9  8
10 9
```
