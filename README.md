selist
======

CSS selectors extractor.

* Small as less than 500B.
* Fast as 50KB of parsed css per ms on my macbook.
* Reliable enought (to get the same results as strict, AST based, parser</div> [reworkcss/css](https://github.com/reworkcss/css) on my 30MB of CSS).

Install it with npm:
```
npm i selist
```
And use as a CLI tool:
```
cat common.css | selist             # selist regexp parser
cat common.css | selist --strict    # strict ast parser
```
Or as a node module:
```
var selist = require('selist');
selist.parse('.you-css-string {}');
selist.parse('.you-css-string {}', {strict: 1});
```

Want to test if it works for your css? Just fill `test/css` folder with css files you like and run
```
npm test
```
It will show you where is it different from strict parser and nice stats:
```
total css size processed 14.64 MB
selist took 271ms on 55.31 KB/ms
strict took 126069ms on 122 B/ms
```

Found any problems? Fire an [issue](https://github.com/artjock/selist/issues).

MIT
