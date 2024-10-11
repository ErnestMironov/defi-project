import readline from 'node:readline'

export const promptConfirm = async (message: string) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.question(`${message} (Y/n)`, function (a) {
      const input = a.trim().toLowerCase()
      const confirmed = input === '' || input === 'y'
      resolve(confirmed)
      rl.close()
    })
  })
}
