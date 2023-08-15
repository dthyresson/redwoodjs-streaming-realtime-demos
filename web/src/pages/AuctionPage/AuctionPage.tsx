import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AuctionPage = () => {
  return (
    <>
      <MetaTags title="Auction" description="Auction page" />

      <h1>AuctionPage</h1>
      <p>
        Find me in <code>./web/src/pages/AuctionPage/AuctionPage.tsx</code>
      </p>
      <p>
        My default route is named <code>auction</code>, link to me with `
        <Link to={routes.auction()}>Auction</Link>`
      </p>
    </>
  )
}

export default AuctionPage
