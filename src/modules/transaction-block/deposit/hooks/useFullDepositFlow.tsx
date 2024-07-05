import { useCrossChainSwap } from '@api/squid-router/useCrossChainSwap'
import { useGetSquidSwapRoute } from '@api/squid-router/useGetSquidSwapRoute'
import useSquidSDK from '@api/squid-router/useSquidSdk'
import { Button } from '@components/ui/button'
import { ARB_GATEWAY } from '@constants/contract-address'
import { useTokenAsset } from '@hooks/useTokenAsset'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { useEffect, useMemo, useReducer } from 'react'
import type { Address } from 'viem'
import { parseEther } from 'viem'
import { useSwitchChain } from 'wagmi'

import { useApproveDepositTransaction } from './useApproveDepositTransaction'
import { useDepositTransaction } from './useDepositTransaction'

type StepType = 'approve1' | 'swap' | 'approve2' | 'deposit' | 'switchToArbitrum'

type StepActionsType = StepType | 'setCurrentStep'

interface IStepsState {
  currentStep: StepType
  approve1: {
    isPending: boolean
    isSuccess: boolean
    error: string
  }
  swap: {
    isPending: boolean
    isSuccess: boolean
    error: string
  }
  switchToArbitrum: {
    isPending: boolean
    isSuccess: boolean
    error: string
  }
  approve2: {
    isPending: boolean
    isSuccess: boolean
    error: string
  }
  deposit: {
    isPending: boolean
    isSuccess: boolean
    error: string
  }
}

const initialState: IStepsState = {
  currentStep: 'approve1',
  approve1: {
    isPending: false,
    isSuccess: false,
    error: '',
  },
  swap: {
    isPending: false,
    isSuccess: false,
    error: '',
  },
  switchToArbitrum: {
    isPending: false,
    isSuccess: false,
    error: '',
  },
  approve2: {
    isPending: false,
    isSuccess: false,
    error: '',
  },
  deposit: {
    isPending: false,
    isSuccess: false,
    error: '',
  },
}

type IStepsAction = {
  type: StepActionsType
  isPending?: boolean
  isSuccess?: boolean
  error?: string
  currentStep?: StepType
}

