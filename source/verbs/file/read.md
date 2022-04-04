# read

Reads file contents.

**Syntax:** ```read x; read[x]```

```o
o)OHOME:getenv[`OHOME];
o)read `$":",OHOME,"/std/core.o"
0x2f2f20436f72652066756e6374696f6e730a2f2f2072756e20636f72655f746573742e6f20746f20636865636b0a2f2f202d2d0a0a2f2f2046756e..
o)"c"$ read `$":",OHOME,"/std/core.o"
"// Core functions\n// run core_test.o to check\n// --\n\n// Function for generating tests\ntest:{[tnm;lhs;rhs]\n    msg..
o)
```

::: see
[write](/verbs/file/write.md)
[load](/verbs/scripts/load.md)
[cast](/verbs/casts/cast.md)
:::
