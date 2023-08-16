import { useEffect, useRef } from 'react'

import ChatRoomMessage, {
  type chatMessage,
} from '../ChatRoomMessage/ChatRoomMessage'

export type Color =
  | 'vividYellow'
  | 'sandyBrown'
  | 'orchid'
  | 'cadetBlue'
  | 'coral'

interface ChatRoomProps {
  roomColor: Color
  chatRoomNumber: number
  chatFeed: chatMessage[]
  isRoomActive?: boolean
}

const ChatRoom = ({
  isRoomActive = false,
  chatRoomNumber,
  chatFeed,
  roomColor,
}: ChatRoomProps) => {
  // scroll to the bottom
  useEffect(() => {
    const scrollAnchor = document.getElementById('scroll-anchor')
    scrollAnchor?.scrollIntoView({ behavior: 'smooth' })
  }, [chatFeed])

  useEffect(() => {
    const chatFeed = document.getElementById('chat-feed')
    chatFeed?.scrollTo(0, chatFeed.scrollHeight)
    console.log(chatFeed.scrollHeight)
  }, [])

  return (
    <div
      className={`flex h-full flex-col ${
        !isRoomActive ? 'bg-midnightBlue' : 'bg-darkSlateBlue'
      } text-white`}
    >
      <div className="flex w-full items-center gap-x-4 border-b-1 border-b-[#7F7CDA] p-5">
        <div
          className={`center h-12 w-12 rounded-full font-bold text-darkSlateBlue bg-${roomColor} text-xl`}
        >
          {chatRoomNumber}
        </div>
        <h2 className="font-bold">Room {chatRoomNumber}</h2>
      </div>
      <div className="relative h-[calc(100.001vh-89px-100px)] w-full overflow-y-scroll">
        <ul className="w-full" id="chat-feed">
          {chatFeed.map((chatMessage) => (
            <ChatRoomMessage key={chatMessage.id} chatMessage={chatMessage} />
          ))}
          <li id="scroll-anchor" />
        </ul>
      </div>
    </div>
  )
}

export default ChatRoom
