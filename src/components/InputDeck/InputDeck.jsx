import { useState } from "react";
import "./InputDeck.css";
import API_BASE_URL from "../../config";

export default function InputDeck() {
  const [nameDeck, setNameDeck] = useState("");
  const serverUrl = `${API_BASE_URL}/deck`;
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: nameDeck }),
        });

        if (!response.ok) {
          throw new Error("Erro ao criar deck");
        }
        console.log("Deck criado com sucesso!");
        window.location.reload();
      } catch (error) {
        console.error(error);
        alert("Erro ao criar deck. Tente novamente.");
      }
    }
  };

  return (
    <input 
      type="text"
      className="add-input"
      placeholder="Novo deck ..."
      value={nameDeck}
      onChange={(e) => setNameDeck(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
