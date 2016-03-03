var css = require('css');
var traverse = require('traverse');

var selist = require('../index');

module.exports = {

    parse: function(input, options) {
        options = options || {};

        if (!options.strict) {
            return selist(input);
        }

        var res = [], ast, rePseudo = /::?(?:before|after|focus|hover|active|-[a-z-]+)/g;

        try {
            ast = css.parse( input );
        } catch(e) {
            console.error('Parse error at line', e.line, 'column', e.column);
        }

        if (!ast) { return null; }

        traverse(ast).map((node) => {
            if (node && node.type === 'rule') {
                node.selectors.forEach((selector) => {
                    selector = selector.replace(rePseudo, '').trim();
                    if (selector && !/^@/.test(selector)) {
                        res.push(selector);
                    }
                });
            }
        });

        return res;
    }
};
