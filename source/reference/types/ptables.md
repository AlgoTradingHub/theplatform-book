# Partitioned tables

Special way of storing tables splitting whole table by records. Criteria for splitting is duplicating values of single or several fields. In other words, it's
 table grouping by fields. This format naturally suits time series data. 

Fields to group partition by are called partition fields. For instance, partitioning by dates/months/years/etc. 

Partitioned table is a table consisting of a set of partitioned vectors. They also have keys/field names - symbol vector & values/field vectors.

Partitioned tables will be called ptables for brevity.

## Ptable support

Almost all common verbs made for tables should operate on partitioned tables transparently. 

Some exceptions exist though:
* All mutating verbs - amend, dmends, upserts, etc. Cast back to dict first & mutate as usual.
* Neither scalar nor composite indices are supported. That has same implications for verbs like ```?``` ("find"), queries, etc.
* ```~``` ("match") verb is not implemented for ptables.
* Queries has their own set of limitations for ptables. See corresponding section.


## Ptable creation

Creating ptables consists of several stages:

* Creating non-partitioned table collecting all partitioning fields. Let's call it ```gf```.
* Creating partition information table. This table keeps all persistent information on each partition. It's ```info``` in our example.
* Creating mount-related table. This table keeps current partition data. ```mnt``` field will keep it.
* Optional domain symbol in ```sym``` field.
* Collecting all above data under single dict (dict with meta-information) & casting it to ptable type.

Our small example as follows:

```o
o) gf:+`a`b!(1 2;10 20);
o) info:+`size`segId`refPath!(2 2; 0 0; (0N0;0N0));
o) p1: +`c`d!(100 100;200 200);
o) p2: +`c`d!(1000 1000;2000 2000);
o) mnt:+`mntval!(p1;p2);
o) mt: `gf`info`mnt!(gf;info;mnt);
o) pt: `ptable$mt;
o) pt
a b  c    d   
--------------
1 10 100  200 
1 10 100  200 
2 20 1000 2000
2 20 1000 2000
```

Reverse conversion back to dict is also supported via casting at any time.
```o
o) gf:+`a`b!(1 2;10 20);
o) info:+`size`segId`refPath!(2 2; 0 0; (0N0;0N0));
o) p1: +`c`d!(100 100;200 200);
o) p2: +`c`d!(1000 1000;2000 2000);
o) mnt:+`mntval!(p1;p2);
o) mt: `gf`info`mnt!(gf;info;mnt);
o) pt: `ptable$mt;
o) d:`dict$pt;
o) d
gf  | +`a`b!(1 2;10 20)
info| +`size`segId`refPath!(2 2;0 0;(0N0;0N0))
mnt | +,`mntval!((+`c`d!(100 100;200 200);+`c`d!(1000 1000;2000 2000)))
```



Now, let's make a detailed overview of required information in meta-dict.

| Meta dict fields | | | | Description / comments |
| --- | --- | --- | --- | --- |
| `gf | `info | `mnt | `sym | Top level meta-dict fields |
| All partitining fields (table) | All persistent info (table) | Mounting info (table) | Domain symbol | |
| `gf1 `gf2 `gf3 ... | `size `segId `refPath | `mntval | | Meta-dict table fields |
| All partiting fields table | `size - vector of longs keeping partition size  | mounted partition data | | |
|  | `segId - segment id, vector of longs (reserved)  |  | | |
|  | `refPath - list/vector of reference paths for each partition  |  | | |
| Possible combinations for partition info |  |  | | |
| val1 val2 val3 | `size - (long), segId - (long), `refPath - 0N0  | Immediate partition table value | | Partition table is in RAM. Saved on unmount. |
| val1 val2 val3 | `size - (long), segId - (long), `refPath - 0N0  | 0N0 | | Special case for partition table. Only partitioning fields exist. |
| val1 val2 val3 | `size - (long), segId - (long), `refPath - file symbol (without slash at the end)  | Immediate partition table value | | Partition is loaded entirely on mount. Saved on unmount in a single file. |
| val1 val2 val3 | `size - (long), segId - (long), `refPath - file symbol (with slash at the end)  | Projected table value | | Partition is in splayed table on disk. |
| val1 val2 val3 | `size - (long), segId - (long), `refPath - file or namespace symbol or namespace path list  | Same value as in `refPath | | Lazily mounted partition. |

