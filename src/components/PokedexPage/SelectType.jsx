import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import './styles/SelectType.css'

const SelectType = ({ setSelectValue, setInputValue, selectValue, setCurrentPage }) => {
  const url = "https://pokeapi.co/api/v2/type";
  const [types, getAllTypes] = useFetch(url);

  console.log(types)

  useEffect(() => {
    getAllTypes();
  }, []);

  const handleChange = e => {
    setSelectValue(e.target.value);
    setCurrentPage(1)
    setInputValue('');
  };

  return (
    <div className="content-select">
      <select className="selectType__select" value={selectValue} onChange={handleChange}>
        <option className="selectType__option" value="allPokemons">All Pokemons</option>
        {types?.results.map(type => (
          <option className="selectType__option" key={type.url} value={type.url}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectType;
