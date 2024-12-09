import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const getDaysAgo = (date: string) => {
  const currentDate = dayjs()
  const inputDate = dayjs(date)

  const daysAgo = currentDate.diff(inputDate, 'day')

  return dayjs().subtract(daysAgo, 'day').fromNow()
}

export const getFromNow = (date: string | number, suffix = false) => {
  return dayjs(date)
    .fromNow(suffix)
    .replace('minutes', 'mins')
    .replace('seconds', 'secs')
    .replace('an hour', '1 hour')
    .replace('a day', '1 day')
    .replace('a month', '1 month')
    .replace('a year', '1 year')
}

export const getShortFromNow = (date: string | number) => {
  return dayjs(date)
    .fromNow()
    .replace('minutes', 'm')
    .replace('seconds', 's')
    .replace('hours', 'h')
    .replace('days', 'd')
    .replace('months', 'mo')
    .replace('years', 'y')
    .replace('a minute', '1m')
    .replace('an hour', '1h')
    .replace('a day', '1d')
    .replace('a month', '1mo')
    .replace('a year', '1y')
    .replace(' ago', '')
}
