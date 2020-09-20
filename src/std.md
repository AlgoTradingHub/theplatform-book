# Standard library

### Standard library load

Before using standard library must be loaded into namespace.

```o
o) load "core"
```

### Symbols into/from enum conversions

As you probably know, symbols cannot be part of splayed tables due to technical reasons.
In order to permit having symbol-lile behaviour in tables, enums are used.
An usual task of converting symbols into enums can be done using ```.o.en``` function.

**Syntax:** ```.o.en[t;sym]```

```t``` - table or table symbol for in-place modification.

```sym``` - global domain symbol, i.e. ``` `sym ```

All symbol fields found in table will be converted into enum fields.
Global domain vector will contain new symbols (if necessary) added to its back.

```o
o) load "core"
o) t:+`a`b`c!(1 2;3 4;`c`d);
o) sym:`symbol$();
o) r:.o.en[t;`sym];
o) r`c
`sym$`c`d
```

In case when a table is just loaded from disk, all its enum fields is not bind to any domain vector.
One can use the same ```.o.en``` function to rebind them back.

```o
o) load "core"
o) sym:`c`d
o) t:+`a`b`c!(1 2;3 4;`sym$`c`d);
o) `:/tmp/tbl/ set t; t:0;
o) load `:/tmp/tbl/;
o) tbl
a b c
------
1 3 0
2 4 1i
o) .o.en[`tbl;`sym];
o) tbl
a b c
------
1 3 `c
2 4 `d
```

Less frequent, but still useful procedure is turning enums into ordinary symbols.
It's done using ```.o.sym``` function.

**Syntax:** ```.o.sym[t]```

```t``` - table or table symbol for in-place modification.

```o
o) load "core"
o) sym:`c`d;
o) t:+`a`b`c!(1 2;3 4;`sym$`c`d);
o) .o.sym[`t];                 // destructive enums -> symbols
o)t
a b c
-----
1 3 c
2 4 d
o)t`c
`c`d
```
