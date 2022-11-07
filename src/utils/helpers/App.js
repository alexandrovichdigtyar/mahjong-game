const getRandomNumber = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const isUniqueCardValue = (initialCards, newValue) => {
  return !initialCards.find((card) => card.value === newValue);
};

export const getRandomCards = () => {
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
