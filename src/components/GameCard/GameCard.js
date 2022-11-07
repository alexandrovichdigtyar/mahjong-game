import { useEffect } from "react";
import "./GameCard.scss";

const GameCard = ({ checkIsVisible, card, getActiveCards, onCardClick }) => {
  const {id, isHidden } = card;

  const updateCards = () => {
    const activeCards = getActiveCards();

    checkIsVisible(activeCards, card);
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
      onClick={!card.guessed ? () => onCardClick(id, isHidden) : () => console.log("guessed")}
    >
      {!isHidden && card.value}
    </div>
  );
};

export default GameCard;
