// On importe les fonctions React nécessaires : création de contexte, hooks d'état et d'effet
import { createContext, useContext, useState, useEffect } from "react";
// On importe les recettes depuis le fichier JSON, c'est notre base de données locale
import recipes from "../data/recettes_cuisine.json";

// On crée un contexte React vide, qui va permettre de partager les données dans toute l'application
const FridgeContext = createContext();

// Le Provider encapsule l'ensemble de l'application et fournit les données ainsi que fonctions à ses enfants
export function FridgeProvider({ children }) {
  // useState avec une fonction d'initialisation pour récupérer la liste favoris sauvegardée dans localStorage (ou [] si aucune donnée)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites"); // Récupère la chaîne JSON stockée dans localStorage
    return saved ? JSON.parse(saved) : [];            // Si elle existe, la transforme en tableau JS, sinon tableau vide
  });

  // useEffect : déclenché à chaque fois que la liste des favoris change
  useEffect(() => {
    // On met à jour la donnée "favorites" dans le localStorage à chaque modification
    localStorage.setItem("favorites", JSON.stringify(favorites)); // On convertit le tableau en chaîne pour stockage
  }, [favorites]); // Ce hook s'exécute uniquement si favorites change

  // Initialisation d'un autre état pour la liste d'ingrédients saisie dans le formulaire
  const [ingredients, setIngredients] = useState([]);

  // Fonction de filtrage : on garde les recettes qui contiennent au moins un ingrédient saisi
  const filteredRecipes = recipes.filter(recipe =>
    ingredients.length === 0 || // si aucun ingrédient, on garde toutes les recettes
    ingredients.some(ingSaisi => // sinon on regarde si un ingrédient saisi correspond dans la recette
      recipe.ingredients.some(ingRecette =>
        // on compare les noms en minuscules et on enlève les espaces
        ingRecette.nom.toLowerCase().includes(ingSaisi.trim().toLowerCase())
      )
    )
  );

  // Fonction pour ajouter une recette aux favoris
  const addFavorite = (recipe) => {
    // On vérifie qu'elle n'est pas déjà dans la liste des favoris
    if (!favorites.some(r => r.id === recipe.id)) {
      // Si pas présente, on ajoute la recette en créant un nouveau tableau (immutable)
      setFavorites([...favorites, recipe]);
    }
  };

  // Fonction pour enlever une recette des favoris par son id
  const removeFavorite = (id) => {
    // On crée un nouveau tableau sans la recette ayant cet id
    setFavorites(favorites.filter(r => r.id !== id));
  };

  // Le Provider fournit ici toutes les données et fonctions essentielles à ses enfants
  return (
    <FridgeContext.Provider value={{
      ingredients, setIngredients,   // Liste des ingrédients et fonction de modification
      favorites, addFavorite, removeFavorite, // Gestion des favoris
      filteredRecipes, recipes       // Liste filtrée et liste complète des recettes
    }}>
      {children} {/* // Les composants enfants seront affichés ici et pourront accéder au contexte */}
    </FridgeContext.Provider>
  );
}

// Hook personnalisé qui facilite l'accès au contexte depuis n'importe quel composant
export function useFridge() {
  // On retourne le contexte entier pour que les composants l'utilisent facilement
  return useContext(FridgeContext);
}
