import { MetaTags } from '@redwoodjs/web'

import Drawer from 'src/components/Drawer/Drawer'
import GitHubCorner from 'src/components/GitHubCorner/GitHubCorner'
import { HistoryContext } from 'src/layouts/DemoLayout/DemoLayout'

const BedtimeStoryPage = () => {
  return (
    <div className="h-screen bg-[#a855f7]">
      <MetaTags title="Bedtime Story" description="Tell me a story..." />

      <Drawer>
        <pre>
          <HistoryContext.Consumer>
            {(value) => (
              <p key={`countdown-history-${value}`}>
                {JSON.stringify(value, null, 2)}
              </p>
            )}
          </HistoryContext.Consumer>
        </pre>
      </Drawer>
      <a href="http://github.com" className="absolute right-0 top-0 z-grid">
        <GitHubCorner />
      </a>
      <div>
        <h1>Bedtime Story</h1>
      </div>
    </div>
  )
}

export default BedtimeStoryPage
