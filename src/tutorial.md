# Introduction

This tutorial is intended for people who lack vector languages background and who want to learn basic concepts step by step.

## First start

Starting language interpreter is the first thing you will be need. So just execute following command in your shell terminal.

```o
$ cargo run --release --bin tachyon
```

It will run the interpreter and it will present a greeting with its version and wait for your command in prompt.

```o
Tachyonic platform 0.1.0
-------------------------
CPU cores: 8
MEMORY: total: 32869648, free: 15155004, avail: 22692744
HOSTNAME: denis-devuan
OS: Linux
OS version: 4.16.0-2-amd64
Created pool with 1 cores
Thread stack size: 2048 kb
Started with file: REPL
-------------------------
o)
```

Whenever you see "o)" line, you can safely assume interpreter waits for your input.

Small hint - it's better to run interpreter using "rlwrap" utility. It allows to use arrow keys to recall history ("up" key) and edit it using "left" and "right" arrows.

```o
$ rlwrap cargo run --release --bin tachyon
```

## Simple expressions

Giving expressions to interactive interpreter is like asking questions in order to get some answers. You give expression to calculate - interpreter gives you answers or errors (if you are unlucky :))

Let's say you particularly interested in knowing the result of "2+2" arithmetic expression. You can ask interpreter! Enter "2+2" in its prompt and hit Enter. It will show following text.

```o
o) 2+2
4
```

So your expression got correctly calculated (or evaluated) and printed in session.
In some sense, interpreter is no more than advanced calculator.

Let's reformulate ourselves a little to summarize - we enter expressions at interpreter prompt and get its answers in session. Any answer in O language is called a "value". A value is something that gets created when calculating/evaluation happens. In fact any syntax construction in the language is an expression, thus has a value.

Each expression having a value has important implication - it allows to chain and combine expressions to form more complex expressions. Like below.

```o
o) 1+2+2
5
```

All arithmetic expressions can be entered in O.

```o
o) 1+1
2
o) 1-1
0
o) 2*2
4
o) 2%1
2
```

Division (the last expression) looks a bit different from standard notation "/". It's done to free "/" symbol for other expressions (will be discussed later).

## Value bindings aka "variables"

Having expression and evaluating them into values is fun, but let's go one step further.
Let's assign (or bind) names to values. It greatly increases comprehensibility of complex expressions.

For example, let's calculate circle area for given radius.
First let's name "pi" constant value (not particularly precise):

```o
o) pi: 3.1415
o) pi
3.1415
```

Yes, creating a binding is done using "[name] : [value]" expression.

Ok. Thus interpreter knows that name "pi" references to value 3.1415.
Let name radius as well.

```o
o) radius: 3.0
```

Area for circle with radius is calculated using:

```o
o) pi*radius*radius
28.273500000000002
```

One things to note here - numeric values with fractions (called floats) should be given explicitly. That's "3" will mean another value type - without any fractions called "integer".

## Vector processing

Even though single values (scalars) are really useful so calculation, we might need something to keep lots of scalars in one value. A sequence of values as one value is called a vector. This value can be indexed by integer type values. That is one can access vector per element, ask its length, etc.

## Simple vectors

By simple vectors, we mean having same element type. Like:

```o
o) intvec:(1;2;3)
```

... simple vector of integers. Parenthesis with elements separated by semicolons is a generic vector notation.

```o
o) intvec:1 2 3
```

... simple vector of integers. Giving values separated by spaces is only allowed as clearer notation, but only for simple vectors.

```o
o) fvec: 1.0 2.1 3.2
```

... simple vector of floats.

Simple vectors have a restriction though. Once you've created them, it's not possible to change types of their elements:

```o
o)a:1 2 3
1 2 3
o)a[1]:1.0
** exec error: amend: type.
```

Simple vector having just one element is represented using "enlist" verb notation.

```o
o) ,1
,1
```

## Lists

List or generic vector is a vector that can keep values of different types in one structure.

```o
o) l: (1;2.0;3;3.0)
o) l
1
2f
3
3f
```

