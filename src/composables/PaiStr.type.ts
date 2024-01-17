export type PaiStr = Manzu | Pinzu | Sozu | Jihai
export type Manzu = `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}m`
export type Pinzu = `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}p`
export type Sozu = `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}s`
export type Jihai = `${1 | 2 | 3 | 4 | 5 | 6 | 7}z`
// prettier-ignore
export const manzu: Manzu[] = [
  '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m',
  '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m',
  '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m',
  '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m',
] as const;
// prettier-ignore
export const pinzu: Pinzu[] = [
  '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p',
  '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p',
  '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p',
  '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p',
] as const;
// prettier-ignore
export const sozu: Sozu[] = [
  '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s',
  '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s',
  '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s',
  '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s',
] as const;
