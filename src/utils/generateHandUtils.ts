import { type Manzu, manzu, type Pinzu, pinzu, type Sozu, sozu } from '../composables/PaiStr.type'

export const generateRandomMountain = (suit: 'm' | 'p' | 's', range: '1-9' | '2-8' | '3-7') => {
  switch (suit) {
    case 'm':
      return shuffle(filterRange<Manzu[]>(manzu, range))
    case 'p':
      return shuffle(filterRange<Pinzu[]>(pinzu, range))
    case 's':
      return shuffle(filterRange<Sozu[]>(sozu, range))
  }
}
export function shuffle<T>(array: readonly T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}
export const filterRange = <T extends Manzu[] | Pinzu[] | Sozu[]>(
  paiList: T,
  range: '1-9' | '2-8' | '3-7',
): T => {
  switch (range) {
    case '1-9':
      return paiList
    case '2-8':
      return paiList.filter(
        (v) => v !== '1m' && v !== '9m' && v !== '1p' && v !== '9p' && v !== '1s' && v !== '9s',
      ) as T
    case '3-7':
      return paiList.filter(
        (v) =>
          v !== '1m' &&
          v !== '2m' &&
          v !== '8m' &&
          v !== '9m' &&
          v !== '1p' &&
          v !== '2p' &&
          v !== '8p' &&
          v !== '9p' &&
          v !== '1s' &&
          v !== '2s' &&
          v !== '8s' &&
          v !== '9s',
      ) as T
  }
}

export const randomlyNotenOrTempai = (): 'noten' | 'tempai' => {
  const random = Math.random()
  if (random < 0.5) {
    return 'noten'
  } else {
    return 'tempai'
  }
}
