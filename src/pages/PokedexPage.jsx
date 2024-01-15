import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/PokedexPage/PokeCard";
import Pagination from "../components/PokedexPage/Pagination";
import "./styles/PokedexPage.css";
import logo from "../assets/img/logo2.svg";
import icon from "../assets/img/icon2.svg";
import SelectType from "../components/PokedexPage/SelectType";
import { useNavigate } from "react-router-dom";
import SelectCardByPage from "../components/PokedexPage/SelectCardByPage";

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("allPokemons");
  const [showCardsByPage, setShowCardsByPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const trainer = useSelector((reducer) => reducer.trainer);
  const navigate = useNavigate();

  const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1304";

  const [pokemons, getAllPokemons, getPokemonsByType] = useFetch(url);

  useEffect(() => {
    if (selectValue === "allPokemons") {
      getAllPokemons();
    } else {
      getPokemonsByType(selectValue);
    }
  }, [selectValue, showCardsByPage, inputValue ]);

  const pokemonsPerPage = showCardsByPage;

  const indexOfLastItem = currentPage * pokemonsPerPage;
  const indexOfFirstItem = indexOfLastItem - pokemonsPerPage;

  let shortRoutePokemons;
  let shortRouteCount;

  const route = () => {
    if (pokemons?.count) {
      shortRoutePokemons = pokemons?.results;
      shortRouteCount = pokemons?.count;
    } else {
      shortRoutePokemons = pokemons?.results;
      shortRouteCount = pokemons?.results.length;
    }
  };

  route();

  const inputSearch = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.trim().toLowerCase());
    setSelectValue("allPokemons");
    inputSearch.current.value = ""; 
    setCurrentPage(1); 
  };

  const cbFilter = (poke) => poke.name.includes(inputValue);
  shortRouteCount = shortRoutePokemons?.filter(cbFilter).length;
  const result = shortRoutePokemons?.filter(cbFilter);
  const totalPages = Math.ceil(shortRouteCount / pokemonsPerPage);

  let pokemonsToShow = shortRoutePokemons?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (inputValue) {
    pokemonsToShow = result?.slice(
      indexOfFirstItem,
      indexOfLastItem)
  }

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  let acces;

  const selectAcces = () => {
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
  selectAcces();

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
        {inputValue && pokemonsToShow?.length > 0 && (
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
      <section className="pokedexpage__gallery">
        {!inputValue && pokemonsToShow?.length === 0 && (
          <div className="pokedexpage__message">
            <span>There haven't been any Pokémon of this type found!! 😥</span>
          </div>
        )}
        {!inputValue &&
          pokemonsToShow?.length > 0 &&
          pokemonsToShow
            .filter(cbFilter)
            .map((poke) => <PokeCard key={poke.url} url={poke.url} />)}
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
        {inputValue && pokemonsToShow?.length > 0 && (
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
