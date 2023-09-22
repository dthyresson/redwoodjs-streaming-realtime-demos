import { useState } from 'react'

import { Form, NumberField, Submit } from '@redwoodjs/forms'
import { useSubscription } from '@redwoodjs/web'
import { MetaTags } from '@redwoodjs/web'

import Drawer from 'src/components/Drawer/Drawer'
import GitHubCorner from 'src/components/GitHubCorner/GitHubCorner'
import { HistoryContext } from 'src/layouts/DemoLayout/DemoLayout'
import { Constants } from 'src/utils/Constants'

const COUNTDOWN_SUBSCRIPTION = gql`
  subscription Countdown($from: Int!, $interval: Int!) {
    countdown(from: $from, interval: $interval)
  }
`
const CountdownPage = () => {
  const [from, setFrom] = useState(100)
  const [interval, setInterval] = useState(10)

  const [countdown, setCountdown] = useState(from)

  const { history } = React.useContext(HistoryContext)

  useSubscription(COUNTDOWN_SUBSCRIPTION, {
    variables: { from, interval },
    onData({ data }) {
      setCountdown(data.data['countdown'])
      history.unshift(data.data)
    },
  })

  const onSubmit = (input) => {
    setFrom(parseInt(input.from))
    setInterval(parseInt(input.interval))
  }

  return (
    <>
      <MetaTags title="Countdown" description="Countdown page" />

      <Drawer theme="vividYellow">
        <HistoryContext.Consumer>
          {(value) => (
            <p
              key={`countdown-history-${value}`}
              className="w-[250px] max-w-[250px] overflow-scroll whitespace-pre-wrap"
            >
              {JSON.stringify(value, null, 2)}
            </p>
          )}
        </HistoryContext.Consumer>
      </Drawer>

      <div className="center h-[calc(100vh-64px)] w-screen bg-gray-950">
        <a
          href={Constants.COUNTDOWN_ANCHOR}
          target="_blank"
          rel="noreferrer"
          className="absolute right-0 top-0 text-[#3A3A3A] hover:text-vividYellow"
        >
          <GitHubCorner />
        </a>

        {/* COUNTDOWN NUMBER */}
        <div className="w-[830px]">
          <div className="mb-10 h-[500px] overflow-hidden text-center font-condensed text-[688px] leading-[540px] text-white">
            {countdown}
          </div>
          <Form className="flex gap-x-5" onSubmit={onSubmit}>
            <div className="flex items-center gap-x-6 rounded-lg border-1 border-white px-5">
              <label
                className="font-sans font-bold uppercase text-vividYellow"
                htmlFor="from"
              >
                FROM
              </label>
              <NumberField
                name="from"
                id="from"
                className="w-[175px] border-transparent bg-transparent font-condensed text-6xl text-white focus:outline-none"
                defaultValue={from}
              />
            </div>
            <div className="flex items-center gap-x-6 rounded-lg border-1 border-white px-5">
              <label
                className="font-sans font-bold uppercase text-vividYellow"
                htmlFor="by"
              >
                BY
              </label>
              <NumberField
                name="interval"
                id="interval"
                className="w-[175px] border-transparent bg-transparent font-condensed text-6xl text-white focus:outline-none"
                defaultValue={interval}
              />
            </div>
            <Submit className="font-condensed text-4xl uppercase text-vividYellow hover:text-caribbeanGreen">
              Countdown
            </Submit>
          </Form>
        </div>
      </div>
    </>
  )
}

export default CountdownPage
