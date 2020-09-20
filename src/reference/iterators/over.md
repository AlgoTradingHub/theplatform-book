# / Over, For, While

Reduces right argument structure using left dyad. Initial value is different for some verbs.

**Syntax:** ```f/x```

```o
o)+/1 2 3
6
```

Boolean vectors behave as vector of long for some verbs:

```o
o) +/101b
2
o)+/0#0
0
o)*/0#0
1
o):/0#0
0N
```

Over with initial value. Folds right argument structure using left dyad. Initial value is given explicitly:

```o
o)10*/1 2 2
40
```

Over "converge" / "fixedpoint". Repeatedly applies left argument monadic function until result stops changing:

```o
o){x%2}/100
0
```

## For

Applies monadic verb to right argument left argument times.

**Syntax:** ```x f/y```

```o
o)5{x+1}/10
15
```

## While

Applies monadic verb to right argument while left argument returns true value.

**Syntax:**

```o
o){x<100}{x*2}/1
128
```
