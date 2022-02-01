# Rotate

Rotates elements in a list y. Positive x means rotate to the left, negative - to the right.

**Syntax:** ```x rotate y ; rotate[x;y]```

```o
o)1 rotate 1 2 3
2 3 1
o)v:("123";1 2 3;1f);
o).[`v;();~[rotate];-4];
o)v
1f
"123"
1 2 3
```
