import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { menuOptions } from 'src/components/Footer/Footer'

const MENU_COLORS = [
  'caribbeanGreen',
  'sandyBrown',
  'orchid',
  'cadetBlue',
  'coral',
  'darkSlateBlue',
  'midnightBlue',
]

const HomePage = () => {
  return (
    <div className="h-screen w-screen bg-purple-200 p-12">
      <MetaTags
        title="Realtime Demos"
        description="Realtime with RedwoodJS GraphQL Live Queries and Subscriptions"
      />

      <h1 className="text-2xl font-bold">Realtime Demos</h1>
      <h2 className="text-lg font-semibold">
        with RedwoodJS GraphQL Live Queries and Subscriptions
      </h2>
      <div className="my-12 grid grid-cols-3 gap-4">
        {menuOptions.map((option, index) => {
          const theme = MENU_COLORS[index % MENU_COLORS.length]

          return (
            <div
              key={`menu-home-link-${option.slug}`}
              className={`shadow:md rounded-md border-1 border-gray-400 p-4 bg-${theme} hover:bg-${theme}-dark text-center text-white`}
            >
              <Link to={option.slug}>
                <div className="text-center">
                  <div className="text-lg font-semibold text-white">
                    {option.name}
                  </div>
                  <div className="text-md text-gray-100">{option.subtitle}</div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomePage
