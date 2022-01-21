# Usage

## Command-line usage

To control internal system logging ```OLOG``` environment variable is to be used. See supported values for this variables below. 

Values are organized in levels. That is top level ```error``` is the least level of verbosity. ```trace``` level is the highest including all lower levels.

| OLOG value | Meaning |
| --- | --- |
| error  | Serious errors |
| warn  | Warnings, things to pay attention to |
| info  | Any useful information |
| debug  | Debugging information |
| trace  | Verbose logging used for debugging only |

```debug``` level also controls emitting native stack dumps when platform is built with debug info. This is especially useful for debugging complex
 multithreaded system issues which is often next to impossible to reproduce.

Usage example:

```os
$ OLOG="debug" tachyon
```
```o
o) {x+1}"123"
 DEBUG base::interpreter     >    0: base::interpreter::Interpreter::o_error
             at kernel/o/base/src/interpreter.rs:1482
   1: base::interpreter::Interpreter::runtime_error
             at kernel/o/base/src/interpreter.rs:1524
   2: dyad1::dyad::plus::{{closure}}
             at kernel/o/dyad1/src/dyad.rs:567
   3: dyad1::dyad::arith_temporal_pred
             at kernel/o/dyad1/src/dyad.rs:520
   4: dyad1::dyad::arith_temporal_xor
             at kernel/o/dyad1/src/dyad.rs:537
   5: plus
             at kernel/o/dyad1/src/dyad.rs:568
   6: apply_dyad
             at kernel/o/monad/src/apply.rs:334
   7: eval
             at kernel/o/monad/src/monad.rs:79
   8: base::eval_sequence_guarded::{{closure}}
             at kernel/o/base/src/lib.rs:127
   9: rt::try_std::do_call
             at kernel/rt/src/lib.rs:665
  10: __rust_try
  11: rt::try_std
             at kernel/rt/src/lib.rs:642
  12: base::eval_sequence_guarded
             at kernel/o/base/src/lib.rs:121
  13: base::eval_sequence
             at kernel/o/base/src/lib.rs:108
  14: monad::apply::lambda_in_frame_inner
             at kernel/o/monad/src/apply.rs:581
      lambda
             at kernel/o/monad/src/apply.rs:610
  15: apply_lambda
             at kernel/o/monad/src/apply.rs:387
  16: apply
             at kernel/o/monad/src/apply.rs:568
  17: eval
             at kernel/o/monad/src/monad.rs:86
  18: apply_monad
             at kernel/o/monad/src/apply.rs:325
  19: eval
             at kernel/o/monad/src/monad.rs:79
  20: base::eval_sequence_guarded::{{closure}}
             at kernel/o/base/src/lib.rs:127
  21: rt::try_std::do_call
             at kernel/rt/src/lib.rs:665
  22: __rust_try
  23: rt::try_std
             at kernel/rt/src/lib.rs:642
  24: base::eval_sequence_guarded
             at kernel/o/base/src/lib.rs:121
  25: base::eval_sequence
             at kernel/o/base/src/lib.rs:108
  26: monad::apply::lambda_in_frame_inner
             at kernel/o/monad/src/apply.rs:581
      monad::apply::lambda_in_frame
             at kernel/o/monad/src/apply.rs:588
  27: lambda_call
             at kernel/o/monad/src/apply.rs:702
  28: funcall
             at kernel/o/monad/src/apply.rs:657
  29: triad::triad::amend::f::{{closure}}
             at kernel/o/triad/src/triad.rs:716
  30: rt::try_std::do_call
             at kernel/rt/src/lib.rs:665
  31: __rust_try
  32: rt::try_std
             at kernel/rt/src/lib.rs:642
  33: triad::triad::amend::f
             at kernel/o/triad/src/triad.rs:716
  34: triad::triad::amend
             at kernel/o/triad/src/triad.rs:861
  35: amend_triad
             at kernel/o/triad/src/triad.rs:868
  36: apply_triad
             at kernel/o/monad/src/apply.rs:343
  37: eval
             at kernel/o/monad/src/monad.rs:79
  38: put
             at kernel/o/dyad1/src/dyad.rs:1884
  39: apply_dyad
             at kernel/o/monad/src/apply.rs:334
  40: eval
             at kernel/o/monad/src/monad.rs:79
  41: base::eval_sequence_guarded::{{closure}}
             at kernel/o/base/src/lib.rs:124
  42: rt::try_std::do_call
             at kernel/rt/src/lib.rs:665
  43: __rust_try
  44: rt::try_std
             at kernel/rt/src/lib.rs:642
  45: base::eval_sequence_guarded
             at kernel/o/base/src/lib.rs:121
  46: base::eval_sequence
             at kernel/o/base/src/lib.rs:108
  47: monad::apply::lambda_in_frame_inner
             at kernel/o/monad/src/apply.rs:581
      lambda
             at kernel/o/monad/src/apply.rs:610
  48: monad::apply::fapply
             at kernel/o/monad/src/apply.rs:270
  49: apply_sym
             at kernel/o/monad/src/apply.rs:285
  50: apply
             at kernel/o/monad/src/apply.rs:568
  51: eval
             at kernel/o/monad/src/monad.rs:86
  52: base::eval_sequence_guarded::{{closure}}
             at kernel/o/base/src/lib.rs:127
  53: rt::try_std::do_call
             at kernel/rt/src/lib.rs:665
  54: __rust_try
  55: rt::try_std
             at kernel/rt/src/lib.rs:642
  56: base::eval_sequence_guarded
             at kernel/o/base/src/lib.rs:121
  57: reactor::reaction::Reaction::eval_move
             at kernel/o/reactor/src/reaction.rs:79
  58: reactor::reaction::Reaction::eval
             at kernel/o/reactor/src/reaction.rs:50
  59: reactor::reactor::Reactor::join
             at kernel/o/reactor/src/reactor.rs:223
  60: tachyon::concurrent::{{closure}}::{{closure}}
             at src/apps/tachyon.rs:256
  61: rt::try_std::do_call
             at kernel/rt/src/lib.rs:665
  62: __rust_try
  63: rt::try_std
             at kernel/rt/src/lib.rs:642
  64: tachyon::concurrent::{{closure}}
             at src/apps/tachyon.rs:252
  65: core::ops::function::FnOnce::call_once
             at /home/denis/.rustup/toolchains/nightly-x86_64-unknown-linux-gnu/lib/rustlib/src/rust/library/core/src/ops/function.rs:227
  66: rt::task::Task::new::{{closure}}
             at kernel/rt/src/task/mod.rs:67
  67: generator::gen_impl::GeneratorImpl<A,T>::init_code::{{closure}}
             at /home/denis/.cargo/registry/src/github.com-1ecc6299db9ec823/generator-0.6.24/src/gen_impl.rs:308
  68: generator::stack::StackBox<F>::call_once
             at /home/denis/.cargo/registry/src/github.com-1ecc6299db9ec823/generator-0.6.24/src/stack/mod.rs:139
  69: generator::stack::Func::call_once
             at /home/denis/.cargo/registry/src/github.com-1ecc6299db9ec823/generator-0.6.24/src/stack/mod.rs:121
  70: generator::gen_impl::gen_init::{{closure}}
             at /home/denis/.cargo/registry/src/github.com-1ecc6299db9ec823/generator-0.6.24/src/gen_impl.rs:510
  71: core::ops::function::FnOnce::call_once
             at /home/denis/.rustup/toolchains/nightly-x86_64-unknown-linux-gnu/lib/rustlib/src/rust/library/core/src/ops/function.rs:227
  72: std::panicking::try::do_call
             at /home/denis/.rustup/toolchains/nightly-x86_64-unknown-linux-gnu/lib/rustlib/src/rust/library/std/src/panicking.rs:379
  73: __rust_try
  74: std::panicking::try
             at /home/denis/.rustup/toolchains/nightly-x86_64-unknown-linux-gnu/lib/rustlib/src/rust/library/std/src/panicking.rs:343
  75: std::panic::catch_unwind
             at /home/denis/.rustup/toolchains/nightly-x86_64-unknown-linux-gnu/lib/rustlib/src/rust/library/std/src/panic.rs:431
  76: generator::gen_impl::gen_init
             at /home/denis/.cargo/registry/src/github.com-1ecc6299db9ec823/generator-0.6.24/src/gen_impl.rs:524

** runtime error: `+`:
"123"
1
** stack backtrace:
 [0]: REPL:1
>
  {x+1}
<
**
o)
```
