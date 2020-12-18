# shadow

Creates variables that are visible down the stack.

**Syntax:** ```shadow x; .x::y```

Allowed only inside lambda's body, otherwise it doesn't make sense.

```o
o)f:{s::20;};
o)f2:{shadow `s;s::10;f[];s};
o)f2[]
20
o)
```