export const useFullDepositFlow = () => {
  const { switchChain } = useSwitchChain()

  // dispatch to store object with objects
  const [stepsState, dispatch] = useReducer(
    (state: IStepsState, action: IStepsAction) => {
      switch (action.type) {
        case 'approve1':
        case 'swap':
        case 'switchToArbitrum':
        case 'approve2':
        case 'deposit': {
          return {
            ...state,
            [action.type]: {
              ...state[action.type],
              isPending: action.isPending ?? state[action.type].isPending,
              isSuccess: action.isSuccess ?? state[action.type].isSuccess,
              error: action.error ?? state[action.type].error,
            },
          }
        }
        case 'setCurrentStep': {
          return {
            ...state,
            currentStep: action.currentStep ?? state.currentStep,
          }
        }
        default: {
          throw new Error('unknown action type')
        }
      }
    },
    initialState,
  )

  const { squid } = useSquidSDK()

  const {
    depositAsset: asset,
    depositNetwork: chain,
    vault,
    inputValue: amount,
    inputValueInUSD,
  } = useTxStore()

  const chainData = useTokenAsset(chain)

  const vaultAddress = useMemo(() => {
    const depositTokenAsset = squid?.tokens.find(
      (token) => token.symbol?.toLowerCase() === vault.toLowerCase(),
    )
    return depositTokenAsset?.address!
  }, [squid?.tokens, vault])

  const { route, requestId } = useGetSquidSwapRoute({
    fromAmount: parseEther(amount).toString(),
    fromChain: String(chainData?.chainId),
    fromToken: asset?.contract_address!,
    toChain: '42161',
    toToken: vaultAddress,
    enableBoost: true,
  })

  /*
   * 1. Approve tokens for swap
   */
  const { approve: _approve, status: approveStatus } = useApproveDepositTransaction({
    tokenAddress: asset?.contract_address! as Address,
    approveValue: parseEther(amount).toString(),
    transactionRequestTarget: route?.transactionRequest?.target!,
  })

  const approve = async () => {
    try {
      dispatch({
        type: 'approve1',
        isPending: true,
        isSuccess: false,
        error: '',
      })

      checkChain(_approve)
    } catch (error: any) {
      dispatch({
        type: 'approve1',
        isPending: false,
        isSuccess: false,
        error: error.message,
      })
    }
  }

  /*
   * 2. Swap tokens
   */

  const { swapTokens, swapStatus } = useCrossChainSwap({
    route,
    requestId,
  })

  const swap = () => {
    dispatch({
      type: 'swap',
      isPending: true,
      isSuccess: false,
      error: '',
    })

    checkChain(swapTokens)
  }

  /*
   * 3. Switch to Arbitrum
   */

  const switchToArbitrum = () => {
    switchChain(
      {
        chainId: 42_161,
      },
      {
        onSuccess: () => {
          dispatch({
            type: 'switchToArbitrum',
            isPending: false,
            isSuccess: true,
            error: '',
          })
          dispatch({
            type: 'setCurrentStep',
            currentStep: 'approve2',
          })
        },
        onError: (error) => {
          dispatch({
            type: 'switchToArbitrum',
            isPending: false,
            isSuccess: false,
            error: error.message,
          })
        },
      },
    )
  }

  /*
   * 4. Approve tokens for deposit
   */

  const approveValue = Number.isNaN(inputValueInUSD)
    ? '10'
    : (+inputValueInUSD * 10 ** 6).toString()
  const { approve: _approveDeposit, status: approveDepositStatus } =
    useApproveDepositTransaction({
      tokenAddress: vaultAddress as Address,
      approveValue,
      transactionRequestTarget: ARB_GATEWAY,
    })

  const approveDeposit = async () => {
    try {
      dispatch({
        type: 'approve2',
        isPending: true,
        isSuccess: false,
        error: '',
      })

      _approveDeposit()
    } catch (error: any) {
      dispatch({
        type: 'approve2',
        isPending: false,
        isSuccess: false,
        error: error.message,
      })
    }
  }

  /*
   * 5. Deposit tokens
   */

  const { deposit: _deposit, status: depositStatus } = useDepositTransaction()
  const deposit = () => {
    dispatch({
      type: 'deposit',
      isPending: true,
      isSuccess: false,
      error: '',
    })

    _deposit()
  }

  const checkChain = (function_: () => void) => {
    switchChain(
      {
        chainId: chainData?.chainId ?? 42_161,
      },
      {
        onSuccess: function_,
      },
    )
  }

  useEffect(() => {
    if (approveStatus === 'success') {
      dispatch({
        type: 'approve1',
        isPending: false,
        isSuccess: true,
        error: '',
      })
      dispatch({
        type: 'setCurrentStep',
        currentStep: 'swap',
      })
    }

    if (swapStatus === 'success') {
      dispatch({
        type: 'swap',
        isPending: false,
        isSuccess: true,
        error: '',
      })
      dispatch({
        type: 'setCurrentStep',
        currentStep: 'switchToArbitrum',
      })
    }

    if (approveDepositStatus === 'success') {
      dispatch({
        type: 'approve2',
        isPending: false,
        isSuccess: true,
        error: '',
      })
      dispatch({
        type: 'setCurrentStep',
        currentStep: 'deposit',
      })
    }

    if (depositStatus === 'success') {
      dispatch({
        type: 'deposit',
        isPending: false,
        isSuccess: true,
        error: '',
      })
      dispatch({
        type: 'setCurrentStep',
        currentStep: 'approve2',
      })
    }
  }, [approveDepositStatus, approveStatus, depositStatus, swapStatus])

  function resetStore() {
    dispatch({
      type: 'approve1',
      isPending: false,
      isSuccess: false,
      error: '',
    })
    dispatch({
      type: 'swap',
      isPending: false,
      isSuccess: false,
      error: '',
    })
    dispatch({
      type: 'switchToArbitrum',
      isPending: false,
      isSuccess: false,
      error: '',
    })
    dispatch({
      type: 'approve2',
      isPending: false,
      isSuccess: false,
      error: '',
    })
    dispatch({
      type: 'deposit',
      isPending: false,
      isSuccess: false,
      error: '',
    })
    dispatch({
      type: 'setCurrentStep',
      currentStep: 'approve1',
    })
  }

  const ActionButton = () => {
    switch (stepsState.currentStep) {
      case 'approve1': {
        return (
          <Button size="lg" type="button" onClick={approve}>
            Approve
          </Button>
        )
      }
      case 'swap': {
        return (
          <Button size="lg" type="button" onClick={swap}>
            Swap
          </Button>
        )
      }
      case 'switchToArbitrum': {
        return (
          <Button size="lg" type="button" onClick={switchToArbitrum}>
            Switch to Arbitrum
          </Button>
        )
      }
      case 'approve2': {
        return (
          <Button size="lg" type="button" onClick={approveDeposit}>
            Approve
          </Button>
        )
      }
      case 'deposit': {
        return (
          <Button size="lg" type="button" onClick={deposit}>
            Deposit
          </Button>
        )
      }
      default: {
        throw new Error('unknown action type')
      }
    }
  }

  return {
    stepsState,
    ActionButton,
    dispatch,
    resetStore,
  }
}
