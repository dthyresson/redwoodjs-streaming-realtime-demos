import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import ChatRoom from 'src/components/ChatRoom/ChatRoom'
import { chatMessage } from 'src/components/ChatRoomMessage/ChatRoomMessage'
import Drawer from 'src/components/Drawer/Drawer'
import GitHubCorner from 'src/components/GitHubCorner/GitHubCorner'
import Icon from 'src/components/Icon/Icon'

import { chatFeed } from '../../components/ChatRoom/ChatRoom.stories'

const ChatPage = () => {
  console.log({ chatFeed })

  const [chatFeed2, setChatFeed2] = useState([...chatFeed, ...chatFeed])

  const newMessage = {
    id: chatFeed2.length,
    message: 'This is it',
    user: {
      name: 'Laura Anne Haywood',
      color: 'cadetBlue',
    },
  } as chatMessage

  // set a timer to add a new message to the chat feed
  // every 5 seconds
  setInterval(() => {
    setChatFeed2((prevChatFeed) => [...prevChatFeed, { ...newMessage }])
  }, 10000)

  return (
    <>
      <MetaTags title="Chat" description="Chat page" />

      <div className="h-screen w-screen bg-[#313191]">
        <Drawer>
          <p>Some stuff</p>
        </Drawer>

        <a
          href="http://github.com"
          className="absolute right-0 top-0 text-[#7E7CD4] hover:text-[#D573D4]"
        >
          <GitHubCorner />
        </a>

        <div className="grid grid-cols-4 grid-rows-[1fr_100px_64px]">
          <div className="h-[calc(100vh-164px)] border-r-2 border-r-[#615EC4]">
            <ChatRoom
              roomColor="vividYellow"
              chatRoomNumber={1}
              chatFeed={[...chatFeed]}
            />
          </div>
          <div className="h-[calc(100vh-164px)] border-r-2 border-r-[#615EC4]">
            <ChatRoom
              roomColor="orchid"
              chatRoomNumber={2}
              chatFeed={chatFeed2}
            />
          </div>
          <div className="h-[calc(100vh-164px)] border-r-2 border-r-[#615EC4]">
            <ChatRoom roomColor="cadetBlue" chatRoomNumber={3} chatFeed={[]} />
          </div>
          <div className="h-[calc(100vh-164px)]">
            <ChatRoom roomColor="coral" chatRoomNumber={4} chatFeed={[]} />
          </div>
          <div className="col-span-4 flex items-center gap-x-4 border-t-2 border-t-[#615EC4] bg-[#0C0C26] px-5">
            <label htmlFor="message" className="font-bold text-white">
              Message
            </label>
            <input
              type="text"
              className="h-12 flex-1 rounded-lg bg-[#27273E] px-5 text-white"
              placeholder="Your Message"
            />
            <input
              type="text"
              className="h-12 rounded-lg bg-[#27273E] px-5 text-white"
              placeholder="From"
            />
            <select
              name="room"
              id="room"
              className="h-12 rounded-lg bg-[#27273E] px-5 text-white"
            >
              <option value="1">Room 1</option>
              <option value="2">Room 2</option>
              <option value="3">Room 3</option>
              <option value="4">Room 4</option>
            </select>
            <button className="center h-12 w-12 rounded-full bg-caribbeanGreen text-[#3736A4] hover:bg-[#3736A4] hover:text-caribbeanGreen">
              <div className="relative left-[2px]">
                <Icon name="send" size={32} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPage
