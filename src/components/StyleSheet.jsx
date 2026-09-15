import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'
import { useAutoScrollToEnd } from '../hooks/useAutoScrollToEnd';

/*
 * Tokenizing the whole stylesheet on every frame is quadratic work: typing out
 * the default stylesheet would re-tokenize a growing string ~2400 times.
 *
 * While the text streams in we tokenize only up to the last HIGHLIGHT_STEP
 * boundary and escape the short tail, which cuts that work by ~50x. Once the
 * text settles, an exact highlight replaces it so the trailing characters are
 * colored too.
 */
const HIGHLIGHT_STEP = 48;
const SETTLE_MS = 160;

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const tokenize = (css) => Prism.highlight(css, Prism.languages.css, 'css');

function useHighlightedCss(css) {
  const boundary = Math.floor(css.length / HIGHLIGHT_STEP) * HIGHLIGHT_STEP;
  const prefix = css.slice(0, boundary);
  const prefixHtml = useMemo(() => tokenize(prefix), [prefix]);

  const [settled, setSettled] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSettled({ source: css, html: tokenize(css) });
    }, SETTLE_MS);
    return () => clearTimeout(timer);
  }, [css]);

  if (settled && settled.source === css) {
    return settled.html;
  }
  return prefixHtml + escapeHtml(css.slice(boundary));
}

const StyleSheet = ({ currentStyle, isStyleEditable, editStyle }) => {
  const rootRef = useRef(null);
  // While the pane has focus the browser owns the DOM: re-rendering the
  // highlighted markup would move the caret, so the displayed source is frozen
  // until blur, when the freshly highlighted text replaces it.
  const [frozenStyle, setFrozenStyle] = useState(null);
  const isEditing = frozenStyle !== null;
  const source = isEditing ? frozenStyle : currentStyle;
  const highlighted = useHighlightedCss(source);

  useAutoScrollToEnd(rootRef, source, !isEditing);

  const handleFocus = useCallback(() => {
    setFrozenStyle(currentStyle);
  }, [currentStyle]);

  const handleBlur = useCallback(() => {
    setFrozenStyle(null);
  }, []);

  const handleInput = useCallback((event) => {
    // innerText, not textContent: it preserves the line breaks the browser
    // inserts while editing, which is what keeps the edited CSS parseable.
    editStyle(event.currentTarget.innerText);
  }, [editStyle]);

  return (
    <div
      className="styleEdit"
      ref={rootRef}
      suppressContentEditableWarning
      contentEditable={isStyleEditable}
      role={isStyleEditable ? 'textbox' : undefined}
      aria-multiline={isStyleEditable ? 'true' : undefined}
      aria-label={isStyleEditable ? '简历样式表（可编辑的 CSS）' : undefined}
      tabIndex={isStyleEditable ? 0 : -1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onInput={handleInput}
    >
      <pre>
        <code
          className="language-css"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  )
}

export default memo(StyleSheet);
