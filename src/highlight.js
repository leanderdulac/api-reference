import visit from 'unist-util-visit';

import hljs from 'highlight.js/lib/highlight';
import http from 'highlight.js/lib/languages/http';
import ruby from 'highlight.js/lib/languages/ruby';
import php from 'highlight.js/lib/languages/php';
import csharp from 'highlight.js/lib/languages/cs';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('php', php);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('http', http);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);

/**
 * Adapted from remark-highlight.js
 * https://github.com/ben-eb/remark-highlight.js
 */
export default function attacher() {
    function visitor(node) {
        if (!node.lang) {
            return;
        }

        let data = node.data;

        if (!data) {
            node.data = data = {};
        }

        data.htmlContent = hljs.highlightAuto(node.value, [node.lang]).value;
        data.htmlAttributes = data.htmlAttributes || {};
        data.htmlAttributes.class = [
            'hljs',
            data.htmlAttributes.class
        ].filter(Boolean).join(' ');
    }

    return ast => visit(ast, 'code', visitor);
}
