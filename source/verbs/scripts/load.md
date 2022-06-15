# load

Loads a source file or a plugin library.

**Syntax:** ```load x; \l x; load[x];  load[x;y]```

Use either a full path (with platform dependent prefixes, suffixes, file extensions) or just a filename. 
In the last case, extension, prefix, and suffix will be added automatically and kernel will recursively search for a specified file. 
Optionally, pass a search path in the left argument.

```o
o)\l "serde"
"./platform/plugins/serde/target/debug/libserde.dylib"
o)load "core"
"./std/core.o"
o)load "std/core"
"std/core.o"
o)load["std";"core.o"]
"std/core.o"
```

::: warn
```load``` work fast without recursively search if file extension is dependent.
:::

```o
o)load[".";"core"]
"./std/core.o"
o)load["std";"core.o"]
"std/core.o"
o)load[".";"core.o"]
** I/O error: `load`:
-- ["./core.o"]: Os { code: 2, kind: NotFound, message: "No such file or directory" }
o)
```

::: see
[Plugins](/plugins.md)
[load (projecting files)](/verbs/databaseio/projecting.md)
[read](/verbs/file/read.md)
:::