Lists are printed by placing each element on new line. Another peculiarity is that float values have special suffixes defining their "float" type.

The important thing about lists is that they can be nested. It means lists allow to keep another vectors and lists in them.

```o
o) l: (1;1 2 3;(1;2.0))
1
1 2 3
(1;2f)
```

O language does not have multi-dimensional vectors / matrices, but those are implemented using nested lists.

```o
o) a:(1 2 3; 4 5 6; 7 8 9)
1 2 3
4 5 6
7 8 9
```

Lists are one of the main ways of grouping values of different types in one value. Nested lists  also have something that called "shape". Vaguely speaking, it's a definition of their nesting structure.

For example:

```o
o) a: (1; 2; 1 2 3)
o) b: (1; 1.0; 2)
```

... "a" and "b" are both lists, but they have different shape as their structure contain different value types in second elements.

Now let's see something that clearly separates vector languages from "ordinary" languages.
It's an ability to process vectors / lists with compatible shapes as easily as simple scalars.

```o
o) a: 1 2 3
o) b: 4 5 6
o) a+b
5 7 9
```

That is adding two shape-compatible vectors is exactly the same expression as for simple scalars!

Summing vector and scalar also works fine :

```o
o) a: 1 2 3
o) b: 1
o) a+b
2 3 4
```

Scalars are implicitly "expanded" to be compatible with its "partner" vector.

Notably, nested vectors can also be summed:

```o
o)a:(1;2;1 2 3)
1
2
1 2 3
o)b:(10;20;30)
10 20 30
o)a+b
11
22
31 32 33
```

That ability to penetrate nested lists' contents is defined by function we apply values to. "+" function is said to be fully-atomic, as both left and right arguments can be nested lists it descends into.

## User-defined functions

Another way of improving quality of your expressions is defining your own functions. Functions are meant to capture several expressions under one value. That's you can re-use expressions by referencing using a single name. Applying arguments for a function causes its evaluation and thus function gets its value.

For example, following expressions define function with one expression "x+y" and applying two values to the function. Curly brackets define nameless function ("lambda" expression if you will). "x", "y" are implicit arguments which bind function arguments to names. Binding nameless function to a name allows to reference it later. Argument names are temporary name bindings and thus cannot be used outside function body. Function application is done using square brackets.

```o
o) f:{x+y}
o) f[1;2]
3
```

Full syntax for defining functions is:

```o
o) f:{[a;b] a+b}
o) f[1;2]
3
```

To recap, let's rewrite our circle area using user-defined function:

```o
o) area:{[radius] pi:3.1415; pi*radius*radius}
o) area[3.0]
28.273500000000002
```

Several things are worth noting here:

* Last expression automatically becomes function value.
* Expressions are separated by semicolons and evaluated one after the other. However sub-expressions are evaluated from right to left (will be discussed in details later).
* Maximum number of arguments for any function is 8.
* Both "radius" and "pi" are temporary names (values bindings) and are called "local variables". Any value binding to a name causes local variable creation. Thus it's not necessary to declare locals explicitly.

Contrary to the rule "last expression defines function value" you can force explicit function return using ":" expression.

```o
o)f:{ a:x+y; :a }
{a:x+y;:a}
o)f[1;2]
3
```

A function is also a value and can be argument and result of another function:

```o
o) f:{ {x+y} }
o)f2:f[]
{x+y}
o)f2[1;2]
3
```

... functions as values are fully supported.

## Terms and conventions

Let's improve our current knowledge of language terms and notions. They will be used later to define new concepts.

O language likes to separate functions according to several criterias.
For example, by arity (number of arguments):

* Monads or monadic functions - those which accept just a single argument.
* Dyads or dyadic functions - those which expect 2.
* Triads and tetrads - those which expect 3 and 4 respectively.
* Polyads - those which accept different number of arguments.
That separation is important to grasp "adverbs" discussed later.

By analogy with natural languages, O language calls built-in functions/primitives "verbs". Functions/verbs which accept another verbs/functions as their arguments are called "adverbs".

## Types

