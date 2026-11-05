'use client';

import { useEffect, useState } from 'react';

const sectionLabels: Record<string, string> = {
  home: 'GET TO KNOW ME', about: 'ABOUT', education: 'EDUCATION',
  projects: 'PROJECTS', expertise: 'EXPERTISE', contact: 'CONTACT',
};

function AnimatedWord({ text }: { text: string }) {
  return (
    <span className="know-word" aria-hidden="true">{Array.from(text).map((letter, index) => <span className="know-letter" key={`${letter}-${index}`}>{letter}</span>)}</span>
  );
}

function WordObject({ name }: { name: 'laptop' | 'brush' | 'brain' }) {
  return (
    <span className={`creative-object word-object word-object-${name}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/creative/${name}.png`} width="1280" height="1280" alt="" />
    </span>
  );
}

export default function GetToKnow() {
  const [section, setSection] = useState('home');
  useEffect(() => {
    const update = () => {
      const current = document.body.dataset.portfolioSection ?? 'home';
      setSection(Object.hasOwn(sectionLabels, current) ? current : 'home');
    };
    update();
    window.addEventListener('portfolio:section-change', update);
    return () => window.removeEventListener('portfolio:section-change', update);
  }, []);
  return (
      <aside className="get-to-know" aria-labelledby="know-title">
        <h2 className="know-title" id="know-title" aria-label={sectionLabels[section]} data-section={section}>
          <span className="intro-wordmark">
          <AnimatedWord text="GET" />
          <WordObject name="laptop" />
          <AnimatedWord text="TO" />
          <WordObject name="brush" />
          <AnimatedWord text="KNOW" />
          <WordObject name="brain" />
          <AnimatedWord text="ME" />
          </span>
          <span className="section-wordmark" aria-hidden="true">{sectionLabels[section]}</span>
        </h2>
      </aside>
  );
}
