# kill

Sends a kill signal to the task by a task handle or to itself.

**Syntax:** ``` kill c; kill[c]; kill[h;c] ```

Where:

- c is a kill code number;
- h is a task handle to be killed.

```o
o)h: spawn { r:reagent[`async]; react {[x:r] 0N!x}};
o)top[]
tid handle      name                     state   created      run          iowait       total        load
---------------------------------------------------------------------------------------------------------
0   <Reagent#6> "main"                   Running 11:54:05.200 00:00:00.398 00:00:08.559 00:00:08.957 0
3   <Reagent#7> "r:reagent[`async]; r.." IOWait  11:54:10.850 00:00:00.001 00:00:03.306 00:00:03.307 0
o)kill[h;101]
o)h: spawn { r:reagent[`async]; react {[x:r] 0N!x}};
o)top[]
tid handle       name                     state   created      run          iowait       total        load
----------------------------------------------------------------------------------------------------------
0   <Reagent#11> "main"                   Running 11:54:05.200 00:00:00.410 00:01:27.216 00:01:27.626 0
8   <Reagent#12> "r:reagent[`async]; r.." IOWait  11:55:26.500 00:00:00.001 00:00:06.326 00:00:06.327 0
o)kill[h;0]
o)top[]
tid handle       name   state   created      run          iowait       total        load
----------------------------------------------------------------------------------------
0   <Reagent#13> "main" Running 11:54:05.200 00:00:00.414 00:01:51.654 00:01:52.068 0
o)spawn {kill[102]}
<Reagent#15>
o)kill 0
```

::: see
[react](/verbs/concurrency/react.md)
[reagent](/verbs/concurrency/reagent.md)
[spawn](/verbs/concurrency/spawn.md)
[top](/verbs/concurrency/top.md)
[exit](/verbs/concurrency/exit.md)
:::
