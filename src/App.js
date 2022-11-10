import { useEffect, useState } from "react";
import GameCard from "./components/GameCard/GameCard";
import { getRandomCards } from "./utils/helpers/App";
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

  const getActiveCards = () => {
    return cardsData.filter(
      (card) => !card.isHidden && !card.guessed
    );
  };

  const onCardClick = (id, isHidden) => {
    setCardsData(
      cardsData.map((item) =>
        item.id === id ? { ...item, isHidden: !isHidden } : item
      )
    );
  };

  const checkIsVisible = (visibleCards, card) => {
    if (visibleCards.length === 2) {
      let areIdenticalValues = true;

      visibleCards.forEach((visibleCard) => {
        if (visibleCard.value !== card.value) {
          areIdenticalValues = false;
        }
      });

      if (areIdenticalValues) {
        const newCards = cardsData.map((card) => {
          if (!card.isHidden) {
            return {
              ...card,
              guessed: true,
            };
          }
          return card;
        });
        setCardsData(newCards);
      }

      if (!areIdenticalValues) {
        const newCards = cardsData.map((card) => {
          if (!card.isHidden && !card.guessed) {
            return { ...card, isHidden: true };
          }

          return card;
        });

        setTimeout(() => setCardsData(newCards), 500);
      }
    }
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
            cardsData={cardsData}
            setCardsData={setCardsData}
            getActiveCards={getActiveCards}
            onCardClick={onCardClick}
            checkIsVisible={checkIsVisible}
          />
        ))}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;