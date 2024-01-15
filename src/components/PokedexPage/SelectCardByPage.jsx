import React from "react";
import "./styles/SelectType.css";

const SelectCardByPage = ({
  setShowCardsByPage,
  showCardsByPage,
  setCurrentPage,
}) => {
  const cards = [
    {
      name: "4 cards by Page",
      value: 4,
    },
    {
      name: "8 cards by Page",
      value: 8,
    },
    {
      name: "12 cards by Page",
      value: 12,
    },
    {
      name: "20 cards by Page",
      value: 20,
    },
    {
      name: "30 cards by Page",
      value: 30,
    },
  ];

  const handleChange = (e) => {
    setShowCardsByPage(e.target.value);
    setCurrentPage(1);
  };

  

  return (
    <div className="content-select">
      <select
        className="selectType__select"
        value={showCardsByPage}
        onChange={handleChange}
      >
        {cards.map((card, index) => (
          <option key={index} value={card.value}>
            {card.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCardByPage;
