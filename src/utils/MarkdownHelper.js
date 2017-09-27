const hljs = require('highlightjs'); // https://highlightjs.org/

const md = require('markdown-it')({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(lang, str, true).value
          }</code></pre>`.replace(/\n/g, '<br>');
      } catch (__) {
        console.error(__);
      }
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str).replace(/\n/g, '<br>')}</code></pre>`;
  }
});

export default class MarkdownHelper {
  static convert(str, options) {
    let width = options.width;
    let height = width * 0.6;
    let html = md.render(str);
    html.replace(new RegExp('<p>', 'g'), '<span>')
        .replace(new RegExp('</p>', 'g'), '</span>')
        .replace('src="/static/media/uploads/',
          `width="${width}" height="${height}" src="https://www.wandianshenme.com/static/media/uploads/`);
    return html;
  }
}
