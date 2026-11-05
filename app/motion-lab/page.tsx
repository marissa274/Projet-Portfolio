'use client';

import { useEffect, useState } from 'react';
import CreativeObjects from '../components/creative-objects';
import './motion-lab.css';

const options = [
  { id: 'A', mode: 'curtain', name: 'Rideau vertical', description: 'Les phrases se suivent dans un mouvement continu, comme un ruban.' },
  { id: 'B', mode: 'fade', name: 'Fondu cinéma', description: 'Le texte s’efface doucement avant de laisser apparaître le suivant.' },
  { id: 'C', mode: 'stagger', name: 'Lignes en cascade', description: 'Chaque ligne apparaît légèrement après la précédente, sans rebond.' },
] as const;

function TextPreview({ mode, replay }: { mode: string; replay: number }) {
  const [second, setSecond] = useState(false);
  useEffect(() => {
    setSecond(false);
    const timer = window.setTimeout(() => setSecond(true), 1400);
    return () => window.clearTimeout(timer);
  }, [replay]);
  return (
    <div className={`text-preview preview-${mode}`} data-second={second} aria-label="Comparaison de transition entre I’m Marissa Bindeki et I design, innovate, and create">
      {[['I’m', 'Marissa', 'Bindeki.'], ['I design,', 'innovate,', 'and create.']].map((lines, phrase) => (
        <div className={`lab-phrase lab-phrase-${phrase}`} key={phrase} aria-hidden="true">
          {lines.map((line, index) => <span className="lab-line" key={line}><span style={{ transitionDelay: mode === 'stagger' ? `${index * 90 + (phrase === 1 ? 180 : 0)}ms` : undefined }}>{line}</span></span>)}
        </div>
      ))}
    </div>
  );
}

function PreviewCard({ option }: { option: typeof options[number] }) {
  const [replay, setReplay] = useState(0);
  return (
    <article className="motion-card">
      <TextPreview mode={option.mode} replay={replay} />
      <div className="motion-card-copy">
        <h2>{option.id}. {option.name}</h2>
        <p>{option.description}</p>
        <button type="button" onClick={() => setReplay((value) => value + 1)}>Rejouer {option.id}</button>
      </div>
    </article>
  );
}

export default function MotionLab() {
  const [objectsReplay, setObjectsReplay] = useState(0);
  return (
    <main className="motion-lab">
      <a className="lab-back" href="/">Retour au portfolio</a>
      <h1>Choisis le mouvement.</h1>
      <p className="lab-intro">Trois propositions avec la même police et le même bordeaux. Rejoue chaque exemple, puis indique-moi A, B ou C. Le choix n’est pas encore appliqué à l’accueil.</p>
      <div className="motion-options">{options.map((option) => <PreviewCard option={option} key={option.id} />)}</div>
      <section className="objects-example">
        <div className="objects-example-stage"><span aria-hidden="true">Create.</span><CreativeObjects demo key={objectsReplay} /></div>
        <div className="objects-example-copy">
          <h2>Ordinateur. Pinceau. Cerveau.</h2>
          <p>Objets 3D générés pour le portfolio, avec une entrée rebondissante. L’aperçu s’inspire de l’idée du modèle Jitter : des objets qui entrent dans une composition typographique.</p>
          <button type="button" onClick={() => setObjectsReplay((value) => value + 1)}>Rejouer les objets</button>
          <a href="https://jitter.video/template/the-harvest-fruit-bounce/" target="_blank" rel="noreferrer">Voir la référence Jitter</a>
        </div>
      </section>
    </main>
  );
}