O language is said to be dynamically strict typed language. It means that interpreter checks for types of values for compatibility before evaluating expressions. Incompatible types result in errors which happen at run-time. That is you get an error when interpreter gets right to expression evaluation.

Most of built-in verbs/functions in O are polymorphic. That is the same verb might accept different combinations of types and shapes for its arguments. That greatly increases language expressiveness and terseness at the cost of being somewhat cryptic for newcomers.

Types themselves characterize values, but not their bindings/names/variables.
To denote that value has specific type, O uses suffixes. Like **1i** - for 32bit integer values, **1f** - for floats with double precision, etc.

Simple arrays allow to use shorter syntax:

```o
o) 1 2 3f
```

... creates float number vector.

For full reference see [Scalars](./scalars.md)

## Symbols and dictionaries

Using vectors and lists for organizing complex values is perfectly fine, but humans tend to prefer symbolic names instead of numbers as indices. Symbols in O serve exactly for this purpose. They are special type of values which represent abstract names.

Remember binding value to a name using ":" verb? Name (left argument) was symbol in fact.

Symbols are created in O using backtick character and evaluated to themselves.

```o
o) `red
`red
```

Simple symbol vectors allow a bit easier syntax skipping spaces:

```o
o) `red`blue`green
`red`blue`green
```

Dictionaries represent a structure keeping key-value pairs.
That is vectors indexed by non-integer key. Key is usually a symbol.

