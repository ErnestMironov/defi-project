import { randomOkAnalogs } from '@constants/phrases'

export function getRandomOkAnalog() {
  return randomOkAnalogs[Math.floor(Math.random() * randomOkAnalogs.length)]
}
