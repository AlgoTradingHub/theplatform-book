# Reagent udp

Reagent for making udp sockets.

**Syntax:** ```reagent[`udp;"host:port";["multicast_addr"]]```

```o
o)srv: reagent[`udp;"0.0.0.0:31337"];
o)react {[x:srv] println["request from udp client: %";"c"$x[0]]; srv[x]; close[srv]};
o)cli: reagent[`udp;"0.0.0.0:45667"];
o)react {[x:cli] println["reply from udp server: %";"c"$x[0]]; close[cli]};
o)cli[("hello";"127.0.0.1:31337")];
request from udp client: hello
reply from udp server: hello
o)
```

Joining multicast group:

```o
o)// join udp socket to a multicast group 224.1.1.1
o)srv: reagent[`udp;"0.0.0.0:5007";"224.1.1.1"];
o)react {[x:srv] println["-- data from udp multicast: %";"c"$x[0]]};
o)cli: reagent[`udp;"0.0.0.0:12345"];
o)// send data to a multicast address
o)cli[("hello";"224.1.1.1:5007")];
-- data from udp multicast: hello
o)
```

::: see
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
