import { useFridge } from "../context/FridgeContext";
import RecipeCard from "./RecipeCard";
import BackButton from "./BackButton"; // bouton retour

export default function Favorites() {
  const { favorites } = useFridge();

  return (
    <div>
      <BackButton label="Suggested recipes" />
      <h1>Mes Recettes Favorites</h1>
      {favorites.length === 0 ? (
        <div>Aucune recette favorite encore !</div>
      ) : (
        favorites.map(recipe => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))
      )}
    </div>
  );
}
