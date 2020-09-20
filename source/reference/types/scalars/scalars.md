# Scalars

Scalars are valuetypes. They have payload directly in self body and don't need boxing.

- Characters are enclosed in double quotes (") and can make use of the escape sequences \n, \t, \" or \\ to produce a newline, tab, double quote or backslash character, respectively. If more than one unescaped character is enclosed in quotes, the noun is a list of characters (see below), also known as a string.

- Symbols are start with a backtick ("`") and are followed by an optional name. Names must start with . or a letter, and may contain letters, digits or .. Symbols are mainly useful as handles to variable names or keys in dictionaries.

O has following scalars:

| Type | Typespec | Value scalar/vector | Null | Infinity |
| --- | --- | --- | --- | --- |
| Bool | \`bool | 1b or 0b / 100b |||
| Byte | \`byte | 1x / 1 1x | 0Nx | 0Wx |
| Short | \`short | 1h / 1 1h | 0Nh | 0Wh |
| Int | \`int | 1i / 1 1i | 0Ni | 0Wi |
| Long | \`long | 1 / 1 2 3 | 0N / 0Nj | 0W / 0Wj |
| Symbol | \`symbol | \`a / \`a\`b\`c | \` ||
| Char | \`char | NYI / "abc" |||
| Enum | NYI  | \`sym$\`a / \`sym$\`a\`b\`c | \`sym$\` ||
| Int128 | NYI | NYI |||
| Guid | \`guid | 0Ng | 0Ng ||
| Single | \`real | 1.0e / 1 1e | 0Ne | 0We |
| Double | \`float | 1.0 / 1 1f | 0n / 0Nf | 0w / 0Wf |
| Quad | NYI | NYI |||
| Date | \`date | 2015.01.01 | 0Nd | 0Wd |
| Minute | \`minute | 12:30 or -12:30 | 0Nu | 0Wu |
| Second | \`second | 12:30:21 | 0Nv | 0Wv |
| Time | \`time | 12:30:21.123 | 0Nt | 0Wt |
| Timestamp | timestamp | 2020.11.05D12:30:21.000000123 | 0Np | 0Wp |
| Datetime | \`datetime | 2020.11.05T12:30:21.123 | 0Nz | 0Wz |
| Generic (used for casts) | \`l || 0N0 - generic null ||
