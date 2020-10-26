# react

Creates reaction on a reagents set

**Syntax:** ```react{[x:r1;y:r2..]..}; react[{[x:r1;y:r2..]..}]```

Where:
    - x,y,..: arguments of a lambda to be evaluated on triggering of reaction
    - r1;r2..: reagents involved into reaction

```o
o)r:reagent[`async];
o)react{[x:r] 0N!x};
o)r[123];
o)123
```

Reactions can be redefined. To do this just create reaction on the set of reagents that already defined.

::: note
When a reaction defined - each reagent envolved receives a Descriptor. This means "pinning" that reagent onto the Task that has this reaction.
:::

```o
o)r1:reagent[`async]; r2:reagent[`async]; react {[x:r1;y:r2] println["r1: %; r2: %";x;y]};
o)r1[1];r2[2]
o)r1: 1; r2: 2
o)// Now redefine reaction:
o)react {[x:r1;y:r2] println["redefined reaction: r1: %; r2: %";x;y]};
o)r1[1];r2[2]
o)redefined reaction: r1: 1; r2: 2
```

If a reagent dropped - all reactions defined on this reagent will be dropped too since they doesn't have sence anymore.

::: note
If a task has at least one reaction - it called an IO task. It means such a task will wait on IO resources involved into reaction(s) and wouldn't be terminated untill signal or exception received or all reactions be dropped.
:::

Let's see dynamic creation of a reagents/reactions in a wide practical example of a ipc server:

```o
srv: reagent[`listener;"0.0.0.0:5100";{0N!"listener dropped}];
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

Thats all! Session-based asynchronuous server is done. Simple, yes?
Tos see which tasks are exists and in what state - use top[]:

```o
o)top[]
tid handle        state  created      run          suspend      iowait       total        load
----------------------------------------------------------------------------------------------
7   TaskHandle<7> IOWait 12:28:14.905 00:07:40.899 00:00:00.000 00:21:02.616 00:28:43.515 0
4   TaskHandle<4> IOWait 12:28:14.552 00:00:00.001 00:00:00.000 00:28:43.869 00:28:43.870 0
```

::: see
[reagent](/verbs/other/reagent.md)
[top](/verbs/other/top.md)
:::