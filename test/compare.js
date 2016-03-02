require('colors')
var selist = require('../');

var fs = require('fs');
var glob = require('glob');
var diff = require('diff');

glob('./test/css/*.css', function(err, files) {
    if (err) { return; }
    var tDirty = tStrict = 0;

    files.forEach(function(path) {
        var diffs = '';
        var input = fs.readFileSync(path, 'utf8');

        var t = +new Date();
        var dirty = selist.parseDirty(input).join('\n');
        tDirty += +new Date() - t;

        var t = +new Date();
        var strict = selist.parseStrict(input).join('\n');
        tStrict += +new Date() - t;

        diff
            .diffLines(strict, dirty)
            .forEach(function(part) {
                var color;
                if (part.added) { color = 'green'; }
                if (part.removed) { color = 'red'; }

                if (color) {
                    diffs += part.value[color];
                }
            });

        if (diffs) {
            console.log(path['gray'] + ' FAIL'['red']);
            process.stdout.write(diffs);
        } else {
            console.log(path['gray'] + ' OK'['green']);
        }
    });


    console.log('');

    console.log('dirty: ' + tDirty + 'ms');
    console.log('strict: ' + tStrict + 'ms');
});
