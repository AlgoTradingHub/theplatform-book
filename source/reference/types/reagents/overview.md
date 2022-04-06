# Reagents

O language has a specific reagent type that deals with I/O.
Some reagents are built-in:

| Arguments | Description |
| --- | --- |
| reagent[`tty] | Console reagent |
| reagent[`listener;"addr:port"] | TCP listener reagent |
| reagent[`tcp;"addr:port"] | TCP reagent (client side) |
| reagent[`tcp;tcp_reagent] | TCP reagent (server side) |
| reagent[`ipc;"addr:port"] | IPC reagent (client side) |
| reagent[`ipc;tcp_reagent] | IPC reagent (server side) |
| reagent[`udp;"addr:port"] | UDP reagent |
| reagent[`ws;"addr:port"] | Websocket reagent (client side) |
| reagent[`ws;tcp_reagent] | Websocket reagent (server side) |
| reagent[`tls;tcp_reagent] | Wrapper for tcp reagent that deals additional tls layer |
| reagent[`file;`:/path/to/file] | Reagent that backed up with a file |
| reagent[`log;`:/path/to/file] | Same as a file but operates by AST. Can be useful for creation journals |
| reagent[`null] | Empty reagent that produces nothing |
| reagent[`async] | MPSC reagent without blocking on sender side |
| reagent[`sync] | MPSC reagent with blocking on sender side |
| reagent[`deq] | Reagent that behaves as MPMC queue |
| reagent[`bus] | Much like an async reagent but allows to create reactions on it from different tasks |
| reagent[`timer;timeout;repeat] | TIMER reagent: timeout in ms, repeat: 0 means forever |
| reagent[`state;other_reagent] | Special reagent for tracking state of another reagent |

Some reagents are shipped as plugins:

| Arguments | Description |
| --- | --- |
| reagent[`kdb_listener] | Reagent listener specific for kdb+ ipc protocol |
| reagent[`kdb;"addr:port"] | Reagent for kdb+ ipc protocol (client side) |

Another important thing about reagents is that they can be used in declarative programming through declaring reactions:

```o
o)r:reagent[`async];
o)react {[x:r] println["received: %";x]};
o)r[1];
received: 1
o)
```

As you can see, react[..] verb accepts lambda as a reaction body. The only difference from a regular lambda is arguments: they have "reagent-bound" definition.

Of course, reactions can (and usually do) have more then one argument. Such reactions trigger only when all the arguments are ready:

```o
o)r1:reagent[`async]; r2:reagent[`async];
o)react {[x:r1;y:r2] println["X: % Y: %";x;y]};
o)r1[1];
o)// Nothing happens because there is no r2 yet.
o)r2[2];
X: 1 Y: 2
o)
```

Use the verb `meta[]` with reagents to see info about them:

```o
o)meta r1
id  | 4
type| "async"
o)
```

::: warn
Reactions on the same reagent are only allowed from the same task.
:::

Reagents mostly behave as any other type in O (they are first class objects) but have some limitations:

- cannot be serialized;
- cannot be passed through the IPC.

Any other operations are allowed with reagents as well as with any other type in O:

```o
o)r:reagent[`async];
o)meta r
id  | 6
type| "async"
o)react {[x:r] 0N!x};
o)// and it doesn't allow defining reaction on r from another task
o)spawn { react {[x:r] 0N!x} }
<Reagent#8>
WARN  base    > Task <react {[x:r] 0N!x} >
** I/O error: `react`:
-- {[x:r] 0N!x}
-- receiver has been already taken
** stack backtrace:
 [0]: "REPL":1
>
  {react {[x:r] 0N!x} }
<
**
o)// only from the same task
o)react {[x:r] 0N!x+1}
2
o)
```

There is a specific type of reagent: taskhandle. It can not be created through calling reagent[] verb,
it is a result of calling spawn[]. In all other aspects it behaves as well as any other reagent:

```o
o)r: reagent[`async]
<Reagent#9>
o)h: spawn {100{x+1}/1}
<Reagent#11>
o)react {[x:r;y:h] println["X: % Y: %";x;y]};
o)r[6];
X: 6 Y: 101
o)
```

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
[log](/reference/types/reagents/log.md)
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
