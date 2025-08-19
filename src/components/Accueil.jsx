import { useNavigate } from "react-router-dom";
import "../styles/main.css"; // on importe notre CSS

export default function Accueil() {
  const navigate = useNavigate();

  return (
    <div className="accueil-container">
      <h1 className="accueil-title">Empty Fridge</h1>

      <img
        src="../assets/frigo.png"
        alt="Frigo Vide"
        className="accueil-image"
      />

      <div className="accueil-subtitle">
        <p>
          The app that helps you <span>eat better</span> by using what your <span>leftovers</span> and <span>saving</span> as much as possible!
        </p>
        <br />

      </div>

      <button
        className="accueil-button"
        onClick={() => navigate("/ingredients")}
      >
        What's in your fridge ?
      </button>
    </div>
  );
}
