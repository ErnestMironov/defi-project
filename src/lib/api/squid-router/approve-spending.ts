import { ethers } from 'ethers'
import { erc20Abi } from 'viem';
import { useWriteContract } from 'wagmi';

export const useApproveSpending = () => {
  const { data: hash, writeContract } = useWriteContract();

  const approveSpending = async (
    transactionRequestTarget: string,
    fromToken: string,
    fromAmount: string,
  ) => {
    try {
      const tx = await writeContract({
        address: `0x${fromToken}`,
        abi: erc20Abi,
        functionName: 'approve',
        args: [transactionRequestTarget, fromAmount],
      });
      console.log(`Approved ${fromAmount} tokens for ${transactionRequestTarget}`);
    } catch (error) {
      console.error('Approval failed:', error);
      throw error;
    }
  };

  return { approveSpending, hash };
};