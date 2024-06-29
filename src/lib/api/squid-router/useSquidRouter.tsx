// Import Squid SDK
import { useEthersSigner } from '@hooks/web3/useEthersSigner'
import { ethers } from 'ethers' // Import ethers library
import { erc20Abi } from 'viem'

import useSquidSDK from './squid-init'

// Retrieve environment variables
const integratorId: string = process.env.INTEGRATOR_ID!

// Define chain and token addresses
const fromChainId = '56' // BNB chain ID
const toChainId = '42161' // Arbitrum chain ID
const _fromToken = '0x55d398326f99059fF775485246999027B3197955' // USDT token address on BNB
const toToken = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831' // USDC token address on Arbitrum

// Define the amount to be sent (in smallest unit, e.g., wei for Ethereum)
const amount = '1000000000000000'

// Set up JSON RPC provider and signer using the private key and RPC URL

// Function to approve the transactionRequest.target to spend fromAmount of fromToken
const approveSpending = async (
  transactionRequestTarget: string,
  fromToken: string,
  fromAmount: string,
  signer: any,
) => {
  const tokenContract = new ethers.Contract(fromToken, erc20Abi, signer)
  try {
    const tx = await tokenContract.approve(transactionRequestTarget, fromAmount)
    await tx.wait()
    console.log(`Approved ${fromAmount} tokens for ${transactionRequestTarget}`)
  } catch (error) {
    console.error('Approval failed:', error)
    throw error
  }
}

export const useCrossChainSwap = () => {
  const signer = useEthersSigner()
  // Main function
  // Initialize Squid SDK
  const { squid, loading } = useSquidSDK()

  // Set up parameters for swapping tokens
  const parameters = {
    fromAddress: signer?.address,
    fromChain: fromChainId,
    fromToken: _fromToken,
    fromAmount: amount,
    toChain: toChainId,
    toToken,
    toAddress: signer?.address,
    enableBoost: true,
  }

  console.log('Parameters:', parameters) // Printing the parameters for QA

  // Get the swap route using Squid SDK
  const swapTokens = async () => {
    try {
      if (loading || !squid) return

      const { route, requestId } = await squid.getRoute(parameters)
      console.log('Calculated route:', route.estimate.toAmount)

      const { transactionRequest } = route

      // Approve the transactionRequest.target to spend fromAmount of fromToken
      await approveSpending(transactionRequest?.target, _fromToken, amount, signer)

      if (isPending) return

      // Execute the swap transaction
      const tx = (await squid.executeRoute({
        signer,
        route,
      })) as unknown as any
      const txReceipt = await tx.wait()

      // Show the transaction receipt with Axelarscan link
      const axelarScanLink = `https://axelarscan.io/gmp/${txReceipt.transactionHash}`
      console.log(`Finished! Check Axelarscan for details: ${axelarScanLink}`)

      // Wait a few seconds before checking the status
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // Parameters for checking the status of the transaction
      const getStatusParameters = {
        transactionId: txReceipt.transactionHash,
        requestId,
        integratorId,
        fromChainId,
        toChainId,
      }

      const completedStatuses = new Set([
        'success',
        'partial_success',
        'needs_gas',
        'not_found',
      ])
      const maxRetries = 10 // Maximum number of retries for status check
      let retryCount = 0
      let status = await squid.getStatus(getStatusParameters)

      // Loop to check the transaction status until it is completed or max retries are reached
      console.log(`Initial route status: ${status.squidTransactionStatus}`)

      do {
        try {
          // Wait a few seconds before checking the status
          await new Promise((resolve) => setTimeout(resolve, 5000))

          // Retrieve the transaction's route status
          status = await squid.getStatus(getStatusParameters)

          // Display the route status
          console.log(`Route status: ${status.squidTransactionStatus}`)
        } catch (error: unknown) {
          // Handle error if the transaction status is not found
          if (
            error instanceof Error &&
            (error as any).response &&
            (error as any).response.status === 404
          ) {
            retryCount++
            if (retryCount >= maxRetries) {
              console.error('Max retries reached. Transaction not found.')
              break
            }
            console.log('Transaction not found. Retrying...')
            continue
          } else {
            throw error
          }
        }
      } while (status && !completedStatuses.has(status.squidTransactionStatus))

      // Wait for the transaction to be mined
      console.log('Swap transaction executed:', txReceipt.transactionHash)
    } catch (error) {
      console.error(error)
    }
  }

  return { swapTokens }
}
