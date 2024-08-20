import { ChainType, SquidCallType } from '@0xsquid/squid-types'
import { tokenVaultAbi } from '@constants/abi/token-vault'
import type { Token } from '@uniswap/sdk-core'
import { ethers, Interface } from 'ethers'
import { erc20Abi } from 'viem'

import { TOKEN_VAULT_ADDRESSES } from './constants'
import { getTokenIdentifier } from './utils/identifyToken'

// ====== Approves ======

function getEncodedApproveToVault(vaultAddr: string): string {
  const erc20Interface = new Interface(erc20Abi)
  return erc20Interface.encodeFunctionData('approve', [vaultAddr, ethers.MaxUint256])
}

function getDepositEncodedData(receiver: string): string {
  const vaultInterface = new Interface(tokenVaultAbi)
  return vaultInterface.encodeFunctionData('deposit', [
    '0', // Placeholder for dynamic balance
    receiver,
  ])
}

// Set up parameters for swapping tokens
export async function getDepositPostHook(depositToken: Token, user: string) {
  const tokenId = getTokenIdentifier(depositToken)

  const vaultAddr: string = TOKEN_VAULT_ADDRESSES[tokenId]

  // Set up parameters for swapping tokens and depositing into Radiant lending pool
  return {
    chainType: ChainType.EVM,
    // fundAmount: amount,  //only required for prehooks
    // fundToken: depositToken, //only required for prehooks
    calls: [
      {
        callType: 1,
        target: depositToken.address,
        value: '0', // this will be replaced by the full native balance of the multicall after the swap
        callData: getEncodedApproveToVault(vaultAddr),
        payload: {
          tokenAddress: depositToken.address, // unused in callType 2, dummy value
          inputPos: 1, // unused
        },
        estimatedGas: '70000',
        chainType: ChainType.EVM,
      },
      {
        callType: SquidCallType.FULL_TOKEN_BALANCE, // SquidCallType.FULL_TOKEN_BALANCE
        target: vaultAddr,
        value: '0',
        callData: getDepositEncodedData(user),
        payload: {
          tokenAddress: depositToken.address,
          inputPos: 0,
        },
        estimatedGas: '150000',
        chainType: ChainType.EVM,
      },
    ],
    provider: 'MAAT Finance', // This should be the name of your product or application that is triggering the hook
    description: 'MAAT - ZAP - Deposit',
    logoURI:
      'https://pbs.twimg.com/profile_images/1548647667135291394/W2WOtKUq_400x400.jpg', // Add your product or application's logo here
  }
}

// const usdcArbitrumAddress: string =
// 	"0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
// const dstEid = 30184;

// getPostHookForCrossChainSwapAndDeposit(
// 	new Token(42161, usdcArbitrumAddress, 6),
// 	"0x0000000000000000000000000000000000000000",
// 	dstEid,
// 	getArbitrumProvider()
// )
// 	.then(() => process.exit(0))
// 	.catch((err) => {
// 		console.error(err);
// 		process.exit(1);
// 	});
