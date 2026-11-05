export default function EducationSection() {
  return (
    <section className="education-section" id="education" data-portfolio-section="education" aria-labelledby="education-heading">
      <div className="education-content">
        <h2 id="education-heading">Computer science.<br />A business foundation.</h2>
        <div className="education-studies">
          <article className="education-study">
            <p className="education-period">2024–2027 <span>Expected graduation</span></p>
            <h3>Cégep de Sorel-Tracy</h3>
            <p className="education-program">Computer Science · Techniques de l’informatique</p>
            <p>Software development, databases, web, mobile, and IoT technologies.</p>
          </article>
          <article className="education-study">
            <p className="education-period">2019–2023</p>
            <h3>All Saints Bilingual College <span>(ASBC)</span></h3>
            <p className="education-program">Commerce Program</p>
            <p>Management, accounting, economics, finance, and a comprehensive commerce curriculum.</p>
          </article>
        </div>
      </div>
      <div className="education-object" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/IMG_9576.png" width="696" height="379" alt="" loading="lazy" />
      </div>
    </section>
  );
}
