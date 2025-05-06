import { useState } from "react";
import "./FlashCard.css"; // Importa o CSS

export default function FlashCard({ term, definition, example }) {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className="flashcard-container" onClick={handleCardClick}>
      <div className={`flashcard-inner ${flipped ? "flipped" : ""}`}>
        <div className="flashcard-front">
          <p>{term}</p>
        </div>
        <div className="flashcard-back">
          <p>{definition}</p>
          {example && <small><em>{example}</em></small>}
        </div>
      </div>
    </div>
  );
}
