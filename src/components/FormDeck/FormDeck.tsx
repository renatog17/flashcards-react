import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router"; // << ADICIONE isso

export default function FormDeck() {
  const [deckName, setDeckName] = useState("");
  const navigate = useNavigate(); 
  const handleDeckNameChange = (e) => {
    setDeckName(e.target.value);
  };

  const hanleSubmit = async (e) => {
    e.preventDefault();
    //agora eu preciso alterar essa linha, eu preciso pegar o token, que está no session storage e enviar a requisicação
    //para o endpoint
    const token = sessionStorage.getItem("token");
    
    if (!token) {
      alert("Usuário não autenticado!");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/deck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: deckName }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar deck");
      }

      console.log("Deck criado com sucesso!");

      navigate("/"); // << REDIRECIONA para a home
    } catch (error) {
      console.error(error);
      alert("Erro ao criar deck. Tente novamente.");
    }
  };

  return (
    <div>
      <h2>Criar Novo Deck</h2>
      <form onSubmit={hanleSubmit}>
        <div>
          <label>Deck Name:</label>
          <input
            type="text"
            value={deckName}
            onChange={handleDeckNameChange}
            placeholder={"Enter Deck Name"}
            required
          />
          <div>
            <button type="submit">Save Deck</button>
          </div>
        </div>
      </form>
    </div>
  );
}
