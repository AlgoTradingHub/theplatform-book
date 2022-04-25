# Projecting files concept

In order to use projecting into memory, structure must fit into flat vectors of fixed-sized elements.

This concept is served via another pair of verb - ```set``` and ```load```. It works only for vectors, dictionaries and tables.

So the first part is the same - saving a vector/table to disk. The projecting part is done via ```load``` verb. After projecting, one can apply destructive [amend verbs](/verbs/amendsdmends/tetramend.md) to change vector contents right on disk. Assigning anything to a projected vector variable completes projection and flushes changes to disk.

**Syntax:** ```x set y; set[x;y]```

where `x` is a symbolic file handle (a symbol starting with ":", followed by directory and ending with filename + extension) and `y` is an item to be written.

**Syntax:** ```load x; load[x]```

where `x` is a symbolic file handle.

```o
o)a:!10; f:`:./tmp/vec.dat; f set a;
o)load f;
o)@[`vec;!10;:;10#1]; vec:0;
o)b:get f; b
1 1 1 1 1 1 1 1 1 1
o)
```

Another way of projecting files is working via amends/dmends. Basically, it's just the same projecting/flushing under the hood, but done automatically.

::: note
Note trailing slash!
:::

```o
o)a:`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:./tmp/o_dict/; f set a; a:0;
o)@[f;`d`e;:;(10#1;20#2)];b:get f; b
a| 1 2 3
b| 1 2 3
c| 1 2 3
d| 1 1 1 1 1 1 1 1 1 1
e| 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
o)
```

Quite similar to dicts is projecting tables.

::: note
Note trailing slash!
:::

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:./tmp/o_table/; f set a; a:0;
o)@[f;`e`d;:;(3#1;3#2)]; b:get f; b
a b c e d
---------
1 1 1 1 2
2 2 2 1 2
3 3 3 1 2
o)
```

Of course, projecting via ```load``` verb works for tables as well.

Conceptually only updating and concatenation at the end is allowed while working with tables on disk.

```o
o)a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:./tmp/o_table/; f set a; a:0;
o).[f;();,;(10 10;20 20;30 30)];
o)b:get f; b
a  b  c
--------
1  1  1
2  2  2
3  3  3
10 20 30
10 20 30
o)
```


::: see
[load (scripts)](/verbs/scripts/load.md)
[get](/verbs/file/get.md)
:::
