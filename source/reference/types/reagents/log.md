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
o)X: 0 Y: 1
X: 1 Y: 2
X: 2 Y: 3
X: 3 Y: 4
X: 4 Y: 5
X: 5 Y: 6
X: 6 Y: 7
X: 7 Y: 8
X: 8 Y: 9
X: 9 Y: 10
```

Of course, journal can be read at once by using verb `` `get``

```o
get `:/tmp/journal.log
0b
((`f;0;1);(`f;1;2);(`f;2;3);(`f;3;4);(`f;4;5);(`f;5;6);(`f;6;7);(`f;7;8);(`f;8;9);(`f;9;10))
```

get called on a journal file returns 2-element list which first element is bool indicates corrupted jpurnal, second element is jurnal itself. If journal is corrupted, first element would be a 1b, second one - valid part of a journal;

::: see
[async](/reference/types/reagents/async.md)
[sync](/reference/types/reagents/sync.md)
[bus](/reference/types/reagents/bus.md)
[deq](/reference/types/reagents/deq.md)
[file](/reference/types/reagents/file.md)
[listener](/reference/types/reagents/listener.md)
[tcp](/reference/types/reagents/tcp.md)
[ipc](/reference/types/reagents/ipc.md)
[tls](/reference/types/reagents/tls.md)
[udp](/reference/types/reagents/udp.md)
[ws](/reference/types/reagents/ws.md)
[timer](/reference/types/reagents/timer.md)
[tty](/reference/types/reagents/tty.md)
[state](/reference/types/reagents/state.md)
[null](/reference/types/reagents/null.md)
[kdb listener](/reference/types/reagents/kdblistener.md)
[kdb](/reference/types/reagents/kdb.md)
[reagent](/verbs/other/reagent.md)
[react](/verbs/other/react.md)
[close](/verbs/other/close.md)
[meta](/verbs/other/meta.md)
:::
