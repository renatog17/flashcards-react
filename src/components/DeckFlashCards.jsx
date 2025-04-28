import { useEffect, useState } from "react";
import { useParams } from "react-router";
import FlashCardsCarousel from "./FlashCardsCarousel/FlashCardsCarousel";
import API_BASE_URL from "../config";

export default function DeckFlashcards() {
  const { id } = useParams();
  const [flashCards, setFlashCards] = useState([]);
  const serverUrl = `${API_BASE_URL}/deck/${id}/flashcards`;
    const token = sessionStorage.getItem("token");
  //const serverUrl = `http://191.252.38.148/api/deck/${id}/flashcards`;
  const [nomeDeck, setNomeDeck] = useState([]);

  useEffect(() => {
    fetch(
      serverUrl, {
        method: 'GET', // método GET
        headers: {
          'Authorization': `Bearer ${token}`, // Adiciona o Bearer token no cabeçalho
          'Content-Type': 'application/json', // define o tipo de conteúdo (se necessário)
        }
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar decks");
        }
        return response.json();
      })
      .then((data) => {
        
        setFlashCards(data.flashCards || []);
        setNomeDeck(data.name);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  }, [serverUrl]);

  return(
    <div>
    <FlashCardsCarousel flashCards={flashCards}></FlashCardsCarousel>
    </div>
  )
    
}
