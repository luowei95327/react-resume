import DOMPurify from 'dompurify';
import { Marked } from 'marked';

// Resume content is rendered with dangerouslySetInnerHTML, so the HTML that
// marked produces must never be trusted: marked passes raw HTML and
// javascript: URLs through untouched and its `sanitize` option no longer
// exists, so every render has to go through DOMPurify first.
//
// Both lists are explicit allowlists (everything else is dropped) so that a
// future marked upgrade cannot widen the attack surface on its own.
const ALLOWED_TAGS = [
  'a', 'blockquote', 'br', 'code', 'del', 'em', 'h1', 'h2', 'h3', 'h4', 'h5',
  'h6', 'hr', 'img', 'li', 'ol', 'p', 'pre', 'span', 'strong', 'table',
  'tbody', 'td', 'th', 'thead', 'tr', 'ul',
];

const ALLOWED_ATTR = [
  'alt', 'class', 'colspan', 'href', 'rowspan', 'src', 'title',
];

// A private Marked instance keeps this configuration from leaking into the
// global singleton that marked exports as `setOptions`/`use` targets.
//
// `breaks` mirrors GitHub's line break behaviour: the resume source is written
// with meaningful single line breaks (one contact link per line, headings above
// their content) and used to be shown inside a <pre>, so soft breaks have to
// stay line breaks now that the output renders as normal HTML.
const markdown = new Marked({ gfm: true, breaks: true });

// `afterSanitizeAttributes` runs once DOMPurify has already dropped dangerous
// URLs, so links that still have an href here are safe to harden.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName !== 'A') {
    return;
  }
  const href = node.getAttribute('href');
  if (!href || href.startsWith('#')) {
    return;
  }
  node.setAttribute('target', '_blank');
  node.setAttribute('rel', 'noopener noreferrer');
});

/**
 * Render trusted-for-display HTML from a Markdown string.
 * @param {string} source raw Markdown
 * @returns {string} sanitized HTML, safe for dangerouslySetInnerHTML
 */
export function renderMarkdown(source) {
  if (!source) {
    return '';
  }

  return DOMPurify.sanitize(markdown.parse(source), {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_ARIA_ATTR: false,
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
  });
}
