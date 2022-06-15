# Polyadic |

Polyadic short-circuit "or" condition. Triadic form behaves exactly as ```$[x;y;z]``` verb.

**Syntax:** ```|[cond1; cond2; ...; trueres; falseres] ```

```o
o)|[1b; 1b; 1; 2]
1
o)|[1b; 0b; 1; 2]
1
o)f:{|[(!`v`long)=@x; (!``table)=@x; x y; "error"]}
{|[(!`v`long)=@x; (!``table)=@x; x y; "error"]}
o)f[1 2 3; 1]
2
o)f[+`a!1 2 3; 1]
a| 2
o)f["123"; 1]
"error"
```

::: see
[$](/verbs/conditional/cond.md)
:::
