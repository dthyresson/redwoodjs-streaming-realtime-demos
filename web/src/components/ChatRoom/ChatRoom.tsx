import {
  useEffect,
  useState,
  // useRef
} from 'react'

import { useSubscription } from '@redwoodjs/web'

import ChatRoomMessage, {
  type chatMessage,
} from '../ChatRoomMessage/ChatRoomMessage'

export type Color =
  | 'vividYellow'
  | 'orchid'
  | 'cadetBlue'
  | 'coral'
  | 'sandyBrown'

const COLORS = ['vividYellow', 'orchid', 'cadetBlue', 'coral', 'sandyBrown']
interface ChatRoomProps {
  roomColor: Color
  chatRoomNumber: number
  isRoomActive?: boolean
}

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription ListenForNewMessages($id: ID!) {
    newMessage(roomId: $id) {
      body
      from
    }
  }
`

const avatarColor = (roomNumber: number): string => {
  return COLORS[roomNumber - 1]
}

const ChatRoom = ({ chatRoomNumber, roomColor }: ChatRoomProps) => {
  const [chatFeed, setChatFeed] = useState([])
  const [isRoomActive, setIsRoomActive] = useState(false)

  useEffect(() => {
    if (isRoomActive) {
      const timeoutId = setTimeout(() => {
        setIsRoomActive(false)
      }, 750)

      // Clear the timeout if the component unmounts or if isRoomActive changes to false before the timeout
      return () => clearTimeout(timeoutId)
    }
  }, [isRoomActive])

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

  useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { id: chatRoomNumber },
    onData: ({ data }) => {
      const message = data && data.data?.['newMessage']
      if (message) {
        const newMessage = {
          id: chatFeed.length,
          message: message.body,
          user: {
            name: message.from,
            color: avatarColor(chatRoomNumber),
          },
        } as chatMessage

        setChatFeed((prevChatFeed) => [...prevChatFeed, { ...newMessage }])
        // setHistory((prevHistory) => [message, ...prevHistory])
        setIsRoomActive(true)
      }
    },
  })

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
