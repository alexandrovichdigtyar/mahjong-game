import { useEffect } from "react";
import "./GameCard.scss";

const GameCard = ({ isHidden, cardsData, setCardsData, id, card }) => {
  const onCardClick = () => {
    setCardsData(
      cardsData.map((item) =>
        item.id === id ? { ...item, isHidden: !isHidden } : item
      )
    );
  };

  const getActiveCards = () => {
    return cardsData.filter(
      (card) => card.isHidden === false && card.guessed === false
    );
  };

  const checkIsVisible = (visibleCards) => {
    if (visibleCards.length === 2) {
      let areIdenticalValues = true;

      visibleCards.forEach((visibleCard) => {
        if (visibleCard.value !== card.value) {
          areIdenticalValues = false;
        }
      });

      if (areIdenticalValues) {
        const newCards = cardsData.map((card) => {
          if (card.isHidden === false) {
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
          if (card.isHidden === false && card.guessed === false) {
            return { ...card, isHidden: true };
          }

          return card;
        });

        setTimeout(() => setCardsData(newCards), 500);
      }
    }
  };

  const updateCards = () => {
    const activeCards = getActiveCards();
    checkIsVisible(activeCards);
  };

  const getCardStyles = () => {
    if (card.guessed) {
      return "number-card number-card_guessed";
    }
    if (!card.isHidden) {
      return "number-card number-card_active";
    }
    return "number-card";
  };

  useEffect(() => {
    updateCards();
  }, [card]);

  return (
    <div
      className={getCardStyles()}
      onClick={!card.guessed ? onCardClick : () => console.log("guessed")}
    >
      {!isHidden && card.value}
    </div>
  );
};

export default GameCard;
