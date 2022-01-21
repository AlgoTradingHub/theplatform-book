# Dynamic parsers

Text parsers can be dynamically created as well as binary parsers for user-defined grammars using PEG parser combinator right out-of-the-box. See [Parsing Expression Grammar](https://en.wikipedia.org/wiki/Parsing_expression_grammar).

For example, let's create a simple parser that eats only strings consisting of "p" chars:

```o
o)p:&lt- "p"+
&ltParser["p"+]&gt
o)p "ppppp"
"ppppp"
o)p "pppppa"
** runtime error: `peg`:
Input: &lta&gt
o)
```

Main syntax is `&lt-` followed by a parsing rule. A parser, like any other type in O language, can be assigned to a variable (symbol) and used later. Using parser with a string or a byte array just calls it like a function.

## Parsing expression rules

- An atomic parsing expression consists of:
  - any terminal symbol,
  - any nonterminal symbol, or
  - the empty string ε.

- Given any existing parsing expressions e, e1, and e2, a new parsing expression can be constructed using such operators:
  - Sequence: e1 e2
  - Ordered choice: e1 | e2
  - Zero-or-more: e*
  - One-or-more: e+
  - Optional: e?
  - And-predicate: &e
  - Not-predicate: !e

## Syntax reference

| Term | Description |
| -- | -- |
| "text" | String literal. Escapes are supported as well. |
| [abc\t\r\n] | One of symbols. |
| [a-z] | Range. |
| [\^ab0-9] | Not one of/range. |
| "a" "b" [f-k] | Sequence of terms. |
| thing | Reference to another parser bound to symbol \`thing |
| thing? | An optional expression. This is greedy, always consuming thing if it exists. |
| &thing | A lookahead assertion. Ensures thing matches at the current position but does not consume it. |
| !thing | A negative lookahead assertion. Matches if thing isn't found here. Doesn't consume any text. |
| thing* | Zero or more thing. This is greedy, always consuming as many repetitions as it can. |
| thing+ | One or more thing. This is greedy, always consuming as many repetitions as it can. |
| thing{2,3} | Minimum 2 or maximum 3 times thing. This is greedy, always consuming as many repetitions as it can. |
| \\x01 | Binary parser matches byte 0x01. |
| thing# | Drops matched input, parsed by thing. |
| thing/{"I"$x} | Maps result of parser \`thing to lambda followed by **/**. |
| thing1 \| thing2 | Tries thing1 then thing2 if first was not successful. |
| thing->nm | Maps result of thing to dict with key \`nm. |
| \\d | Matches any digit. |
| \\w | Matches any alphabetical symbol. |
| \\W | Matches any digit or alphabetial symbol. |
| \\s | Matches SPACE |
| \\S | Matches any of: SPACE, TAB, CARRIAGE_RETURN, LINE_FEED |
| \\. | Matches any symbol. |
| \\$ | End of input. |
| @(..) | Any expression returns parser |
| (thing) | Grouping. |

## FIX parsing example

```o
o)string: &lt- [^\t\r\n|]+;
o)header: &lt- "8="# string "|"#"9="# \d+ "|"# /{`fixver`size!(x 0;"I"$x 1)};
o)header "8=FIX.4.4|9=126|"
fixver| "FIX.4.4"
size  | 126i
o)
```
