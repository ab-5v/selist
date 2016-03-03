module.exports = {

    parse: function(input, options) {
        options = options || {};

        return options.strict ?
            this.parseStrict(input, options):
            this.parseDirty(input, options);
    },

    _reEmpty:               /^(?:\s*|from|to)$/,
    _reComment:             /\/\*[\s\S]*?\*\//g,
    _reMediaQuery:          /@(?:media|charset|\-)[^{;]*?(?:\{|;)/g,
    _reSelectorName:        /(?:(?:^|\})\s*)([^%}{@]+?)(?:\s*(?:$|\{))/g,
    _rePseudoElement:       /::?(?:before|after|focus|hover|active|-[a-z-]+)/g,
    _reSelectorSeptator:    /\s*,\s*/,

    parseDirty: function(input) {
        var res = [], split, one, i, l;

        if (!input) { return []; }

        input
            .replace(this._reComment, '')
            .replace(this._reMediaQuery, '')
            .replace(this._reSelectorName, (a, set) => {
                split = set.split(this._reSelectorSeptator);
                for (i = 0, l = split.length; i < l; i++) {
                    one = split[i].replace(this._rePseudoElement, '');
                    if (!this._reEmpty.test(one)) {
                        res.push(one);
                    }
                }
        });

        return res;
    },

    parseStrict: function(input) {
        var res = [], ast;
        var css = require('css');

        try {
            ast = css.parse( input );
        } catch(e) {
            console.error('Parse error at line', e.line, 'column', e.column);
        }

        if (!ast) { return null; }

        require('traverse')(ast).map((node) => {
            if (node && node.type === 'rule') {
                node.selectors.forEach((selector) => {
                    selector = selector.replace(this._rePseudoElement, '').trim();
                    if (selector && !/^@/.test(selector)) {
                        res.push(selector);
                    }
                });
            }
        });

        return res;
    }

};
