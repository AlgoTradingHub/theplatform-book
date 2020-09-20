# Serialization

Platform nodes are allowed to communicate each other or with external world by serialized messages.

## Message format

- Header
- Data

## Header

```rust
struct Header {
   pref: u16,      // PREFIX 0x0A0D (2 bytes) BIG ENDIAN
   reserved1: u16, // reserved (2 bytes)
   reserved2: u32, // reserved (4 bytes)
   len: usize,     // length of message in bytes (8 bytes) (without header len) BIG ENDIAN
}
```

## Data

Data is buffer contains serialized AST - any type/sum of types existent in the language.
Each type serialized using simple rules:

1. Type ID (32 bits) BIG ENDIAN

2. Value type:

    - Scalar - scalar value BIG ENDIAN.
    - Vector - 64 bit length followed by raw buffer with vector data.
    - List   - 64 bit length followed by recursively serialized each element of a list.
    - Dict   - serialized as two lists of keys and values.
    - Table  - same as Dict.

## Types encode rules

_To see complete list of types ids - use --dump-ffi parameter for tachyon binary._

| TYPE ID | VECTOR/SCALAR | NAME | EXAMPLE | SERIALIZED |
| --- | --- | --- | --- | --- |
| 0 | s | nil | :: | [0] |
| 64 | s | bool | 1b | [64, true] |
| 45120 | v | bool | 10b | [45120, 2, true, false] |
| 128 | s | byte | 1x | [128, 1] |
| 45184| v | byte | 1 2x | [45184, 2, 1,2] |
| 192 | s | short | 1h | [192, 1] |
| 45248 | v | short | 1 2h | [45248, 2, 1, 2] |
| 256 | s | int | 1i | [256, 1] |
| 45312 | v | int | 1 2i | [45312, 2, 1, 2] |
| 320 | s | long | 1 | [320, 1] |
| 45376 | v | long | 1 2 | [45376, 2, 1, 2] |
| 512 | s | single | 1.1e | [512, 1.1] |
| 45568 | v | single | 1.1 1.2e | [45568, 2, 1.1, 1.2] |
| 576 | s | double | 1.1 | [576, 1.1] |
| 45632 | v | double | 1.1 1.2 | [45632, 2, 1.1, 1.2] |
| 46400 | v | char | “asd” | [46400, 3, “asd”] |
| 1281 | s | symbol | \`s | [1281, 1, “s”] |
| 46337 | v | symbol | \`s\`d | [46337, 2, [1, “s”], [1, “d”]] |
| 324 | s | timestamp | 2000.01.01D00:00:00.000000012 | [324, 12] |
| 45380 | v | timestamp | ,2000.01.01D00:00:00.000000012 | [45380, 1, 12] |
| 260 | s | month | 2001.01m | [260, 12] |
| 45316 | v | month | ,2001.01m | [45316, 1, 12] |
| 264 | s | date | 2000.01.13 | [264, 12] |
| 45320 | v | date | ,2000.01.13 | [45320, 1, 12] |
| 328 | s | datetime | 2000.01.01T00:00:00.012 | [328, 12] |
| 45384 | v | datetime | ,2000.01.01T00:00:00.012 | [45384, 1, 12] |
| 268 | s | minute | 0:12 | [268, 12] |
| 45324 | v | minute | ,00:12 | [45324, 1, 12] |
| 272 | s | second | 0:00:12 | [272, 12] |
| 45328 | v | second | ,00:00:12 | [45328, 1, 12] |
| 276 | s | time | 0:00:00 | [276, 12] |
| 45332 | v | time | ,00:00:00.012 | [45332, 1, 12] |
| 770 | s | GUID | first 1?0Ng | [770, “c962dcaa-66a7-4934-aa7e-bb0a6f029b42”] |
| 45826 | v | GUID | 1?0Ng | [45826, 1, “c962dcaa-66a7-4934-aa7e-bb0a6f029b42”] |
| 126976 | s | lambda | {x+y} | - |
| 126988 | - | dict | \`a\`s!(1 2;3 4) | [126988, [126988, 2, “a”, “s”], [47107, 2, [45376, 2, 1, 2],[45376, 2, 3, 4]]] |
| 63492 | - | table | (+:)\`a\`s!(1 2;3 4) | [126984, [126988, 2, “a”, “s”], [47107, 2, [45376, 2, 1, 2],[45376, 2, 3, 4]]] |
| 47107 | v | list | (1;2.1;”3”) | [47107, 3, [320, 1],[576, 2.1],[46400, 1, “3”]] |
| 32768 |  | monad | #ERROR! | [32768, 1, “+”] |
| 32772 |  | dyad | #ERROR! | [32772, 1, “+”] |
| 32776 |  | triad | first quote ($[1;2;3]) | [32776, 1, “$”] |
| 32780 |  | tetrad | first quote (@[1;2;3;4]) | [32780, 1, “@”] |
| 32784 |  | polyad | enlist | [32784, 6, “enlist”] |

## Nulls

- 0Nh: -32768 (short)
- 0Ni: -2147483648 (int)
- 0N:  -9223372036854775808 (long)
- 0Ne: -NaN (single)
- 0Nf: -NaN (double)
