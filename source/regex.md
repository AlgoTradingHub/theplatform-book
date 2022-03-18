# Regular expressions

A regular expression (shortened as regex or regexp) is a string that specifies a pattern in text.

## Matching

| Expression | Description |
| --- | --- |
| . | any character except new line (includes new line with s flag) |
| \\d | digit |
| \\D | not digit |
| \\s |    whitespace |
| \\S |    not whitespace |
| \\w |    word character |
| \\W |    not word character |
| ^ |    the beginning of text (or start-of-line with multi-line mode) |
| $ |    the end of text (or end-of-line with multi-line mode) |
| \\A |   only the beginning of text (even with multi-line mode enabled) |
| \\z |   only the end of text (even with multi-line mode enabled) |
| \\b |   a Unicode word boundary (\\w on one side and \\W, \\A, or \\z on other) |
| \\B |   not a Unicode word boundary |
| [xyz] |        A character class matching either x, y or z (union) |
| [^xyz] |       A character class matching any character except x, y and z |
| [a-z] |        A character class matching any character in range a-z |
| [[:alpha:]] |  ASCII character class ([A-Za-z]) |
| [[:^alpha:]] | Negated ASCII character class ([^A-Za-z]) |
| [x[^xyz]] |    Nested/grouping character class (matching any character except y and z) |
| [a-y&&xyz] |   Intersection (matching x or y) |
| [0-9&&[^4]] |  Subtraction using intersection and negation (matching 0-9 except 4) |
| [0-9--4] |     Direct subtraction (matching 0-9 except 4) |
| [a-g~~b-h] |   Symmetric difference (matching `a` and `h` only) |
| [\\[\\]] |       Escaping in character classes (matching [ or ]) |


## Repetitions

| Expression | Description |
| --- | --- |
| x* |       zero or more of x (greedy) |
| x+ |       one or more of x (greedy) |
| x? |       zero or one of x (greedy) |
| x*? |      zero or more of x (ungreedy/lazy) |
| x+? |      one or more of x (ungreedy/lazy) |
| x?? |      zero or one of x (ungreedy/lazy) |
| x{n,m} |   at least n x and at most m x (greedy) |
| x{n,} |    at least n x (greedy) |
| x{n} |     exactly n x |
| x{n,m}? |  at least n x and at most m x (ungreedy/lazy) |
| x{n,}? |   at least n x (ungreedy/lazy) |
| x{n}? |    exactly n x |


## Escape sequences

| Expression | Description |
| --- | --- |
| \\*   |       literal *, works for any punctuation character: \\.+*?()\|[]{}^$ |
| \\a   |       bell (\\x07) |
| \\f   |       form feed (\\x0C) |
| \\t   |       horizontal tab |
| \\n   |       new line |
| \\r   |       carriage return |
| \\v   |       vertical tab (\\x0B) |
| \\123 |       octal character code (up to three digits) (when enabled) |
| \\x7F |       hex character code (exactly two digits) |
| \\x{10FFFF} | any hex character code corresponding to a Unicode code point |
| \\u007F |     hex character code (exactly four digits) |
| \\u{7F} |     any hex character code corresponding to a Unicode code point |
| \\U0000007F | hex character code (exactly eight digits) |
| \\U{7F} |     any hex character code corresponding to a Unicode code point |


## ASCII character classes

| Expression | Description |
| --- | --- |
| [[:alnum:]]  |  alphanumeric ([0-9A-Za-z]) |
| [[:alpha:]]  |  alphabetic ([A-Za-z]) |
| [[:ascii:]]  |  ASCII ([\\x00-\\x7F]) |
| [[:blank:]]  |  blank ([\\t ]) |
| [[:cntrl:]]  |  control ([\\x00-\\x1F\\x7F]) |
| [[:digit:]]  |  digits ([0-9]) |
| [[:graph:]]  |  graphical ([!-~]) |
| [[:lower:]]  |  lower case ([a-z]) |
| [[:print:]]  |  printable ([ -~]) |
| [[:punct:]]  |  punctuation ([!-/:-@\\[-`{-~]) |
| [[:space:]]  |  whitespace ([\\t\\n\\v\\f\\r ]) |
| [[:upper:]]  |  upper case ([A-Z]) |
| [[:word:]]   |  word characters ([0-9A-Za-z_]) |
| [[:xdigit:]] |  hex digit ([0-9A-Fa-f]) |

::: see
[like](/verbs/string/like.md)
[ss (string search)](/verbs/string/ss.md)
[ssr (string search and replace)](/verbs/string/ssr.md)
[vs (vector from scalar)](/verbs/other/vs.md)
:::
