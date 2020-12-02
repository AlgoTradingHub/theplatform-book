# Scalars

Scalars are valuetypes. They have payload directly in self body and don't need boxing.

- Characters are enclosed in double quotes ``` "``` and can make use of the escape sequences `\n`, `\t`, `\"` or `\ ` to produce a newline, tab, double quote or backslash character, respectively. If more than one unescaped character is enclosed in quotes, the noun is a list of characters (see below), also known as a string.

- Symbols start with a backtick ``` ` ``` and are followed by an optional name. Names must start with . or a letter, and may contain letters, digits or .. Symbols are mainly useful as handles to variable names or keys in dictionaries.

O has following scalars:

| Type | Size |Typespec | Value scalar/vector | Null | Infinity |
| --- | --- | --- | --- | --- | --- |
| Bool |1| \`bool | 1b or 0b / 100b | | |
| Byte |1| \`byte | 1x / 1 1x | 0Nx | 0Wx |
| Short |2| \`short | 1h / 1 1h | 0Nh | 0Wh |
| Int |4|\`int | 1i / 1 1i | 0Ni | 0Wi |
| Long |8|\`long | 1 / 1 2 3 | 0N / 0Nj | 0W / 0Wj |
| Symbol |8| \`symbol | \`a / \`a\`b\`c | \` | |
| Char |1| \`char | NYI / "abc" | | |
| Enum | | NYI  | \`sym$\`a / \`sym$\`a\`b\`c | \`sym$\` | |
| Int128 |16| NYI | NYI | | |
| Guid |16| \`guid | 0Ng | 0Ng | |
| Single |4| \`real | 1.0e / 1 1e | 0Ne | 0We |
| Double |8| \`float | 1.0 / 1 1f | 0n / 0Nf | 0w / 0Wf |
| Quad |16| NYI | NYI | | |
| Timestamp |8| \`timestamp | 2020.11.05D12:30:21.123456789 | 0Np | 0Wp |
| Timespan |8| \`timespan | 7614D12:30:21.12345679 | 0Nn | 0Wn |
| Datetime |8| \`datetime | 2020.11.05T12:30:21.123 | 0Nz | 0Wz |
| Date |4| \`date | 2021.01.01 | 0Nd | 0Wd |
| Month |4| \`month | 2021.01m | 0Nm | 0Wm |
| Time |4| \`time | 12:30:21.123 | 0Nt | 0Wt |
| Minute |4| \`minute | 12:30 or -12:30 | 0Nu | 0Wu |
| Second |4| \`second | 12:30:21 | 0Nv | 0Wv |
| Generic (used for casts) | | \`l | | 0N0 - generic null | |
