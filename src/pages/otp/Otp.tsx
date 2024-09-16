import { Button } from '@components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@components/ui/input-otp'
import { useTheme } from '@modules/theme/ThemeProvider'
import { ROUTES } from '@routes/routes'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import OtpVideoDark from './assets/otp-preview-dark.mp4'
import OtpVideoLight from './assets/otp-preview-light.mp4'

export const VALID_OTP_HASH =
  'eaf89db7108470dc3f6b23ea90618264b3e8f8b6145371667c4055e9c5ce9f52'

export const Otp = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const inputOTPReference = useRef<HTMLInputElement>(null)
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const onChange = (value: string) => {
    setError('')
    setOtp(value)
  }
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (error) {
      onReset()
      return
    }
    const encoder = new TextEncoder()
    const data = encoder.encode(otp)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

    if (hashHex === VALID_OTP_HASH) {
      window.localStorage.setItem('otp', hashHex)
      navigate(ROUTES.DEPOSIT)
    } else {
      setError('Invalid code')
    }
  }
  const onReset = () => {
    setError('')
    setOtp('')
    inputOTPReference.current?.focus()
  }
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
        <p className="mt-6 w-[18.125rem] text-center text-lg text-text-50 max-lg:mt-4 max-lg:w-[16.0625rem] max-lg:text-base">
          gm ser, enter your invite code to get a taste of omnichain yields.
        </p>
        <form onSubmit={onSubmit} className="flex w-full flex-col items-center">
          <div className="relative">
            <InputOTP
              ref={inputOTPReference}
              containerClassName="my-10 max-lg:mt-6 max-lg:mb-12"
              maxLength={6}
              onChange={onChange}
              value={otp}
            >
              <InputOTPGroup isError={!!error}>
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
          >
            {error ? 'try again' : otp.length === 6 ? 'Submit' : 'Enter the code'}
          </Button>
        </form>
      </div>
    </div>
  )
}
