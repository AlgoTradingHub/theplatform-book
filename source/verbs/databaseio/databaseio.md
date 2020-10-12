# Database IO

One of important features is database persistance. Conceptually, there are two kinds of persistance in O language - reading/writing entire files from/to disk and projecting vectors/tables directly from disk.

The first kind is easier and more powerful as it support more O types.
The second kind is often faster and more memory-efficient, but supports only a subset of O structures - vectors of simple/fixed types, dicts and tables.
