import { GameCardType } from "./types";

const getPrimeNums = (minNum: number, maxNum: number) => {
  const primeNumsList: number[] = [];

  for (let i = minNum; i < maxNum; i++) {
    isPrimeNum(i) && primeNumsList.push(i);
  }

  return primeNumsList;
};

const isPrimeNum = (currentNum: number) => {
  let isPrime: boolean = true;

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
  const primeNums: number[] = getPrimeNums(2, 55);
  const gameCards: GameCardType[] = getGameCards(primeNums);

  return gameCards.sort(() => Math.random() - 0.5);
};

const getGameCards = (primeNums: number[]) => {
  const initialCards: GameCardType[] = [];

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
