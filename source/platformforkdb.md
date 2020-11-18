# ThePlatform for KDB+

This section contains both Platform and KDB+ solutions to some basic problems.

## Factorial of a number

```o
q)factorial:{$[x<2;1;x*.z.s x-1]}
q)factorial 6
720
q)
```

```o
o)factorial:{$[x&lt2;1;x*factorial x-1]}
{$[x&lt2;1;x*factorial x-1]}
o)factorial 6
720
o)
```

Non-recursive solution:

```o
q)prd 1+til 6
720
q)
```

```o
o)*/ 1+til 6
720
o)
```

## Simple interest

```o
q)p:1000                    / principal
q)r:3                       / rate
q)t:5                       / time periods
q)(p*r*t)%100               / simple interest
150f
q)
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

Better practice is using vectors:

```o
q)(prd 1000 3 5)%100
150f
q)
```

```o
o)(*/(1000 3 5))%100
150
o)
```

The same applies to multiple values due to implicit iteration:

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

```o
q)p:1300                    / principal
q)r:4.8                     / rate
q)t:3                       / time periods
q)p*(1+r%100)xexp t         / compound interest
1496.3293696
q)
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
All numbers in expressions in O must be of the same type.
:::

Again, the same applies to lists:

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

```o
q)r = 10
q)(acos -1)*r*r           / area of circle of radius 10
314.1592653589793
q)
```

```o
o)r:10f                   / radius
10f
o)area:(acos -1f)*r*r     / area of circle of radius 10
314.1592653589793
o)
```

## Prime numbers in an interval

```o
q)show c:range[11;25]                         / candidates
11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
q)"j"$sqrt last c                             / need test modulo only to here
5
q)range[2;]"j"$sqrt last c
2 3 4 5

q)c mod/:2 3 4 5                / modulo each c against all of them
1 0 1 0 1 0 1 0 1 0 1 0 1 0 1
2 0 1 2 0 1 2 0 1 2 0 1 2 0 1
3 0 1 2 3 0 1 2 3 0 1 2 3 0 1
1 2 3 4 0 1 2 3 4 0 1 2 3 4 0

q)show f:0<c mod/:2 3 4 5       / flag remainders
101010101010101b
101101101101101b
101110111011101b
111101111011110b
q)all f                         / AND the flag vectors
101000101000100b
q)where all f                   / index the hits
0 2 6 8 12
q)c where all f                 / select from range
11 13 17 19 23
q)
```

```o
range:{x+til y-x-1}

primeinrange:{
  l:range[x;y];                         / list of potential prime numbers
  lmt:"j"$sqrt "f"$last l;              / highest divisor to test
  l where (&/(0&ltl mod/:range[2;lmt])) }
```

```o
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
o)f:0 &lt l mod/:2 3 4 5 6                                            / flag division remainders
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

```o
range:{x+til y-x-1}
isPrime:{(x>1)and all 0<x mod range[2;"j"$sqrt x]}
```

```o
q)isPrime each 1 5 15
010b
q)
```

```o
o)range:{x+til (y-x-1)}
{x+til (y-x-1)}
o)isprime:{(x>1) and (&/(0&ltx mod range[2;"j"$sqrt "f"$x]))}     / поки шо не працює коректно через баг в mod
{(x>1) and (&/(0&ltx mod range[2;"j"$sqrt "f"$x]))}
o)isprime 1 5 15
()
1b
()
o)
```

## N-th Fibonacci number

O and KDB+ solutions here are the same:

```o
nfp:{(x 1),sum x}
fib:{first(x-1)nfp/0 1}
```

```o
q)fib 10
34
q)
```

```o
nfp:{(x 1),sum x}
fib:{first(x-1)nfp/0 1}
```

```o
o)fib 10
34
o)
```

## Whether a Fibonacci number

x is a Fibonacci number if 5x^x + or - 4 is a perfect square:

```o
is_ps:{x={x*x}"j"$sqrt x}                       / is perfect square?
is_fibonacci:{.[or]is_ps flip 4 -4+/:5*x*x}
```

```o
q)is_fibonacci 5 13 20
110b
q)
```

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

```o
q)squaresum:{(x*(x+1)%2)*(1+x*2)%3}
q)squaresum 1+til 10
1 5 14 30 55 91 140 204 285 385f
q)
```

```o
o)squaresum:{x:"f"$x;(x*(x+1.0)%2.0)*(1.0+x*2.0)%3.0}
{x:"f"$x;(x*(x+1.0)%2.0)*(1.0+x*2.0)%3.0}
o)squaresum 1+til 10
1 5 14 30 55 91 140 204 285 385f
o)
```

::: note
All numbers in expressions in O must be of the same type.
:::

## Cube sum of first N natural numbers

```o
q)sum_cubes:{(x*(x+1)div 2)xexp 2}
q)sum_cubes 8 19
1024 36100f
q)
```

```o
o)sum_cubes:{("f"$x*(x+1)%2)xexp 2f}
{("f"$x*(x+1)%2)xexp 2f}
o)sum_cubes 8 19
1024 36100f
o)
```
