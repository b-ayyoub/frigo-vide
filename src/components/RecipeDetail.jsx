import { useParams } from "react-router-dom";
import { useFridge } from "../context/FridgeContext";
import BackButton from "./BackButton";


export default function RecipeDetail() {
  // On récupère l'ID de la recette depuis l'URL
  const { id } = useParams();
  // On utilise le hook useParams de react-router-dom pour obtenir l'ID de la recette
  // On utilise le contexte pour accéder aux recettes et aux favoris
  // On utilise le hook useFridge pour accéder aux recettes et aux favoris
  const { recipes, favorites, addFavorite, removeFavorite } = useFridge();
// On cherche la recette correspondante à l'ID
  const recipe = recipes.find(r => r.id === parseInt(id, 10));
  // Si la recette n'existe pas, on affiche un message d'erreur
  if (!recipe) return <div>Recette introuvable</div>;
  // On vérifie si la recette est dans les favoris
  // On utilise some pour vérifier si la recette est dans les favoris
  const isFavorite = favorites.some(r => r.id === recipe.id);
  // On affiche les détails de la recette

  return (
    <>
      {/* Bouton retour en haut */}
      <BackButton label="Apple Or Peach Strudel with honney " />
      

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
