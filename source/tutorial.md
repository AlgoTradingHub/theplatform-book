# Introduction

This tutorial is intended to help people who lack vector languages background and want to learn basic concepts step by step.

## First start

Starting language interpreter is the first thing you will need. So just execute the following command in your shell terminal:

```os
$ OLOG=info cargo run --release --bin tachyon
```

It will run the interpreter and present a greeting with its version and wait for your command in prompt.

```os
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

Whenever you see `o)` line, you can safely assume the interpreter is waiting for your input.

::: note
Small hint - it's better to run the interpreter using "rlwrap" utility.
It allows using arrow keys to recall history ("up" key) and editing it with "left" and "right" arrows.
:::

```os
$ rlwrap cargo run --release --bin tachyon
```

## Simple expressions

Giving expressions to an interactive interpreter is like asking questions in order to get some answers. You give an expression to calculate - interpreter gives you answers or errors (if you are unlucky :))

Let's say, you are particularly interested in learning the result of "2+2" arithmetic expression. You can ask the interpreter! Type "2+2" in its prompt and hit Enter. It will show the following text:

```o
o)2+2
4
o)
```

So, your expression got correctly calculated (or evaluated) and printed in session. In  way, an interpreter is nothing more than an advanced calculator.

Let's reformulate ourselves a little to summarize - we enter expressions in the interpreter prompt and get answers in the session. Any answer in O language is called a "value". A value is something that gets created when calculation/evaluation happens. In fact, any syntax construction in the language is an expression, thus has a value.

Each expression having a value has important implication - it allows to chain and combine expressions to form more complex expressions. See the one below:

```o
o)1+2+2
5
o)
```

All arithmetic expressions can be entered in O.

```o
o)1+1
2
o)1-1
0
o)2*2
4
o)2%1
2
```

Division (the last expression) looks a bit different from `/` standard notation. It's done to free the "/" symbol for other expressions (we will discuss this later).

## Value bindings aka "variables"

Having expressions and evaluating them into values is fun, but let's go one step further. Let's assign (or bind) names to values. It greatly increases comprehensibility of complex expressions.

For example, let's calculate circle area for given radius. Firstly, we will name "pi" constant value (not precisely though):

```o
o)pi: 3.1415
3.1415
o)
```

Yes, creating a binding is done via "[name] : [value]" expression.

Ok. Thus, interpreter knows that name "pi" references to value 3.1415 Let's name radius as well.

```o
o)radius: 3.0
3f
o)
```

Now, we will calculate the circle area:

```o
o)pi*radius*radius
28.273500000000002
o)
```

One things to note here - numeric values with fractions (called floats) should be given explicitly. Using "3" will indicate another value type - the one without fractions called "integer".

## Vector processing

Even though single values (scalars) are really useful for calculation, we might need something to keep lots of scalars in one value. A sequence of values placed in one value is called a vector. This value can be indexed by integer type values, so you can access vector per element, ask its length, etc.

## Simple vectors

By simple vectors we mean that it consists of elements of the same type:

```o
o)intvec:(1;2;3)
1 2 3
o)
```

This is a simple vector of integers. Parenthesis with elements separated by semicolons are a generic vector notation.

```o
o)intvec:1 2 3
1 2 3
o)
```

... another simple vector of integers. Giving values separated by spaces is allowed as simplified notation for simple vectors only.

```o
o)fvec: 1.0 2.1 3.2
1 2.1 3.2
o)
```

... simple vector of floats.

Simple vectors have a restriction though. Once you've created them, it's not possible to change types of their elements:

```o
o)a:1 2 3
1 2 3
o)a[1]:1.0
** eval error: `:`:
invalid type: [`s`long;`s`float]
```

Simple vector with only one element is represented using "enlist" verb notation.

```o
o),1
,1
o)enlist 1
,1
o)
```

## Lists

List or generic vectors is a vector that can keep values of different types in one structure.

```o
o)l:(1;2.0;3;3.0)
1
2f
3
3f
o)
```

Lists are printed by placing each element on new line. Another peculiarity is that float values have special suffixes defining their "float" type.

::: note
Important: lists can be nested.
It means that they can include other vectors and lists or any other types.
:::

```o
o)l: (1;1 2 3;(1;2.0))
1
1 2 3
(1;2f)
o)
```

O language does not have multidimensional vectors/matrices but they can be implemented using nested lists.

```o
o)a:(1 2 3; 4 5 6; 7 8 9)
1 2 3
4 5 6
7 8 9
```

Lists are one of the main ways of grouping values of different types in one value. Nested lists also have "shape". Roughly speaking, it's a definition of their nesting structure.

For example:

```o
o)a:(1; 2; 1 2 3)
1
2
1 2 3
o)b:(1; 1.0; 2)
1
1f
2
o)
```

... `a` and `b` are both lists, but they have different shape as their structure contain different value types in second elements.

Now let's see something that clearly separates vector languages from "ordinary" languages. It's an ability to process vectors/lists with compatible shapes as easily as simple scalars.

```o
o)a:1 2 3;
o)b:4 5 6;
o)a+b
5 7 9
o)
```

We have just added two shape-compatible vectors using the same expression as for simple scalars!

Summing vector and scalar also works fine:

```o
o)a: 1 2 3;
o)b: 1;
o)a+b
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

