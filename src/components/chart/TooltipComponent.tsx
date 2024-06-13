export const TooltipComponent = () => {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-card-light px-4 py-3 shadow-md">
      <div className="text-[0.79863rem] text-gray">29 July 00:00</div>
      <div className="flex items-center gap-2 font-medium">
        <div className="text-[1.27775rem]">220,342.76</div>
        <div className="flex items-center justify-center rounded-[0.31944rem] bg-primary-pink/40 px-[0.32rem] py-[0.16rem] text-[0.95831rem] text-primary-pink">
          +3.4%
        </div>
      </div>
    </div>
  )
}
