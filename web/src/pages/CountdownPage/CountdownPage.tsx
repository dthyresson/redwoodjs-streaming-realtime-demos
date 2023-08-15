import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const CountdownPage = () => {
  return (
    <>
      <MetaTags title="Countdown" description="Countdown page" />

      <h1>CountdownPage</h1>
      <p>
        Find me in <code>./web/src/pages/CountdownPage/CountdownPage.tsx</code>
      </p>
      <p>
        My default route is named <code>countdown</code>, link to me with `
        <Link to={routes.countdown()}>Countdown</Link>`
      </p>
    </>
  )
}

export default CountdownPage