```o
o) `red`blue`green!1 2 3
red  | 1
blue | 2
green| 3
```

Asking dictionary for a value is done by indexing like:

```o
o) d:`red`blue`green!1 2 3
o) d[`blue]
2
```

As you probably guessed, dicts in O are actually represented using two vectors under the hood.
So indexing a dict is in fact searching for a given key in dict "key" vector and applying its index to the second vector.

## Order of evaluation

Expressions in O are evaluated in a strict and unambiguous order - right to left. Arithmetic verbs are of no exception to that rule.

```o
o) 4*2+3
20
```

In case if you want to ensure some expressions are evaluated in desired order - use parenthesis.

```o
o) (4*2)+3
11
```

Note that order of evaluation of separate expression is still left to right and top to bottom.

```o
o) f:{ a:1+x; a*2 }
o) f[10]
22
```

## Verbs / adverbs overloading concepts

Vector languages are famous for their terseness and high expressiness. Main concept behind that claim is their ability to "overload" names with meanings. e.g. most monadic verbs can be used in dyadic context as well, but having different meaning. Different type combinations result in different meaning as well.

Let's see some examples. "#" verb used in monadic context means "length".

```o
o) #1 2 3
3
```

When used in dyadic context with left argument being boolean vector it will be "filter":

```o
o) 101b#1 2 3
1 3
```

... or "take" if given integer scalar as left arg:

```o
o) 2#1 2 3
1 2
```

... or "reshape" if given scalar as both left and right args:

```o
o) 4#2
2 2 2 2
```

That overloading concepts allows to "pack" a lot of functionality into quite limited ASCII charset.

Of course the same idea can be applied to user-defined functions. However, some restrictions exist here. Trying to use less arguments than expected will result in an error in current version. Checking for argument types and/or shapes should be used instead.

## Indexing

Asking vectors/lists for its elements is done by indexing. Indexing is done using square brackets, that is quite common in programming. Index of first element of any vector is zero.

```o
o) a:1 2 3
o) a[1]
2
```

Just as any other verb in O, it allows to use vectors as indices and even nested ones.

```o
o) a:1 2 3
o) a[0 1]
1 2
o) a[(1; 0 2)]
2
1 3
```

Now let's imagine that you need to extract first 3 elements from vector. You can easily enter 3 subsequent indices by hand, but what if you need 500 indices? You can use "!" monadic verb to create 0..N-1 integers.

```o
o) a: !100;
o) a[!10]
0 1 2 3 4 5 6 7 8 9
```

Dict indexing works exactly the same way:

```o
o) d:`a`b`c!1 2 3
o) d[`c`b`a]
3 2 1
```

## Reduction aka folding

To get some statistics for a vector, let's calculate "average" function. More formally, it is a sum of vector divided by the vector length. Summing of vector is done by using "fold" (or "over") adverb.

```o
o) a: 10 4 2 1 3 4
o) +/a
24
```

Next, divide the sum by vector length. Vector length is called "#" monadic verb in O parlance.

```o
o) (+/a)%#a
4
```

Now, let's create a separate function for calculating average:

```o
o) avg: { (+/x)%#x }
o) avg[a]
4
```

So far so good, however let's try to calculate average of a vector whose average is in fact fractional.

```o
o) a: 10 11 11
o) avg[a]
10
```

Hm, it does not look good. On the other hand - we entered integer vector and thus got integer average. What if we want to get float value instead? Let's force float division by "casting" integer sums and element count as doubles. It is done by using "$" dyad. Left argument is destination type, right argument - source argument.

```o
o) avg:{ (`float$+/x)%`float$#x }
o) avg[a]
10.666666666666666
```

For full specification on "$" dyad see [Types](./types.md)

## Boolean values and vectors

Boolean values are often produced by relational verbs. 0 and 1's correspond to false and true values. O has following relational verbs - <, >, >=, <=, =, <>. All of them are fully-atomic, that is both left and right arguments penetrate nested structures.

```o
o) (1;2 3 4;5) > (1;2;4)
0b
011b
1b
```

Well-known boolean algebra functions like "and", "or", "xor" are fully supported. Those are "&", "|" and "<>" correspondingly.

```o
o) a:1 2 3; b: 2 2 1
o) (a>b)&a>1
001b
```

Counting 1's in boolean vectors is easy, just use previously mentioned "fold"/"over" verb.

```o
o) a:1 2 3
o) +/a>=2
2
```

Filtering is another really useful verb. That is following leaves only values greater or equal to 2 in resulting vector.

```o
o) a:1 2 3
o) (a>=2)#a
2 3
```

## Nulls and infinities

It's time to expand our knowledge a bit about built-in types. All scalar types in O have special value meaning absence of value. Something similar to zero in arithmetics. Each type has its own null value. e.g. long integer type null value is represented with **0N**, float double precision - **0f**, etc.

For full specification on nulls and infinities - see [Scalars](./scalars.md)
Verbs that evaluate to absence of something use nulls as their result. For example, getting value of non-existing element in simple array result in null of array type.

```o
o) a:1 2 3
o) a[3]
0N
```

On the other hand, getting value of non-existing element of list evaluates to generic null.

```o
o)a:(1;1 2)
1
1 2
o)a[2]
o)
```

... pay attention to interpreter output. It literally nothing!
By the way, it's one way of creating generic null (since it lacks textual representation) - indexing empty list.

```o
o) ()0
```

Positive and negative infinities are related to numeric types only. They are have specific notation - **0W** with corresponding type suffix, like **0Wf** (float with double precision), **0Wj** (long integer), short notation is **0w** and **0W** correspondingly. Again, for full specification on infinities - see [Scalars](./scalars.md)

Sure enough, infinities get be a result of calculations:

```o
o) 1%0
0W

o)`short$100000
0Wh
```

... casts also signal overflows with infinities.

## Find verb

Search is a fundamental operation and O has specific verb to perform it.
It's dyadic "?". Left argument is a value where to search in, right argument - a value to look for. The verb evaluates to index of the value being searched or null if not found. If several same values reside in left arg - only index of first element returned.

```o
o) a: 1 2 2 3
o) a?2
1
o) a?4 2 0
0N 1 0N
```

"Find" is quite versatile verb. It behaves differently depending on shape of left argument.
The verb is right-atomic when left argument is simple vector.

```o
o)a: 1 2 3
1 2 3
o)a?(4;2 0)
0N
1 0N
```

If left argument is list and right argument is simple vector, then the whole left argument is look for.

```o
o) a: (0;1 2;1 2 3)
o) a?1 2 3
2
```

Both nested arguments result in matching each right argument element in left one:

```o
o) a: (0;1 2;1 2 3);
o) a?(1 2 3;1 2;1)
2 1 0N
```

