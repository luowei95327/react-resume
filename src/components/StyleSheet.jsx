import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'
import { useAutoScrollToEnd } from '../hooks/useAutoScrollToEnd';

/*
 * Tokenizing the whole stylesheet on every animation frame is quadratic work:
 * by the end of the intro Prism had re-parsed the growing string ~2400 times.
 * Re-tokenizing every HIGHLIGHT_STEP characters and escaping the short tail in
 * between keeps the colors in sync while cutting that work by ~50x.
 */
const HIGHLIGHT_STEP = 48;

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function useHighlightedCss(css) {
  const cacheRef = useRef({ boundary: 0, html: '' });

  return useMemo(() => {
    // The source got shorter (a user edit, or the skip button): start over.
    if (css.length < cacheRef.current.boundary) {
      cacheRef.current = { boundary: 0, html: '' };
    }
    if (cacheRef.current.boundary === 0 || css.length - cacheRef.current.boundary >= HIGHLIGHT_STEP) {
      cacheRef.current = {
        boundary: css.length,
        html: Prism.highlight(css, Prism.languages.css, 'css'),
      };
    }
    return cacheRef.current.html + escapeHtml(css.slice(cacheRef.current.boundary));
  }, [css]);
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
