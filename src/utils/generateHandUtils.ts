import { type Manzu, manzu, type Pinzu, pinzu, type Sozu, sozu } from '../composables/PaiStr.type';

export const generateRandomMountain = (suit: 'm' | 'p' | 's', range: '1-9' | '2-8' | '3-7') => {
  switch (suit) {
    case 'm':
      return shuffle(filterRange<Manzu[]>(manzu, range));
    case 'p':
      return shuffle(filterRange<Pinzu[]>(pinzu, range));
    case 's':
      return shuffle(filterRange<Sozu[]>(sozu, range));
  }
};
export const shuffle = (array: readonly Manzu[] | Pinzu[] | Sozu[]) => {
  // Fisher-Yates shuffle
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = result[i];
    result[i] = result[j];
    result[j] = tmp;
  }
  return result;
};
export const filterRange = <T extends Manzu[] | Pinzu[] | Sozu[]>(
  paiList: T,
  range: '1-9' | '2-8' | '3-7'
): T => {
  switch (range) {
    case '1-9':
      return paiList;
    case '2-8':
      return paiList.filter(
        (v) => v !== '1m' && v !== '9m' && v !== '1p' && v !== '9p' && v !== '1s' && v !== '9s'
      ) as T;
    case '3-7':
      return paiList.filter(
        (v) => v !== '1m' &&
          v !== '2m' &&
          v !== '9m' &&
          v !== '1p' &&
          v !== '2p' &&
          v !== '9p' &&
          v !== '1s' &&
          v !== '2s' &&
          v !== '9s'
      ) as T;
  }
};
