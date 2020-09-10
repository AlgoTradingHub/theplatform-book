# Reagents and reactions

In contrast with Kdb implicit parallelism (peach), we support explicit one, based on [Join-calculus](https://en.wikipedia.org/wiki/Join-calculus).
It has been added on last stage of development process and is subject to change (both syntax and implementation).

The idea is to unify different kinds of datastreams and make an instrument for easy programming in declarative way. It's expressed in two kinds of abstractions: reagents and reactions. Each reagent describes the stream of data while reaction is a rule which triggered when all reagents this rule holds are present the same time.
Currently we have such types of reagents: async, sync, tty, tcp, log, ws, kdb, http.
New ones easily could be added through the [plugins interface](https://github.com/AlgoTradingHub/kernel/tree/master/doc/o/plugins.md)
Reagent could be sync or async. Sync one locks until returned from call.
There are two language constructions each for reagent and reaction:

```o
reagent[`type;args]
react[{[args] body}]
```

As it could be seen, reagent[..] is polyadic (accept various number of arguments).
For reagent call the first argument is always Symbol, specifies the type of reagent, others are actual arguments for this specific type of reagent.
Unlikely reagent[..], react[] is monadic, accepts the lambda to be evaluated when reaction triggered. If lambda's body consists of match [..] {..} construction, this reaction doesn't pop its arguments unless the pattern matches. And the last important construction is spawn[..]. That's what makes things concurrent. spawn[..] is polyadic too, the first argument is lambda to be launched concurrently, others are arguments to this lambda. To run eventloop we call join[]. Let's mix up things together.

## Create reagent of type tty

```o
repl:reagent[`tty];
```

## Create reaction to be triggered on this reagent

```o
react[{[x:repl] 0N!x}];
```

## For real example let's implement REPL (Read-Eval-Print loop):

```o
repl: reagent[`tty];
ps1:  {print["o)"]};
out:  {repl[x]; ps1[]};
react {[x:repl] out[x]};
ps1[];
join[];
```

Here we've created reagent of type tty which operates with Stdio/Stdout. Assigned reaction on this reagent which simply print out the result of evaluated expression.

## More complicated example: tcp server which listens KDB+ tick updates and allows various clients to connect and subscribe onto some data specified by query (called view).

```o
pargs: argv[];
// path where to search plugins
plugdir: pargs`p;
// load KDB+ plugin
load plugdir,"/libkdb.so";
//
views:(`long$())!();
// listener
listener: reagent[`tcp;"0.0.0.0:5101"];
// kdb+ connector
kcon: reagent[`kdb;"127.0.0.1:20000:O"];
// sync primitives
mutex: reagent[`async]; acquire: reagent[`async]; release: reagent[`async];
dump:  reagent[`async]; update:  reagent[`async]; delete:  reagent[`async];
// evaluate client's query and send the result back
procView: {[qs]
    r:.[{y[eval x]};qs;{x}];
    $[null r;;delete[qs 2]];
    release[];
};
// process all subscribers
procViews: { {acquire[]; spawn[procView;x]}'(. views) };
// subscribe to async updates and receive first portion of data
table: kcon[".net.sub 0"];
// delete view
react[{[x:mutex;y:delete] match [x;y] {
    (0;_) -> {
        out[format["delete view: %";y]];
        .[`views;();_;y];
        mutex[0]
    };
    _ -> 0b;
    }
}];
// inc/dec mutex counter atomically
react[{[x:mutex;y:acquire] mutex[x+1]}];
react[{[x:mutex;y:release] $[x>0;mutex[x-1]; mutex[0]]}];
// enqueue update request
react[{[x:kcon] update[x]}];
// spawn update connection handler
react[{[x:mutex;y:update] match [x;y] {
        (0;_) -> {
            `table insert y[1];
            procViews[];
            mutex[0]
        };
        _ -> 0b;
    }
}];
// spawn request connection handler
react[{[x:listener]
    h:reagent[`tcp;`msgpack;x];
    react[{[x:h]
        out[format["add view: %";x]];
        v:(!views);
        m:$[0<(#v);1+last v;0];
        views[m]:(x;h;m);
    }]
}];
// dump current mutex counter
react[{[x:dump;y:mutex] out["mutex counter: ", $y]; mutex[y]}];
// initial sync
mutex[0];

// REPL
repl: reagent[`tty];
ps1:  {print["o)"]};
out:  {repl[x]; ps1[]};
react {[x:repl] out[x]};
ps1[];
join[];
```
