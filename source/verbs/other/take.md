# # Count, Take

## Count

Returns a number of elements in it's argument

**Syntax:** ```#x; #[x]```

```o
o)#1
1
o)#1 2 3
3
```

## Take

Takes first N elements, passed in it's first argument from its second argument
or duplicates N times its second argument if it is a scalar

**Syntax:** ```x#y; #[x;y]```

```o
o)2#1 2 3 4 5
1 2
o)2#1
1 1
o)
```
