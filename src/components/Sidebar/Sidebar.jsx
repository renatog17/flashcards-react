import { useEffect, useState } from "react";
import "./Sidebar.css";
import API_BASE_URL from "../../config";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { SlMenu } from "react-icons/sl";
import InputDeck from "../InputDeck/InputDeck";

export default function Sidebar() {
  const [decks, setDecks] = useState([]);
  const serverUrl = `${API_BASE_URL}/deck/flashcards`;
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate(); 
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleAddDeck = () => {
    navigate("/formdeck");
  };

  useEffect(() => {
    fetch(serverUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar decks");
        }
        return response.json();
      })
      .then((data) => {
        setDecks(data);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  }, [serverUrl]);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="toggle-button"
      >
        <SlMenu></SlMenu>
      </button>

      {!isCollapsed && (
        <>
          <div className="decks-header">
            <InputDeck></InputDeck>
          </div>

          <nav className="nav-links">
            {decks.map((deck) => (
              <Link
                className="no-underline text-inherit"
                key={deck.id}
                to={`/decks/${deck.id}`}
                state={{ deck }}
              >
                {deck.name}
              </Link>
            ))}
          </nav>
        </>
      )}
    </div>
  );
}
