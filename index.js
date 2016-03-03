/**
 * CSS selectors extractor
 * In 99,9% cases works exactly as proper AST rework/css parser,
 * but much smaller and faster and only gives you selector's list
 *
 * @author Artur Burtsev <artjock@gmail.com>
 * @tags css selectors
 * @link https://github.com/artjock/selist
 *
 * @param String input css string
 * @return Array of selectors
 */
function selist(input) {
    // remove comments|pseudo elemens|at-properties
    var i, l, res = [],
        reClean = /(?:\/\*[\s\S]*?\*\/|::?(?:before|after|focus|hover|active|-[a-z-]+)|@(?:media|charset|\-)[^{;]*?(?:\{|;))/g,
        reEmpty = /^(?:\s*|from|to)$/,
        reSelector = /(?:(?:^|\})\s*)([^%}{@]+?)(?:\s*(?:$|\{))/g,
        reSeparator = /\s*,\s*/;

    if (!input) { return res; }

    input
        .replace(reClean, '')
        .replace(reSelector, function(a, set) {
            split = set.split(reSeparator);
            for (i = 0, l = split.length; i < l; i++) {
                if (!reEmpty.test(split[i])) {
                    res.push(split[i]);
                }
            }
    });

    return res;
}

if (typeof module == 'object' && module.exports) { module.exports = selist; }
