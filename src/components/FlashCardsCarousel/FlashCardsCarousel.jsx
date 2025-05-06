import { useState } from "react";
import "./FlashCardsCarousel.css";
import API_BASE_URL from "../../config";
import { CiSquarePlus } from "react-icons/ci";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import FlashCard from "../FlashCard/FlashCard";
import { useNavigate } from "react-router";


export default function FlashCardsCarousel({ deck }) {
  const flashCards = deck?.flashCards || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const avancar = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, flashCards.length - 1));
  };

  const retroceder = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const serverUrl = `${API_BASE_URL}/flashcard`;
  const token = sessionStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      idDeck: deck.id,
      example: "teste",
      term: formData.get("term"),
      definition: formData.get("definition"),
    };
  
    try {
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao salvar flashcard");
      }
      console.log("Navegando para:", `/decks/${deck?.id}`);
      navigate(`/`); 
    } catch (error) {
      console.error("Erro ao salvar flashcard:", error);
    }
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
        <div>
          {flashCards.length > 0 ? (
            <FlashCard term={currentCard.term} definition={currentCard.definition}></FlashCard>
            
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
