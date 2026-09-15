import { describe, expect, it } from 'vitest';
import { marked } from 'marked';
import { renderMarkdown } from './markdown';

// Payloads that marked 15 passes through untouched (raw HTML is forwarded and
// javascript: URLs are kept), so they must be neutralized by the sanitizer.
const XSS_PAYLOADS = [
  '<img src=x onerror=alert(1)>',
  '<script>alert(1)</script>',
  '<iframe src="https://evil.example"></iframe>',
  '<svg/onload=alert(1)>',
  '<template><img src=x onerror=alert(1)></template>',
  '<form action="https://evil.example"><input name=a></form>',
  '<div style="background:url(javascript:alert(1))">d</div>',
  '<a href="https://evil.example" onclick="alert(1)">x</a>',
  '[click](javascript:alert(1))',
  '![x](javascript:alert(1))',
  '<a href="JaVaScRiPt:alert(1)">x</a>',
  '<a href="java\tscript:alert(1)">x</a>',
];

const FORBIDDEN_TAGS = [
  'script', 'iframe', 'object', 'embed', 'form', 'input', 'button',
  'template', 'style', 'link', 'meta', 'svg', 'math', 'base',
];

const isJavascriptUrl = (value) =>
  value.replace(/\s/g, '').toLowerCase().startsWith('javascript:');

/** Parse sanitized HTML and assert nothing executable survived. */
function expectNoExecutableMarkup(html) {
  const host = document.createElement('div');
  host.innerHTML = html;

  expect(host.querySelector(FORBIDDEN_TAGS.join(','))).toBeNull();
  expect(host.textContent).not.toMatch(/<script/i);

  for (const element of host.querySelectorAll('*')) {
    for (const attribute of element.attributes) {
      const name = attribute.name.toLowerCase();
      expect(name.startsWith('on'), `event handler ${name} survived`).toBe(false);
      expect(name === 'style', 'inline style survived').toBe(false);
      if (name === 'href' || name === 'src') {
        expect(isJavascriptUrl(attribute.value), `${name}=${attribute.value}`).toBe(false);
      }
    }
  }
}

describe('renderMarkdown', () => {
  it.each(XSS_PAYLOADS)('neutralizes %s', (payload) => {
    expectNoExecutableMarkup(renderMarkdown(payload));
  });

  it('keeps normal resume markup', () => {
    const html = renderMarkdown('# 罗威\n\n## 项目经历\n\n* 中国银行香港分行');

    expect(html).toContain('<h1');
    expect(html).toContain('罗威');
    expect(html).toContain('<h2');
    expect(html).toContain('<li>中国银行香港分行</li>');
  });

  it('keeps bold and table content', () => {
    const html = renderMarkdown('**江汉大学 - 计算机科学与技术**\n\n| a | b |\n| - | - |\n| 1 | 2 |');

    expect(html).toContain('<strong>江汉大学 - 计算机科学与技术</strong>');
    expect(html).toContain('<table>');
    expect(html).toContain('<td>1</td>');
  });

  it('hardens external links', () => {
    const host = document.createElement('div');
    host.innerHTML = renderMarkdown('[blog](https://luowei95327.github.io/)');
    const link = host.querySelector('a');

    expect(link.getAttribute('href')).toBe('https://luowei95327.github.io/');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('returns an empty string for empty input', () => {
    expect(renderMarkdown('')).toBe('');
    expect(renderMarkdown(undefined)).toBe('');
  });

  it('does not leak configuration into the global marked singleton', () => {
    renderMarkdown('# 罗威');

    expect(marked.parse('a\nb')).toBe('<p>a\nb</p>\n');
  });
});
