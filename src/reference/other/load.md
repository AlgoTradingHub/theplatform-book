# \\l Load

Loads source file or plugin library

**Syntax:** ```\l x; \l[x]; \l[x;y]```

Path to file can be full (with platform dependend prefixes,suffixes,file extensions) or
just filename. In last case extension, prefix, suffix will be added automatically and
kernel will recursively search for file specified. Optionaly in left argument may be passed search path.

```o
o)\l "ws"
loading target: DirEntry("./platform/plugins/ws/target/debug/libws.so")
TypeId is inconsistent between host/plugin. Compiler bug?!
Panic handler installed.
"ws reagent registered"
o)\l["ws"]
loading target: DirEntry("./platform/plugins/ws/target/debug/libws.so")
TypeId is inconsistent between host/plugin. Compiler bug?!
Panic handler installed.
"ws reagent registered
o)\l["platform/";"ws"]
loading target: DirEntry("./platform/plugins/ws/target/debug/libws.so")
TypeId is inconsistent between host/plugin. Compiler bug?!
Panic handler installed.
"ws reagent registered"
o)\l "std"
loading target: DirEntry("./etc/std.o")
o)\l "etc/std.o"
o)
```
