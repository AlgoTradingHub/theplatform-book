# Triad $ (cond)

Short-circuit conditional expression. Thus this verb is special. It does not evaluate all of its arguments immediately.
Only first argument is evaluated, and if it's corresponds to truth then second argument is evaluated and becomes the result of cond expression. Otherwise, third argument is evaluated.

The concept of truth here is a bit complex. It has following rules:

* For boolean scalars, truth means 1b.
* For integer scalars, truth means any value except 0 and null.
* For other scalar types, truth means any non-null value.
* For vectors, dicts, tables, truth means non-empty structure.
* Everything else (monads, dyads, lambdas, ...) results in truth.

```o
o)$[1=1;2;3]
2
```

Another thing to remember is that simulation of short circuit evaluation of condition itself is done using nested conds:
```o
o) a:1 2 3;
o) $[a;$[1=a[0];2;3];4]
2
```
