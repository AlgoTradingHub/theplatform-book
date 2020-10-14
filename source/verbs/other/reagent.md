# reagent

Creates reagent - async participant of reactions

**Syntax:** ```reagent[..]```

It's a polyadic function. Arguments types and count depends on type of reagent

Currently these types of reagents are exists:

| Reagent | Description |
| --- | --- |
| reagent[\`async] | MPSC channel |
| reagent[\`tcp;"host:port";\`listen] | TCP IPC listener |
| reagent[\`tcp;"host:port"] | TCP IPC client |
| reagent[\`tcp;\`raw;"host:port"] | TCP RAW client |
| reagent[\`tty] | CONSOLE reagent |
| reagent[\`log;\`:/path/to/logfile.log] | LOG reagent |
| reagent[\`udp;"host:port"] | UDP reagent |
| reagent[\`timer;ms_timeout;repeat] | TIMER reagent |

Reagent could have optional destructor as last argument. It will be called upon freeing reagent

```o
o)r:reagent[`timer;1000;3;{0N!"timer dropped: ",x}];
..
o)"timer dropped: expired"
```
