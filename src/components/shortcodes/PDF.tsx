import React, { useState } from 'react';

export const PDFCore: React.FC<{
  src: string;
  width?: number;
  height?: number;
}> = ({ src, width = 16, height = 9 }) => (
  <div style={{ maxWidth: '860px', margin: 'auto' }}>
    <div
      className="responsive-iframe-container"
      style={{
        paddingTop: `${(100 * height) / width}%`,
      }}
    >
      <iframe src={src} allowFullScreen loading="lazy" title={src}></iframe>
    </div>
  </div>
);

export const PDFWrapper: React.FC<{
  src?: string;
  href?: string;
  children?: React.ReactNode;
  width?: number;
  height?: number;
}> = ({ src = null, href = null, children = null, width = 16, height = 9 }) => {
  const [srcList] = useState<string[]>(
    (() => {
      const list: string[] = [];
      if (src) {
        list.push(src);
      } else if (href) {
        list.push(href);
      }
      if (children) {
        (Array.isArray(children) ? children : [children])
          .filter(
            (node) => node?.props?.originalType === 'a' && node?.props?.href
          )
          .forEach((node) => {
            list.push(node.props.href);
          });
      }
      return list;
    })()
  );
  return (
    <>
      {srcList.map((s) => (
        <PDFCore key={s} src={s} width={width} height={height} />
      ))}
    </>
  );
};
