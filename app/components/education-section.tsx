export default function EducationSection() {
  return (
    <section className="education-section" id="education" data-portfolio-section="education" aria-labelledby="education-heading">
      <h2 id="education-heading" className="sr-only">Education</h2>
      <article className="education-panel education-panel-computer">
        <p className="education-period">2024–2027</p>
        <ul className="education-subjects">
          <li>Software development</li>
          <li>Databases</li>
          <li>Web &amp; mobile</li>
          <li>IoT</li>
        </ul>
        <div className="education-study">
          <h3>Cégep de <span className="education-nowrap">Sorel-Tracy</span></h3>
          <p className="education-program">Computer Science · Techniques de l’informatique</p>
          <p>Expected graduation in 2027.</p>
        </div>
      </article>
      <article className="education-panel education-panel-business">
        <p className="education-period">2019–2023</p>
        <ul className="education-subjects">
          <li>Management</li>
          <li>Accounting</li>
          <li>Economics</li>
          <li>Finance</li>
        </ul>
        <div className="education-study">
          <h3>All Saints Bilingual College <span className="education-abbr">(ASBC)</span></h3>
          <p className="education-program">Commerce Program</p>
          <p>A comprehensive commerce curriculum.</p>
        </div>
      </article>
    </section>
  );
}
