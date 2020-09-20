# OS support

## Command-line arguments

```argv``` monad returns dict filled with user's command-line arguments.

e.g.
> $ cargo run --bin tachyon -- -- -first 1 -second 2

... and example:
```o
o) argv[]
first  | "1"
second | "2"
__bin__| "target/debug/tachyon"
```

## Console write / read

```print``` and ```println``` polyads do formatted output to console. ```println``` is the same as ```print```, but emits carriage return.

First argument is formatting string with ```%``` as a placeholder, all other arguments are the values to use in placeholders.

```o
o) println["To % or not to %..."; "be"; "be"]
To be or not to be...
```

```readln``` monad reads from standard streams. Currently only stdin - ```0``` argument is supported.

```o
o) readln 0
123
"123"
```

## Environment variables

```getenv``` monad and ```setenv``` dyad are designed to work with environment variables for the interpreter process.
Both scalar and vector forms accepted.

```o
o)getenv `HOME
"/home/denis"
o)getenv `HOME`HOME
"/home/denis"
"/home/denis"
```

```o
o)`HOME setenv "/home/user"
o)`HOME`HOME setenv "/home/user" "/home/user"
```

## System command execution

```system``` monad expects command-line string to execute via "sh" (in Unix) or "cmd" (in Windows).
It returns a list of three values:

- command return status
- stdout as string
- stderr as string

```o
o)system["echo 123"]
0i
"123\n"
""
o)system["echo 123 >&2"]
0i
""
"123\n"
```