## "Take", "drop" and "reshape" verbs

Though indexing is theoretically enough to get all operations on vectors, it's often useful to manipulate vectors with easier and more specialized verbs.

"Take" verb cuts off a part of vector. Left arg defines how many elements to "take" and right arg - vector to operate on.

```o
o) 2#1 2 3
1 2
```

Negative left arguments mean "taking" from the end.

```o
o) -2#1 2 3
2 3
```

"Drop" does the reverse operation - it evaluates to remaining part of vector.

```o
o) 2_1 2 3
,3
o) -2_1 2 3
,1
```

"Reshape" verb is used to literally transform its right arg shape into new one defined by left arg.

```o
o) 10#0
0 0 0 0 0 0 0 0 0 0
```

... creates simple vector of 10 integer zeroes.

```o
o) 3 2#0
0 0
0 0
0 0
```

... creates nested vector of simple vectors.

```o
o) 4 2 3#1 2 3 4
(1 2 3;4 1 2)
(3 4 1;2 3 4)
(1 2 3;4 1 2)
(3 4 1;2 3 4)
```

... and nested vector made of single simple vector elements. See how this verb cycles between right argument elements?

## Equality

Another important trait of operating on values is ability to check for equality. Conceptually two kinds of equality tests are supported by the language.

Fully atomic dyad "equal" - "=" and "match" dyad "~".
First one requires compatible shape for its arguments and explores value equality deep into structure.

```o
o) (1;2 3;4)=(1;3;4)
1b
01b
1b
```

"Match" dyad just returns one boolean answer - if two values are exactly the same.

```o
o) (1;2 3;4)~(1;3;4)
0b
```

## "Each" adverb

Functional programming pay much attention to ease of evaluating functions over value sequences. O language is of no exception.

Function evaluation over every vector element is called "mapping" sometimes. That is each vector element becomes an argument of a given function and all resulting values again form a vector. Adverb responsible for that is "each". It takes monadic function plus vector and produces another vector.

```o
o) a: 1 2 3
o) {x*x}'a
1 4 9
```

... shows calculating squares over vector elements.

"Each dyad" adverb is quite similar to "each", but takes two input vectors and applies pair of values to a dyad function.

```o
o) a:1 2 3; b:3 2 1
o) a*'b
3 4 3
```

"Each right" adverb is another variation of mapping. It takes two values and a dyadic function. The result of its evaluation is again an application of dyad to pairs values. Pair of values is formed a bit differently though. Left argument is not being iterated, but provided as a whole. Only right argument elements are "mapped". Thus its name - "each right".

```o
o) a:1 2 3; b:3 2 1
o)a*/:b
3 6 9
2 4 6
1 2 3
```

"Each left" adverb has almost the same meaning. Except this time left arg is being iterated and right provided as a whole.

```o
o) a:1 2 3; b:3 2 1
o)a*\:b
3 2 1
6 4 2
9 6 3
```

## Exercise. Table of multiplication

Now let's try a simple exercise and ask the interpreter to create the table of multiplication for us.
The rule of building the table is simple take all integer numbers between 1 and 9 and multiply each possible pair.
First, generate vector of 1..9.

```o
o) n:1+!9
1 2 3 4 5 6 7 8 9
```

... done

And iterate over "n" using "each right" adverb:

```o
o) n*/:n
1 2 3 4 5 6 7 8 9
2 4 6 8 10 12 14 16 18
3 6 9 12 15 18 21 24 27
4 8 12 16 20 24 28 32 36
5 10 15 20 25 30 35 40 45
6 12 18 24 30 36 42 48 54
7 14 21 28 35 42 49 56 63
8 16 24 32 40 48 56 64 72
9 18 27 36 45 54 63 72 81
```

... or "each left". It produces exactly the same result.

```o
o) n*\:n
1 2 3 4 5 6 7 8 9
2 4 6 8 10 12 14 16 18
3 6 9 12 15 18 21 24 27
4 8 12 16 20 24 28 32 36
5 10 15 20 25 30 35 40 45
6 12 18 24 30 36 42 48 54
7 14 21 28 35 42 49 56 63
8 16 24 32 40 48 56 64 72
9 18 27 36 45 54 63 72 81
```

