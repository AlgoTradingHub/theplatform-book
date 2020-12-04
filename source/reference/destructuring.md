## Destructuring

Extracts values from complex structures such as dicts and tables:

```o
o){(a;_;c):x;c}[(1;(1 2; 3);4)]
4
o)(a!b):(`a`s`d`f!(1 2 3 4));b
1 2 3 4
o)(a!b):+(`a`s`d`f!(1 2 3 4));a
`a`s`d`f
o)(a!(b;c;d;e)):(`a`s`d`f!(1 2 3 4));e
4
o)((a;b;u)@`s`f`d):(`a`s`d`f!(1; 2; 3;(`u`l!(11 444))));u
3
o)((a;b).`f`u):(`a`s`d`f!(1; 2; 3;(`u`l!(11 444;0 2 3 4))));b
444
o)((a;b);c):(+`a`b!(1 2;3 4);3);
o)a
a| 1
b| 3
o)b
a| 2
b| 4
o)c
3
o)
```
