PHP-SQL-Parser
==============

A pure PHP SQL (non validating) parser w/ focus on MySQL dialect of SQL

### Installation

Install with composer:

```shell
composer require greenlion/php-sql-parser
```

### Downloads

 [GitHub Wiki](https://github.com/greenlion/PHP-SQL-Parser/wiki/Downloads)<br>
    
### Full support for the MySQL dialect for the following statement types

    SELECT
    INSERT
    UPDATE
    DELETE
    REPLACE
    RENAME
    SHOW
    SET
    DROP
    CREATE INDEX
    CREATE TABLE
    EXPLAIN
    DESCRIBE

### Other SQL statement types

Other statements are returned as an array of tokens. This is not as structured as the information available 
about the above types. See the [ParserManual](https://github.com/greenlion/PHP-SQL-Parser/wiki/Parser-Manual) 
for more information.

### Other SQL dialects

Since the MySQL SQL dialect is very close to SQL-92, this should work for most database applications that 
need a SQL parser. If using another database dialect, then you may want to change the reserved words - 
see the [ParserManual](https://github.com/greenlion/PHP-SQL-Parser/wiki/Parser-Manual). It supports 
UNION, subqueries and compound statements.

### External dependencies

The parser is a self contained class. It has no external dependencies. The parser uses a small amount of regex.

### Focus

The focus of the parser is complete and accurate support for the MySQL SQL dialect. The focus is not on 
optimizing for performance. It is expected that you will present syntactically valid queries.

### Manual and Documentation

[ParserManual](https://github.com/greenlion/PHP-SQL-Parser/wiki/Parser-Manual) 
 - Check out the manual.

[Documentation](https://rezonant.github.io/PHP-SQL-Parser/doc/class-PHPSQLParser.PHPSQLParser.html) 
 - API documentation

### Usage

Call the parser with:

```php

use PHPSQLParser\PHPSQLParser;
$parser = new PHPSQLParser();
$parsed = $parser->parse($sql);
print_r($parsed);
```

### Statements

```php
$parser = new PHPSQLParser('select 2');
$creator = new PHPSQLCreator();
$statement = $creator->create($parser->parsed);
```

### Example Output

Given an SQL query such as:

```sql
SELECT STRAIGHT_JOIN a, b, c 
  FROM some_table an_alias
 WHERE d > 5;
```

The parse() method will produce the following result (via print_r):

```php
Array
( 
    [OPTIONS] => Array
        (
            [0] => STRAIGHT_JOIN
        )       
        
    [SELECT] => Array
        (
            [0] => Array
                (
                    [expr_type] => colref
                    [base_expr] => a
                    [sub_tree] => 
                    [alias] => `a`
                )

            [1] => Array
                (
                    [expr_type] => colref
                    [base_expr] => b
                    [sub_tree] => 
                    [alias] => `b`
                )

            [2] => Array
                (
                    [expr_type] => colref
                    [base_expr] => c
                    [sub_tree] => 
                    [alias] => `c`
                )

        )

    [FROM] => Array
        (
            [0] => Array
                (
                    [table] => some_table
                    [alias] => an_alias
                    [join_type] => JOIN
                    [ref_type] => 
                    [ref_clause] => 
                    [base_expr] => 
                    [sub_tree] => 
                )

        )

    [WHERE] => Array
        (
            [0] => Array
                (
                    [expr_type] => colref
                    [base_expr] => d
                    [sub_tree] => 
                )

            [1] => Array
                (
                    [expr_type] => operator
                    [base_expr] => >
                    [sub_tree] => 
                )

            [2] => Array
                (
                    [expr_type] => const
                    [base_expr] => 5
                    [sub_tree] => 
                )

        )

)
```

### Parse tree overview

The parsed representation returned by php-sql-parser is an associative array of important SQL sections 
and the information about the clauses in each of those sections. Because this is easier to visualize, 
I'll provide a simple example. As I said, the parser splits up the query into sections. Later the manual 
will describe what sections are available each of the supported SQL statement types.

In the example the given query has three sections: **SELECT,FROM,WHERE**. You will see each of these 
sections in the parser output. Each of those sections contain items. Each item represents a keyword, a 
literal value, a subquery, an expression or a column reference.

In the following example, the **SELECT** section contains one item which is a column reference (colref). The 
FROM clause contains only one table. You'll notice that it still says 'JOIN'. Don't be confused by this. 
Every table item is a join, but it may not have any join critera. Finally, the where clause consists of 
three items, a colref, an operator and a literal value (const).
