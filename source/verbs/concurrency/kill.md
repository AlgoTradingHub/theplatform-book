# kill

Sends a kill signal to the task by a task handle or to itself.

**Syntax:** ``` kill c; kill[c]; kill[h;c] ```

Where:

- c is a kill code number;
- h is a task handle to be killed.

```o
o)h: spawn { r:reagent[`async]; react {[x:r] 0N!x}};
o)top[]
tid handle        state  created      run          suspend      iowait       total        load
----------------------------------------------------------------------------------------------
3   TaskHandle<3> IOWait 15:04:02.972 00:00:00.000 00:00:00.000 00:00:02.100 00:00:02.100 0
o)kill[h;101]
o)Task <r:reagent[`async]; react {[x:r] 0N!x}>
 -- killed with code: 101

o)h: spawn { r:reagent[`async]; react {[x:r] 0N!x}};
o)top[]
tid handle        state  created      run          suspend      iowait       total        load
----------------------------------------------------------------------------------------------
5   TaskHandle<5> IOWait 15:04:18.091 00:00:00.000 00:00:00.000 00:00:06.357 00:00:06.357 0
o)kill[h;0]
o)top[]
tid handle state created run suspend iowait total load
------------------------------------------------------
o)spawn { kill[102] }
TaskHandle<7>
o)Task <kill[102] >
 -- killed with code: 102
o)
```

::: see
[react](/verbs/other/react.md)
[reagent](/verbs/other/reagent.md)
[spawn](/verbs/concurrency/spawn.md)
[top](/verbs/concurrency/top.md)
[exit](/verbs/other/exit.md)
:::
