import { useEffect, useState } from "react";
import GameCard from "./components/GameCard/GameCard";
import "./App.scss";

function App() {
  const [cardsData, setCardsData] = useState(null);

  const initGame = () => {
    const randomCards = getRandomCards();

    setCardsData(randomCards);

    setTimeout(() => {
      setCardsData(randomCards.map((card) => ({ ...card, isHidden: true })));
    }, 5000);
  };

  const getRandomNumber = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  const isUniqueCardValue = (initialCards, newValue) => {
    return !initialCards.find((card) => card.value === newValue);
  };

  const getRandomCards = () => {
    let initialCards = [];

    while (initialCards.length < 32) {
      const newValue = getRandomNumber(1, 60);

      if (isUniqueCardValue(initialCards, newValue)) {
        initialCards.push(
          {
            value: newValue,
            isHidden: false,
            id: initialCards.length,
            guessed: false,
          },
          {
            value: newValue,
            isHidden: false,
            id: initialCards.length + 1,
            guessed: false,
          }
        );
      }
    }
    return initialCards.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    initGame();
  }, []);

  return cardsData ? (
    <div className="game wrapper">
      <h1 className="game__heading">Mahjong</h1>
      <div className="game__cards">
        {cardsData.map((card) => (
          <GameCard
            key={card.id}
            card={card}
            isHidden={card.isHidden}
            cardsData={cardsData}
            setCardsData={setCardsData}
            id={card.id}
          />
        ))}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
