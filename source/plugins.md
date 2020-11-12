# Plugins

The platform allows creation two types of plugins:

- stateless functions
- stateful reagents

The first one can be used for definition own monads/dyads/triads/tetrads/polyads...
Let's implement own add function:
Firstly, make some preparations:

```Rust
#[macro_use]
extern crate ext;
use ext::{Interpreter, AST};
```

Define own function:

```Rust
#[unwind(allowed)]
extern  fn add_fn(lhs: &AST, rhs: &AST, i: &Interpreter) -> AST {
    match (lhs.tp(), rhs.tp()) {
        (SC_LONG, SC_LONG) => {
            i.new_scalar_long(lhs.long() + rhs.long())
        }
        _ => i.new_signal(i.new_string("nyi"))
    }
}
```

Finaly, register newly created function:

```Rust
declare_plugin!(
    // constructor
    |i: &Interpreter| {
        // register own function inside interpreter's environment
        let sym = i.intern_string("add");
        i.insert_entity(sym, i.new_verb_dyad(add_fn));
        i.new_string("add registered")
    },
    // destructor
    || {}
);
```

Let's test our function through the interpreter:

```o
o)load "libsimple_plugin.so"
"add registered"
o)add[1;2]
3
o)add[1;`2]
nyi
o)1 add 2
3
o)1 add `2
nyi
o)
```

That's all! Simple, right?
Ok, now we are ready to create stateful reagent. Let it be our own implementation of REPL.

The preparation stage is a little bit longer:

```Rust
use ext::{In, Out, Pipeline, State, AST, Interpreter, ErrorKind};
use mio::unix::EventedFd;
use mio::*;
use rt::rtalloc::ushared::extend_lifetime;
use std::cell::UnsafeCell;
use std::io;
use std::io::Read;
```

Define the size of buffer to hold data, readed from STDIN

```Rust
const BUFFER_SIZE: usize = 64000000;
```

Core part of each reagent is a PIPE - sender and receiver:

```Rust
pub struct Receiver {
    i: &'static Interpreter,
    buf: UnsafeCell&ltVec&ltu8>>,
}

#[derive(Clone)]
pub struct Sender {
    i: &'static Interpreter,
}
```

To make them actual reagents, implement some traits:

```Rust
impl Out&ltAST> for Sender {
    fn push(&self, v: AST) -> Result&lt(), ErrorKind> {
        self.i.print_format(&v);
        Ok(())
    }
    fn try_push(&self, _v: AST) -> Option&ltAST> { None }
    fn box_clone(&self) -> Box&ltOut&ltAST>> { Box::new((*self).clone()) }
}

impl Evented for Receiver {
    fn register(&self, poll: &Poll, token: Token, interest: Ready, opts: PollOpt) -> io::Result&lt()> {
        EventedFd(&0).register(poll, token, interest, opts)
    }
    fn reregister(&self, poll: &Poll, token: Token, interest: Ready, opts: PollOpt) -> io::Result&lt()> {
        EventedFd(&0).reregister(poll, token, interest, opts)
    }
    fn deregister(&self, poll: &Poll) -> io::Result&lt()> { EventedFd(&0).deregister(poll) }
}

impl In&ltAST> for Receiver {
    fn pop(&self) -> AST {
        unsafe {
            let input = self.buf.get();
            let size = io::stdin().read(&mut (*input)).expect("STDIN error.");
            let ast = self.i.parse(&(*input)[..size]);
            self.i.eval(&ast)
        }
    }
    fn try_pop(&self) -> Option&ltAST> { None }
    fn peek(&self) -> Option&lt&AST> { None }
    fn ready(&self, _readiness: Ready) -> State { State::Ready }
}
```

Define registration function, that will be called on reagent creation:

```Rust
#[unwind(allowed)]
unsafe extern "C" fn simple_reagent(_: &[AST], i: &Interpreter) -> Pipeline&ltAST> {
    let tx = box Sender { i: extend_lifetime(i) };
    let rx = box Receiver {
        i: extend_lifetime(i),
        buf: UnsafeCell::new(vec![0u8; BUFFER_SIZE]),
    };
    Pipeline::new_async(rx, tx)
}
```

Almost done, left to register our plugin:

```Rust
declare_plugin!(
    // constructor
    |i: &Interpreter| {
        i.register_reagent("simple", simple_reagent);
        i.new_string("simple reagent registered")
    },
    // destructor
    || {}
);
```

Now we can load our plugin into interpreter:

```o
load "platform/plugins/simple_reagent/target/debug/libsimple_reagent.so";
repl: reagent[`simple];
ps1:  {print["o)"]};
out:  {repl[x]; ps1[]};
react {[x:repl] out[x]};
ps1[];
join 0;
```