That ability to go through nested lists' contents is defined by function that we apply to values. The `+` function is fully-atomic which means that it descends into both left and right arguments if they are nested lists.

## User-defined functions

Another way to improve your expression quality is defining your own functions. Functions are meant to capture several expressions under one value. In this way, you can reference an expression by its name to use it multiple times. Applying arguments to a function causes its evaluation and thus function gets its value.

For example, following expressions define a function with one expression `x+y` and apply two values to the function. Curly brackets define nameless function ("lambda" expression if you will). `x`, `y` are implicit arguments which bind function arguments to names. Binding nameless function to a name allows to reference it later. Argument names are temporary name bindings and thus cannot be used outside function body. To apply a function, use square brackets and separate arguments with semicolons:

```o
o)f:{x+y};
o)f[1;2]
3
o)
```

Full syntax for defining functions is:

```o
o)f:{[a;b] a+b};
o)f[1;2]
3
o)
```

To recap, let's rewrite our circle area expresion with a user-defined function:

```o
o)area:{[radius] pi:3.1415; pi*radius*radius};
o)area[3.0]
28.273500000000002
o)
```

Several things are worth noting here:

* Last expression automatically becomes function value.
* Expressions are separated by semicolons and evaluated one after another. However, sub-expressions are evaluated from right to left (will be discussed in details later).
* Maximum number of arguments for any function is 8.
* Both "radius" and "pi" are temporary names (values bindings) and are called "local variables". Any value binding to a name causes local variable creation. Thus, it's not necessary to declare locals explicitly.

Contrary to the rule "last expression defines function value", you can force explicit function return using `:` expression.

```o
o)f:{ a:x+y;:a}
{a:x+y;:a}
o)f[1;2]
3
o)
```

A function is also a value and can be an argument and a result of another function:

```o
o)f:{ {x+y} };
o)f2:f[]
{x+y}
o)f2[1;2]
3
o)
```

... functions as values are fully supported.

## Terms and conventions

Let's improve our current knowledge of language terms and notions. We will use them later to define new concepts.

O language likes to separate functions according to several criterias.
For example, by arity (number of arguments):

* Monads or monadic functions - those which accept just a single argument.
* Dyads or dyadic functions - those which expect 2.
* Triads and tetrads - those which expect 3 and 4, respectively.
* Polyads - those which accept different number of arguments.
That separation is important to grasp "adverbs" discussed later.

By analogy with natural languages, O language calls built-in functions/primitives "verbs". Functions/verbs that accept other verbs/functions as arguments are called "adverbs".

## Types

O language is said to be dynamically strict typed language. It means that interpreter checks for types of values for compatibility before evaluating expressions. Incompatible types result in errors which happen at run-time. In this case, you get an error when interpreter gets right to expression evaluation.

Most of built-in verbs/functions in O are polymorphic. That is, the same verb might accept different combinations of types and shapes as its arguments. That greatly increases language expressiveness and terseness at the cost of being somewhat cryptic for newcomers.

