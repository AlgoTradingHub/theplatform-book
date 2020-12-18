# load

Loads a source file or a plugin library.

**Syntax:** ```load x;  load[x];  load[x;y]```

Use either a full path (with platform dependent prefixes, suffixes, file extensions) or just a filename. In the last case, extension, prefix, and suffix will be added automatically and kernel will recursively search for a specified file. Optionally, pass a search path in the left argument.

```o
o)load "ws"
loading target: DirEntry("./platform/plugins/ws/target/debug/libws.so")
TypeId is inconsistent between host/plugin. Compiler bug?!
Panic handler installed.
"ws reagent registered"
o)load["ws"]
loading target: DirEntry("./platform/plugins/ws/target/debug/libws.so")
TypeId is inconsistent between host/plugin. Compiler bug?!
Panic handler installed.
"ws reagent registered
o)load["platform/";"ws"]
loading target: DirEntry("./platform/plugins/ws/target/debug/libws.so")
TypeId is inconsistent between host/plugin. Compiler bug?!
Panic handler installed.
"ws reagent registered"
o)load "std"
loading target: DirEntry("./etc/std.o")
o) load "etc/std.o"
o)
```

::: see
[Plugins](/verbs/plugins.md)
[read](/verbs/file/read.md)
:::
