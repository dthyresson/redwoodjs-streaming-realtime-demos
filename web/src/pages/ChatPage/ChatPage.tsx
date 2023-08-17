import { useState } from 'react'

import { useMutation, useSubscription } from '@apollo/client'

import { MetaTags } from '@redwoodjs/web'

import ChatRoom from 'src/components/ChatRoom/ChatRoom'
import { chatMessage } from 'src/components/ChatRoomMessage/ChatRoomMessage'
import Drawer from 'src/components/Drawer/Drawer'
import GitHubCorner from 'src/components/GitHubCorner/GitHubCorner'
import Icon from 'src/components/Icon/Icon'

const SEND_MESSAGE = gql`
  mutation CreateContactMutation($input: SendMessageInput!) {
    sendMessage(input: $input) {
      body
      from
    }
  }
`

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription ListenForNewMessages($id: ID!) {
    newMessage(roomId: $id) {
      body
      from
    }
  }
`

const ChatPage = () => {
  // Keep track of the current room and the message being typed to send
  const [roomId, setRoomId] = useState('1')
  const [from, setFrom] = useState('')
  const [body, setBody] = useState('')

  // History of chat room history received
  const [history, setHistory] = useState([])

  // Each of the chat feeds per room
  const [chatFeed1, setChatFeed1] = useState([])
  const [chatFeed2, setChatFeed2] = useState([])
  const [chatFeed3, setChatFeed3] = useState([])
  const [chatFeed4, setChatFeed4] = useState([])

  // Subscription to listen for new messages on each of the four rooms ...

  // Room 1 Subscription
  useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { id: 1 },
    onData: ({ data }) => {
      const message = data && data.data?.['newMessage']
      if (message) {
        const newMessage = {
          id: chatFeed1.length,
          message: message.body,
          user: {
            name: message.from,
            color: 'vividYellow',
          },
        } as chatMessage

        setChatFeed1((prevChatFeed) => [...prevChatFeed, { ...newMessage }])
        setHistory((prevHistory) => [message, ...prevHistory])
      }
    },
  })

  // Room 2 Subscription
  useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { id: 2 },
    onData: ({ data }) => {
      console.log('onData', data)
      const message = data && data.data?.['newMessage']
      console.log('onData -> message', message)
      if (message) {
        const newMessage = {
          id: chatFeed2.length,
          message: message.body,
          user: {
            name: message.from,
            color: 'orchid',
          },
        } as chatMessage

        setChatFeed2((prevChatFeed) => [...prevChatFeed, { ...newMessage }])
        setHistory((prevHistory) => [message, ...prevHistory])
      }
    },
  })

  // Room 3 Subscription
  useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { id: 3 },
    onData: ({ data }) => {
      const message = data && data.data?.['newMessage']
      console.log('onData -> message', message)
      // Construct a new message object to add to the chat feed
      if (message) {
        const newMessage = {
          id: chatFeed3.length,
          message: message.body,
          user: {
            name: message.from,
            color: 'cadetBlue',
          },
        } as chatMessage

        setChatFeed3((prevChatFeed) => [...prevChatFeed, { ...newMessage }])
        setHistory((prevHistory) => [message, ...prevHistory])
      }
    },
  })

  // Room 4 Subscription
  useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { id: 4 },
    onData: ({ data }) => {
      console.log('onData', data)
      const message = data && data.data?.['newMessage']
      console.log('onData -> message', message)
      if (message) {
        const newMessage = {
          id: chatFeed4.length,
          message: message.body,
          user: {
            name: message.from,
            color: 'coral',
          },
        } as chatMessage

        setChatFeed4((prevChatFeed) => [...prevChatFeed, { ...newMessage }])
        setHistory((prevHistory) => [message, ...prevHistory])
      }
    },
  })

  // Mutation to send a message to a room
  const [create] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) => {
      console.log('onMutationComplete', JSON.stringify(data))
    },
  })

  // Send a message to a room
  const onSendMessage = (data) => {
    if (data.from !== '' && data.body !== '') {
      create({
        variables: { input: data },
      })
    }
  }

  return (
    <>
      <MetaTags title="Chat" description="Chat page" />

      <div className="h-screen w-screen bg-[#313191]">
        <Drawer>
          <pre>
            {history.map((h, i) => (
              <p key={`chat-history-${i}`}>{JSON.stringify(h, null, 2)}</p>
            ))}
          </pre>
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
              chatFeed={chatFeed1}
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
            <ChatRoom
              roomColor="cadetBlue"
              chatRoomNumber={3}
              chatFeed={chatFeed3}
            />
          </div>
          <div className="h-[calc(100vh-164px)]">
            <ChatRoom
              roomColor="coral"
              chatRoomNumber={4}
              chatFeed={chatFeed4}
            />
          </div>
          <div className="col-span-4 flex items-center gap-x-4 border-t-2 border-t-[#615EC4] bg-[#0C0C26] px-5">
            <label htmlFor="message" className="font-bold text-white">
              Message
            </label>
            <input
              name="body"
              className="h-12 flex-1 rounded-lg bg-[#27273E] px-5 text-white"
              placeholder="Your Message"
              onChange={(e) => setBody(e.target.value)}
            />
            <input
              name="from"
              className="h-12 rounded-lg bg-[#27273E] px-5 text-white"
              placeholder="From"
              onChange={(e) => setFrom(e.target.value)}
            />
            <select
              name="roomId"
              id="room"
              className="h-12 rounded-lg bg-[#27273E] px-5 text-white"
              onChange={(e) => setRoomId(e.target.value)}
            >
              <option value="1">Room 1</option>
              <option value="2">Room 2</option>
              <option value="3">Room 3</option>
              <option value="4">Room 4</option>
            </select>
            <button
              className="center h-12 w-12 rounded-full bg-caribbeanGreen text-[#3736A4] hover:bg-[#3736A4] hover:text-caribbeanGreen"
              onClick={() =>
                onSendMessage({
                  roomId,
                  from,
                  body,
                })
              }
            >
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
