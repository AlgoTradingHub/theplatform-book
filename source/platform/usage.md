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


Usage example:

```os
$ OLOG="info" tachyon
```
```o
Tachyonic platform 0.1.0
Build hash 529a35cf1baeb5f89f6d296687e0b8e3fd19d5b8
Build date 2022-02-14 14:26:50
Built with rustc 1.54.0-nightly (657bc0188 2021-05-31)
Build opts profile:debug dbg_asserts:on dbg_info:off
-------------------------------------------------------
CPU cores: 12
MEMORY: total: 16777216, free: 3793848, avail: 1423292
HOSTNAME: Serhiis-MBP
OS: Darwin
OS version: 21.2.0
Created pool with 1 cores
Thread stack size: 2048 kb
Lambda stack size: 4096 kb
Allocator pool size: 64 mb
Started with : []
-------------------------------------------------------
o){x+1}"123"
** runtime error: `+`:
"123"
1
** stack backtrace:
 [0]: "REPL":1
>
  {x+1}
<
**
o)
```

```debug``` level also controls emitting native stack dumps when platform is built with debug info. This is especially useful for debugging complex
 multithreaded system issues which is often next to impossible to reproduce.

```os
$ OLOG="debug" tachyon
```
```o
o){x+1}"123"
 DEBUG rt      >
   0: backtrace::backtrace::trace_unsynchronized
   1: backtrace::backtrace::trace
   2: backtrace::capture::Backtrace::create
   3: backtrace::capture::Backtrace::new
   4: rt::backtrace
   5: base::interpreter::Interpreter::o_error
   6: base::interpreter::Interpreter::runtime_error
   7: dyad1::dyad::plus::{{closure}}
   8: dyad1::dyad::arith_temporal_pred
   9: dyad1::dyad::arith_temporal_xor
  10: _plus
  11: apply_dyad@@32
  12: _eval
  13: base::eval_sequence_guarded::{{closure}}
  14: rt::try_std::do_call
  15: ___rust_try
  16: rt::try_std
  17: base::eval_sequence_guarded
  18: base::eval_sequence
  19: monad::apply::lambda_in_frame
  20: monad::apply::lambda_call_iter
  21: monad::apply::lambda_in_frame
  22: apply_lambda@@32
  23: apply@@32
  24: _eval
  25: tachyon::repl::{{closure}}
  26: rt::try_std::do_call
  27: ___rust_try
  28: rt::try_std
  29: tachyon::repl
  30: _console
  31: tachyon::single
  32: tachyon::run
  33: tachyon::main
  34: core::ops::function::FnOnce::call_once
  35: std::sys_common::backtrace::__rust_begin_short_backtrace
  36: std::rt::lang_start::{{closure}}
  37: std::rt::lang_start_internal
  38: std::rt::lang_start
  39: _main

** runtime error: `+`:
"123"
1
** stack backtrace:
 [0]: "REPL":1
>
  {x+1}
<
**
o)
```
