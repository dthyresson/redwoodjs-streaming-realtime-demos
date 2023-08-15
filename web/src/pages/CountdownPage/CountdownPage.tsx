import { MetaTags } from '@redwoodjs/web'

import Drawer from 'src/components/Drawer/Drawer'
import GitHubCorner from 'src/components/GitHubCorner/GitHubCorner'

const CountdownPage = () => {
  return (
    <>
      <MetaTags title="Countdown" description="Countdown page" />

      <Drawer>
        <pre>
          <p>Some stuff</p>
        </pre>
      </Drawer>

      <div className="center  inset-0 h-screen w-screen flex-col bg-gray-950">
        <a
          href="https://github.com"
          className="absolute right-0 top-0 text-[#3A3A3A] hover:text-vividYellow"
        >
          <GitHubCorner />
        </a>

        {/* COUNTDOWN NUMBER */}
        <div className="mb-[68px] font-condensed text-[688px] leading-[500px] text-white">
          100
        </div>
        <div className="flex gap-x-5">
          <div className="flex items-center gap-x-6 rounded-lg border-1 border-white px-5">
            <label
              className="font-sans font-bold uppercase text-vividYellow"
              htmlFor="from"
            >
              FROM
            </label>
            <input
              type="number"
              name="from"
              id="from"
              className="w-[175px] border-transparent bg-transparent font-condensed text-6xl text-white focus:outline-none"
              defaultValue={0}
            />
          </div>
          <div className="flex items-center gap-x-6 rounded-lg border-1 border-white px-5">
            <label
              className="font-sans font-bold uppercase text-vividYellow"
              htmlFor="by"
            >
              BY
            </label>
            <input
              type="number"
              name="by"
              id="by"
              className="w-[175px] border-transparent bg-transparent font-condensed text-6xl text-white focus:outline-none"
              defaultValue={100}
            />
          </div>
          <button className="font-condensed text-4xl uppercase text-vividYellow hover:text-caribbeanGreen">
            Countdown
          </button>
        </div>
      </div>
    </>
  )
}

export default CountdownPage