::: note
Zero-sized partitioned tables are not supported. At least one partition should exist.
:::
   

::: note
For ```refPath``` having value other that 0N0, it's recommended to keep non-zero corresponding ```size``` field.
Otherwise, on turning meta-dict to ptable a possibly expensive operation of loading partition & determining its size occurs.
In other words, even though lazy partition are supported, they require knowing their size in advance.
:::

## Ptable related functions

All ptable related functions reside in ```std/core.o``` file. Make sure it's loaded before using them.

### Creating ptable or adding new partition

Passing 0N0 to ```.o.pnew``` as existing partitioned table makes a new table, otherwise adds a new partition.

```o
o) load "core";
o) gf:+`a`b!(1 2;10 20);
o) info:+`size`segId`refPath!(2 2; 0 0; (0N0;0N0));
o) p1: +`c`d!(100 100;200 200);
o) p2: +`c`d!(1000 1000;2000 2000);
o) mnt:+`mntval!(p1;p2);
o) pd: `gf`info`mnt!(gf;info;mnt);
o) pt:.o.pnew[0N0; pd];
o) pt
a b  c    d   
--------------
1 10 100  200 
1 10 100  200 
2 20 1000 2000
2 20 1000 2000
```

And creating new ptable with enum fields is done like:
```o
o) sym1::`1`2`100`1000;
o) sym2::sym1;
o) gf:+`a`b!(`sym1$`1`2;10 20);
o) info:+`size`segId`refPath!(2 2; 0 0; (0N0;0N0));
o) p1: +`c`d!(`sym1$`100`100;200 200);
o) p2: +`c`d!(`sym1$`1000`1000;2000 2000);
o) mnt:+`mntval!(p1;p2);
o) pd: `gf`info`mnt`sym!(gf;info;mnt;`sym2);
o) pt:.o.pnew[`ptable$pd; pd];
o) pt`a
`sym2$`1`1`2`2`1`1`2`2
```
Note ```sym2``` becomes domain for the entire ptable.


See following for adding new partition.

```o
o) gf:+`a`b!(1 2;10 20);
o) info:+`size`segId`refPath!(2 2; 0 0; (0N0;0N0));
o) p1: +`c`d!(100 100;200 200);
o) p2: +`c`d!(1000 1000;2000 2000);
o) mnt:+`mntval!(p1;p2);
o) pd: `gf`info`mnt!(gf;info;mnt);
o) pt:.o.pnew[`ptable$pd; pd];
o) pt
a b  c    d   
--------------
1 10 100  200 
1 10 100  200 
2 20 1000 2000
2 20 1000 2000
1 10 100  200 
1 10 100  200 
2 20 1000 2000
2 20 1000 2000
```

### Saving / loading ptable to/from disk

Ptables are saved into one directory by default. Sub-directories are named using random GUID values unless manually named (use ```refPath```).

```.o.pset``` function is used for saving to disk, ```.o.pget``` - to get saved ptable meta from disk.

```o
o) gf:+`a`b!(1 2;10 20);
o) info:+`size`segId`refPath!(2 2; 0 0; (0N0;0N0));
o) p1: +`c`d!(100 100;200 200);
o) p2: +`c`d!(1000 1000;2000 2000);
o) mnt:+`mntval!(p1;p2);
o) pd: `gf`info`mnt!(gf;info;mnt);
o) pt:.o.pnew[0N0; pd];
o) .o.pset[`:/tmp/pset1/; pt];
o) pt2:.o.pget[`:/tmp/pset1/];
```

Just as with ordinary table, it's user responsibility to assign domains to enums.
Use ```.o.psym``` function to re-assign domain symbol after loading ptable. 

```o
o) sym1::`1`2`100`1000;
o) sym2::sym1;
o) gf:+`a`b!(`sym1$`1`2;10 20);
o) info:+`size`segId`refPath!(2 2; 0 0; (0N0;0N0));
o) p1: +`c`d!(`sym1$`100`100;(200;"TEST"));
o) p2: +`c`d!(`sym1$`1000`1000;(2000;"TEST"));
o) mnt:+`mntval!(p1;p2);
o) pd: `gf`info`mnt!(gf;info;mnt);
o) pt:.o.pnew[0N0; pd];
o) .o.pset[`:/tmp/pset3/; pt];
o) pt2:.o.pget[`:/tmp/pset3/];
o) pt2:.o.psym[pt2; `sym2];
o) pt2`a
`sym2$`1`1`2`2
```

### Deleting partitions

Removing partition is made using ```.o.pdel``` function. It returns partitioned table without deleted partition. 
Partition are specified either by their partitioning values or by partition numbers (starting from zero).

```o
o) gf:+`a`b!(1 2;10 20);
o) info:+`size`segId`refPath!(2 2; 0 0; (0N0;0N0));
o) p1: +`c`d!(100 100;200 200);
o) p2: +`c`d!(1000 1000;2000 2000);
o) mnt:+`mntval!(p1;p2);
o) pd: `gf`info`mnt!(gf;info;mnt);
o) pt:.o.pnew[0N0; pd];
o) pt2:.o.pdel[pt; 0];
o) pt2
a b  c    d   
--------------
2 20 1000 2000
2 20 1000 2000
```

### Mounting / unmounting partitions

To avoid quite heavy lazy mounting and immediately unmounting partitions, manual mounting is supported.

See example below. Note compound lists partitions.

```o
o) // test with compound list in partitions
o) gf:+`a`b!(1 2;10 20);
o) info:+`size`segId`refPath!(2 2; 0 0; (0N0;0N0));
o) .p1: +`c`d!(100 100;(200;"TEST"));
o) .p2: +`c`d!(1000 1000;(2000;"TEST"));
o) mnt:+`mntval!(.p1;.p2);
o) pd: `gf`info`mnt!(gf;info;mnt);
o) pt:.o.pnew[0N0; pd];
o)
o) // save to disk and load back
o) .o.pset[`:/tmp/pmnt_umnt1/; pt];
o) pt2:.o.pget[`:/tmp/pmnt_umnt1/];
o)
o) pt3:.o.pmnt[pt2; gf];
o) d3:`dict$pt3;
o) pt4:.o.pumnt[pt3; gf];
o) d4:`dict$pt4;
o) d3
gf  | +`a`b!(1 2;10 20)
info| +`size`segId`refPath!(2 2;0 0;(`:1c516dea-89b1-4182-9f1f-feecb3420efe/;`:3848a412-1c17-4935-92ae-fd6ce2dc4a40/))
mnt | +,`mntval!((+`c`d!(100 100;(200;"TEST"));+`c`d!(1000 1000;(2000;"TEST"))))
root| `:/tmp/pmnt_umnt1/
o) d4
gf  | +`a`b!(1 2;10 20)
info| +`size`segId`refPath!(2 2;0 0;(`:1c516dea-89b1-4182-9f1f-feecb3420efe/;`:3848a412-1c17-4935-92ae-fd6ce2dc4a40/))
mnt | +,`mntval!((`:1c516dea-89b1-4182-9f1f-feecb3420efe/;`:3848a412-1c17-4935-92ae-fd6ce2dc4a40/))
root| `:/tmp/pmnt_umnt1/
```

Note how ```mntval``` contents change in each stage.
