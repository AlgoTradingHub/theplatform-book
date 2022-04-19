# load

Loads a source file or a plugin library.

**Syntax:** ```load x;  load[x];  load[x;y]```

Use either a full path (with platform dependent prefixes, suffixes, file extensions) or just a filename. In the last case, extension, prefix, and suffix will be added automatically and kernel will recursively search for a specified file. Optionally, pass a search path in the left argument.

```o
o)load "ws"
"./platform/plugins/ws/target/debug/libws.so"
o)load["ws"]
"./platform/plugins/ws/target/debug/libws.so"
o)load["platform/";"ws"]
"./platform/plugins/ws/target/debug/libws.so"
o)load "core"
"./std/core.o"
o)load "std/core.o"
"./std/core.o"
o)
```

::: see
[Plugins](/plugins.md)
[read](/verbs/file/read.md)
:::
