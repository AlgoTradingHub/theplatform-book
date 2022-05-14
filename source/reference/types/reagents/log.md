# Reagent log

Reagent to be used to create journals.

**Syntax:** ```reagent[`log]```

```o
o)l:reagent[`log;`:/tmp/journal.log];
o){l[(`f;x;x+1)]}'!10;
o)f:{println["X: % Y: %";x;y]};
o)close l
o)l:reagent[`log;`:/tmp/journal.log];
o)react {[x:l] eval x};
X: 0 Y: 1
X: 1 Y: 2
X: 2 Y: 3
X: 3 Y: 4
X: 4 Y: 5
X: 5 Y: 6
X: 6 Y: 7
X: 7 Y: 8
X: 8 Y: 9
X: 9 Y: 10
o)
```

Of course, journal can be read at once by using verb `` `get``

```o
o)get `:/tmp/journal.log
0b
((`f;0;1);(`f;1;2);(`f;2;3);(`f;3;4);(`f;4;5);(`f;5;6);(`f;6;7);(`f;7;8);(`f;8;9);(`f;9;10))
```

get called on a journal file returns 2-element list which first element is bool indicates corrupted jpurnal, second element is jurnal itself. If journal is corrupted, first element would be a 1b, second one - valid part of a journal;

::: see
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
