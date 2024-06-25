import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const getDaysAgo = (date: string) => {
  const currentDate = dayjs()
  const inputDate = dayjs(date)

  const daysAgo = currentDate.diff(inputDate, 'day')

  return dayjs().subtract(daysAgo, 'day').fromNow()
}

export const getFromNow = (date: string, suffix = false) => {
  return dayjs(date)
    .fromNow(suffix)
    .replace('minutes', 'mins')
    .replace('seconds', 'secs')
    .replace('an hour', '1 hour')
    .replace('a day', '1 day')
    .replace('a month', '1 month')
    .replace('a year', '1 year')
}
