# , Enlist, Concat

## Enlist

Create a list from it's value

**Syntax:** ```,x; ,[x]```

Where x: any type

```o
o),1
,1
o),`a
,`a
o),1 2 3 4
,1 2 3 4
o),{x}
,{x}
o),(1 2;3 4)
,(1 2;3 4)
o),[1 2 3]
,1 2 3
o)
```

## Concat

Concatenates two values in a list or vector or table or dict

**Syntax:** ```x,y; ,[x;y]```

Where x: any type (depends on types combination)

```o
o)1,2
1 2
o)1,2 7 6 5
1 2 7 6 5
o)(),{x}
,{x}
o)(+`a`s`d!(1 2;3 4;5 6)),+`a`s`d!(1 2;5 6;9 8)
a s d
-----
1 3 5
2 4 6
1 5 9
2 6 8
o)
```
