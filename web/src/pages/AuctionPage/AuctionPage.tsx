import { Link, NavLink, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import AuctionCard from 'src/components/AuctionCard/AuctionCard'
import Drawer from 'src/components/Drawer/Drawer'
import GitHubCorner from 'src/components/GitHubCorner/GitHubCorner'
import NavDot from 'src/components/NavDot/NavDot'

const AuctionPage = () => {
  return (
    <div className="bg-[#F1F2F4]">
      <MetaTags title="Auction" description="Auction page" />

      <Drawer>
        <p>Something else</p>
      </Drawer>

      <div className="flex max-h-screen min-h-screen flex-col justify-end pb-[80px]">
        <img
          src="/images/shoes-1.jpg"
          alt="Converse Sneakers"
          className="absolute -top-[100px] z-bg mx-auto w-full object-cover"
        />

        <div className="auction-grid">
          <div className="col-start-3 mb-8 flex flex-col gap-2">
            <AuctionCard amount={159} />
            <AuctionCard amount={162} />
            <AuctionCard amount={171} />
            <AuctionCard amount={174} />
            <AuctionCard amount={180} />
            <AuctionCard amount={186} />
            <AuctionCard amount={187} />
          </div>
        </div>
        <div className="auction-grid gap-x-16 rounded-3xl bg-white bg-opacity-70 pl-12 backdrop-blur-3xl">
          <h1 className="py-8 text-[80px] font-bold leading-none text-[#555C64]">
            Converse Sneakers
          </h1>
          <div className="flex items-center gap-x-4">
            <div className="relative">
              <input
                type="number"
                className="amount w-[218px] rounded-lg border-1 border-[#CDCDCD] px-10"
              />
              <div className="dollar-sign absolute left-4 top-3">$</div>
            </div>
            <button className="text-4xl font-bold text-caribbeanGreen hover:text-black">
              Bid
            </button>
          </div>
          <div className="flex items-center justify-end gap-x-4 rounded-r-3xl bg-white pr-12">
            <h4 className="whitespace-nowrap text-xs font-bold uppercase text-[#AEAEAE]">
              Best Offer
            </h4>
            <div>
              <span className="dollar-sign">$</span>
              <span className="amount">187</span>
            </div>
          </div>
        </div>
        <nav className="pb-2 pt-6">
          <ul className="flex justify-center gap-x-4">
            <li>
              <NavLink
                to={routes.auction({ id: 1 })}
                className="nav-dot"
                activeClassName="nav-dot--active"
              >
                <NavDot />
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.auction({ id: 2 })}
                className="nav-dot"
                activeClassName="nav-dot--active"
              >
                <NavDot />
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.auction({ id: 3 })}
                className="nav-dot"
                activeClassName="nav-dot--active"
              >
                <NavDot />
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.auction({ id: 4 })}
                className="nav-dot"
                activeClassName="nav-dot--active"
              >
                <NavDot />
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.auction({ id: 5 })}
                className="nav-dot"
                activeClassName="nav-dot--active"
              >
                <NavDot />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <a href="http://github.com" className="absolute right-0 top-0 z-grid">
        <GitHubCorner />
      </a>
    </div>
  )
}

export default AuctionPage
