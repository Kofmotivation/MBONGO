export function Transcript({
  rows,
}: {
  rows: { speaker: "q" | "a"; text: string }[];
}) {
  const pairs: { speaker: "q" | "a"; text: string }[][] = [];
  for (let i = 0; i < rows.length; i += 2) {
    pairs.push(rows.slice(i, i + 2));
  }

  return (
    <div className="transcript">
      {pairs.map((pair, idx) => (
        <div className="transcript__pair" key={idx}>
          {pair.map((row, j) => (
            <div
              key={j}
              className={`transcript__row transcript__row--${row.speaker}`}
            >
              <span className="transcript__speaker">
                {row.speaker === "q" ? "Q" : "A"}
              </span>
              <p className="transcript__text">{row.text}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
