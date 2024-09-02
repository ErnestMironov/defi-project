export const getDotStyles = (color: '#6160FF' | '#A6C1FF' | string) => {
  switch (color) {
    case '#6160FF': {
      return `[&_circle]:fill-[#6160FF]`
    }
    case '#A6C1FF': {
      return `[&_circle]:fill-[#A6C1FF]`
    }
    default: {
      return `[&_circle]:fill-[#6160FF]`
    }
  }
}
