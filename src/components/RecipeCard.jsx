import { useFridge } from "../context/FridgeContext";
import { Link } from "react-router-dom";


// Composant pour afficher une carte de recette
// Il reçoit une recette en prop et affiche son image, son nom, ses ingrédients
// ainsi qu'un bouton pour l'ajouter ou la retirer des favoris
export default function RecipeCard({ recipe }) {
  // On utilise le hook useFridge pour accéder aux données du contexte
  // favorites contient les recettes favorites de l'utilisateur
  // addFavorite est une fonction pour ajouter une recette aux favoris
  // removeFavorite est une fonction pour retirer une recette des favoris
  const { favorites, addFavorite, removeFavorite } = useFridge();
  // On vérifie si la recette est déjà dans les favoris
  // favorites est un tableau d'objets recette
  // On utilise some pour vérifier si l'ID de la recette correspond à l'ID d'une recette favorite
  // On utilise recipe.id pour identifier la recette
  // On utilise recipe pour passer la recette entière à addFavorite
  const isFavorite = favorites.some(r => r.id === recipe.id);

  return (
    <div className="card">
      <img src={recipe.image} alt={recipe.nom} />

      <div>
        {/* Lien vers la page de détail de la recette */}
        {/* On utilise Link de react-router-dom pour naviguer vers la page de détail */}
        {/* Le lien utilise l'ID de la recette pour construire l'URL */}
        {/* On utilise recipe.id pour identifier la recette */}
        <Link to={`/recette/${recipe.id}`}>
          <h3 style={{ margin: 0 }}>{recipe.nom}</h3>
        </Link>

        <div>
          <button
            className="favorite"
            // On utilise un bouton pour ajouter ou retirer la recette des favoris
            // On utilise onClick pour appeler addFavorite ou removeFavorite
            onClick={() =>
              // Si la recette est favorite, on la retire des favoris
              // Sinon, on l'ajoute aux favoris
              // On utilise une fonction fléchée pour appeler addFavorite ou removeFavorite
              // On utilise recipe.id pour identifier la recette
              // On utilise recipe pour passer la recette entière à addFavorite
              isFavorite ? removeFavorite(recipe.id) : addFavorite(recipe)
            }
            aria-label="Favori"
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>

        <p style={{ marginTop: 8, fontSize: ".93em", color: "#333" }}>
          {/* Affichage des ingrédients de la recette */}
          {/* On utilise map pour parcourir les ingrédients de la recette */}
          {/* On utilise ing.illustration pour afficher l'illustration de l'ingrédient */}
          {/* On utilise ing.nom pour afficher le nom de l'ingrédient */}
          {/* On utilise join pour séparer les ingrédients par une virgule */}
          {/* On utilise recipe.ingredients pour accéder aux ingrédients de la recette */}
          {recipe.ingredients
            .map(ing => `${ing.illustration} ${ing.nom}`)
            .join(", ")}
        </p>
      </div>
    </div>
  );
}
