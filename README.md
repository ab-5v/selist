selist
======

Returns list of selectors from your css file.

```
cat common.css | selist             # dirty regexp parser
cat common.css | selist --strict    # strict ast parser
```
