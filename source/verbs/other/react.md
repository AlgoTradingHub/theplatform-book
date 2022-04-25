# react

Creates reaction on a reagents set.

**Syntax:** ```react{[x:r1;y:r2..]..}; react[{[x:r1;y:r2..]..}]```

Where:
    - x,y,.. are arguments of a lambda to be evaluated on reaction triggering;
    - r1;r2.. are reagents involved into reaction.

```o
o)r:reagent[`async];
o)react{[x:r] 0N!x};
o)r[123];
123
o)
```

Reactions can be redefined. To do this, just create reaction on the set of reagents already defined.

::: note
When a reaction is defined, each reagent envolved receives a Descriptor. This means "pinning" that reagent onto the Task that has this reaction.
:::

```o
o)r1:reagent[`async]; r2:reagent[`async]; react {[x:r1;y:r2] println["// r1: %; r2: %";x;y]};
o)r1[1];r2[2]
// r1: 1; r2: 2
o)// Now redefine reaction:
o)react {[x:r1;y:r2] println["// redefined reaction: r1: %; r2: %";x;y]};
o)r1[1];r2[2]
// redefined reaction: r1: 1; r2: 2
o)
```

If a reagent is dropped, all reactions defined on this reagent will be dropped too since there is no need in them anymore.

::: note
If a task has at least one reaction, it's called an IO task. Such task will wait on IO resources involved into reaction(s) and won't be terminated untill signal or exception is received or all reactions are dropped.
:::

Let's see dynamic creation of reagents/reactions in a wide practical example of a ipc server:

```o
srv: reagent[`listener;"0.0.0.0:5100"];
react {[x:srv]
    // create new IO task to handle client's session
    spawn[{[cli]
        client: reagent[`ipc;cli]; // create ipc client on accepted sock
        react {[msg:client] // dynamically define reaction on newly created reagent
            client[msg] // echo back to a client
        }
    };x]
};
```

Thats all! Session-based asynchronuous server is done. Simple, yes? To see which tasks exist and their state, use [top](/verbs/concurrency/top.md):

```o
o)top[]
tid handle       name                      state   created      run          iowait       total        load
-----------------------------------------------------------------------------------------------------------
0   &ltReagent#7&gt "main"                    IOWait  19:13:46.141 00:00:00.333 00:00:00.393 00:00:00.726 0
```

::: see
[reagent](/verbs/other/reagent.md)
[spawn](/verbs/concurrency/spawn.md)
[top](/verbs/concurrency/top.md)
:::