Types themselves characterize values but not their bindings/names/variables.
To denote that value has a specific type, O uses suffixes. Like `1i` - for 32bit integer values, `1f` - for floats with double precision, etc.

Simple arrays allow using shorter syntax:

```o
o)1 2 3f
1 2 3f
o)
```

... creates float number vector.

For full reference see [Scalars](/reference/types/scalars/scalars.md).

## Symbols and dictionaries

Using vectors and lists for organizing complex values is perfectly fine, but humans tend to prefer symbolic names instead of numbers as indices. Symbols in O serve this purpose. They are a special type of values which represent abstract names.

Remember binding value to a name using `:` verb? Name (left argument) was symbol in fact.

Symbols are created in O using backtick character and evaluated to themselves.

```o
o)`red
`red
o)
```

Simple symbol vectors allow a bit easier syntax skipping spaces:

```o
o)`red`blue`green
`red`blue`green
```

Dictionaries represent a structure of key-value pairs. These are vectors indexed by non-integer key. Key is usually a symbol.

```o
o) `red`blue`green!1 2 3
red  | 1
blue | 2
green| 3
```

To extract a value from a dictionary, use indexing:

```o
o)d:`red`blue`green!1 2 3;
o)d[`blue]
2
o)
```

As you probably guessed, dicts in O are actually represented using two vectors under the hood. So indexing a dict is in fact searching for a given key in dict "key" vector and applying its index to the second vector.

## Order of evaluation

Expressions in O are evaluated in a strict and unambiguous order - right to left. Arithmetic verbs are of no exception to that rule.

```o
o)4*2+3
20
o)
```

If you want to ensure some expressions are evaluated in a particlurar order - use parentheses.

```o
o)(4*2)+3
11
```

Note that evaluation order of separate expression is still left to right and top to bottom.

```o
o)f:{a:1+x;a*2};
o)f[10]
22
o)
```

## Verbs/adverbs overloading concepts

Vector languages are famous for their terseness and high expressiveness. Main concept behind that claim is their ability to "overload" names with meanings. E.g., most monadic verbs can be used in dyadic context as well but with different meaning. Different type combinations result in different meaning as well.

Let's see some examples. `#` verb in monadic context returns the length of the argument.

```o
o)#1 2 3
3
o)
```

When used in dyadic context with left argument being boolean vector, it's a filter:

```o
o)101b#1 2 3
1 3
```

... or "take" if the left arg is an integer scalar:

```o
o)2#1 2 3
1 2
o)
```

... or "reshape" if both left and right args are scalars:

```o
o)4#2
2 2 2 2
o)
```

The overloading concept allows "packing" a lot of functionality into quite limited ASCII charset.

Of course, the same idea can be applied to user-defined functions. However, some restrictions exist here. Using fewer arguments than expected will result in an error in the current version. Check for argument types and/or shapes instead.

## Indexing

To extract separate elements from vectors/lists, you need to index them. To do so, use square brackets (which is a common practice in programming). Index of first element of any vector is zero.

```o
o)a:1 2 3;
o)a[1]
2
o)
```

Just as any other verb in O, it allows using vectors as indices (even nested ones).

```o
o)a:1 2 3;
o)a[0 1]
1 2
o)a[(1; 0 2)]
2
1 3
o)
```

Now, let's imagine that you need to extract first 3 elements from a vector. You can easily enter 3 subsequent indices by hand but what if you need 500 indices? You can use `!` monadic verb to create 0...N-1 integers.

```o
o)a:!100;
o)a[!10]
0 1 2 3 4 5 6 7 8 9
o)
```

Dict indexing works exactly the same way:

