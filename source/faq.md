# Frequently asked questions


### How do I delete records from a table?

Don't do that. Seriously. Just select records you want to retain and replace original table.

### I want to make my O script both executable and loadable and pass command-line parameters to it.

Use the following shebang under Linux - ``#!/usr/bin/env -S bash -c 'cat "$0" | sed "1,1d" | tachyon -- $@'``. You need to use coreutils 8.30+ though.

## Debugging

### How can I find memory leaks in tachyon binary?

Run tachyon using ``$ RUSTFLAGS="-Z sanitizer=leak -Cforce-frame-pointers=yes" cargo run --bin tachyon``. To get meaningful backtraces, you must have ``llvm-symbolizer`` accessible in ``$PATH`` (LLVM 8+). If your Linux distribution installs it prepending its version, just make a symlink like: ``$ mkdir -p ~/bin; ln -s /usr/bin/llvm-symbolizer-8 ~/bin/llvm-symbolizer; export PATH=$PATH:~/bin``.

## Performance/network tuning

### I am getting errors like "too many open files" and like that when opening many network connections. Any help?

For Linux, following limits should be increased:

- ``/etc/sysctl.conf``

```
fs.file-max = 12000000
fs.nr_open = 12000000
vm.max_map_count = 12000000
```

- ``/etc/security/limits.conf``

```
* hard nofile 12000500
* soft nofile 12000500
```

- current shell

```
$ ulimit -n 10000000
```

### I am getting "allocation failed ..." errors and like that when spawning lots of lambdas. What should I do?

For Linux, the following limit should be increased:

``/etc/sysctl.conf``

```
vm.max_map_count = 12000000
```

### I am getting errors like "cannot assign requested address (os error 99)" when making many connections to a single IP. Any help?

For Linux, the following limit should be increased:

``/etc/sysctl.conf``

```
net.ipv4.ip_local_port_range = 8192 65535
```
