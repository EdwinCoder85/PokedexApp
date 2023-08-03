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

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("allPokemons");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);

  const indexOfLastItem = currentPage * pokemonsPerPage;
  const indexOfFirstItem = indexOfLastItem - pokemonsPerPage;

  const trainer = useSelector((reducer) => reducer.trainer);
  const navigate = useNavigate();

  const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1281";
  const [pokemons, getAllPokemons, getPokemonsByType] = useFetch(url);

  useEffect(() => {
    if (selectValue === "allPokemons") {
      getAllPokemons();
    } else {
      getPokemonsByType(selectValue);
    }
  }, [selectValue]);

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

  const totalPages = Math.ceil(shortRouteCount / pokemonsPerPage);
  let pokemonsToShow = shortRoutePokemons?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (inputValue) {
    pokemonsToShow = shortRoutePokemons
  }

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  let acces;
  const selectAcces = () => {
    if (totalPages > 10) {
      if (currentPage > totalPages - 5) {
        acces = pages.slice(totalPages - 10, totalPages);
      } else if (currentPage > 5) {
        acces = pages.slice(currentPage - 5, currentPage + 5);
      } else {
        acces = pages.slice(0, 10);
      }
    } else {
      acces = pages.slice(0, totalPages);
    }
  };
  selectAcces();

  const inputSearch = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.trim().toLowerCase());
    setSelectValue("allPokemons");
    inputSearch.current.value = "";
    setCurrentPage(1)
  };

  const cbFilter = (poke) => poke.name.includes(inputValue);

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
          <div className="pokedexpage__select">
            <SelectType
              setSelectValue={setSelectValue}
              setInputValue={setInputValue}
              selectValue={selectValue}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </article>
      </section>
      <section className="pokedexpage__gallery">
        {pokemonsToShow?.filter(cbFilter).map((poke) => (
          <PokeCard key={poke.url} url={poke.url} />
        ))}
      </section>
      <footer className="pokedexpage__pagination">
      {
        inputValue ?
        (<></>) : 
        pokemonsToShow?.length  === 0 ?
        (<></>) :
        (<Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pages={acces}
        />)
      }
      </footer>
    </>
  );
};

export default PokedexPage;
