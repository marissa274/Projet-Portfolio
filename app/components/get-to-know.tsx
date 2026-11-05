function AnimatedWord({ text }: { text: string }) {
  return (
    <span className="know-word" aria-hidden="true">{Array.from(text).map((letter, index) => <span className="know-letter" key={`${letter}-${index}`}>{letter}</span>)}</span>
  );
}

function WordObject({ name }: { name: 'laptop' | 'brush' | 'brain' }) {
  return (
    <span className={`creative-object word-object word-object-${name}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/creative/${name}.png`} width="1280" height="1280" alt="" />
    </span>
  );
}

export default function GetToKnow() {
  return (
      <aside className="get-to-know" aria-labelledby="know-title">
        <h2 className="know-title" id="know-title" aria-label="GET TO KNOW ME">
          <AnimatedWord text="GET" />
          <WordObject name="laptop" />
          <AnimatedWord text="TO" />
          <WordObject name="brush" />
          <AnimatedWord text="KNOW" />
          <WordObject name="brain" />
          <AnimatedWord text="ME" />
        </h2>
      </aside>
  );
}
