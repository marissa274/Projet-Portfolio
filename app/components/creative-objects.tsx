'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function CreativeObjects({ demo = false }: { demo?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  useGSAP((_, contextSafe) => {
    const objects = Array.from(container.current!.querySelectorAll<HTMLElement>('.creative-object'));
    let active = true;
    const start = contextSafe!(() => {
      if (!active) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(objects, { autoAlpha: demo ? 1 : 0 });
        return;
      }
      const timeline = gsap.timeline();
      timeline.fromTo(objects, {
        autoAlpha: 0, yPercent: -170, rotation: (index) => [-24, 35, -18][index],
      }, {
        autoAlpha: 1, yPercent: 0, rotation: 0, duration: 1.3, stagger: 0.14, ease: 'bounce.out',
      });
      timeline.to(objects, { yPercent: -12, rotation: (index) => [5, -9, 6][index], duration: 0.5, stagger: 0.06, ease: 'sine.inOut' });
      if (!demo) timeline.to(objects, { autoAlpha: 0, yPercent: -30, duration: 0.5, stagger: 0.05, ease: 'power2.out' }, 3.2);
    });
    const images = Array.from(container.current!.querySelectorAll('img'));
    Promise.all(images.map((image) => image.decode().catch(() => undefined))).then(start);
    return () => { active = false; };
  }, { scope: container });

  return (
    <div className={`creative-objects${demo ? ' creative-demo' : ''}`} ref={container} aria-hidden="true">
      {['laptop', 'brush', 'brain'].map((name) => (
        <span className={`creative-object creative-${name}`} key={name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/creative/${name}.png`} width="1280" height="1280" alt="" />
        </span>
      ))}
    </div>
  );
}
