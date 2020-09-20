# Frequently asked questions

1.
  - Q: I want to delete records from table. How to do that?
  - A1: Don't do that. Seriously.
  - A2: Just select records you want to retain and replace original table.

2.
  - Q: I want to make my O script both executable and loadable and pass command-line parameters to it.
  - A: Use following shebang under Linux - ``` #!/usr/bin/env -S bash -c 'cat "$0" | sed "1,1d" | tachyon -- $@' ```.
You need to use coreutils 8.30+ though.

## Debugging

1.
  - Q: How should I find memory leaks in tachyon binary?
  - A: Run tachyon using ```$ RUSTFLAGS="-Z sanitizer=leak -Cforce-frame-pointers=yes" cargo run --bin tachyon```. In order to get meaningful backtraces you must have ```llvm-symbolizer``` accessible in ```$PATH``` (LLVM 8+). If your Linux distribution installs it prepending its version, just make a symlink like: ```$ mkdir -p ~/bin; ln -s /usr/bin/llvm-symbolizer-8 ~/bin/llvm-symbolizer; export PATH=$PATH:~/bin```

## Performance / network tuning

1.
  - Q: I am having errors like "too many open files" and like that when opening many network connections. Any help?
  - A: For Linux, following limits should be increased:

   ``/etc/sysctl.conf``
   ```
   fs.file-max = 12000000
   fs.nr_open = 12000000
   vm.max_map_count = 12000000
   ```
   ``/etc/security/limits.conf``
   ```
   * hard nofile 12000500
   * soft nofile 12000500
   ```
   current shell
   ```
   $ ulimit -n 10000000
   ```

2.
  - Q: I am having errors like "allocation failed ..." and like that when spawning lots of lambdas. Any help?
  - A: For Linux, following limit should be increased:

   ``/etc/sysctl.conf``
   ```
   vm.max_map_count = 12000000
   ```

3.
  - Q: I am having errors like "cannot assign requested address (os error 99)" and like that when making many connections to a single ip. Any help?
  - A: For Linux, following limit should be increased:

   ``/etc/sysctl.conf``
   ```
   net.ipv4.ip_local_port_range = 8192 65535
   ```
