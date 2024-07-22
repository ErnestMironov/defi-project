import { ChainType, SquidCallType } from '@0xsquid/squid-types'
import { gatewayAbi } from '@constants/abi/gateway'
import { tokenVaultAbi } from '@constants/abi/token-vault'
import { wethAbi } from '@constants/abi/weth'
import { Options } from '@layerzerolabs/lz-v2-utilities'
import type { Token } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'
import type { Provider } from 'ethers'
import { Contract, ethers, Interface } from 'ethers'
import { erc20Abi } from 'viem'

import {
  ARBITRUM_EID,
  GATEWAY_ADDRESS,
  SWAP_ROUTER_ADDRESS,
  TOKEN_VAULT_ADDRESSES,
  USDC_TOKEN,
  USDT_TOKEN,
  WETH_TOKEN,
} from './constants'
import { swapExactOutputSingle } from './swap'

// ====== Approves ======

function getEncodedApproveToGateway(): string {
  const erc20Interface = new Interface(erc20Abi)
  return erc20Interface.encodeFunctionData('approve', [
    GATEWAY_ADDRESS,
    ethers.MaxUint256,
  ])
}

function getEncodedApproveToSwapRouter(): string {
  const erc20Interface = new Interface(erc20Abi)

  return erc20Interface.encodeFunctionData('approve', [
    SWAP_ROUTER_ADDRESS,
    ethers.MaxUint256,
  ])
}

function getDepositEncodedData(
  depositToken: string,
  dstEid: number,
  receiver: string,
): string {
  const gatewayInterface = new Interface(gatewayAbi)
  return gatewayInterface.encodeFunctionData('deposit', [
    depositToken,
    '0', // Placeholder for dynamic balance
    receiver,
    dstEid,
  ])
}
// Create contract interface and encode deposit function for Radiant lending pool

function getEncodedUnwrapData(): string {
  const wethInterface = new Interface(wethAbi)
  return wethInterface.encodeFunctionData('withdraw', [0])
}

async function quoteOftSend(
  tokenVaultAddr: string,
  dstEid: number,
  receiver: string,
  provider: Provider,
) {
  const tokenVault = new Contract(tokenVaultAddr, tokenVaultAbi, provider)
  const extraOptions = Options.newOptions().addExecutorLzReceiveOption('250000', '0')

  const parameters = [
    dstEid,
    ethers.zeroPadBytes(receiver, 32),
    BigInt(10_000_000),
    BigInt(10_000_000),
    extraOptions.toBytes(),
    '0x',
    '0x',
  ]

  const result = await tokenVault.quoteSend(parameters, false)
  return result[0] as bigint
}

export async function getPostHookForCrossChainSwapAndDeposit(
  depositToken: Token,
  user: string,
  dstEid: number,
  arbitrumProvider: Provider,
) {
  if (
    depositToken.address !== USDC_TOKEN.address &&
    depositToken.address !== USDT_TOKEN.address
  ) {
    throw new Error(
      `Unsupported deposit token: ${depositToken}, only USDC/USDT on Arbitrum supported`,
    )
  }

  if (dstEid === ARBITRUM_EID)
    throw new Error(
      "This hook contractor doesn't support sending representation to Arbitrum",
    )

  const nativeFee = await quoteOftSend(
    TOKEN_VAULT_ADDRESSES[depositToken.address],
    dstEid,
    user,
    arbitrumProvider,
  )

  // Set up parameters for swapping tokens and depositing into Radiant lending pool
  return {
    chainType: ChainType.EVM,
    // fundAmount: amount,  //only required for prehooks
    // fundToken: depositToken, //only required for prehooks
    calls: [
      {
        callType: SquidCallType.FULL_TOKEN_BALANCE,
        target: depositToken.address,
        value: '0', // this will be replaced by the full native balance of the multicall after the swap
        callData: getEncodedApproveToSwapRouter(),
        payload: {
          tokenAddress: depositToken.address, // unused in callType 2, dummy value
          inputPos: 1, // unused
        },
        estimatedGas: '50000',
        chainType: ChainType.EVM,
      },
      {
        callType: SquidCallType.DEFAULT,
        target: SWAP_ROUTER_ADDRESS,
        value: '0',
        callData: await swapExactOutputSingle(
          depositToken,
          WETH_TOKEN,
          nativeFee,
          FeeAmount.LOW,
          arbitrumProvider,
        ),
        payload: {
          tokenAddress: depositToken.address, // Must be unused
          inputPos: 0, // Must be unused
        },
        estimatedGas: '200000',
        chainType: ChainType.EVM,
      },
      {
        callType: SquidCallType.FULL_TOKEN_BALANCE,
        target: WETH_TOKEN.address,
        value: '0',
        callData: getEncodedUnwrapData(),
        payload: {
          tokenAddress: WETH_TOKEN.address,
          inputPos: 0,
        },
        estimatedGas: '150000',
        chainType: ChainType.EVM,
      },
      {
        callType: 1,
        target: depositToken.address,
        value: '0', // this will be replaced by the full native balance of the multicall after the swap
        callData: getEncodedApproveToGateway(),
        payload: {
          tokenAddress: depositToken.address, // unused in callType 2, dummy value
          inputPos: 1, // unused
        },
        estimatedGas: '50000',
        chainType: ChainType.EVM,
      },
      {
        callType: SquidCallType.FULL_TOKEN_BALANCE, // SquidCallType.FULL_TOKEN_BALANCE
        target: GATEWAY_ADDRESS,
        value: nativeFee.toString(),
        callData: getDepositEncodedData(depositToken.address, dstEid, user),
        payload: {
          tokenAddress: depositToken.address,
          inputPos: 1,
        },
        estimatedGas: '50000',
        chainType: ChainType.EVM,
      },
    ],
    provider: 'Integration Test', // This should be the name of your product or application that is triggering the hook
    description: 'Radiant Lend postHook',
    logoURI:
      'https://pbs.twimg.com/profile_images/1548647667135291394/W2WOtKUq_400x400.jpg', // Add your product or application's logo here
  }
}

// Set up parameters for swapping tokens
export async function getPostHookForOneChainSwapAndDeposit(
  depositToken: Token,
  user: string,
) {
  if (
    depositToken.address !== USDC_TOKEN.address &&
    depositToken.address !== USDT_TOKEN.address
  ) {
    throw new Error(
      `Unsupported deposit token: ${depositToken}, only USDC/USDT on Arbitrum supported`,
    )
  }

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
        callData: getEncodedApproveToGateway(),
        payload: {
          tokenAddress: depositToken.address, // unused in callType 2, dummy value
          inputPos: 1, // unused
        },
        estimatedGas: '70000',
        chainType: ChainType.EVM,
      },
      {
        callType: SquidCallType.FULL_TOKEN_BALANCE, // SquidCallType.FULL_TOKEN_BALANCE
        target: GATEWAY_ADDRESS,
        value: '0',
        callData: getDepositEncodedData(depositToken.address, ARBITRUM_EID, user),
        payload: {
          tokenAddress: depositToken.address,
          inputPos: 1,
        },
        estimatedGas: '70000',
        chainType: ChainType.EVM,
      },
    ],
    provider: 'Integration Test', // This should be the name of your product or application that is triggering the hook
    description: 'Radiant Lend postHook',
    logoURI:
      'https://pbs.twimg.com/profile_images/1548647667135291394/W2WOtKUq_400x400.jpg', // Add your product or application's logo here
  }
}
