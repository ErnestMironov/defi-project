export const getDotStyles = (color: '#79DEC2' | '#6160FF' | string) => {
  switch (color) {
    case '#79DEC2': {
      return `[&_circle]:fill-[#79DEC2]`
    }
    case '#6160FF': {
      return `[&_circle]:fill-[#6160FF]`
    }
    default: {
      return `[&_circle]:fill-[#6160FF]`
    }
  }
}
