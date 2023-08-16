import Avatar from '../Avatar/Avatar'
import { Color } from '../ChatRoom/ChatRoom'

export type chatMessage = {
  id: number
  user: {
    name: string
    color: Color
  }
  message: string
}

interface chatRoomMessageProps {
  chatMessage: chatMessage
}

const ChatRoomMessage = ({ chatMessage }: chatRoomMessageProps) => {
  return (
    <li className="flex items-center gap-x-4 border-t-1 border-t-[#504EB2] px-6 py-4 ">
      <Avatar name={chatMessage.user.name} color={chatMessage.user.color} />
      <div className="leading-tight">
        <strong>{chatMessage.user.name}</strong>
        <div>{chatMessage.message}</div>
      </div>
    </li>
  )
}

export default ChatRoomMessage
