import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import "./styles/PokeIdPage.css";
import logo from "../assets/img/logo2.svg";
import icon from "../assets/img/icon2.svg";
import line from "../assets/img/line.svg";
import bola from "../assets/img/bola.svg";

const PokeIdPage = () => {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const [pokemon, getSinglePokemon] = useFetch(url);

  useEffect(() => {
    getSinglePokemon();
  }, [id]);

  const firstType = pokemon?.types[0].type.name;

  const navigate = useNavigate()

  return (
    <>
      <header className="pokedexidpage__header">
        <div className="pokedexidpage__images">
          <img className="pokedexidpage__logo" src={logo} alt="Logo de Pokedex" onClick={() => navigate('/pokedex')}/>
          <img className="pokedexidpage__icon" src={icon} alt="" />
        </div>
        <div className="pokedexidpage__header red-bg"></div>
        <div className="pokedexidpage__header black-bg"></div>
        
      </header>
      <main className="pokedexidpage__main">
        <section className="pokedexidpage__main__top">
          <article className={`pokedexidpage__main-header ${firstType}-gradient`}>
            <img
              className={`pokedexidpage__image shadow-${firstType}`}
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </article>
          <article className="pokedexidpage__details">
            <h2 className={`pokedexidpage__subtitle ${firstType}-color`}>
              #{pokemon?.id}
            </h2>
            <img className="pokedexidpage__hr" src={line} alt="" />
            
            <h1 className={`pokedexidpage__title ${firstType}-color`}>
              {pokemon?.name}
            </h1>
            <ul className="pokedexidpage__characteristics__list">
              <li className="pokedexidpage__characteristics__item">
                <h4 className="pokedexidpage__characteristics__name">weight</h4>
                <span className="pokedexidpage__characteristics__value">
                  {pokemon?.weight}
                </span>
              </li>
              <li className="pokedexidpage__characteristics__item">
                <h4 className="pokedexidpage__characteristics__name">height</h4>
                <span className="pokedexidpage__characteristics__value">
                  {pokemon?.height}
                </span>
              </li>
            </ul>
            <div className="pokedexidpage__summary">
              <h2 className="pokedexidpage__title-types">types</h2>
              <h2 className="pokedexidpage__title-abilities">abilities</h2>
              <ul className="pokedexidpage__list-types">
                {pokemon?.types.map((typeInfo) => (
                  <li
                    className={`pokedexidpage__typename ${typeInfo.type.name}-background`}
                    key={typeInfo.type.url}
                  >
                    {typeInfo.type.name}
                  </li>
                ))}
              </ul>
              <ul className="pokedexidpage__list-abilities">
                {pokemon?.abilities.map((abilityInfo) => (
                  <li
                    className="pokedexidpage__abilityname"
                    key={abilityInfo.ability.url}
                  >
                    {abilityInfo.ability.name}
                  </li>
                ))}
              </ul>
            </div>
          </article>
          <article className="pokedexidpage__stats">
            <img className="pokedexidpage__hr2" src={line} alt="" />
            <img className="pokedexidpage__bola" src={bola} alt="" />
            <h2 className="pokedexidpage__title__stats">stats</h2>
            <ul className="pokedexidpage__list__stats">
              {pokemon?.stats.map((statInfo) => (
                <li
                  className="pokedexidpage__item__stat"
                  key={statInfo.stat.url}
                >
                  <div className="pokedexidpage__line">
                    <h3 className="pokedexidpage__name__stat">
                      {statInfo.stat.name}
                    </h3>
                    <div className="pokedexidpage__score">
                      <span className="pokedexidpage__score__value">
                        {statInfo.base_stat}
                      </span>
                      <span className="pokedexidpage__score__base">100</span>
                    </div>
                  </div>
                  <div className="pokedexidpage__bar">
                    <div
                      className="pokedexidpage__per"
                      per={`${statInfo.base_stat}%`}
                      style={{ maxWidth: `${statInfo.base_stat}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>
        <section className="pokedexidpage__main__bottom">
          <article className="pokedexidpage__moves">
            <img className="pokedexidpage__hr3" src={line} alt="" />
            <img className="pokedexidpage__bola2" src={bola} alt="" />
            <h2 className="pokedexidpage__title__moves">movements</h2>
            <ul className="pokedexidpage__list__moves">
              {pokemon?.moves.map((moveInfo) => (
                <li className="pokedexidpage__movename" key={moveInfo.move.url}>
                  {moveInfo.move.name}
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </>
  );
};

export default PokeIdPage;
