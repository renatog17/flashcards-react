import { useEffect, useState } from "react"
import "./Sidebar.css";
import API_BASE_URL from "../../config";
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router'; // Importando o useNavigate

export default function Sidebar(){
    const [decks, setDecks] = useState([]);
    // const serverUrl = 'http://191.252.38.148/api/deck';
    const serverUrl = `${API_BASE_URL}/deck`;
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate(); // Hook para navegação

    const handleAddDeck = () => {
      navigate("/formdeck")
    }

    useEffect(() => {
        // Fazendo requisição GET para o servidor
        fetch(serverUrl, {
          method: 'GET', // método GET
          headers: {
            'Authorization': `Bearer ${token}`, // Adiciona o Bearer token no cabeçalho
            'Content-Type': 'application/json', // define o tipo de conteúdo (se necessário)
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro ao buscar decks');
            }
            return response.json();
          })
          .then(data => {
            setDecks(data);
          })
          .catch(error => {
            console.error('Erro na requisição:', error);
          });
      }, [serverUrl]);

    return(
        <div>
            <div className="decks-header" >
              <h2>Seus Decks</h2>
              <Plus className="add-button" onClick={handleAddDeck} size={24} />
            </div>
            <nav className="nav-links" >
                {decks.map(deck => (
                    <Link className="no-underline text-inherit"
                    key={deck.id}
                    to={`/decks/${deck.id}`}
                    >{deck.name} 
                    {deck.id}
                    </Link>
                    
                ))}
            </nav>
        </div>
    )
}