# ThePlatform for Python developers

Here you can find Platform solutions to some basic problems along with their Python solutions.

## Factorial of a number

```
>>> def factorial(n): return 1 if (n==1 or n==0) else n * factorial(n - 1)
...
>>> factorial(6)
720
```

```o
o)factorial:{$[x<2;1;x*factorial x-1]}
{$[x<2;1;x*factorial x-1]}
o)factorial 6
720
o)
```

To define factorial of `x` non-recursevily, multiply natural numbers from 1 to `x`:

```o
o)fact:{*/ 1+til x}
{*/ 1+til x}
o)fact 6
720
o)
```

## Simple interest

```
>>> p=1000                  # principal
>>> r=3                     # rate
>>> t=5                     # time periods
>>> (p*r*t)/100             # simple interest
150.0
```

```o
o)p:1000                    / principal
1000
o)r:3                       / rate
3
o)t:5                       / time periods
5
o)(p*r*t)%100               / simple interest
150
o)
```

A better practice is using vectors:

```o
o)(*/(p;r;t))%100
150
o)
```

The same applies to multiple values since most operators in O are of implicit iteration:

```o
o)p:1000 2500 3000         / principal
1000 2500 3000
o)r:3 4 5                  / rate
3 4 5
o)t:10 5 10                / time periods
10 5 10
o)(*/(r;t;p))%100          / simple interest
300 500 1500
o)
```

## Compound interest

```
>>> p = 1300                # principal
>>> r = 4.8                 # rate
>>> t = 3                   # time periods
>>> p*(pow((1+r/100),t))    # compound interest
1496.3293696
```

```o
o)p:1300f
1300f
o)r:4.8
4.8
o)t:3f
3f
o)p*(1f+r%100.0)xexp t
1496.3293696
o)
```

::: note
All numbers in expressions must be of the same type.
:::

Works with lists as well:

```o
o)p:1300 1500 2000f
1300 1500 2000f
o)r:4.8 5.0 5.5
4.8 5 5.5
o)t:3 4 5f
3 4 5f
o)p*(1f+r%100.0)xexp t
1496.3293696 1823.2593750000003 2613.9200128187495
o)
```

## Area of a circle

The area of circle is equal to πr^2, where r is a circle radius and π is the arc-cosine of -1.

```
>>> import numpy as np
>>> np.arccos(-1)*10*10       # area of circle of radius 10
314.1592653589793
```

```o
o)r:10f                   / radius
10f
o)area:(acos -1f)*r*r     / area of circle of radius 10
314.1592653589793
o)
```

## Prime numbers in an interval

```
>>> from sympy import sieve
>>> list(sieve.primerange(20, 40))
[23, 29, 31, 37]
```

There is no built-in function for identifying prime numbers in O:

```o
range:{x+til y-x-1}

primeinrange:{
  l:range[x;y];                         / list of potential prime numbers
  lmt:"j"$sqrt "f"$last l;              / highest divisor to test
  l where (&/(0<l mod/:range[2;lmt])) }
```

```
q)primeinrange[20;40]
23 29 31 37
```

```o
o)range:{x+til (y-x-1)}
{x+til (y-x-1)}
o)l:range[20;40]                                                  / list of potential prime numbers
20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40
o)range[2;"j"$sqrt "f"$last l]                                    / list of divisors
2 3 4 5 6
o)l mod/:2 3 4 5 6                                                / division remainder of each potential prime number against each divisor
0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0
2 0 1 2 0 1 2 0 1 2 0 1 2 0 1 2 0 1 2 0 1
0 1 2 3 0 1 2 3 0 1 2 3 0 1 2 3 0 1 2 3 0
0 1 2 3 4 0 1 2 3 4 0 1 2 3 4 0 1 2 3 4 0
2 3 4 5 0 1 2 3 4 5 0 1 2 3 4 5 0 1 2 3 4
o)f:0<l mod/:2 3 4 5 6                                            / flag division remainders
010101010101010101010b
101101101101101101101b
011101110111011101110b
011110111101111011110b
111101111101111101111b
o)&/f                                                             / AND the flag vectors
000100000101000001000b
o)l where (&/f)                                                   / select from range
23 29 31 37
o)
```

## If the number is prime

```
>>> from sympy import isprime
>>> [isprime(x) for x in (1, 17, 20)]
[False, True, False]
```

```o
o)range:{x+til (y-x-1)}
{x+til (y-x-1)}
o)isprime:{(x>1) and (&/(0<x mod range[2;"j"$sqrt "f"$x]))}     / поки шо не працює коректно через баг в mod
{(x>1) and (&/(0<x mod range[2;"j"$sqrt "f"$x]))}
o)isprime 1 5 15
()
1b
()
o)
```

## Whether a Fibonacci number

```
import math
def is_fibonacci(n):
    phi = 0.5 + 0.5 * math.sqrt(5.0)
    a = phi * n
    return n == 0 or abs(round(a) - a) < 1.0 / n
```

```
>>> [is_fibonacci(x) for x in (5, 13, 20)]
[True, True, False]
```

x is a Fibonacci number if 5x^x + or - 4 is a perfect square:

```o
o)is_ps:{x={x*x}"j"$sqrt "f"$x}           / checks if number is a perfect square
{x={x*x}"j"$sqrt "f"$x}
o)is_fibonacci:{|/is_ps (5*x*x)+'4 -4}
{|/is_ps (5*x*x)+'4 -4}
o)is_fibonacci each 5 13 20
110b
o)
```

## Sum of squares of first N numbers

```
def squaresum(n): return (n * (n + 1) / 2) * (2 * n + 1) / 3
```

```
>>> [squaresum(x) for x in (1,2,3,4,5,6,7,8,9,10)]
[1.0 5.0 14.0 30.0 55.0 91.0 140.0 204.0 285.0 385.0]
```

```o
o)squaresum:{x:"f"$x;(x*(x+1.0)%2.0)*(1.0+x*2.0)%3.0}
{x:"f"$x;(x*(x+1.0)%2.0)*(1.0+x*2.0)%3.0}
o)squaresum 1+til 10
1 5 14 30 55 91 140 204 285 385f
o)
```

## Cube sum of first N natural numbers

```
def sum_cubes(x): return (x * (x + 1) // 2) ** 2
```

```
>>> [sum_cubes(x) for x in (5, 7)]
[225, 784]
```

```o
o)sum_cubes:{("f"$x*(x+1)%2)xexp 2f}
{("f"$x*(x+1)%2)xexp 2f}
o)sum_cubes 8 19
1024 36100f
o)
```
