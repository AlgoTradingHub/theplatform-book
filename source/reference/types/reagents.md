# Reagents

O language has a specific reagent type that deals with I/O. Some reagents are built-in:

| Arguments | Description |
| --- | --- |
| reagent[`tty;&lt{destructor}>] | Console reagent |
| reagent[`listener;"addr:port";&lt{destructor}>] | TCP listener reagent |
| reagent[`tcp;"addr:port";&lt{destructor}>] | TCP reagent (client side) |
| reagent[`tcp;Handle;&lt{destructor}>] | TCP reagent (server side) |
| reagent[`ipc;"addr:port";&lt{destructor}>] | IPC reagent (client side) |
| reagent[`ipc;Handle;&lt{destructor}>] | IPC reagent (server side) |
| reagent[`udp;"addr:port";&lt{destructor}>] | UDP reagent |
| reagent[`async;&lt{destructor}>] | MPSC reagent without blocking on sender side |
| reagent[`sync;&lt{destructor}>] | MPSC reagent with blocking on sender side |
| reagent[`timer;timeout;repeat;&lt{destructor}>] | TIMER reagent: timeout in ms, repeat: 0 means forever |

Reagents can have an optional destructor passed as a lambda to the last argument in a reagent[..] call.

```o
o)r:reagent[`async;{0N!"done"}];
o)r:();
"done"
o)
```

Another important thing about reagents is that they can be used in declarative programming through declaring reactions:

```o
o)r:reagent[`async];
o)react {[x:r] println["received: %";x]};
o)r[1];
o)received: 1
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
o)X: 1 Y: 2
o)
```

Use the verb `meta[]` with reagents to see info about them:

```o
o)meta r1
type      | `reagent
id        | 3i
descriptor| `value`prefix`suffix!(4294967297;1i;1i)
rx        | ,`type!,`async
cache     | ()
destructor| 0N0
error     | 0N0
o)
```

An important thing here is a Descriptor. When we define react on a reagent, the last one receives a unique Descriptor, that identifies this reagent inside IO scheduler.

::: warn
Reactions on the same reagent are only allowed from the same task.
:::

Reagents mostly behave as any other type in O (they are first class objects) but have some limitations:

- cannot be serialized;
- cannot be passed through the IPC.

Any other operations are allowed with reagents as well as with any other type in O:

```o
o)r:reagent[`async];
o)// r has no Descriptor yet
o)meta r
type      | `reagent
id        | 5i
descriptor| 0N0
rx        | ,`type!,`async
cache     | ()
destructor| 0N0
error     | 0N0
o)react {[x:r] 0N!x};
o)// now it has
o)meta r
type      | `reagent
id        | 5i
descriptor| `value`prefix`suffix!(4294967299;1i;3i)
rx        | ,`type!,`async
cache     | ()
destructor| 0N0
error     | 0N0
o)// and it doesn't allow defining reaction on r from another task
o)spawn { react {[x:r] 0N!x} }
TaskHandle&lt6>
o)Task &ltreact {[x:r] 0N!x} > terminated with signal:
** exec error: `react` forbidden:..
--

o)// only from the same task
o)react {[x:r] 0N!x+1}
2
o)
```

::: see
[reagent](/verbs/other/reagent.md)
[react](/verbs/other/react.md)
[close](/verbs/other/close.md)
[meta](/verbs/other/meta.md)
:::
