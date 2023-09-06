/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'
import { useMutation, useSubscription } from '@redwoodjs/web'

import Drawer from 'src/components/Drawer/Drawer'
import GitHubCorner from 'src/components/GitHubCorner/GitHubCorner'
import { HistoryContext } from 'src/layouts/DemoLayout/DemoLayout'
import MarkdownFormatter from 'src/utils/MarkdownFormatter'

const GET_STORY_CONFIG = gql`
  query GetStoryConfig {
    animals {
      id
      name
    }
    colors {
      id
      name
    }
    activities {
      id
      name
    }
    adjectives {
      id
      name
    }
  }
`

const TELL_STORY_MUTATION = gql`
  mutation TellStory($input: StoryInput!) {
    tellStory(input: $input) {
      id
      title
      body
      activity {
        id
        name
      }
      adjective {
        name
        id
      }
      animal {
        id
        name
      }
      color {
        name
        id
      }
    }
  }
`

const NEW_STORY_SUBSCRIPTION = gql`
  subscription ListenForNewStory($input: StoryInput!) {
    newStory(input: $input) {
      title
      body
    }
  }
`

const BedtimeStoryPage = () => {
  const { data: storyConfig, loading } = useQuery(GET_STORY_CONFIG)

  const [animalId, setAnimalId] = useState(null)
  const [colorId, setColorId] = useState(null)
  const [activityId, setActivityId] = useState(null)
  const [adjectiveId, setAdjectiveId] = useState(null)
  const [title, setTitle] = useState(null)
  const [body, setBody] = useState(null)
  const history = React.useContext(HistoryContext)

  const handleAnimalClick = (id) => {
    if (animalId === id) {
      setAnimalId(null) // Deselect if already selected
    } else {
      setAnimalId(id)
    }
  }

  const handleColorClick = (id) => {
    if (colorId === id) {
      setColorId(null) // Deselect if already selected
    } else {
      setColorId(id)
    }
  }

  const handleActivityClick = (id) => {
    if (activityId === id) {
      setActivityId(null) // Deselect if already selected
    } else {
      setActivityId(id)
    }
  }

  const handleAdjectiveClick = (id) => {
    if (adjectiveId === id) {
      setAdjectiveId(null) // Deselect if already selected
    } else {
      setAdjectiveId(id)
    }
  }

  useSubscription(NEW_STORY_SUBSCRIPTION, {
    variables: { input: { animalId, colorId, activityId, adjectiveId } },
    onData: ({ data }) => {
      const story = data && data.data?.['newStory']
      if (story) {
        console.log(story)
        setTitle(story.title)
        setBody(story.body)
        history.unshift(data.data)
      }
    },
  })

  const [create] = useMutation(TELL_STORY_MUTATION)

  const onStory = (_data) => {
    create({
      variables: {
        input: {
          animalId,
          colorId,
          activityId,
          adjectiveId,
        },
      },
    })
  }

  return (
    <div className="h-full w-screen bg-[#a855f7]">
      <MetaTags title="Bedtime Story" description="Tell me a story..." />

      <Drawer>
        <pre>
          <HistoryContext.Consumer>
            {(value) => (
              <p
                key={`bedtime-story-history-${value}`}
                className="w-[400px] max-w-[400px] overflow-scroll"
              >
                {JSON.stringify(value, null, 2)}
              </p>
            )}
          </HistoryContext.Consumer>
        </pre>
      </Drawer>
      <a
        href="https://github.com/redwoodjs/redwoodjs-streaming-realtime-demos#bedtime-story-subscription-with-openai-streaming"
        target="_blank"
        rel="noreferrer"
        className="absolute right-0 top-0 z-grid"
      >
        <GitHubCorner />
      </a>
      <h1 className="px-24 py-8 text-[40px] font-bold leading-none text-white">
        Tell me a story about the ...
      </h1>
      <div className="mb-24 grid grid-cols-2 gap-4 p-4">
        {loading && <div>Loading...</div>}
        {storyConfig && (
          <div className="ml-20 grid grid-flow-row auto-rows-max gap-4 overflow-scroll rounded-md">
            <div className="grid grid-cols-4 gap-4 overflow-scroll bg-gray-50 p-4">
              {storyConfig.adjectives.map((adjective) => (
                <p
                  className={`cursor-pointer rounded-md border-2 bg-gray-100 p-2 text-center hover:bg-gray-200 ${
                    adjectiveId === adjective.id &&
                    'bg-gray-500 text-white hover:bg-gray-500'
                  }`}
                  key={`adjective-id-${adjective.id}`}
                  onClick={() => handleAdjectiveClick(adjective.id)}
                >
                  {adjective.name}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4 overflow-scroll bg-gray-50 p-4">
              {storyConfig.colors.map((color) => (
                <p
                  className={`cursor-pointer rounded-md border-2 bg-gray-100 p-2 text-center hover:bg-gray-200 ${
                    colorId === color.id &&
                    'bg-gray-500 text-white hover:bg-gray-500'
                  }`}
                  key={`color-id-${color.id}`}
                  onClick={() => handleColorClick(color.id)}
                >
                  {color.name}
                </p>
              ))}
            </div>{' '}
            <div className="grid grid-cols-4 gap-4 overflow-scroll bg-gray-50 p-4">
              {storyConfig.animals.map((animal) => (
                <p
                  className={`cursor-pointer rounded-md border-2 bg-gray-100 p-2 text-center hover:bg-gray-200 ${
                    animalId === animal.id &&
                    'bg-gray-500 text-white hover:bg-gray-500'
                  }`}
                  key={`animal-id-${animal.id}`}
                  onClick={() => handleAnimalClick(animal.id)}
                >
                  {animal.name}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4 overflow-scroll bg-gray-50 p-4">
              {storyConfig.activities.map((activity) => (
                <p
                  className={`cursor-pointer rounded-md border-2 bg-gray-100 p-2 text-center hover:bg-gray-200 ${
                    activityId === activity.id &&
                    'bg-gray-500 text-white hover:bg-gray-500'
                  }`}
                  key={`activity-id-${activity.id}`}
                  onClick={() => handleActivityClick(activity.id)}
                >
                  {activity.name}
                </p>
              ))}
            </div>
          </div>
        )}
        <div className="h-full rounded-md bg-sky-200 p-2">
          <div className="grid grid-cols-2 ">
            <div className="">
              <h1 className="py-4 text-2xl">{title}</h1>
              <MarkdownFormatter content={body} />
            </div>
            <div>
              <button
                type="button"
                className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                onClick={onStory}
                disabled={!animalId || !colorId || !activityId || !adjectiveId}
              >
                Tell Me a Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BedtimeStoryPage
