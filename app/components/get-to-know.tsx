function Ruler() {
  return (
    <div className="ruler ruler-vertical" aria-hidden="true">
      {Array.from({ length: 51 }, (_, index) => (
        <span className={`ruler-tick${index % 5 === 0 ? ' major' : ''}`} key={index}>
          {index % 10 === 0 && <span>{String(index).padStart(2, '0')}</span>}
        </span>
      ))}
    </div>
  );
}

export default function GetToKnow() {
  return (
      <aside className="get-to-know" aria-labelledby="know-title">
        <Ruler />
        <h2 className="know-title" id="know-title">GET TO KNOW ME</h2>
      </aside>
  );
}

export function AboutPage() {
  return (
    <section className="about-screen" id="get-to-know" aria-labelledby="about-heading">
        <div className="about-portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/marissa-portrait-enhanced.png" width="1106" height="1422" alt="Marissa Belle Bindeki" loading="lazy" />
        </div>
        <div className="know-copy">
          <h2 id="about-heading">Marissa<br />Belle Bindeki.</h2>
          <p className="know-intro">Curiosity is where<br />everything begins.</p>
          <p>I’m Marissa Belle Bindeki, a computer science student passionate about building impactful digital solutions.</p>
          <p>From mobile development and web applications to IoT, I learn by building, solving real problems, and turning ideas into functional products.</p>
          <div className="know-links">
            <a href="/about.html">More about me <span aria-hidden="true">↗</span></a>
            <a href="/projects.html">Discover my projects <span aria-hidden="true">↗</span></a>
          </div>
        </div>
    </section>
  );
}
