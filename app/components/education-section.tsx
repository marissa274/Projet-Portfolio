'use client';

import { useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const studies = [
  { school: 'Cégep de Sorel-Tracy', dates: '2024 — 2027', note: 'Expected graduation', program: 'Computer Science', description: 'Techniques de l’informatique', details: 'Software development, databases, web, mobile & IoT.', photo: '/images/education-cegep.png', caption: 'Building what comes next.', number: '01' },
  { school: 'All Saints Bilingual College', dates: '2019 — 2023', note: 'ASBC', program: 'Commerce Program', description: 'Where my entrepreneurial spirit began.', details: 'Management, accounting, economics & finance.', photo: '/images/education-asbc.png', caption: 'The beginning of my journey.', number: '02' },
];

function PaintedWord({ text, italic = false }: { text: string; italic?: boolean }) {
  return <span className={`paint-word${italic ? ' paint-word-italic' : ''}`} aria-hidden="true">{Array.from(text).map((letter, index) =>
    <span className="paint-letter" key={index}>{letter}{index % 3 === 0 && /[a-z]/i.test(letter) && <span className="letter-drip" style={{ height: `${.23 + index % 4 * .055}em` }} />}</span>
  )}</span>;
}

export default function EducationSection() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [turningFrom, setTurningFrom] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const study = studies[page];

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const pointing = gsap.to('.journal-pointer-gesture', { x: -9, y: 13, rotation: -3, duration: .8, ease: 'sine.inOut', repeat: -1, yoyo: true, paused: true });
      const arrival = gsap.timeline({ scrollTrigger: {
        trigger: root.current, start: 'top 55%', toggleActions: 'play none none reverse', invalidateOnRefresh: true,
        onEnter: () => pointing.resume(), onEnterBack: () => pointing.resume(),
        onLeave: () => pointing.pause(), onLeaveBack: () => pointing.pause(),
      } });
      arrival.set('.journal-pointer-art', { attr: { 'data-pose': 'viewer' } }, 0);
      arrival.set('.journal-hand-viewer', { autoAlpha: 1 }, 0);
      arrival.set('.journal-hand-book', { autoAlpha: 0 }, 0);
      arrival.fromTo('.journal-heading', { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .65, ease: 'power2.out' }, 2.95);
      arrival.fromTo('.journal-falling', { y: () => -innerHeight * .85, rotation: -14, autoAlpha: 0 },
        { y: 0, rotation: 0, autoAlpha: 1, duration: .7, ease: 'power2.in' }, .15);
      arrival.to('.journal-falling', { y: -18, rotation: 2, duration: .14, ease: 'power2.out' });
      arrival.to('.journal-falling', { y: 0, rotation: 0, duration: .22, ease: 'power2.in' });
      gsap.utils.toArray<HTMLElement>('.journal-dust-particle', root.current!).forEach((particle, index) => {
        const direction = index < 24 ? -1 : 1;
        arrival.fromTo(particle, { x: 0, y: -(index % 4) * 3, scale: .25, opacity: 0 },
          { opacity: index % 2 === 0 ? .8 : .75, scale: 1, duration: .13 }, .84 + (index % 3) * .025);
        arrival.to(particle, { x: direction * (45 + index % 7 * 19), y: -(40 + index % 8 * 23), scale: index % 2 === 0 ? 2.8 : .6, opacity: 0, duration: 1.8, ease: 'power2.out' }, .94 + (index % 3) * .025);
      });
      arrival.fromTo('.journal-pointer-art', { y: -20, rotation: 8, autoAlpha: 0 },
        { y: 0, rotation: 0, autoAlpha: 1, duration: .45, ease: 'power3.out' }, 3.15);
      arrival.to('.journal-hand-viewer', { autoAlpha: 0, rotationY: 35, scale: .94, duration: .55, ease: 'power2.inOut' }, 4.8);
      arrival.fromTo('.journal-hand-book', { rotationY: -35, scale: .94 }, { autoAlpha: 1, rotationY: 0, scale: 1, duration: .55, ease: 'power2.inOut' }, 4.8);
      arrival.set('.journal-pointer-art', { attr: { 'data-pose': 'book' } }, 5.35);
      arrival.fromTo('.letter-drip', { scaleY: 0 }, { scaleY: 1, duration: 1.35, stagger: .12, ease: 'power1.inOut' }, 3.35);
    });
    ScrollTrigger.create({ trigger: root.current, start: 'top top', end: 'bottom bottom', onUpdate: (self) => setClosing(self.progress > 0.62) });
    return () => media.revert();
  }, { scope: root });

  useGSAP(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.fromTo('.journal-spread', { opacity: 0, rotationY: reduced ? 0 : -12 }, { opacity: 1, rotationY: 0, duration: reduced ? 0.15 : 0.7, ease: 'power2.out' });
  }, { scope: root, dependencies: [page], revertOnUpdate: true });

  const expanded = open && !closing;
  return (
    <section className="education-section" id="education" ref={root} data-portfolio-section="education" aria-label="My education journal">
      <div className="education-sticky">
        <div className="education-book-arrival">
          <h2 className="journal-heading" aria-label="Oops, too much knowledge."><PaintedWord text="Oops," /> <PaintedWord text="too" /> <PaintedWord text="much" /> <PaintedWord text="knowledge." italic /></h2>
          <div className="journal-dust" aria-hidden="true">
            {Array.from({ length: 48 }, (_, index) => <span className={`journal-dust-particle ${index % 2 === 0 ? 'dust-cloud' : 'dust-grain'}`} key={index} style={{ left: `${5 + index * 90 / 47}%`, '--dust-size': `${2 + index % 3}px` } as CSSProperties} />)}
          </div>
          <div className="journal-falling">
          <div className="journal-scene" data-open={expanded} data-closing={closing}>
            <button className="journal-pointer" data-hidden={expanded || closing} onClick={() => setOpen(true)} disabled={expanded || closing} aria-label="Discover my education — open the book">
              <span className="journal-wrist-paint" aria-hidden="true" />
              <span className="journal-pointer-gesture"><span className="journal-pointer-art" data-pose="viewer">
                <img className="journal-hand-viewer" src="/images/education-hand-viewer.png" width="360" height="360" alt="" />
                <img className="journal-hand-book" src="/images/education-hand-painted.png" width="360" height="360" alt="" />
              </span></span>
              <span className="journal-pointer-caption">Open me</span>
            </button>
            <div className="journal-book">
              <div className="journal-page-edges" />
              <div className="journal-spread" aria-hidden={!expanded} inert={!expanded}>
                <div className="journal-photo-page">
                  <figure className="journal-polaroid">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={study.photo} width="941" height="1672" alt={page === 0 ? 'Marissa in a yellow shirt' : 'Marissa wearing her graduation cap and gown'} />
                    <figcaption>{study.caption}</figcaption>
                  </figure>
                  <span className="journal-page-number">{study.number}</span>
                </div>
                <article className="journal-writing-page" aria-live="polite">
                  <p className="journal-dates">{study.dates}</p>
                  <p className="journal-note">{study.note}</p>
                  <h2>{study.school}</h2>
                  <h3>{study.program}</h3>
                  <p>{study.description}</p>
                  <p className="journal-details">{study.details}</p>
                  <div className="journal-pagination">
                    <button disabled={turningFrom !== null} onClick={() => { setTurningFrom(page); setPage(page === 0 ? 1 : 0); }} aria-label={page === 0 ? 'Next education page' : 'Previous education page'}>{page === 0 ? 'Turn the page →' : '← Previous page'}</button>
                    <span>{page + 1} / 2</span>
                  </div>
                </article>
              </div>
              {turningFrom !== null && <div key={page} className="journal-turning-sheet" aria-hidden="true" onAnimationEnd={() => setTurningFrom(null)}>
                <span className="journal-turning-front"><span>{studies[turningFrom].dates}</span><strong>{studies[turningFrom].school}</strong><span>{studies[turningFrom].program}</span></span>
                <span className="journal-turning-back" />
              </div>}
              <button className="journal-cover" onClick={() => { setOpen(true); setPage(0); }} aria-expanded={expanded} aria-label="Open my education journal" disabled={expanded || closing}>
                <span className="journal-cover-border"><span>Marissa Bindeki</span><strong>My education<br /><i>journal</i></strong><span>Two chapters. One ambition.</span></span>
              </button>
            </div>
          </div>
          </div>
          <div className="journal-invitation">
            {closing ? <p>To be continued.</p> : expanded ? <><button onClick={() => setOpen(false)}>Close the book</button><p>Scroll to close this chapter ↓</p></> : <button onClick={() => setOpen(true)}>Open my education journal <span aria-hidden="true">↗</span></button>}
          </div>
        </div>
        <div className="journal-brush" data-visible={closing} aria-hidden="true"><img src="/images/creative/brush.png" alt="" width="160" height="160" /></div>
      </div>
    </section>
  );
}
