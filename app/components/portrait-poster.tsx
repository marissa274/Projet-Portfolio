'use client';

import { useEffect, useState, type CSSProperties } from 'react';

function CopyLines({ lines }: { lines: string[] }) {
  return lines.map((line, index) => <span className="copy-line" key={line} style={{ '--line-order': index } as CSSProperties}><span>{line}</span></span>);
}

export default function PortraitPoster() {
  const [secondCopy, setSecondCopy] = useState(false);
  useEffect(() => {
    const timer = window.setInterval(() => setSecondCopy((current) => !current), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="portrait-poster full-screen-poster" data-copy={secondCopy ? 'second' : 'first'} aria-label="Meet Marissa Bindeki">
      <h1 className="sr-only">I’m Marissa Bindeki. The future Mae Jemison.</h1>
      <p className="sr-only">I design, innovate, and create. An entrepreneur turning dreams into reality.</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="portrait" src="/images/marissa-portrait-enhanced.png" width="1106" height="1422" alt="Marissa Bindeki in a black suit against a burgundy background" fetchPriority="high" />
      <div className="poster-square introduction">
        <div className="square-burgundy" aria-hidden="true" />
        <div className="copy-stack" aria-hidden="true">
          <div className="poster-copy first-copy"><CopyLines lines={['I’m', 'Marissa', 'Bindeki.']} /></div>
          <div className="poster-copy second-copy"><CopyLines lines={['I design,', 'innovate,', 'and create.']} /></div>
        </div>
        <a className="square-link" href="#get-to-know">Get to know me <span aria-hidden="true">↓</span></a>
      </div>
      <div className="poster-square ambition">
        <div className="copy-stack" aria-hidden="true">
          <div className="poster-copy first-copy"><CopyLines lines={['The future', 'Mae', 'Jemison.']} /></div>
          <div className="poster-copy second-copy"><CopyLines lines={['An', 'entrepreneur', 'turning dreams', 'into reality.']} /></div>
        </div>
        <a className="square-link" href="/projects.html">Explore my work <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
