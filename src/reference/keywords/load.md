# load

Loads source file or plugin library

**Syntax:** ```load x;  load[x];  load[x;y]```

Path to file can be full (with platform dependend prefixes,suffixes,file extensions) or
just filename. In last case extension, prefix, suffix will be added automatically and
kernel will recursively search for file specified. Optionaly in left argument may be passed search path.

```o
o) load "ws"
loading target: DirEntry("./platform/plugins/ws/target/debug/libws.so")
TypeId is inconsistent between host/plugin. Compiler bug?!
Panic handler installed.
"ws reagent registered"
o) load["ws"]
loading target: DirEntry("./platform/plugins/ws/target/debug/libws.so")
TypeId is inconsistent between host/plugin. Compiler bug?!
Panic handler installed.
"ws reagent registered
o) load["platform/";"ws"]
loading target: DirEntry("./platform/plugins/ws/target/debug/libws.so")
TypeId is inconsistent between host/plugin. Compiler bug?!
Panic handler installed.
"ws reagent registered"
o) load "std"
loading target: DirEntry("./etc/std.o")
o) load "etc/std.o"
o)
```
