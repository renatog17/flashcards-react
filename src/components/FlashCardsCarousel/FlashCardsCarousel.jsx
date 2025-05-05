import { useState } from "react";
import "./FlashCardsCarousel.css";
import API_BASE_URL from "../../config";
import { CiSquarePlus } from "react-icons/ci";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

export default function FlashCardsCarousel({ deck }) {
  const flashCards = deck?.flashCards || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showForm, setShowForm] = useState(false);

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

  const serverUrl = `${API_BASE_URL}/flashcard`;
  const token = sessionStorage.getItem("token");

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const data = {
      idDeck: deck.id,
      example: "teste",
      term: formData.get("term"),
      definition: formData.get("definition"),
    };
    fetch(serverUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Flashcard salvo:", result);
      })
      .catch((error) => {
        console.error("Erro ao salvar flashcard:", error);
      });
  };

  const currentCard = flashCards[currentIndex];
  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit} className="flashcard-form">
          <input name="term" placeholder="Termo" required />
          <input name="definition" placeholder="Definição" required />
          <button type="submit">Salvar</button>
        </form>
      ) : (
        <div className="flashcard" onClick={handleCardClick}>
          {flashCards.length > 0 ? (
            <div>{flipped ? currentCard.definition : currentCard.term}</div>
          ) : (
            <p>Sem cards</p>
          )}
        </div>
      )}
      <div className="buttons">
        <div onClick={() => retroceder()} className="button">
          <GrPrevious />
        </div>
        <div onClick={() => avancar()} className="button">
          <GrNext />
        </div>
        <div onClick={() => setShowForm(true)} className="button">
          <CiSquarePlus />
        </div>
      </div>
    </div>
  );
}
