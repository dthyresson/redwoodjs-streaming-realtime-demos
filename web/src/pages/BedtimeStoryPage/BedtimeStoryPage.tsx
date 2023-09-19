/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useEffect,
  // useEffect,
  useState,
} from 'react'

import { MetaTags } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'
import { useMutation, useSubscription } from '@redwoodjs/web'

import Page from 'src/components/BedtimeStories/Page/Page'
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
  const firstPage = 2
  const totalPages = 6
  const [currentPage, setCurrentPage] = useState(firstPage)

  const flipToNextPage = () => {
    if (currentPage === totalPages) return
    // flip page

    // update state
    setCurrentPage((preValue) => preValue + 1)
  }

  const flipToPrevPage = () => {
    if (currentPage === 1) return
    setCurrentPage((preValue) => preValue - 1)
  }

  const tellAgain = () => {
    setCurrentPage(firstPage)
    setAnimalId(null)
    setColorId(null)
    setActivityId(null)
    setAdjectiveId(null)
    setTitle(null)
    setBody(null)
  }

  const { data: storyConfig } = useQuery(GET_STORY_CONFIG)

  // const [storyLoading, setStoryLoading] = useState(false)
  const [writeStory, setWriteStory] = useState(false)
  const [animalId, setAnimalId] = useState(null)
  const [colorId, setColorId] = useState(null)
  const [activityId, setActivityId] = useState(null)
  const [adjectiveId, setAdjectiveId] = useState(null)
  const [title, setTitle] = useState(null)
  const [body, setBody] = useState(null)
  const history = React.useContext(HistoryContext)

  useEffect(() => {
    console.log('BedtimeStoryPage -> writeStory', writeStory)
    if (writeStory) {
      setTitle("I'm writing your story...")
      setBody(null)
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
      setWriteStory(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [writeStory, animalId, colorId, activityId, adjectiveId])

  useEffect(() => {
    console.log('BedtimeStoryPage -> writing story', true)
    if (animalId && colorId && activityId && adjectiveId) {
      setWriteStory(true)
    }
  }, [animalId, colorId, activityId, adjectiveId])

  const handleAnimalClick = (id) => {
    console.log('handleAnimalClick -> id', id, animalId)

    if (animalId === id) {
      setAnimalId(null) // Deselect if already selected
    } else {
      setAnimalId(id)
      flipToNextPage()
    }
  }

  const handleColorClick = (id) => {
    console.log('handleColorClick -> id', id, colorId)

    if (colorId === id) {
      setColorId(null) // Deselect if already selected
    } else {
      setColorId(id)
      flipToNextPage()
    }
  }

  const handleActivityClick = (id) => {
    console.log('handleActivityClick -> id', id, activityId)

    if (activityId === id) {
      setActivityId(null) // Deselect if already selected
    } else {
      setActivityId(id)
      flipToNextPage()
    }
  }

  const handleAdjectiveClick = (id) => {
    console.log('handleAdjectiveClick -> id', id, adjectiveId)

    if (adjectiveId === id) {
      setAdjectiveId(null) // Deselect if already selected
    } else {
      console.log('handleAdjectiveClick -> id', id, adjectiveId)
      setAdjectiveId(id)
      flipToNextPage()
    }
  }

  useSubscription(NEW_STORY_SUBSCRIPTION, {
    variables: { input: { animalId, colorId, activityId, adjectiveId } },
    onData: ({ data }) => {
      const story = data && data.data?.['newStory']
      if (story) {
        setTitle(story.title)
        setBody(story.body)
        history.unshift(data.data)
      }
    },
  })

  const [create] = useMutation(TELL_STORY_MUTATION)

  return (
    <div className="h-screen w-screen bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat">
      <MetaTags title="Bedtime Story" description="Bedtime Story" />

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
        className="absolute right-0 top-0 z-grid text-[#17484c]"
      >
        <GitHubCorner />
      </a>
      <div className="center">
        <div className="relative h-[870px] w-[1280px]">
          <img
            src="/images/book.png"
            alt="Book"
            className="h-[870px] w-[1280px] max-w-[1280px]"
          />
          <div className="book absolute left-[631px] top-[100px]">
            {/* pages are listed last >> first to help with z-indexing and first load */}
            {storyConfig && (
              <>
                <Page
                  totalPages={totalPages}
                  currentPage={currentPage}
                  pageNumber={6}
                  title={title}
                  again={() => tellAgain()}
                >
                  <div className="story">
                    <div className="h-[518px] overflow-y-scroll pr-4">
                      <>
                        <div className="px-2">
                          <MarkdownFormatter content={body} />
                        </div>
                      </>
                    </div>
                  </div>
                </Page>
                <Page
                  totalPages={totalPages}
                  currentPage={currentPage}
                  pageNumber={5}
                  title={title}
                  again={() => tellAgain()}
                >
                  <div className="h-[654px] overflow-y-scroll p-4">
                    <h2>Pick an activity</h2>
                    <div className="story-choices">
                      {storyConfig.activities.map((activity) => (
                        <button
                          key={`activity-id-${activity.id}`}
                          className={
                            activity.id === activityId ? 'selected' : ''
                          }
                          onClick={() => handleActivityClick(activity.id)}
                        >
                          {activity.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </Page>
                <Page
                  totalPages={totalPages}
                  currentPage={currentPage}
                  pageNumber={4}
                  title={title}
                  again={() => tellAgain()}
                >
                  <div className="h-[600px] overflow-y-scroll p-4">
                    <h2>Pick an animal</h2>
                    <div className="story-choices">
                      {storyConfig.animals.map((animal) => (
                        <button
                          key={`animal-id-${animal.id}`}
                          className={animal.id === animalId ? 'selected' : ''}
                          onClick={() => handleAnimalClick(animal.id)}
                        >
                          {animal.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </Page>
                <Page
                  totalPages={totalPages}
                  currentPage={currentPage}
                  pageNumber={3}
                  title={title}
                  again={() => tellAgain()}
                >
                  <div className="h-[600px] overflow-y-scroll p-4">
                    <h2>Pick a color</h2>
                    <div className="story-choices">
                      {storyConfig.colors.map((color) => (
                        <button
                          key={`color-id-${color.id}`}
                          className={color.id === colorId ? 'selected' : ''}
                          onClick={() => handleColorClick(color.id)}
                        >
                          {color.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </Page>
                <Page
                  totalPages={totalPages}
                  currentPage={currentPage}
                  pageNumber={2}
                  title={title}
                  again={() => tellAgain()}
                >
                  <div className="h-[600px] overflow-y-scroll p-4">
                    <h2>Pick an adjective</h2>
                    <div className="story-choices">
                      {storyConfig.adjectives.map((adjective) => (
                        <button
                          key={`adjective-id-${adjective.id}`}
                          onClick={() => handleAdjectiveClick(adjective.id)}
                          className={
                            adjective.id === adjectiveId ? 'selected' : ''
                          }
                        >
                          {adjective.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </Page>
                <Page
                  totalPages={totalPages}
                  currentPage={currentPage}
                  pageNumber={1}
                  title={title}
                  again={() => tellAgain()}
                />
              </>
            )}
          </div>
          {currentPage > firstPage && (
            <button
              onClick={flipToPrevPage}
              className="pagination absolute bottom-[83px] left-[182px] z-[100] h-[86px] w-[82px] cursor-pointer pl-2 pt-6 mix-blend-multiply hover:bg-[url('/images/triangle--left.svg')]"
            >
              <img src="/images/arrow--left.svg" alt="Previous Page" />
            </button>
          )}
          {currentPage < totalPages && (
            <button
              onClick={flipToNextPage}
              className="pagination absolute bottom-[84px] right-[200px] z-[100] h-[86px] w-[82px] cursor-pointer pr-2 pt-6 mix-blend-multiply hover:bg-[url('/images/triangle--right.svg')]"
            >
              <img
                src="/images/arrow--left.svg"
                alt="Next Page"
                className="float-right rotate-180"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BedtimeStoryPage
