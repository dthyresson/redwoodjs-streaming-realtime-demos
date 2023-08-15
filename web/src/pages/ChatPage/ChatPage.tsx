import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ChatPage = () => {
  return (
    <>
      <MetaTags title="Chat" description="Chat page" />

      <h1>ChatPage</h1>
      <p>
        Find me in <code>./web/src/pages/ChatPage/ChatPage.tsx</code>
      </p>
      <p>
        My default route is named <code>chat</code>, link to me with `
        <Link to={routes.chat()}>Chat</Link>`
      </p>
    </>
  )
}

export default ChatPage
