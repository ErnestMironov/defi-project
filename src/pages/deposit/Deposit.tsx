import { useMaatTokensApy } from '@api/queries/useMaatTokensApy'
import usdc from '@assets/images/usdc-3d.png'
import usdt from '@assets/images/usdt-3d.png'
import { ShadowBoxWithValue } from '@components/box/ShadowBoxWithValue'
import { Skeleton } from '@components/ui/skeleton'
import { TransactionBlock } from '@modules/transaction-block/TransactionBlock'
// import { useFBX } from '@react-three/drei'
// import { Canvas, useFrame } from '@react-three/fiber'
import dayjs from 'dayjs'
import { Widget } from 'msdk-test/dist/widget'
// import type { ReactNode } from 'react' // Import ReactNode type
import { useMemo, useState } from 'react'
// import type { Group } from 'three' // Import the Group class from three

// const ReactThreeWrapper = ({ children }: { children: ReactNode }) => {
//   return (
//     <div className="absolute -bottom-4 -right-4 size-32 max-lg:size-[5.86rem]">
//       <Canvas>
//         <ambientLight intensity={1} />
//         <directionalLight position={[0, 10, 5]} intensity={1} />
//         <Suspense fallback={null}>{children}</Suspense>
//       </Canvas>
//     </div>
//   )
// }

// const TokenModel = ({ model }: { model: string }) => {
//   const fbx = useFBX(model)
//   const fbxReference = useRef<Group>(null) // Use the imported Group class
//   useFrame(() => {
//     if (fbxReference.current) {
//       fbxReference.current.rotation.y += 0.01
//     }
//   })

//   return <primitive object={fbx} ref={fbxReference} scale={0.029} />
// }

export const Deposit = () => {
  const [time] = useState(dayjs().subtract(1, 'month').valueOf())
  const { data, loading } = useMaatTokensApy({ from: time })
  const { usdcApy, usdtApy } = useMemo(() => {
    const reversedArray = data?.slice().reverse()
    const _usdcApy = reversedArray?.find((token) => token.name === 'USDC')?.uv?.toFixed(2)
    const _usdtApy = reversedArray?.find((token) => token.name === 'USDT')?.pv?.toFixed(2)
    return { usdcApy: _usdcApy, usdtApy: _usdtApy }
  }, [data])

  return (
    <div className="flex w-full justify-center">
      <div className="pointer-events-auto mt-10 flex w-[38.75rem] flex-col gap-6 max-lg:gap-4">
        <Widget />
        <div className="grid grid-cols-2 gap-3">
          {loading ? (
            <>
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-[7.875rem] w-full rounded-3xl max-lg:h-[6.125rem]"
                />
              ))}
            </>
          ) : (
            <>
              <ShadowBoxWithValue
                label="USDС APY"
                value={usdcApy ? `${usdcApy}%` : '0.00%'}
              >
                <img
                  src={usdc}
                  alt="usdc"
                  className="animate-oscillate-smooth absolute -bottom-8 -right-4 size-32 brightness-[1.2] max-lg:size-[5.86rem]"
                />
                {/* <ReactThreeWrapper>
                  <TokenModel model="/src/assets/3D/Tether_3D.fbx" />
                </ReactThreeWrapper> */}
              </ShadowBoxWithValue>
              <ShadowBoxWithValue
                label="USDT APY"
                value={usdtApy ? `${usdtApy}%` : '0.00%'}
              >
                <img
                  src={usdt}
                  alt="usdt"
                  className="animate-oscillate-smooth absolute -bottom-8 -right-4 size-32 brightness-[1.2] max-lg:size-[5.86rem]"
                />
                {/* <ReactThreeWrapper>
                  <TokenModel model="/src/assets/3D/USD_Coin_3D.fbx" />
                </ReactThreeWrapper> */}
              </ShadowBoxWithValue>
            </>
          )}
        </div>
        <TransactionBlock />
      </div>
    </div>
  )
}
