# Database IO

One of important features is database persistance. Conceptually, there are two kinds of persistance in O language - reading/writing entire files from/to disk and projecting vectors/tables directly from disk.

The first kind is easier and more powerful as it support more O types.
The second kind is often faster and more memory-efficient, but supports only a subset of O structures - vectors of simple/fixed types, dicts and tables.

## Reading/writing concept

It's done using ```get``` and ```set``` verbs.

The simpliest example is generating a vector and saving it to disk via ```set``` dyad. Later we can read it.
```o
o) a:!10; f:`:./tmp/test.dat; f set a;
o) b:get f
o) b
0 1 2 3 4 5 6 7 8 9
```

Pay attention to the format of left argument for ```set``` - it's a symbol whose first character is ":", followed by directory and ending with filename with any extension.

_It is important to remember - ```set``` verb changes its behaviour based on format of its left argument._

The same idea goes for complex / nested list.
```o
o) a:(!10; "123"; `symbol; `a`b`c!1 2 3); f:`:./tmp/test.dat; f set a;
o) b:get f
o) b
0 1 2 3 4 5 6 7 8 9
"123"
`symbol
(`a`b`c!1 2 3)
```

## Projecting files concept

In order to use projecting into memory, structure must fit into flat vectors of fixed-sized elements.

This concept is served via another pair of verb - ```set``` and ```load```. But only for vectors, dicts and tables.

So the first part is the same - that is saving vector / table to disk. But projecting part itself is done via ```load``` verb. After projecting one can apply destructive amend verbs for changing vector contents right on disk. Assigning anything to projected vector varible completes projection and flushes changes to disk.

```o
o) a:!10; f:`:./tmp/vec.dat; f set a;
o) load f;
o) @[`vec;!10;:;10#1]; vec:0;
o) b:get f; b
1 1 1 1 1 1 1 1 1 1
```

Another way of projecting files is working via amends/dmends. Note trailing slash! Basically, it's just the same projecting/flushing under the hood, but done automatically.

```o
o) a:`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:./tmp/o_dict/; f set a; a:0;
o) @[f;`d`e;:;(10#1;20#2)];b:get f; b
a| 1 2 3
b| 1 2 3
c| 1 2 3
d| 1 1 1 1 1 1 1 1 1 1
e| 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
```

Quite similar to dicts is projecting tables. Note trailing slash!
```o
o) a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:./tmp/o_table/; f set a; a:0;
o) @[f;`e`d;:;(3#1;3#2)]; b:get f; b
a b c e d
---------
1 1 1 1 2
2 2 2 1 2
3 3 3 1 2
```
Of course, projecting via ```load``` verb works for tables as well.

Conceptually only updating and concatenation at the end is allowed for working with tables on disk.
```o
o) a:(+:)`a`b`c!(1 2 3;1 2 3;1 2 3); f:`:./tmp/o_table/; f set a; a:0;
o) .[f;();,;(10 10;20 20;30 30)];
o) b:get f; b
a  b  c
--------
1  1  1
2  2  2
3  3  3
10 20 30
10 20 30
```
