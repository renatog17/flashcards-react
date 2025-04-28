// src/App.jsx
import { Router, Routes, Route } from "react-router";
import LayoutWithSidebar from "./LayoutWithSidebar";
import Home from "./components/Home";
import DeckFlashcards from "./components/DeckFlashCards";
import Login from "./pages/login";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import FormDeck from "./components/FormDeck/FormDeck";

function App() {
  return (
    <Routes>
      {/* Rota sem layout */}
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route element={<LayoutWithSidebar />}>
          <Route path="/" element={<Home />} />

          <Route path="/decks/:id" element={<DeckFlashcards />} />
          <Route path="/formdeck" element={<FormDeck />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
