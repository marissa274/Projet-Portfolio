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
      ([['.chapter-door-left', -1], ['.chapter-door-right', 1]] as const).forEach(([door, side]) => {
        // x: 0 clears the pixel offset GSAP reads from the CSS translateX that hides the doors before hydration.
        timeline.fromTo(door, { x: 0, xPercent: side * 101 }, { x: 0, xPercent: 0, duration: 0.55, ease: 'power3.in' }, 0.3);
        // The doors slam together, rebound twice with less force, then stay shut.
        timeline.to(door, { xPercent: side * 9, duration: 0.12, ease: 'power2.out' }, 0.85);
        timeline.to(door, { xPercent: 0, duration: 0.1, ease: 'power2.in' }, 0.97);
        timeline.to(door, { xPercent: side * 3, duration: 0.07, ease: 'power2.out' }, 1.07);
        timeline.to(door, { xPercent: 0, duration: 0.06, ease: 'power2.in' }, 1.14);
      });
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
      {/* Must follow the stage: the ruler keeps the last section it matches in document order. */}
      <span className="chapter-door-marker" data-portfolio-section="education" aria-hidden="true" />
    </div>
  );
}
