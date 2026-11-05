import HomeExperience from './components/home-experience';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <main id="main"><HomeExperience /></main>
      <footer className="site-footer">
        <p>Software engineer. Always reaching further.</p>
        <div>
          <a href="https://www.linkedin.com/in/marissa-belle-bindeki-b32090333/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/marissabelle" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:marissabellebindeki@gmail.com">Let’s connect <span aria-hidden="true">↗</span></a>
        </div>
      </footer>
    </>
  );
}
