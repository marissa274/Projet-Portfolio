'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PortraitPoster from './portrait-poster';
import GetToKnow, { AboutPage } from './get-to-know';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HomeExperience() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const root = container.current!;
      const stage = root.querySelector<HTMLElement>('.home-experience')!;
      const title = root.querySelector<HTMLElement>('.know-title')!;
      gsap.set(title, { xPercent: -50, yPercent: -50, rotation: 0 });
      const introduction = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.landing-sequence',
          start: () => `top+=${Math.max(0, stage.clientHeight - window.innerHeight)} top`,
          end: 'bottom bottom',
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });
      introduction.to('.introduction .copy-stack, .introduction .square-link, .introduction .creative-objects', { autoAlpha: 0, duration: 0.18 }, 0);
      introduction.to('.introduction', {
        scaleX: 2.05, scaleY: 2.05, transformOrigin: 'right top', duration: 1.1, ease: 'power3.inOut',
      }, 0.12);
      introduction.fromTo('.landing-title', { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power3.out' }, 0.9);
      introduction.to(title, {
        rotation: -90,
        x: () => -stage.clientWidth / 2 + (stage.clientWidth < 768 ? 48 : 80),
        scale: () => Math.min(36, window.innerHeight * 0.055) / parseFloat(getComputedStyle(title).fontSize),
        duration: 0.7,
        ease: 'power2.inOut',
      }, 1.55);
      introduction.fromTo('.ruler-vertical', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 1.9);
    }, container);
    let active = true;
    document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    return () => { active = false; media.revert(); };
  }, { scope: container });

  return (
    <div ref={container}>
      <div className="landing-sequence"><div className="home-experience">
        <div className="experience-stage">
          <PortraitPoster />
          <div className="landing-title"><GetToKnow /></div>
        </div>
      </div></div>
      <AboutPage />
    </div>
  );
}
