# Triadic $ (cond)

Short-circuit conditional expression. Thus this verb is special. It does not evaluate all of its arguments immediately.
Only the first argument is evaluated. If it is true the second argument is evaluated and becomes the result of the `cond` expression. Otherwise, the third argument is evaluated.

**Syntax:** ```$[x;y;z]```

where `x` is condition, `y` is an expression to be evaluated if `x` is true, `z` is an expression evaluated if `x` is false.

The concept of truth here is a bit complex:

* For boolean scalars, truth means 1b.
* For integer scalars, truth means any value except 0 and null.
* For other scalar types, truth means any non-null value.
* For vectors, dicts, tables, truth means non-empty structure.
* Everything else (monads, dyads, lambdas, ...) results in truth.

```o
o)$[2<3;"yes";"no"]
"yes"
o)
o)$[0n;"yes";"no"]
"no"
o)$[();1;2]
2
o)
```

Another thing to remember is that simulation of short circuit evaluation of condition itself is done using nested conds:
```o
o) a:1 2 3;
o) $[a;$[1=a[0];2;3];4]
2
```
