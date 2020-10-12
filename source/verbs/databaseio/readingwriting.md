# Reading/writing concept

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
