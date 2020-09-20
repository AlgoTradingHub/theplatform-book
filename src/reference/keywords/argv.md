# argv

Returns dictionary with arguments that were passed to the interpreter followed by --

**Syntax:** ```argv x; argv[x]```

```o
./tachyon -- -arg1 1 -arg2 test -arg3 all

o)argv[]
__bin__| "target/debug/tachyon"
arg1   | "1"
arg2   | "test"
arg3   | "all"
o)argv[]`arg1
"1"
o)argv[`arg1]
"1"
o)argv `arg1`arg3
"1"
"all"
o)
```
