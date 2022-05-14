# Reagent Kdb+

Reagent implements KDB+ ipc protocol. Can be created directly by call ``reagent[`kdb;"host:port"]`` or
returns from reagent `` `kdb_listener`` as a value.

```o
o)load "kdb";
o)kdb_listener: reagent[`kdb_listener;"0.0.0.0:5100"];
o)spawn {react {[cli: kdb_listener] spawn[{[cli] react {[x: cli] cli[@[{eval parse x};x;{`error$x}]]}};cli]}};
```

```o
o)load "kdb";
o)kdb: reagent[`kdb;"127.0.0.1:5100"];
o)react {[x:kdb] println["kdb server reply: %";x]};
o)// send request to a kdb server:
o)kdb["1+2"];
kdb server reply: 3
```

::: see
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
