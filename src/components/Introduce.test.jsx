import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import Introduce from './Introduce';

const PAYLOAD = '<img src=x onerror=alert(1)>';

describe('Introduce', () => {
  it('escapes the resume text shown during the typing animation', () => {
    const html = renderToStaticMarkup(
      <Introduce currentIntroduce={`# 罗威\n${PAYLOAD}`} isMD={false} />
    );

    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(html).not.toContain('<img');
  });

  it('renders sanitized html in markdown mode', () => {
    const html = renderToStaticMarkup(
      <Introduce currentIntroduce={`# 罗威\n\n${PAYLOAD}`} isMD />
    );

    expect(html).toContain('<h1');
    expect(html).toContain('罗威');
    expect(html).not.toContain('onerror');
    expect(html).not.toContain('<img src=x');
  });
});
