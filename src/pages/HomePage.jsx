import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setTrainerG } from "../store/slices/trainer.slice";
import { useNavigate } from "react-router-dom";
import "./styles/HomePage.css";
import logo from "../assets/img/logo2.svg";
import icon from "../assets/img/icon.svg";
import ash from "../assets/img/ash.svg";
import pikachu from "../assets/img/pikachu3.svg";
import pokebola from "../assets/img/pokebola.png";

const HomePage = () => {
  const inputTrainer = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerG(inputTrainer.current.value.trim()));
    navigate("/pokedex");
  };

  return (
    <div className="homepage-container">
      <main className="homepage__main">
        <section className="homepage__section">
          <img
            className="homepage__section__image"
            src={logo}
            alt="Logo de Pokedex"
          />
          <h2 className="homepage__section__subtitle">¡Hi trainer!</h2>
          <p className="homepage__section__paragraph">
            To start with the app, give me your name trainer
          </p>
          <form className="homepage__form" onSubmit={handleSubmit}>
            <input
              className="homepage__form__input"
              id="inputTrainer"
              ref={inputTrainer}
              type="text"
              placeholder="Your name..."
            />
            <input
              type="submit"
              className="homepage__form__button"
              value="Gotta catch'em all!"
            />
            <img className="homepage__image-ball" src={pokebola} alt="" />
          </form>
          <img
            className="homepage__image-pikachu"
            src={pikachu}
            alt="Pikachu"
          />
          <img className="homepage__image-ash" src={ash} alt="Ash" />
        </section>
      </main>
      <footer className="homepage__footer">
        <img className="homepage__footer__image" src={icon} alt="" />
        <div className="homepage__footer red-bg"></div>
        <div className="homepage__footer black-bg"></div>
      </footer>
    </div>
  );
};

export default HomePage;
