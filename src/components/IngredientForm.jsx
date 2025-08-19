import { useState } from "react";
import { useFridge } from "../context/FridgeContext";
import { useNavigate } from "react-router-dom";

export default function IngredientForm() {
  // Déclaration des états locaux
  // saisie pour l'input de l'ingrédient
  const [saisie, setSaisie] = useState("");
  // ingredients pour la liste des ingrédients du frigo
  const { ingredients, setIngredients } = useFridge();
   // navigate pour la navigation vers la page des recettes
  const navigate = useNavigate();

// Fonction pour ajouter un ingrédient
  // Elle est appelée lors de la soumission du formulaire
  // Elle vérifie si l'ingrédient n'est pas vide et s'il n'est pas déjà dans la liste
  // Si ces conditions sont remplies, l'ingrédient est ajouté à la liste
  const handleAdd = (e) => {
    // Empêche le rechargement de la page lors de la soumission du formulaire
    // e.preventDefault() est utilisé pour empêcher le comportement par défaut du formulaire
    e.preventDefault();
    // On supprime les espaces superflus et on vérifie si la saisie n'est pas vide
    // On utilise trim() pour enlever les espaces au début et à la fin de la saisie
    const val = saisie.trim();
    // Si la saisie n'est pas vide et n'est pas déjà dans la liste des ingrédients
    // On utilise includes() pour vérifier si l'ingrédient est déjà dans la liste
    // On ajoute l'ingrédient à la liste et on vide le champ de saisie
    if (val && !ingredients.includes(val)) {
      // On utilise setIngredients pour mettre à jour la liste des ingrédients
      // On utilise la fonction setIngredients pour mettre à jour l'état des ingrédients
      setIngredients([...ingredients, val]);
      // On vide le champ de saisie après l'ajout
      setSaisie("");
    }
  };
// Fonction pour retirer un ingrédient
  // Elle est appelée lorsqu'on clique sur le bouton de suppression d'un ingrédient
  // Elle filtre la liste des ingrédients pour retirer celui qui a été cliqué
  const handleRemove = (ing) => {
    // On utilise filter pour créer une nouvelle liste sans l'ingrédient cliqué
    // On utilise la fonction setIngredients pour mettre à jour l'état des ingrédients
    // On utilise une fonction fléchée pour filtrer les ingrédients
    // On compare chaque ingrédient avec celui à retirer
    // On utilise !== pour vérifier que l'ingrédient n'est pas celui à retirer
    // On utilise setIngredients pour mettre à jour la liste des ingrédients
    setIngredients(ingredients.filter(i => i !== ing));
  };
  // Fonction pour naviguer vers la page des recettes
  // Elle est appelée lorsque l'utilisateur clique sur le bouton "GO"
  const goToRecipes = () => {
    
    // On utilise useNavigate pour changer de page
    // On utilise navigate pour rediriger l'utilisateur vers la page des recettes
    // On utilise la chaîne de caractères "/recettes" pour spécifier la route
    navigate("/recettes");
  };

  return (
    <section className="ingredients-section">

      {/* Formulaire pour ajouter des ingrédients */}
      {/* On utilise onSubmit pour appeler handleAdd lors de la soumission */}
      <form onSubmit={handleAdd} className="ingredients-form">
        <label htmlFor="ingInput" className="ingredients-label">
          Add ingredients
        </label>
        <div className="input-row">
          <input
            id="ingInput"
            type="text"
            className="input"
            placeholder="Tomates..."
            // On utilise value pour lier l'état de saisie à l'input
            value={saisie}
            // On utilise onChange pour mettre à jour l'état de saisie
            onChange={e => setSaisie(e.target.value)}
          />

        </div>
        <button className="btn add-btn" type="submit">
            Add ingredient
          </button>
      </form>

      <div className="fridge-list">
        <div className="fridge-title">In my fridge there a some :</div>
        
        {ingredients.length === 0 ? ( // Si la liste des ingrédients est vide
          // On affiche un message indiquant qu'il n'y a rien pour l'instant
          <div className="empty-text">liste…</div>
        ) : (
          <ul className="ingredients-ul">
            {ingredients.map((ing) => ( // On map sur chaque ingrédient
              // On crée un élément de liste pour chaque ingrédient
              // On utilise la clé ing pour identifier chaque élément de la liste
              <li key={ing} className="ingredient-item">
                <span className="ingredient-text">{ing}</span>
                <button
                  className="remove-btn"
                  // On utilise onClick pour appeler handleRemove avec l'ingrédient à retirer
                  onClick={() => handleRemove(ing)}
                  // On utilise aria-label pour l'accessibilité
                  aria-label={`Remove ${ing}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Bouton pour aller à la page des recettes */}
      {/* On utilise onClick pour appeler goToRecipes lors du clic sur le bouton */}
      <button className="btn go-btn" onClick={goToRecipes}>
        GO
      </button>
    </section>
  );
}