So the overall solution is:

```o
o) n:1+!9; n*/:n
```

12 symbols. Can we do better? Remember - the shortest solution is often the fastest.

Yes, in fact we can solve it using just one complex expression.

```o
o) n*/:n:1+!9
```

... 10 symbols. We used the rule that each expression in O produces a value, even a variable binding! So we compressed our solution by whole 2 symbols! Not bad, not bad...

Now what about memory consumption? It's another important factor in assessing solution. Our current solution has one unpleasant side-effect - it leaves "n" name bind to a temporary 1,2,... vector and thus this temporary vector still occupies precious memory. Let's fix that:

```o
o) {x*/:x}1+!9
```

... back to 11 symbols, but now no temporary vectors hanging around!

## Flow control verbs

Changing flow of control is often used together with destructive verbs (see later) and with side-effect computations in general. That is when evaluation expression not only produces a value, but also doing some changes in overall environment (changing bindings, vector/dict contents, etc).

One consequence of having side-effects is necessity of introducing so-called "short-circuit" expressions. That's special expressions  which evaluate its arguments on demand vs. before evaluating expression itself.

```o
o) a:10; b:10
o) $[a>5; a:11; b:12]
o) a,b
11 10
```

You should clearly see that triadic "cond" verb does not behave as other ordinary (functional) verbs. "Functional" (with side-effects) verb would evaluate all its arguments and would change "b" binding as well.

"True" value is anything except boolean false, integer zero and empty vector/list.

Extended form of "cond" verb should remind you chained "if-else" from C,Pascal,etc imperative languages. More formally its ```$[cond1; true_val1; cond2; true_val2; ... ; false_val]```. That is "cond" would evaluate each "cond" condition until boolean "true" or scalar value > 0 and evaluate corresponding "true_val" expression, otherwise "false_val" expression becomes verb result.

