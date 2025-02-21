/* eslint-disable react/no-danger */
import React, { ReactElement, PropsWithChildren } from 'react';
import liteATIClickTracking from '#src/server/utilities/liteATIClickTracking';
import { BaseRendererProps } from './types';

interface Props extends BaseRendererProps {
  bodyContent: ReactElement;
}

export default function LitePageRenderer({
  bodyContent,
  helmetMetaTags,
  helmetLinkTags,
  helmetScriptTags,
  htmlAttrs,
  title,
  styles,
}: PropsWithChildren<Props>) {
  return (
    <html lang="en-GB" {...htmlAttrs}>
      <head>
        <meta name="robots" content="none" />
        {title}
        {helmetMetaTags}
        {helmetLinkTags}
        {helmetScriptTags}
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(${liteATIClickTracking.toString()})()`,
          }}
        />
      </head>
      <body>{bodyContent}</body>
    </html>
  );
}
