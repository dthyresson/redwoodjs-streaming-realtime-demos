import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { useLocation } from '@redwoodjs/router'

import { Icon } from '../Icon/Icon'

const menuOptions = [
  {
    name: 'Real Time',
    subtitle: 'Chat Demo',
    slug: 'chat',
  },
  {
    name: 'Real Time',
    subtitle: 'Auction Demo',
    slug: 'auction',
  },
  {
    name: 'Streaming Demo',
    subtitle: 'Countdown Timer',
    slug: 'countdown',
  },
]

const DropdownMenu = ({ menuOptions, curOption }) => {
  return (
    <div>
      {menuOptions &&
        menuOptions.map((option, index: number) => {
          if (option.slug === curOption.slug) return null
          return (
            <a
              key={index}
              href={option.slug}
              className="mb-10 block w-full px-5 text-right text-lg font-bold leading-tight text-caribbeanGreen hover:text-vividYellow"
            >
              {option.name}
              <div className="font-mono text-sm font-normal leading-tight text-white">
                {option.subtitle}
              </div>
            </a>
          )
        })}
    </div>
  )
}

const Footer = () => {
  const { pathname } = useLocation()
  const [curMenuItem, setCurMenuItem] = useState(1)
  const [isDropdownShowing, setIsDropdownShowing] = useState(false)

  useEffect(() => {
    const curMenuOption = menuOptions.find((option) => {
      return option.slug === pathname.replace('/', '')
    })
    setCurMenuItem(menuOptions.indexOf(curMenuOption))
  }, [pathname])

  const toggleMenu = () => {
    setIsDropdownShowing((prevValue) => !prevValue)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex w-full justify-between bg-black">
      <a
        href="https://redwoodjs.com"
        className="block bg-black px-5 py-3 text-white"
      >
        <img src="/images/redwoodjs.svg" alt="RedwoodJS" />
      </a>

      <div className="relative">
        <AnimatePresence>
          {isDropdownShowing && (
            <motion.div
              className="absolute -right-5 bottom-0 z-10 min-w-[320px] bg-black pb-[52px] pl-4 pr-14 pt-4"
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
            >
              <DropdownMenu
                menuOptions={menuOptions}
                curOption={menuOptions[curMenuItem]}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <button
          className="relative z-20 flex min-w-[320px] items-center justify-end gap-x-4 bg-black px-5 py-3"
          onClick={toggleMenu}
        >
          <div className="text-right text-lg font-bold leading-tight text-caribbeanGreen hover:text-vividYellow">
            {menuOptions[curMenuItem].name}
            <div className="font-mono text-sm font-normal leading-tight text-white">
              {menuOptions[curMenuItem].subtitle}
            </div>
          </div>
          <div className="text-white">
            <Icon name="chevronDown" size={24} />
          </div>
        </button>
      </div>
    </div>
  )
}

export { Footer }
