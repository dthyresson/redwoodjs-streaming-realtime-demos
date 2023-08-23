import { MetaTags } from '@redwoodjs/web'

import Drawer from 'src/components/Drawer/Drawer'
import GitHubCorner from 'src/components/GitHubCorner/GitHubCorner'
import { HistoryContext } from 'src/layouts/DemoLayout/DemoLayout'

const MovieMashupPage = () => {
  return (
    <div className="h-screen bg-[#06b6d4]">
      <MetaTags
        title="Movie Mashup"
        description="Mashup two movies and make a new one"
      />

      <Drawer theme="vividYellow">
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
    </div>
  )
}

export default MovieMashupPage
