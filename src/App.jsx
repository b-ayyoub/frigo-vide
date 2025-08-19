import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IngredientForm from "./components/IngredientForm";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import Favorites from "./components/Favorites";
import Accueil from "./components/Accueil";

import "./styles/main.css";
import "./styles/fonts.css";

// composant interne pour accéder au hook
function AppContent() {
  const location = useLocation(); // On récupère l'URL courante

  return (
    <>
      <Header />
      <main style={{ flex: 1, padding: "24px 32px", overflowY: "auto" }}>
        <Routes>
          {/* PAGE D'ACCUEIL SUR LA ROUTE RACINE */}
          <Route path="/" element={<Accueil />} />

          {/* Les autres pages */}
          <Route path="/ingredients" element={<IngredientForm />} />
          <Route path="/recettes" element={<RecipeList />} />
          <Route path="/recette/:id" element={<RecipeDetail />} />
          <Route path="/favoris" element={<Favorites />} />
        </Routes>
      </main>
      {/* Footer affiché partout sauf sur "/" */}
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
