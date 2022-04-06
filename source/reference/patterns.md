# Patterns

O has a [pattern matching](https://en.wikipedia.org/wiki/Pattern_matching) feature. Its principle is similar to the "switch" construction in C language, but pattern matching in O is more powerful since it allows matching against all types, including lists, vectors and their parts (e.g. destructuring). Usually, pattern matching is used to construct various types according to input constraints.


```o
o)m:{match [x;y] { (1 2 3;4 5 6) -> "888"; (`a`s`d!1 2 3;_) -> `a`s`d; (12;_) -> 10#3; _ -> 777 } };
o)m[1 2 3;0]
777
o)m[(1 2 3;4 5 6);0]
777
o)m[1 2 3;4 5 6]
"888"
o)m[12;3]
3 3 3 3 3 3 3 3 3 3
o)
```
