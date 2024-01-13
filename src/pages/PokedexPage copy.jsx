import { useSelector } from "react-redux"; // Importa el hook useSelector de react-redux para acceder al estado global
import useFetch from "../hooks/useFetch"; // Importa un hook personalizado para realizar peticiones HTTP
import { useEffect, useRef, useState } from "react"; // Importa varios hooks de React para gestionar el ciclo de vida, referencias y estado
import PokeCard from "../components/PokedexPage/PokeCard"; // Importa el componente PokeCard
import Pagination from "../components/PokedexPage/Pagination"; // Importa el componente Pagination
import "./styles/PokedexPage.css"; // Importa un archivo de estilos CSS
import logo from "../assets/img/logo2.svg"; // Importa una imagen del logo
import icon from "../assets/img/icon2.svg"; // Importa una imagen del icono
import SelectType from "../components/PokedexPage/SelectType"; // Importa el componente SelectType
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate de react-router-dom para la navegación
import SelectCardByPage from "../components/PokedexPage/SelectCardByPage"; // Importa el componente SelectCardByPage

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState(""); // Define un estado para el valor del input de búsqueda
  const [selectValue, setSelectValue] = useState("allPokemons"); // Define un estado para el valor del tipo seleccionado
  const [showCardsByPage, setShowCardsByPage] = useState(8); // Define un estado para la cantidad de tarjetas por página
  const [currentPage, setCurrentPage] = useState(1); // Define un estado para la página actual

  const trainer = useSelector((reducer) => reducer.trainer); // Obtiene el valor del entrenador desde el estado global usando useSelector
  const navigate = useNavigate(); // Obtiene la función de navegación desde react-router-dom

  const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1304"; // Define la URL de la API de Pokémon
  const [pokemons, getAllPokemons, getPokemonsByType] = useFetch(url); // Usa el hook personalizado useFetch para obtener datos de la API

  useEffect(() => {
    // Efecto secundario que se ejecuta cuando cambian selectValue o showCardsByPage
    if (selectValue === "allPokemons") {
      // Si el tipo seleccionado es "allPokemons", obtiene todos los Pokémon
      getAllPokemons();
    } else {
      // Si se selecciona un tipo específico, obtiene los Pokémon de ese tipo
      getPokemonsByType(selectValue);
    }
  }, [selectValue, showCardsByPage]); // Dependencias del efecto secundario

  const pokemonsPerPage = showCardsByPage; // Almacena la cantidad de Pokémon por página

  const indexOfLastItem = currentPage * pokemonsPerPage; // Calcula el índice del último Pokémon en la página actual
  const indexOfFirstItem = indexOfLastItem - pokemonsPerPage; // Calcula el índice del primer Pokémon en la página actual

  let shortRoutePokemons; // Variable para almacenar los Pokémon de la respuesta de la API
  let shortRouteCount; // Variable para almacenar la cantidad total de Pokémon

  const route = () => {
    // Función para determinar la estructura de la respuesta de la API
    if (pokemons?.count) {
      // Si existe la propiedad "count" en la respuesta, se trata de la lista completa de Pokémon
      shortRoutePokemons = pokemons?.results;
      shortRouteCount = pokemons?.count;
    } else {
      // Si no hay "count", se trata de una respuesta limitada por tipo y se usa la lista de resultados directamente
      shortRoutePokemons = pokemons?.results;
      shortRouteCount = pokemons?.results.length;
    }
  };

  route(); // Llama a la función para determinar la estructura de la respuesta de la API

  const totalPages = Math.ceil(shortRouteCount / pokemonsPerPage); // Calcula el número total de páginas

  let pokemonsToShow = shortRoutePokemons?.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); // Obtiene los Pokémon a mostrar en la página actual

  if (inputValue) {
    // Si hay un valor de búsqueda
    console.log(inputValue); // Imprime el valor de búsqueda en la consola
    pokemonsToShow = shortRoutePokemons; // Muestra todos los Pokémon si hay un valor de búsqueda
  }

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  } // Crea un array con números de página para la paginación

  let acces; // Variable para almacenar las páginas accesibles desde la página actual

  const selectAcces = () => {
    // Función para determinar las páginas accesibles
    if (totalPages > 10) {
      // Si hay más de 10 páginas
      if (currentPage > totalPages - 5) {
        // Si la página actual está en las últimas 5 páginas
        acces = pages.slice(totalPages - 10, totalPages);
      } else if (currentPage > 5) {
        // Si la página actual está después de las primeras 5 páginas
        acces = pages.slice(currentPage - 5, currentPage + 5);
      } else {
        // Si la página actual está en las primeras 5 páginas
        acces = pages.slice(0, 10);
      }
    } else {
      // Si hay 10 o menos páginas
      acces = pages.slice(0, totalPages);
    }
  };
  selectAcces(); // Llama a la función para determinar las páginas accesibles

  const inputSearch = useRef(); // Referencia para el input de búsqueda

  const handleSubmit = (e) => {
    // Función para manejar el envío del formulario de búsqueda
    e.preventDefault();
    setInputValue(inputSearch.current.value.trim().toLowerCase()); // Actualiza el valor de búsqueda
    setSelectValue("allPokemons"); // Restaura el tipo seleccionado a "allPokemons"
    inputSearch.current.value = ""; // Limpia el input de búsqueda
    setCurrentPage(1); // Vuelve a la primera página al realizar una búsqueda
  };

  const cbFilter = (poke) => poke.name.includes(inputValue); // Función de filtro para los Pokémon que coinciden con el valor de búsqueda

  // Función para obtener los resultados de la búsqueda paginados
  const getPaginatedFilteredResults = () => {
    let filteredResults = shortRoutePokemons?.filter(cbFilter);

    const indexOfLastItemFiltered = currentPage * showCardsByPage;
    const indexOfFirstItemFiltered = indexOfLastItemFiltered - showCardsByPage;

    return filteredResults?.slice(
      indexOfFirstItemFiltered,
      indexOfLastItemFiltered
    );
  };

  return (
    <>
      <header className="pokedexpage__header">
        <div className="pokedexpage__images">
          <img
            className="pokedexpage__logo"
            src={logo}
            alt="Logo de Pokedex"
            onClick={() => navigate("/")}
          />
          <img className="pokedexpage__icon" src={icon} alt="" />
        </div>
        <div className="pokedexpage__header red-bg"></div>
        <div className="pokedexpage__header black-bg"></div>
      </header>
      <section className="pokedexpage__contain">
        <p className="pokedexpage__paragraph">
          <span className="pokedexpage__trainer">Welcome {trainer},</span> here
          you could find your favorite pokemon.
        </p>
        <article className="pokedexpage__row">
          <form className="pokedexpage__form" onSubmit={handleSubmit}>
            <input
              className="pokedexpage__input"
              ref={inputSearch}
              type="text"
              placeholder="Look for a pokemon..."
            />
            <button className="pokedexpage__button">Search</button>
          </form>
          <div className="pokedexpage__selectCardByType">
            <SelectType
              setSelectValue={setSelectValue}
              setInputValue={setInputValue}
              selectValue={selectValue}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </article>
      </section>
      <section className="pokedexpage__pagination">
        {!inputValue && pokemonsToShow?.length > 0 && (
          <>
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pages={acces}
            />
            <div className="pokedexpage__selectCardByPage">
              <SelectCardByPage
                setShowCardsByPage={setShowCardsByPage}
                showCardsByPage={showCardsByPage}
                setInputValue={setInputValue}
                setCurrentPage={setCurrentPage}
              />
            </div>
            <p className="pokedexpage__counter">
              <span style={{ fontWeight: "bold" }}>Found: </span>
              {`${shortRouteCount} pokemons`}
            </p>
          </>
        )}
        {inputValue && pokemonsToShow?.length === 0 && (
          <>
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pages={acces}
            />
            <div className="pokedexpage__selectCardByPage">
              <SelectCardByPage
                setShowCardsByPage={setShowCardsByPage}
                showCardsByPage={showCardsByPage}
                setInputValue={setInputValue}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </>
        )}
      </section>
      <section className="pokedexpage__gallery">
        {!inputValue && pokemonsToShow?.length === 0 && (
          <div className="pokedexpage__message">
            <span>There haven't been any Pokémon of this type found!! 😥</span>
          </div>
        )}
        {!inputValue && pokemonsToShow?.length > 0 && (
          <>
            {pokemonsToShow.filter(cbFilter).map((poke) => (
              <PokeCard key={poke.url} url={poke.url} />
            ))}
          </>
        )}
        {inputValue &&
          pokemonsToShow?.filter(cbFilter).length > 0 &&
          pokemonsToShow
            .filter(cbFilter)
            .map((poke) => <PokeCard key={poke.url} url={poke.url} />)}
        {inputValue && pokemonsToShow?.filter(cbFilter).length === 0 && (
          <div className="pokedexpage__message">
            <span>There haven't been any Pokémon of this type found!! 😥</span>
          </div>
        )}
      </section>
      <section className="pokedexpage__pagination">
        {!inputValue && pokemonsToShow?.length > 0 && (
          <>
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pages={acces}
            />
            <div className="pokedexpage__selectCardByPage">
              <SelectCardByPage
                setShowCardsByPage={setShowCardsByPage}
                showCardsByPage={showCardsByPage}
                setInputValue={setInputValue}
                setCurrentPage={setCurrentPage}
              />
            </div>
            <p className="pokedexpage__counter">
              <span style={{ fontWeight: "bold" }}>Found: </span>
              {`${shortRouteCount} pokemons`}
            </p>
          </>
        )}
      </section>
    </>
  );
};

export default PokedexPage;
