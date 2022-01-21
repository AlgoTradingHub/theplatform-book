# Standard library


### Standard library load

Before using, you need to load a standard library into namespace.

```o
o)load "core"
"./std/core.o"
```

### Symbols into/from enum conversions

As you probably know, symbols cannot be part of splayed tables due to technical reasons. In order to permit symbol-like behaviour in tables, enums are used. The usual task of converting symbols into enums can be done using ```.o.en``` function.

**Syntax:** ```.o.en[t;sym]```

where ```t``` is a table or table symbol for in-place modification;

```sym``` is a global domain symbol, i.e. ``` `sym ```.

All symbol fields in the table will be converted into enum fields. Global domain vector will contain new symbols (if necessary) added to its back.

```o
o)load "core";
o)t:+`a`b`c!(1 2;3 4;`c`d);
o)sym:`symbol$();
o)r:.o.en[t;`sym];
o)r`c
`sym$`c`d
o)
```

When a table has just been loaded from disk, all its enum fields are not bind to any domain vector. One can use the same ```.o.en``` function to rebind them back.

```o
o)load "core";
o)sym:`c`d;
o)t:+`a`b`c!(1 2;3 4;`sym$`c`d);
o)`:/tmp/tbl/ set t; t:0;
o)load `:/tmp/tbl/;
o)tbl
a b c
------
1 3 0
2 4 1i
o).o.en[`tbl;`sym];
o)tbl
a b c
------
1 3 `c
2 4 `d
```

A less frequent, but still useful procedure is turning enums into ordinary symbols. It's done using ```.o.sym``` function.

**Syntax:** ```.o.sym[t]```

where ```t``` is a table or table symbol for in-place modification.

```o
o)load "core";
o)sym:`c`d;
o)t:+`a`b`c!(1 2;3 4;`sym$`c`d);
o).o.sym[`t];                // destructive enums -> symbols
o)t
a b c
-----
1 3 c
2 4 d
o)t`c
`c`d
```
