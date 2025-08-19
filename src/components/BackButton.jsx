// src/components/BackButton.jsx
import { useNavigate } from "react-router-dom";

// Composant BackButton
export default function BackButton({ label = "My recipies" }) {
  // Utilisation du hook useNavigate de react-router-dom pour naviguer
  const navigate = useNavigate();
  // Retourne un bouton qui permet de revenir à la page précédente

  return (
    <button
      className="custom-back-btn"
      onClick={() => navigate(-1)} // Utilisation de navigate(-1) pour revenir en arrière 
      type="button"
    >
      <span className="arrow">&#8592;</span>
      <span className="back-label">{label}</span>
    </button>
  );
}
