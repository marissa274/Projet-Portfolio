'use client';

import { useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const introduction = [
  'I’m Marissa Bindeki.',
  'Mobile & website designer.',
  'Entrepreneur.',
  'Feminist.',
  'The future Mae Jemison.',
];

export default function PortraitIntroduction() {
  const container = useRef<HTMLElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const targetOpen = useRef(false);
  const manuallyControlled = useRef(false);
  const [open, setOpen] = useState(false);

  useGSAP((_, contextSafe) => {
    const media = gsap.matchMedia();
    media.add({ motion: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' }, (context) => {
      const reduced = context.conditions?.reduced;
      const stage = container.current!.querySelector<HTMLElement>('.puzzle-stage')!;
      const pieces = gsap.utils.toArray<HTMLElement>('.puzzle-piece', container.current!);
      const gaps = gsap.utils.toArray<HTMLElement>('.puzzle-gap', container.current!);
      const gapHeight = () => parseFloat(getComputedStyle(gaps[0]).height);
      const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } });
      timeline.fromTo(pieces, { y: 0, rotationY: 0 }, {
        y: (index) => (index - (pieces.length - 1) / 2) * gapHeight(),
        rotationY: (index) => reduced ? 0 : (index % 2 ? -360 : 360),
        duration: reduced ? 0 : 1.6, stagger: reduced ? 0 : 0.07,
      }, 0);
      timeline.fromTo(gaps, {
        autoAlpha: 0, rotationX: reduced ? 0 : -75,
      }, {
        autoAlpha: 1, rotationX: 0, duration: reduced ? 0 : 0.65,
        stagger: reduced ? 0 : 0.07, ease: 'power3.out',
      }, reduced ? 0 : 0.75);
      animation.current = timeline;
      ScrollTrigger.create({
        trigger: container.current, start: 'top 60%',
        onEnter: contextSafe!(() => {
          if (manuallyControlled.current) return;
          targetOpen.current = true;
          setOpen(true);
          timeline.play();
        }),
      });
      let previousWidth = stage.clientWidth;
      const resize = new ResizeObserver(() => {
        if (stage.clientWidth === previousWidth) return;
        previousWidth = stage.clientWidth;
        timeline.invalidate().progress(targetOpen.current ? 1 : 0).pause();
      });
      resize.observe(stage);
      return () => { resize.disconnect(); animation.current = null; };
    });
    return () => media.revert();
  }, { scope: container });

  const togglePuzzle = () => {
    if (!animation.current) return;
    manuallyControlled.current = true;
    targetOpen.current = !targetOpen.current;
    setOpen(targetOpen.current);
    if (targetOpen.current) animation.current.play();
    else animation.current.reverse();
  };

  return (
    <section className="portrait-introduction puzzle-introduction" id="get-to-know" aria-labelledby="portrait-introduction-heading" ref={container} data-open={open}>
      <h2 id="portrait-introduction-heading" className="sr-only">Marissa Bindeki</h2>
      <figure className="puzzle-stage" aria-label="Portrait de Marissa Bindeki qui se sépare pour révéler sa présentation">
        {Array.from({ length: introduction.length + 1 }, (_, index) => (
          <div className="puzzle-piece" key={index} style={{ '--piece-index': index } as CSSProperties} aria-hidden="true">
            <div className="puzzle-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/marissa-portrait-enhanced.png" width="1106" height="1422" alt="" loading="lazy" />
            </div>
            {index < introduction.length && <span className="puzzle-gap">{introduction[index]}</span>}
          </div>
        ))}
        <figcaption className="sr-only">{introduction.join(' ')}</figcaption>
      </figure>
      <button className="portrait-turn" type="button" onClick={togglePuzzle} aria-pressed={open}>
        {open ? 'Recomposer la photo' : 'Révéler mon histoire'} <span aria-hidden="true">↻</span>
      </button>
    </section>
  );
}
