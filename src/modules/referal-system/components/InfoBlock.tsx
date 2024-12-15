import { Button } from '@components/ui/button'
import { cn } from '@utils/cn'
import { useEffect, useState } from 'react'

interface InfoBlockProperties extends React.HTMLAttributes<HTMLDivElement> {}

export default function InfoBlock({ className, ...props }: InfoBlockProperties) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const storedVisibility = localStorage.getItem('infoBlockVisible')
    if (storedVisibility === 'false') {
      setIsVisible(false)
    }
  }, [])

  const handleHide = () => {
    setIsVisible(false)
    localStorage.setItem('infoBlockVisible', 'false')
  }
  if (!isVisible) return null

  return (
    <div
      className={cn(
        ' mt-16 rounded-lg bg-text-5 max-md:bg-transparent max-md:mt-0',
        className,
      )}
      {...props}
    >
      <div className="align-start flex justify-between self-stretch p-8  max-md:px-0 max-md:py-6">
        <p className="h-auto max-w-4xl text-[2rem] font-medium leading-[2.375rem] text-text-2100 max-md:w-full max-md:text-[1.25rem] max-md:leading-6">
          Stars are special points issued to users who actively participate in the MAAT
          Protocol. They represent your engagement level and can unlock various benefits
          within the platform.
        </p>
        <Button
          variant="secondary"
          className="h-12 w-[5.8125rem] items-center rounded-xl  border border-stroke-100 px-5 py-[1.875rem] text-[0.875rem] font-medium normal-case text-text-1100 shadow-test-2 max-md:hidden"
          onClick={handleHide}
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
