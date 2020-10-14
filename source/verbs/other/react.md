# react

Creates reaction on a reagents set

**Syntax:** ```react{[x:r1;y:r2..]..}; react[{[x:r1;y:r2..]..}]```

Where:
    - x,y,..: arguments of a lambda to be evaluated on triggering of reaction
    - r1;r2..: reagents involved into reaction

```o
o)r:reagent[`async];
o)react{[x:r] 0N!x};
o)r[123];
o)123
```
