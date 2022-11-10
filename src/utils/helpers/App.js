const getPrimeNums = (minNum, maxNum) => {
  const primeNumsList = [];

  for (let i = minNum; i < maxNum; i++) {
    isPrimeNum(i) && primeNumsList.push(i);
  }

  return primeNumsList;
};

const isPrimeNum = (currentNum) => {
  let isPrime = true;

  if (currentNum <= 1) {
    return false;
  }

  for (let i = 2; i < currentNum; i++) {
    if (currentNum % i === 0) {
      isPrime = false;
    }
  }

  return isPrime;
};

export const getRandomCards = () => {
  const primeNums = getPrimeNums(2, 55);
  const gameCards = getGameCards(primeNums);

  return gameCards.sort(() => Math.random() - 0.5);
};

const getGameCards = (primeNums) => {
  const initialCards = [];

  primeNums.forEach((num) => {
    initialCards.push(
      {
        value: num,
        isHidden: false,
        id: initialCards.length,
        guessed: false,
      },
      {
        value: num,
        isHidden: false,
        id: initialCards.length + 1,
        guessed: false,
      }
    );
  });

  return initialCards;
};
