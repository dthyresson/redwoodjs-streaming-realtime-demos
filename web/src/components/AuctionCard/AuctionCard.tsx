interface AuctionCardProps {
  amount: number
}

const AuctionCard = ({ amount }: AuctionCardProps) => {
  return (
    <div className="flex items-center justify-end rounded-3xl bg-white bg-opacity-80 py-5 pr-12">
      <div className="mr-5 h-[1px] flex-1 bg-[#d4d4d4]" />
      <span className="dollar-sign !-top-[15px]">$</span>
      <span className="amount">{amount}</span>
    </div>
  )
}

export default AuctionCard
