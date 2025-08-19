import { Link, useLocation } from "react-router-dom";
import { useFridge } from "../context/FridgeContext";

export default function Footer() {
  // Utilisation du hook useLocation pour obtenir l'URL actuelle
  const location = useLocation();
  // Récupération des favoris depuis le contexte FridgeContext
  const { favorites } = useFridge();
  // Fonction utilitaire pour vérifier si le chemin actuel est actif
  // Elle prend un tableau de chemins et vérifie si l'URL actuelle correspond à l'un d'eux
  const isActive = (paths) => paths.includes(location.pathname);

  return (
    <footer className="footer">
      {/* Picto Accueil / Ingrédients */}
      <Link to="/ingredients">
        <img
          src="/assets/home.png"
          className={`picto ${isActive(["/", "/ingredients"]) ? "active" : ""}`}
          alt="Accueil"
        />
      </Link>

      {/* Picto Favoris */}
      <Link to="/favoris" style={{ position: "relative" }}>
        <img
          src="/assets/list.png"
          className={`picto ${isActive(["/favoris"]) ? "active" : ""}`}
          alt="Favoris"
        />
        {favorites.length > 0 && (
          <span className="footer-badge">{favorites.length}</span>
        )}
      </Link>

      {/* Picto Recettes */}
      <Link to="/recettes">
        <img
          src="/assets/book.png"
          className={`picto ${isActive(["/recettes"]) ? "active" : ""}`}
          alt="Recettes"
        />
      </Link>
    </footer>
  );
}
