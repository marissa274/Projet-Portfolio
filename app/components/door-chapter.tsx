'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DoorChapter({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current, start: 'top top', end: 'bottom bottom',
          scrub: 0.5, invalidateOnRefresh: true,
        },
      });
      timeline.fromTo('.chapter-door-left', { xPercent: -101 }, { xPercent: 0, duration: 0.7, ease: 'power2.inOut' }, 0.3);
      timeline.fromTo('.chapter-door-right', { xPercent: 101 }, { xPercent: 0, duration: 0.7, ease: 'power2.inOut' }, 0.3);
      timeline.to({}, { duration: 0.2 });
    }, container);
    return () => media.revert();
  }, { scope: container });

  return (
    <div className="about-chapter" ref={container}>
      <div className="about-chapter-stage">
        {children}
        <div className="chapter-doors" aria-hidden="true">
          <div className="chapter-door chapter-door-left" />
          <div className="chapter-door chapter-door-right" />
        </div>
      </div>
    </div>
  );
}