```o
o)d:`a`b`c!1 2 3;
o)d[`c`b`a]
3 2 1
o)
```

## Reduction aka folding

To get some statistics for a vector, let's calculate "average" function. More formally, it is a sum of vector divided by the vector length. Summing of vector is done by using "fold" (or "over") adverb.

```o
o)a: 10 4 2 1 3 4;
o)+/a
24
o)
```

Next, divide the sum by vector length. Vector length is called `#` monadic verb in O parlance.

```o
o)(+/a)%#a
4
o)
```

Now, let's create a separate function to calculate the average:

```o
o)avrg:{(+/x)%#x}
{(+/x)%#x}
o)avrg[a]
4
o)
```

So far so good! However, let's try calculating the average of a vector with a fractional average.

```o
o)a:10 11 11;
o)avrg[a]
10
o)
```

Hm, it does not look good. On the other hand, we entered integer vector and thus got integer average. What if we want to get float value instead? Let's force float division by "casting" integer sums and element count as doubles. It is done with the `$` dyad. Left argument is a destination type, right argument is a source argument.

```o
o)avrg:{(`float$+/x)%`float$#x};
o)avrg[a]
10.666666666666666
o)
```

For full specification on `$` dyad see [Types](/reference/types/types.md).

## Boolean values and vectors

Boolean values are often produced by relational verbs. 0 and 1's correspond to false and true values, respectively. O has following relational verbs: &lt, >, >=, &lt=, =, &lt>. All of them are fully-atomic, that is, both left and right arguments go through nested structures.

```o
o)(1;2 3 4;5)>(1;2;4)
0b
011b
1b
o)
```

Well-known boolean algebra functions like "and", "or", "xor" are fully supported. Those are `&`, `|` and `&lt>`, respectively.

```o
o)a:1 2 3; b:2 2 1;
o)(a>b)&a>1
001b
o)
```

Counting 1's in boolean vectors is easy, just use previously mentioned "fold"/"over" verb.

```o
o)a:1 2 3;
o)+/a>=2
2
o)
```

Filtering is another useful verb. In the following example, it only returns values that are greater than or equal to 2.

```o
o)a:1 2 3
1 2 3
o)(a>=2)#a
2 3
o)
```

## Nulls and infinities

It's time to expand our knowledge about built-in types a bit. All scalar types in O have special value meaning absence of value. It is somewhat similar to zero in arithmetics. Each type has its own null value. E.g., long integer type null value is represented with `0N`, float double precision - `0f`, etc.

For full specification on nulls and infinities - see [Scalars](/reference/types/scalars/scalars.md). When a verb evaluates to the absence of something, it returns a null. For example, if you look for a non-existing element in a simple array, you will get a null of the array type.

```o
o)a:1 2 3;
o)a[3]
0N
o)
```

If you look for a non-existing element in a general list, you will get a generic null:

```o
o)a:(1;1 2)
1
1 2
o)a[2]
o)
```

... pay attention to the interpreter output. It is literally nothing! By the way, this is a way to create a generic null (since it lacks textual representation) - to index through an empty list.

```o
o)()0
o)
```

Positive and negative infinities are related to numeric types only. They have specific notation - `0W` with a corresponding type suffix, like `0Wf` (float with double precision), `0Wj` (long integer), short notation is `0w` and `0W`, respectively. Again, for full specification on infinities - see [Scalars](/reference/types/scalars/scalars.md).

Infinities are a result of calculations:

