# Reagents

O language has specific type deals with I/O called reagent.
There are some number of built-in reagents:

| Arguments | Description |
| --- | --- |
| reagent[`tty;<{destructor}>] | Console reagent |
| reagent[`listener;"addr:port";<{destructor}>] | TCP listener reagent |
| reagent[`tcp;"addr:port";<{destructor}>] | TCP reagent (client side) |
| reagent[`tcp;Handle;<{destructor}>] | TCP reagent (server side) |
| reagent[`ipc;"addr:port";<{destructor}>] | IPC reagent (client side) |
| reagent[`ipc;Handle;<{destructor}>] | IPC reagent (server side) |
| reagent[`udp;"addr:port";<{destructor}>] | UDP reagent |
| reagent[`log;`:/file;<{destructor}>] | LOG reagent |
| reagent[`async;<{destructor}>] | MPSC reagent without blocking on sender side |
| reagent[`sync;<{destructor}>] | MPSC reagent with blocking on sender side |
| reagent[`timer;timeout;repeat;<{destructor}>] | TIMER reagent: timeout in ms, repeat: 0 means forever |

Reagents optionally can have a destructor passed as a lambda to a last argument in a reagent[..] call.

```o
o)r:reagent[`async;{0N!"done"}];
o)r:();
"done"
o)
```

Other important thing about reagents: is that ones can be used in declarative programming through declaring reactions:

```o
o)r:reagent[`async];
o)react {[x:r] println["received: %";x]};
o)r[1];
o)received: 1
```

As it can be seen, react[..] verb accepts lambda as a reaction body. The only difference with a regular lambda is its arguments: ones have "reagents-bound" definition.

Of course, reactions can (and usyally are) have more then one argument. Such reactions triggers only when all the asrguments are ready:

```o
o)r1:reagent[`async]; r2:reagent[`async];
o)react {[x:r1;y:r2] println["X: % Y: %";x;y]};
o)r1[1];
o)// Nothing happens because there is no r2 yet.
o)r2[2];
o)X: 1 Y: 2
```

meta[] verb can also be used with reagents to see info about them:

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

An important thing here is a Descriptor. When we define react on a reagent, the last one receives unique Descriptor,
that identifies this reagent inside IO scheduler.

::: warn
Reactions on same reagent only allowed from the same task.
:::

Reagents mostly behaves as any other types in O (they are first class objects) but have some limitations:

- Could not be serialized
- Could not be passed through the IPC

Any other things are allowed for reagents as well as for any other type in O.

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
o)// and it doesn't allow to define reaction on r from another task
o)spawn { react {[x:r] 0N!x} }
TaskHandle<6>
o)Task <react {[x:r] 0N!x} > terminated with signal:
** exec error: `react` forbidden:..
--

o)// just from the same task
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
