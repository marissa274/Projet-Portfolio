'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PortraitPoster from './portrait-poster';
import GetToKnow from './get-to-know';
import PortraitIntroduction from './portrait-introduction';
import EducationSection from './education-section';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HomeExperience() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const root = container.current!;
      const stage = root.querySelector<HTMLElement>('.home-experience')!;
      const title = root.querySelector<HTMLElement>('.know-title')!;
      const tokens = getComputedStyle(root);
      gsap.set(title, { xPercent: -50, yPercent: -50, rotation: 0 });
      const objects = Array.from(title.querySelectorAll<HTMLElement>('.word-object'));
      const letters = Array.from(title.querySelectorAll<HTMLElement>('.know-letter'));
      const wordMotion = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.2 });
      objects.forEach((object, index) => {
        const start = index * 0.85;
        wordMotion.fromTo(object, {
          autoAlpha: 0, yPercent: -150,
        }, {
          autoAlpha: 1, yPercent: 0, duration: 0.9, ease: 'bounce.out',
        }, start);
        wordMotion.fromTo(object, { rotation: [-24, 35, -18][index] }, {
          rotation: index % 2 ? -360 : 360, duration: 1.3, ease: 'power2.inOut',
        }, start);
      });
      letters.forEach((letter, index) => {
        const start = 0.35 + index * 0.09;
        wordMotion.to(letter, {
          yPercent: [-28, 14, -18, 24, -32, 10][index % 6],
          xPercent: [-5, 8, 0, -6, 4][index % 5],
          rotation: [-9, 7, -5, 11, -7][index % 5],
          duration: 0.3, ease: 'power2.out',
        }, start);
        wordMotion.to(letter, { xPercent: 0, yPercent: 0, rotation: 0, duration: 0.7, ease: 'bounce.out' }, start + 0.3);
      });
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
      introduction.to('.introduction .copy-stack, .introduction .square-link', { autoAlpha: 0, duration: 0.18 }, 0);
      introduction.to('.introduction', {
        scaleX: 2.05, scaleY: 2.05, transformOrigin: 'right top', duration: 1.1, ease: 'power3.inOut',
      }, 0.12);
      // Crossfade a compositor layer over the white square as it opens into burgundy.
      introduction.to('.square-burgundy', { opacity: 1, duration: 1.4, ease: 'sine.inOut' }, 0.25);
      introduction.to(title, { color: tokens.getPropertyValue('--color-rose').trim(), duration: 0.6 }, 0.95);
      introduction.fromTo('.landing-title', { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power3.out' }, 1.3);
      introduction.to(title, {
        rotation: -90,
        x: () => -stage.clientWidth / 2 + (stage.clientWidth < 768 ? 48 : 80),
        scale: () => Math.min(36, window.innerHeight * 0.055) / parseFloat(getComputedStyle(title).fontSize),
        duration: 0.7,
        ease: 'power2.inOut',
      }, 3.2);
      let centered = false;
      let docked = false;
      let settleObjects: gsap.core.Tween | undefined;
      let settleLetters: gsap.core.Tween | undefined;
      const settleComposition = () => {
        wordMotion.pause();
        settleObjects?.kill();
        settleLetters?.kill();
        settleObjects = gsap.to(objects, { autoAlpha: 1, yPercent: 0, rotation: '0_short', duration: 0.3, ease: 'power3.out' });
        settleLetters = gsap.to(letters, { xPercent: 0, yPercent: 0, rotation: 0, duration: 0.3, ease: 'power3.out' });
      };
      introduction.eventCallback('onUpdate', () => {
        const rulerVisible = String(introduction.time() >= 3.6);
        if (stage.dataset.rulerVisible !== rulerVisible) {
          stage.dataset.rulerVisible = rulerVisible;
          window.dispatchEvent(new Event('portfolio:ruler-change'));
        }
        const nextDocked = introduction.time() >= 3.2;
        const nextCentered = introduction.time() >= 1.65 && !nextDocked;
        if (nextCentered !== centered) {
          centered = nextCentered;
          if (centered) {
            settleObjects?.kill();
            settleLetters?.kill();
            wordMotion.restart();
          } else settleComposition();
        } else if (nextDocked && !docked) settleComposition();
        docked = nextDocked;
      });
      return () => { settleObjects?.kill(); settleLetters?.kill(); };
    }, container);
    let active = true;
    document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    return () => { active = false; media.revert(); };
  }, { scope: container });

  return (
    <div ref={container}>
      <div className="landing-sequence" id="home"><div className="home-experience">
        <div className="experience-stage">
          <PortraitPoster />
          <div className="landing-title"><GetToKnow /></div>
        </div>
      </div></div>
      <div className="about-chapter"><div className="about-chapter-stage"><PortraitIntroduction /></div></div>
      <div className="education-bridge" aria-hidden="true">
        <svg viewBox="0 0 1440 260" preserveAspectRatio="none"><path d="M0 0H1440V95C1390 95 1405 180 1358 180C1310 180 1340 65 1275 65C1210 65 1240 240 1185 240C1130 240 1160 90 1090 90C1020 90 1045 170 990 170C935 170 960 58 880 58C810 58 835 210 775 210C715 210 750 115 680 115C615 115 650 250 590 250C530 250 560 75 490 75C420 75 450 155 385 155C320 155 355 65 280 65C200 65 230 205 165 205C100 205 130 110 70 110C30 110 35 160 0 160Z" /></svg>
      </div>
      <EducationSection />
    </div>
  );
}