```o
o)1%0
0W
o)`short$100000
0Wh
o)
```

... casts also signal overflows with infinities.

## Find verb

Search is a fundamental operation and O has a specific verb to perform it. It's [dyadic `?`](/verbs/search/search.md). Left argument is a value to be searched for, right argument is a value to look for. The verb evaluates to an index of the value being searched or null if not found. If several same values reside in the left arg, only index of the first occurance is returned.

```o
o)a:1 2 2 3
1 2 2 3
o)a?2
1
o)a?4 2 0
0N 1 0N
o)
```

"Find" is quite a versatile verb. It behaves differently depending on the shape of the left argument. The verb is right-atomic when the left argument is a simple vector.

```o
o)a:1 2 3
1 2 3
o)a?(4;2 0)
0N
1 0N
```

If the left argument is a list and the right argument is a simple vector, the whole left argument is looked for.

```o
o)a:(0;1 2;1 2 3)
0
1 2
1 2 3
o)a?1 2 3
2
o)
```

Both nested arguments result in matching each element of the right argument against each element of the left one:

```o
o)a:(0;1 2;1 2 3);
o)a?(1 2 3;1 2;1)
2 1 0N
```

## "Take", "drop" and "reshape" verbs

Although indexing in theory is enough to use all operations with vectors, it's often useful to manipulate vectors with simpler and more specialized verbs.

The "take" verb cuts off a part of a vector. Left arg defines how many elements to "take" and right arg is vector to cut.

```o
o)2#1 2 3
1 2
o)
```

Negative left arguments mean "taking" from the end.

```o
o)-2#1 2 3
2 3
o)
```

"Drop" does the reverse operation - it evaluates to remaining part of a vector.

```o
o)2_1 2 3
,3
o)-2_1 2 3
,1
```

"Reshape" is used to literally transform the shape of its right arg into new one defined by the left arg.

```o
o)10#0
0 0 0 0 0 0 0 0 0 0
o)
```

... creates a simple vector of 10 integer zeroes.

```o
o)3 2#0
0 0
0 0
0 0
o)
```

... creates a nested vector of simple vectors.

```o
o)4 2 3#1 2 3 4
(1 2 3;4 1 2)
(3 4 1;2 3 4)
(1 2 3;4 1 2)
(3 4 1;2 3 4)
o)
```

... and a nested vector made of a single simple vector elements. See how this verb cycles through the right argument elements?

## Equality

Another important trait of operating on values is ability to check for equality. Conceptually, the O language supports two kinds of equality tests.

Fully atomic dyad "equal" (=) and "match" dyad (~). The first one requires compatible shape of the arguments and explores value equality deep into structure.

```o
o)(1;2 3;4)=(1;3;4)
1b
01b
1b
o)
```

"Match" dyad returns only one boolean answer - if two values are exactly the same.

```o
o)(1;2 3;4)~(1;3;4)
0b
o)
```

## "Each" adverb

Functional programming pays much attention to ease of functions evalution over value sequences. O language is of no exception.

Function evaluation over every vector element is sometimes called "mapping". That is, each vector element becomes an argument of a given function and all resulting values again form a vector. Adverb responsible for mapping is "each" (`'`). It takes monadic function plus vector and produces another vector.

```o
o)a:1 2 3;
o){x*x}'a
1 4 9
o)
```

...calculates squares over vector elements.

"Each dyad" adverb is quite similar to "each" but it takes two input vectors and applies pair of values to a dyad function.

```o
o)a:1 2 3; b:3 2 1;
o)a*'b
3 4 3
o)
```

"Each right" adverb is another variation of mapping. It takes two values and a dyadic function. The result of its evaluation is again an application of dyad to pairs of values. Pair of values are formed a bit differently though. Left argument is not iterated but provided as a whole. Only right argument elements are "mapped". Thus its name - "each right".

```o
o)a:1 2 3; b:3 2 1;
o)a*/:b
3 6 9
2 4 6
1 2 3
o)
```

"Each left" adverb has almost the same meaning. Except this time left arg is being iterated and the right one is provided as a whole.

```o
o)a:1 2 3; b:3 2 1;
o)a*\:b
3 2 1
6 4 2
9 6 3
o)
```

## Exercise. Table of multiplication

Now, let's try out a simple exercise and ask the interpreter to create the table of multiplication for us. We simply need to take all integer numbers between 1 and 9 and multiply all possible pairs. Firstly, we generate a vector of 1 tp 9.

```o
o)n:1+!9
1 2 3 4 5 6 7 8 9
o)
```

... done.

And iterate over `n` using the "each right" adverb:

```o
o)n*/:n
1 2 3 4 5 6 7 8 9
2 4 6 8 10 12 14 16 18
3 6 9 12 15 18 21 24 27
4 8 12 16 20 24 28 32 36
5 10 15 20 25 30 35 40 45
6 12 18 24 30 36 42 48 54
7 14 21 28 35 42 49 56 63
8 16 24 32 40 48 56 64 72
9 18 27 36 45 54 63 72 81
o)
```

... or "each left". It produces exactly the same result:

