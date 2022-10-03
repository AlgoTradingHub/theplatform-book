# Polyadic & (and condition)

Polyadic short-circuit "and" condition. Triadic form behaves exactly as ```$[cond; trueres; falseres]``` verb.

**Syntax:** ```&[cond1; cond2; ...; trueres; falseres] ```

```o
o)&[1b; 1b; 1; 2]
1
o)&[1b; 0b; 1b; 1b; 1; 2]
2
o)x:1 2 3
1 2 3
o)i:"s"
"s"
o)&[(!`v`long)=@x; (!`s`long)=@i; x+i; "error"]
"error"
```

::: see
[$](/verbs/conditional/cond.md)
:::
