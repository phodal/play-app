const md = require('markdown-it')();
const isString = require('lodash.isstring');

export default class MarkdownHelper {
  static convert(str, options) {
    if (!isString(str)) {
      return '';
    }
    let paddingWidth = 20;
    let width = options.width - paddingWidth;
    let height = width * 0.6;
    let html = md.render(str);
    html = html.replace(new RegExp('<p>', 'g'), '<span>')
      .replace(new RegExp('</p>', 'g'), '</span>')
      .replace(new RegExp('src="/static/media/uploads/', 'g'),
        `width="${width}" height="${height}" src="https://www.wandianshenme.com/static/media/uploads/`);

    return html;
  }
}
