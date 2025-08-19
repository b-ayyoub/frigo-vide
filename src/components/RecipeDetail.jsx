import { useParams } from "react-router-dom";
import { useFridge } from "../context/FridgeContext";
import BackButton from "./BackButton";


export default function RecipeDetail() {
  const { id } = useParams();
  const { recipes, favorites, addFavorite, removeFavorite } = useFridge();

  const recipe = recipes.find(r => r.id === parseInt(id, 10));
  if (!recipe) return <div>Recette introuvable</div>;
  const isFavorite = favorites.some(r => r.id === recipe.id);

  return (
    <>
      {/* Bouton retour en haut */}
      <BackButton label="Apple Or Peach Strudel with honney " />
      
      {/* Bloc image + infos à droite (hors container principal) */}
      <div className="recipe-img-info">
        <img src={recipe.image} alt={recipe.nom} className="recipe-img" />
        <div className="recipe-info">
          <div><span className="info-icon">⏱️</span> {recipe.temps_preparation}</div>
          <div><span className="info-icon">👥</span> {recipe.nombre_personnes} persons</div>
          <div>
            <img src="/assets/loader.png" alt="Cuisson" className="icon-cuisson" />
            {recipe.temps_cuisson}
          </div>
          <button
            className="fav-btn"
            onClick={() =>
              isFavorite ? removeFavorite(recipe.id) : addFavorite(recipe)
            }
          >
            <span className="fav-icon">{isFavorite ? "★" : "☆"}</span>
            <span className="fav-label">add to favorites</span>
          </button>
        </div>
      </div>

      {/* Container principal ingrédients et étapes */}
      <div className="recipe-main">
        <div className="recipe-head">
          <h1 className="recipe-title">{recipe.nom}</h1>
        </div>

        <div className="section">
          <h2 className="section-title">Ingredients</h2>
          <div className="section-box">
            <ul>
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="ingredient-row">
                  <span className="ingredient-emoji">{ing.illustration}</span>
                  <span className="ingredient-amount">{ing.quantite} {ing.nom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Steps</h2>
          <div className="section-box">
          
              {recipe.etapes.map((step, idx) => (
                <li key={idx} className="step-row">{step}</li>
              ))}
           
          </div>
        </div>
      </div>
    </>
  );
}
