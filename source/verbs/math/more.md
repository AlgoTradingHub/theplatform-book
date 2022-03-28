# More Math Functions

Following fully atomic monadic intrinsics are supported for floats only.

| Name | Function | Comment |
| --- | --- |--- |
| sin | sine | argument in radians |
| asin | arcsine | returns radians |
| cos | cosine |argument in radians |
| acos | arccosine |returns radians |
| tan | tangent |argument in radians |
| atan | arctangent |returns radians |
| exp | e^x | Raise e to x power |
| log | ln x | Natural logarithm of x |
| sqrt | sqrt | Square root of x |

```o
o)cos 0f
1f
o)acos 0.5
1.0471975511965976
o)exp 1f
2.718281828459045
o)log 10f
2.302585092994046
o)sqrt 1.5
1.224744871391589
```

Another set of dyadic fully atomic intrinsics are supported (floats only).

| Name | Function | Comment |
| --- | --- |--- |
| xexp | x^y | Raise x to a power y |
| xlog | logx(y) | Returns base-x logarithm of y |

```o
o)2f xexp 10f
1024f
o)10f xexp 1.2
15.848931924611133
o)5f xlog 25f
2f
o)100f xlog 1f
0f
o)1.2 xlog 2.5
5.025685102665476
```