```o
o)n*\:n
1 2 3 4 5 6 7 8 9
2 4 6 8 10 12 14 16 18
3 6 9 12 15 18 21 24 27
4 8 12 16 20 24 28 32 36
5 10 15 20 25 30 35 40 45
6 12 18 24 30 36 42 48 54
7 14 21 28 35 42 49 56 63
8 16 24 32 40 48 56 64 72
9 18 27 36 45 54 63 72 81
o)
```

So the overall solution is:

```
n:1+!9; n*/:n
```

12 symbols. Can we do better? Remember - the shortest solution is usually the fastest.

Yes, in fact we can solve it using just one complex expression.

```
n*/:n:1+!9
```

... 10 symbols. We used the rule that each expression in O produces a value, even a variable binding! So we compressed our solution by whole 2 symbols! Not bad, not bad...

Now, what about memory consumption? This is another important factor in assessing solution. Our current solution has one unpleasant side-effect - it leaves "n" name bind to a temporary 1,2,... vector and thus this temporary vector still occupies precious memory. Let's fix that:

```
{x*/:x}1+!9
```

... back to 11 symbols, but now no temporary vectors hanging around!

## Flow control verbs

Changing flow of control is often used together with destructive verbs (see later) and with side-effect computations in general. It means that the evaluation expression does not only produce a value but also does some changes in overall environment (change bindings, vector/dict contents, etc).

One consequence of having side-effects is a necessity of introducing so-called "short-circuit" expressions. These are special expressions that evaluate their arguments on demand vs. before evaluating expression itself.

```o
o)a:10;b:10;
o)$[a>5;a:11;b:12];
o)a,b
11 10
o)
```

You can see that the triadic "cond" verb does not behave as other ordinary (functional) verbs. "Functional" (with side-effects) verb would evaluate all its arguments and change "b" binding as well.

"True" value is anything except boolean false, integer zero and empty vector/list.

The extended form of "cond" verb might remind you the chained "if-else" from C, Pascal and other imperative languages. More formally it is ```$[cond1; true_val1; cond2; true_val2; ... ; false_val]```. That is, "cond" evaluates each condition until boolean "true" or scalar value > 0 and evaluate corresponding "true_val" expression, otherwise "false_val" expression becomes the verb result.

```o
o)$[0b;`first;0b;`second;1b;`third;`fifth]
`third
o)
```

Another flow control verb is "return" verb. It interrupts current function evaluation and returns a given value as function result.

```o
o){a:x+1;:a;x}1
2
o)
```

... here "return" returns `a` binding value and does not evaluate the last `x` expression at all.

## Destructive verbs

Destructive (imperative, non-functional) expressions include binding changes and content changes.

Dyadic `:` verb and `set` verb bind changes. `:` verb has more complex behaviour depending on scoping. It assigns values to local variables inside functions and to globals otherwise.

```o
o){oo:1; oo}[]
1
o)oo
** runtime error: `undefined symbol`:
`oo
o)oo:2
2
o)oo
2
o)
```

`Set` verb does only global bindings. It expects binding name as a symbol in its first argument and its value in the second one.

```o
o){set[`a;1]}[];
o)a
1
o)
```

Verbs that change contents are much more versatile. It is related to a possibility of using more complex value shapes.

But first let's discuss some conceptions behind changing the content (or mutation as it's often called). O being a functional language protects value integrity by employing copy-on-write technique. What does it mean in practice? Let's start with scalars:

```o
o)a:10; b:a;
o)b+:1;
o)a,b
10 11
o)
```

... so far, nothing exceptional. `+:` is in fact a shortcut for ```.[`a;();+;1]``` (see later) and means adding 1 to an existing `a` value and update the `a` binding. Scalars in O work exactly the same way as in other imperial languages.

Now, let's try vectors:

```o
o)a:3#10;b:a
10 10 10
o)b+:1;
o)a,b
10 10 10 11 11 11
o)
```

... see the idea?

Destructive changes happen only when vector internal reference counter is equal to 1. It means that only one binding to vector value exists at a time. Otherwise, a copy is first made and the changes become local to that copy only. Even though the results on expression evaluation will be the same, it's always beneficial to apply destructive verbs to values that are not shared to avoid expansive copying.

In general, there are two kinds of content-modifying verbs: amend and dmend. Both amend and dmend can be triad and tetradic. Both of them first index value to get to its required element, apply user-provided function to that element and save the evaluation result back to value element.

When monadic function is applied to a value element, triad forms are used. Dyadic functions require an additional argument, that's why a tetradic form appear.

Indexing also divides into "horizontal" and "in-depth" indexing. "Horizontal" is denoted by the verb symbol `@` and "in-depth" one - by the dot symbol (`.`).

Destructive application is expected when first argument is a binding name represented with a symbol, otherwise - changes are applied to a copy.

Let's try to play with them:

```o
o)a:1 2 3;
o)@[a; 1; -:]
1 -2 3
o)a
1 2 3
o)
```

... read it like this - apply monadic verb "negate" to an element with index 1 of the `a` copy.

```o
o)a:1 2 3;
o)@[`a; 1; -:]
`a
o)a
1 -2 3
o)
```

