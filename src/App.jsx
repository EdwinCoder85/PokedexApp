import "./App.css";
import HomePage from "./pages/HomePage";
import PokedexPage from "./pages/PokedexPage";
import PokeIdPage from "./pages/PokeIdPage";
import Page404 from "./pages/Page404";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Lottie from "lottie-react";
import pokebola from "./pokebola5.json";
// import bar from "./bar.json";
import bar from "./worm.json";
import { useEffect, useState } from "react";

// Componente del Loader
const Loader = () => (
  <div className="loading-animation">
    <Lottie
      loop={true}
      animationData={pokebola}
      style={{
        width: "40%",
        height: "40%",
      }}
    />
    <Lottie
      loop={true}
      animationData={bar}
      style={{
        width: "40%",
        height: "40%",
      }}
    />
  </div>
);

// Componente principal de la aplicación
function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simula un tiempo de carga (puedes reemplazar esto con llamadas reales a la API, etc.)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simula una carga de 2 segundos
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="principal-loading">
          {Loader()}
        </div>
      ) : (
        <div className="principal-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/pokedex" element={<PokedexPage />} />
              <Route path="/pokedex/:id" element={<PokeIdPage />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
