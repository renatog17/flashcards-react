import { useState } from "react";
import "./FlashCardsCarousel.css";

export default function FlashCardsCarousel({ flashCards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped((prev) => !prev);
  };

  const avancar = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, flashCards.length - 1));
    setFlipped(false);
  };

  const retroceder = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setFlipped(false);
  };
  const currentCard = flashCards[currentIndex];
  console.log(flashCards.length);
  return (
    <div>
      <div className="flashcard" onClick={() => handleCardClick(flipped)}>
        {flashCards.length > 0 ? (
          <div >
            {flipped ? currentCard.definition : currentCard.term}
          </div>
        ) : (
          <p> Sem cards</p>
        )}
      </div>
      <div className="buttons">
        <div onClick={() => retroceder()} className="button">
          Retroceder
        </div>
        <div onClick={() => avancar()} className="button">
          Avançar
        </div>
      </div>
    </div>
  );
}
