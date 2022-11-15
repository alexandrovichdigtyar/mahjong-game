import { ReactElement } from 'react';
import { useEffect, useState } from "react";
import GameCard from "./components/GameCard/GameCard";
import { getRandomCards } from "./utils/helpers/App";
import { GameCardType } from './utils/helpers/types';
import "./App.scss";

function App(): ReactElement {
  const [cardsData, setCardsData] = useState<GameCardType[]>([]);

  const initGame = () => {
    const randomCards: GameCardType[] = getRandomCards();

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

  const onCardClick = (id: number, isHidden: boolean) => {
    if (cardsData) {
      setCardsData(
        cardsData.map((item) =>
          item.id === id ? { ...item, isHidden: !isHidden } : item
        )
      );
    }
  };

  const checkIsVisible = (visibleCards: GameCardType[], card: GameCardType) => {
    if (visibleCards.length === 2) {
      let areIdenticalValues: boolean = true;

      visibleCards.forEach((visibleCard: GameCardType) => {
        if (visibleCard.value !== card.value) {
          areIdenticalValues = false;
        }
      });

      if (areIdenticalValues) {
        const newCards = cardsData?.map((card) => {
          if (!card.isHidden) {
            return {
              ...card,
              guessed: true,
            };
          }
          return card;
        });

        if (newCards) {
          setCardsData(newCards);
        }
      }

      if (!areIdenticalValues) {
        const newCards: GameCardType[] | undefined = cardsData?.map((card: GameCardType) => {
          if (!card.isHidden && !card.guessed) {
            return { ...card, isHidden: true };
          }

          return card;
        });
        if (newCards) {
          setTimeout(() => setCardsData(newCards), 500);
        }
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
