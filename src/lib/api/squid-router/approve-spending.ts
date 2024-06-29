import { erc20Abi } from 'viem'
import { useWriteContract } from 'wagmi'

export const useApproveSpending = () => {
  const { data: hash, writeContract } = useWriteContract()

  const approveSpending = async (
    transactionRequestTarget: string,
    fromToken: string,
    fromAmount: string,
  ) => {
    try {
      const tx = await writeContract({
        address: fromToken as `0x${string}`,
        abi: erc20Abi,
        functionName: 'approve',
        args: [transactionRequestTarget as `0x${string}`, BigInt(fromAmount)],
      })
      console.log(`Approved ${fromAmount} tokens for ${transactionRequestTarget}`)
    } catch (error) {
      console.error('Approval failed:', error)
      throw error
    }
  }

  return { approveSpending, hash }
}
