# Verbs

Verb is synonim for built-in function.
Monadic, dyadic, triadic, tetradic and polyadic verbs expect 1,2,3,4 and at max 8 parameters respectively.

Given that the same verb might be used in both monadic and dyadic context, dyadic context is assumed by default and monadic can be forced by:

```o
o) (-:)1 2 3
-1 -2 -3
```

Some verbs are atomic. Fully atomic verbs descend into nested lists.

```o
o)(1;(1;1 1;2);3)>(1;2;3)
0b
(0b;00b;0b)
0b
```

A right atomic verb descends only into nested lists of its right argument.
