import { useFridge } from "../context/FridgeContext";
import RecipeCard from "./RecipeCard";
import BackButton from "./BackButton"; // import du bouton


export default function RecipeList() {
  // Récupération des recettes filtrées depuis le contexte
  // On utilise useFridge pour accéder aux données du contexte
  // filteredRecipes contient les recettes qui correspondent aux ingrédients saisis
  // dans le contexte FridgeContext
  const { filteredRecipes } = useFridge();

  return (
    <div>
      {/* Bouton retour en haut */}
      <BackButton label="Suggested recipes" />

      {/* Liste des recettes ou message vide */}

      {/* Si aucune recette ne correspond, on affiche un message */}
      

      {/* Si filteredRecipes est vide, on affiche un message indiquant qu'aucune recette ne correspond aux ingrédients */}
      {filteredRecipes.length === 0 ? (
        
        <div>Aucune recette ne correspond à vos ingrédients</div>
      ) : (
        //  Sinon, on map sur les recettes filtrées pour afficher chaque recette */
        filteredRecipes.map((recipe) => (
          // On utilise le composant RecipeCard pour afficher chaque recette
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))
      )}
    </div>
  );
}
