import { useGetMessageToSign } from '@api/maat-finance/refferal-system/useGetMessageToSign'
import { useRegister } from '@api/maat-finance/refferal-system/useRegister'
import { Button } from '@components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@components/ui/input-otp'
import { Loader } from '@components/ui/loader'
import { wagmiAdapter } from '@configs/wagmi'
import { useCheckRegistration } from '@hooks/useCheckRegistration'
import { useLocalReferralCodes } from '@hooks/useLocalReferralCodes'
import { useLocalSignature } from '@hooks/useLocalSignature'
import { useTheme } from '@modules/theme/ThemeProvider'
import { useAppKit } from '@reown/appkit/react'
import { ROUTES } from '@routes/routes'
import { signMessage } from '@wagmi/core'
import { AxiosError } from 'axios'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAccount } from 'wagmi'

import OtpVideoDark from './assets/otp-preview-dark.mp4'
import OtpVideoLight from './assets/otp-preview-light.mp4'

export const VALID_OTP_HASH =
  'eaf89db7108470dc3f6b23ea90618264b3e8f8b6145371667c4055e9c5ce9f52'

export const Otp = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { isConnected, address } = useAccount()
  const { isLoading: isLoadingCheckRegistration } = useCheckRegistration()
  const { saveSignature, signature } = useLocalSignature()

  const { setReferralCodes } = useLocalReferralCodes()

  const { messageToSign, isLoading: isLoadingMessageToSign } = useGetMessageToSign()

  const { open: openConnectModal } = useAppKit()

  const { mutate: register, isPending: isLoadingRegister } = useRegister()

  const inputOTPReference = useRef<HTMLInputElement>(null)
  const [searchParameters] = useSearchParams()
  const [otp, setOtp] = useState(() => {
    const refcode = searchParameters.get('refcode')
    return refcode || ''
  })
  const [error, setError] = useState('')
  const onChange = (value: string) => {
    setError('')
    setOtp(value)
  }
  const onSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      if (!address || !signature) {
        throw new Error('Address or signature is required')
      }

      e.preventDefault()
      register(
        {
          address,
          parent_referral_code: otp,
          signature,
        },
        {
          onSuccess: (data) => {
            setReferralCodes(data?.data?.referral_codes)
            navigate(ROUTES.DEPOSIT)
          },
          onError: (err: Error) => {
            if (err instanceof AxiosError) {
              return setError(err.response?.data?.detail || 'Invalid OTP')
            }

            setError('Something went wrong')
          },
        },
      )
    },
    [address, navigate, otp, register, signature, setReferralCodes],
  )

  // const onReset = () => {
  //   setError('')
  //   setOtp('')
  //   inputOTPReference.current?.focus()
  // }

  const connectWalletRender = useMemo(
    () => (
      <div className="mt-8 flex w-[25rem] flex-col items-center justify-center gap-8 text-lg">
        <p>Please connect your wallet to continue</p>
        <Button onClick={() => openConnectModal()}>Connect Wallet</Button>
      </div>
    ),
    [openConnectModal],
  )

  const messageToSignRender = useMemo(() => {
    const signMessageByWallet = async () => {
      if (!messageToSign) return

      const newSignature = await signMessage(wagmiAdapter.wagmiConfig, {
        message: messageToSign,
      })

      saveSignature(newSignature)
    }

    return (
      <div className="mt-8 flex w-[25rem] flex-col items-center justify-center gap-8 text-lg">
        <p>Please sign the message to continue</p>
        <Button
          loading={isLoadingMessageToSign || isLoadingRegister}
          className="lg:w-full"
          onClick={() => signMessageByWallet()}
        >
          Sign Message
        </Button>
      </div>
    )
  }, [messageToSign, isLoadingMessageToSign, saveSignature, isLoadingRegister])

  const otpCodeRender = useMemo(
    () => (
      <>
        <p className="mt-6 w-[18.125rem] text-center text-lg text-text-50 max-lg:mt-4 max-lg:w-[16.0625rem] max-lg:text-base">
          gm ser, enter your invite code to get a taste of omnichain yields.
        </p>
        <form onSubmit={onSubmit} className="flex w-full flex-col items-center">
          <div className="relative max-lg:w-full">
            <InputOTP
              ref={inputOTPReference}
              containerClassName="my-10 max-lg:mt-6 max-lg:mb-8"
              maxLength={6}
              onChange={onChange}
              value={otp}
              inputMode="text"
              type="text"
              pattern="[0-9,A-Z,a-z]*"
            >
              <InputOTPGroup className="capitalize" isError={!!error}>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {error && (
              <p className="absolute bottom-3 w-full text-center text-base text-red-100">
                {error}
              </p>
            )}
          </div>
          <Button
            variant="default"
            size="lg"
            type="submit"
            className="w-full"
            disabled={otp.length !== 6}
            loading={isLoadingRegister}
          >
            {error ? 'try again' : otp.length === 6 ? 'Submit' : 'Enter the code'}
          </Button>
        </form>
      </>
    ),
    [error, onSubmit, otp, isLoadingRegister],
  )

  const render = useMemo(() => {
    if (!isConnected) return connectWalletRender
    if (!signature) return messageToSignRender
    return otpCodeRender
  }, [connectWalletRender, isConnected, signature, messageToSignRender, otpCodeRender])

  return (
    <div className="pointer-events-none fixed inset-0 flex h-screen w-screen items-center justify-center max-lg:px-4">
      <video
        src={theme.theme === 'dark' ? OtpVideoDark : OtpVideoLight}
        autoPlay
        loop
        muted
        className="absolute inset-0 size-full object-cover blur-[5px]"
      />
      <div className="pointer-events-auto relative z-[2] flex w-max flex-col items-center rounded-[2rem] bg-cards px-6 py-8 [box-shadow:0px_3px_1px_0px_rgba(135,_99,_243,_0.12)] max-lg:w-full max-lg:px-4 max-lg:py-6">
        <h1 className="text-2.5xl font-bold capitalize max-lg:text-2xl/[1.8rem]">
          Early Access
        </h1>
        {isLoadingCheckRegistration ? (
          <div className="w-[30rem] px-20 py-10">
            <Loader className="inset-0 w-80" />
          </div>
        ) : (
          render
        )}
      </div>
    </div>
  )
}
