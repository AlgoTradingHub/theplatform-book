# read

Reads file contents.

**Syntax:** ```read x; read[x]```

```o
o)read `:std/core.o
0x2f2f20436f72652066756e6374696f6e730a2f2f202d2d0a2f2f2046756e6374696f6e20666f722067656e65726174696e672074657374730a7..
o)"c"$ read `:std/core.o
"// Core functions\n// --\n// Function for generating tests\ntest:{[tnm;lhs;rhs]\n    msg:$[lhs~rhs;\n        format[..
o)
```

::: see
[write](/verbs/file/write.md)
[load](/verbs/scripts/load.md)
:::