... this time - destructive. Read it like this - apply destructively monadic verb "negate" to an element with index 1 of `a`.

Now, the same exercise but with indexing "in-depth" using "dmend":

```o
o)a:(1; 1 2 3);
o).[a; 1 1; -:]
1
1 -2 3
o)
```

And destructively:

```o
o)a:(1; 1 2 3)
1
1 2 3
o).[`a; 1 1; -:]
`a
o)a
1
1 -2 3
o)
```

Applying dyadic is easy after grasping the concept:

```o
o)a:1 2 3;
o)@[a; 1; +; 1]
1 3 3
o)
```

... and its "physical meaning" - apply dyadic verb "plus" to 1 and an element with index 1 of `a` copy.

```o
o)a:1 2 3;
o)@[`a; 1; +; 1]
`a
o)a
1 3 3
o)
```

... and its "physical meaning" - apply destructively dyadic verb "plus" to 1 and an element with index 1 of `a`.
And a short form for this is:

```o
o)a:1 2 3;
o)a[1]+:1;
o)a
1 3 3
o)
```

"Dmend" with dyadic:

```o
o)a:(1; 1 2 3);
o).[a; 1 1; -; 1]
1
1 1 3
o)
```

... and it's destructive form:

```o
o)a:(1; 1 2 3)
1
1 2 3
o).[`a; 1 1; -; 1]
`a
o) a
1
1 1 3
o)
```

One special form here is applying dyadic to the entire value:

```o
o)a: 1 2 3;
o).[`a; (); -; 1]
`a
o)a
0 1 2
o)
```

Actually, we've already seen its short form earlier:

```o
o) a: 1 2 3;
o)a-:1
`a
o)a
0 1 2
o)
```

## Signalling and error handling

Signalling is similar to exception raising in other languages. It interrupts normal evaluation order and "throws" a value across all nested functions until someone catches it or until REPL when it is just shown. The `'` (tick) monadic verb is responsible for "throwing" its argument.

```o
o){'x}`err
** signal error: `panic`:
err
o)
```

Error handling in O is done again with `@` and `.` triad. Yes, those are the most overloaded verbs in language. First argument defines a function to evaluate, the second one - its argument(s), the third one - a result in case of signalling or function catching the signal value. If no signalling occurred, the verb returns only the result of function evaluation.

```o
o)@[{x};1;`err2]
1
o)@[{'x};`err1;`err2]
`err2
o)@[{'x};`err1;{x}]
kind   | `signal
call   | "panic"
message| `err1
o)
```

... the `@` form expects a monadic as first argument, thus, the second argument is passed as a whole.

The `.` form expects a list that can be nested for all function parameters.

```o
o).[+;(1;2);`err2]
3
o).[{x+y};(1;2);`err2]
3
o).[{'y};(1;`err1);{x}]
kind   | `signal
call   | "panic"
message| `err1
o)
```

## Scripts

A script is an O program stored in a text file on disk. Typically O programs have ".o" file extension.

Just provide your script filename as a first argument and instead of continuously evaluating expressions from REPL, interpreter executes the script and stops after evaluation completes.

For example:

```os
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

::: note
TODO
:::

## Queries

::: warn
TODO
:::

## Idioms

::: crit
TODO
:::