```o
o) $[0b;`first;0b;`second;1b;`third;`fifth]
`third
```

Another flow control verb is "return" verb. It interrupts current function evaluation and returns a given value as function result.

```o
o) {a:x+1;:a;x}1
2
```

... here "return" return "a" binding value and does not evaluate last expression "x" at all.

## Destructive verbs

Destructive (imperative, non-functional) expressions include binding changes and contents changes.

Binding changes are dyadic ":" verb and "set" verb. ":" verb has more complex behaviour depending on scoping. It does assignments to local variables inside functions and to globals otherwise.

```o
o) { a:1; a }[]
1
o) a
** exec error: undefined symbol: `a
|--> [REPL::1] a
^ ExecError("undefined symbol: `a")
o) a:1
o) a
1
```

"Set" verb does only global bindings. It expects binding name in first argument as symbol and its value in second.

```o
o) { set[`a; 1] }[]
o) a
1
```

Verbs for contents changes are much more versatile. It is related to much more complex value shapes being possible.

But first let's discuss some conceptions behind contents changing (or mutation as it's often called). O being a functional language protects value integrity by employing copy-on-write technique. What it means in practice? Let's start with scalars:

```o
o) a:10; b:a;
o) b+:1
o) a,b
10 11
```

... so far nothing exceptional. "+:" is in fact a shortcut for ```.[`a;();+;1]``` (see later) and means add 1 to existing "a" value and update "a" binding. Scalars in "O" work exactly the same way as in other imperial languages.

Now let's try vectors:

```o
o) a:3#10; b:a
o) b+:1
o) a,b
10 10 10 11 11 11
```

... see the idea?

Destructive changes happen only when vector internal reference counter is equal to 1. That is only one binding to vector value exists at a time. Otherwise a copy first made and the changes become local to that copy only. Even though the results on expression evaluation will be the same, it's always beneficial to apply destructive verbs to value that are not shared, thus avoiding expansive copying.

In general there are 2 kinds of contents-modifying verbs - "amend" and "dmend". Both "amend" and "dmend" can be triad and tetradic. Both of them first index value to get to its required element, apply user-provided function to that element and save result of evaluation back to value element.

When monadic function is applied to a value element triad forms are used. Dyadic function requires additional argument, thus tetradic form appear.

Indexing also differs into "horizontal" and "in-depth" indexing. "Horizontal" is denoted by verb symbol "@" and "in-depth" - by "."

Destructive application is expected when first argument is binding name as symbol, otherwise - cloning is used first and changes apply to copy.

Let's try to play with them:

```o
o) a:1 2 3
o) @[a; 1; -:]
1 -2 3
```

... read it like this - apply monadic verb "negate" to an element with index 1 of "a" copy.

```o
o) a:1 2 3
o) @[`a; 1; -:]
`a
o) a
1 -2 3
```

... this time - destructive. Read it like this - apply destructively monadic verb "negate" to an element with index 1 of "a".

Now the same exercise, but with indexing "in-depth" using "dmend":

```o
o) a:(1; 1 2 3)
o) .[a; 1 1; -:]
1
1 -2 3
```

And destructively:

```o
o) a:(1; 1 2 3)
o) .[`a; 1 1; -:]
`a
o) a
1
1 -2 3
```

Applying dyadic is easy after grasping the concept:

```o
o) a:1 2 3
o) @[a; 1; +; 1]
1 3 3
```

... and its "physical meaning" - apply dyadic verb "plus" to 1 and an element with index 1 of "a" copy.

```o
o) a:1 2 3
o) @[`a; 1; +; 1]
`a
o) a
1 3 3
```

... and its "physical meaning" - apply destructively dyadic verb "plus" to 1 and an element with index 1 of "a".
And a short form for this is:

```o
o) a:1 2 3
o) a[1]+:1
1 3 3
```

"Dmend" together with dyadic:

```o
o) a:(1; 1 2 3)
o) .[a; 1 1; -; 1]
1
1 1 3
```

... and it's destructive form:

```o
o) a:(1; 1 2 3)
o) .[`a; 1 1; -; 1]
`a
o) a
1
1 1 3
```

One special form here is applying dyadic to entire value:

```o
o) a: 1 2 3
o) .[`a; (); -; 1]
`a
o) a
0 1 2
```

Actually we've already seen its short form earlier:

```o
o) a: 1 2 3
o) a-:1
`a
o) a
0 1 2
```

## Signalling and error handling

Signalling is similar to exception raising in other languages. It interrupts normal evaluation order and "throws" a value across all nested functions until someone catches it or until REPL when it is just shown. " ' " (tick) monadic verb is responsible to "throwing" its argument.

```o
o) { 'x }`err
'`err
```

Error handling in O is done again with "@" and "." triad. Yes, those are the most overloaded verbs in language. First argument defines function to evaluate, second - its argument(s), third - result in case of signalling or function catch the signal value. If not signalling occurred - verb just returns the result of function evaluation.

```o
o) @[{x};1;`err2]
1
o) @[{'x};`err1;`err2]
`err2
o) @[{'x};`err1;{x}]
`err1
```

... "@" form expects a monadic as first argument, thus second argument is passed as a whole.

"." form expects possibly nested list for all function params.

```o
o) .[+;(1;2);`err2]
3
o) .[{x+y};(1;2);`err2]
3
o) .[{'y};(1;`err1);{x}]
`err1
```

## Scripts

A script is O program stored in text file on disk. Typically O programs will ".o" file extension.

Just provide your script filename as first argument and instead of continuously evaluating expressions from REPL, interpreter executes the script and stops after evaluation completes.

e.g.

```o
$ cargo run --bin tachyon -- -f etc/factorial.o
Tachyonic platform 0.1.0
-------------------------
CPU cores: 8
MEMORY: total: 32869648, free: 14945768, avail: 23050972
HOSTNAME: denis-devuan
OS: Linux
OS version: 4.16.0-2-amd64
Created pool with 1 cores
Thread stack size: 2048 kb
Started with file: etc/factorial.o
-------------------------
2432902008176640000
```

## Tables

TODO

## Queries

TODO

## Idioms

TODO
