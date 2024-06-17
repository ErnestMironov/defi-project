export function shortenString(parsed: string, chars = 4): string {
  if (parsed.length > 24) {
    return `${parsed.slice(0, Math.max(0, chars))}...${parsed.slice(
      Math.max(0, parsed.length - chars),
    )}`
  }

  return parsed
}
