import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import GitHubCorner from 'src/components/GitHubCorner/GitHubCorner'
import Icon from 'src/components/Icon/Icon'
import { Constants } from 'src/utils/Constants'
import { menuOptions } from 'src/utils/MenuOptions'

const TableOfContentsPage = () => {
  return (
    <>
      <MetaTags
        title="RedwoodJS Realtime Demos"
        description="This page showcases several demos featuring RedwoodJS GraphQL Live Queries and Subscriptions."
      />

      <div className="grid min-h-screen w-screen grid-cols-12 gap-x-5">
        <a
          href={Constants.GITHUB_REPO}
          target="_blank"
          rel="noreferrer"
          className="absolute right-0 top-0 z-grid text-caribbeanGreen"
        >
          <GitHubCorner />
        </a>
        <div className="toc__content relative col-span-8 h-screen overflow-y-scroll px-[100px] pt-[130px]">
          <div className="absolute left-3 top-3">
            <a href="https://redwoodjs.com">
              <img src="/images/redwoodjs__black.svg" alt="RedwoodJS" />
            </a>
          </div>
          <div className="mb-24">
            <h1>RedwoodJS Realtime</h1>
            <p>
              One of the most often asked questions of RedwoodJS before and
              after the launch for V1 was, “When will RedwoodJS support a
              realtime solution?”
            </p>
            <p>
              The answer is: <strong>now</strong>.
            </p>
            <h2>What is RedwoodJS Realtime?</h2>
            <p>
              RedwoodJS Realtime is a real-time solution for GraphQL over
              Server-Sent Events.
            </p>
            <p>
              Redwood offers several options for real-time updates:{' '}
              <strong>live queries</strong>, <strong>subscriptions</strong>, as
              well as <strong>stream</strong> and <strong>defer</strong>{' '}
              directives. Subscriptions are part of the GraphQL specification,
              whereas live queries are not. Stream and Defer are experimental
              GraphQL features and not yet stable.
            </p>
            <p>
              There are times where subscriptions are well-suited for a realtime
              problem — and in some cases live queries may be a better fit. You
              can explore the showcases and view the demo code to see how each
              works and decide what best suits your real-time needs.
            </p>

            <div className="mb-10 aspect-video w-full">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ChjhR89nMyg?si=gZ7Vn4neWOaQAEU8&amp;start=331"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              ></iframe>
              <p className="!text-sm text-gray-500">
                Demoing RealTime at the Monthly Town Hall
              </p>
            </div>
            <h2 className="my-2 text-xl font-bold">Showcase Demos</h2>
            <p>
              This app showcases both subscriptions and live queries. It also
              demonstrates how you can handle streaming responses, like those
              used by OpenAI chat completions.
            </p>
            <h3 className="my-2 text-lg font-semibold leading-10">
              Chat Room (Subscription)
            </h3>
            <p>Sends a message to one of four Chat Rooms.</p>
            <p>
              Each room subscribes to its new messages via the `NewMessage`
              channel aka topic.
            </p>
            <img src="/images/screenshot__chat.png" alt="Chatroom Demo" />
            <div className="action-buttons">
              <Link className="button" to={routes.chat()}>
                <Icon name="arrowUpRight" /> View Demo
              </Link>
              <a className="button" href={Constants.CHAT_ANCHOR}>
                <Icon name="github" /> View Code
              </a>
            </div>
            <h3 className="my-2 text-lg font-semibold leading-10">
              Auction Bids (Live Query)
            </h3>
            <p>Bid on a fancy pair of new sneaks!</p>
            <p>
              When a bid is made, the auction updates via a Live Query due to
              the invalidation of the auction key.
            </p>
            <img src="/images/screenshot__auction.png" alt="Auction" />
            <div className="action-buttons">
              <Link className="button" to={routes.auction({ id: '1' })}>
                <Icon name="arrowUpRight" /> View Demo
              </Link>
              <a className="button" href={Constants.AUCTION_ANCHOR}>
                <Icon name="github" /> View Code
              </a>
            </div>

            <h3 className="my-2 text-lg font-semibold leading-10">
              Countdown (Streaming Subscription)
            </h3>
            <p>Counts down from a starting values by an interval.</p>
            <p>
              This example showcases how a subscription can yields its own
              response.
            </p>
            <img
              src="/images/screenshot__countdown.png"
              alt="Countdown Timer"
            />
            <div className="action-buttons">
              <Link className="button" to={routes.countdown()}>
                <Icon name="arrowUpRight" /> View Demo
              </Link>
              <a className="button" href={Constants.COUNTDOWN_ANCHOR}>
                <Icon name="github" /> View Code
              </a>
            </div>

            <h3 className="my-2 text-lg font-semibold leading-10">
              Bedtime Story (Subscription with OpenAI Streaming)
            </h3>
            <pre>
              Tell me a story about a happy, purple penguin that goes to a
              concert.
            </pre>
            <p>
              Showcases how to use OpenAI to stream a chat completion via a
              prompt that writes a bedtime story:
            </p>
            <pre>
              const PROMPT = `Write a short children&apos;s bedtime story about
              an Animal that is a given Color and that does a given Activity.
              Give the animal a cute descriptive and memorable name. The story
              should teach a lesson. The story should be told in a quality,
              style and feeling of the given Adjective. The story should be no
              longer than 3 paragraphs. Format the story using Markdown.`
            </pre>
            <p>
              The story updates on each stream content delta via a `newStory`
              subscription topic event.
            </p>
            <img src="/images/screenshot__bedtime.png" alt="Bedtime Story" />
            <div className="action-buttons">
              <Link className="button" to={routes.bedtimeStory()}>
                <Icon name="arrowUpRight" /> View Demo
              </Link>
              <a href={Constants.BEDTIME_STORY_ANCHOR} className="button">
                <Icon name="github" /> View Code
              </a>
            </div>

            <h3 className="my-2 text-lg font-semibold leading-10">
              Bedtime Story (Stream Directive with OpenAI Streaming)
            </h3>

            <p>RedwoodJS also supports the GraphQL Stream directive.</p>

            <p>
              While Apollo Client does not support streaming, you can still try
              out this example in GraphiQL:
            </p>

            <pre
              dangerouslySetInnerHTML={{
                __html: `query StreamStoryExample { streamStory(input: {}) @stream }`,
              }}
            />

            <p>
              You can pass in an animal, color, adjective and activity -- or
              random values will be used.
            </p>

            <h3 className="my-2 text-lg font-semibold leading-10">
              Movie Mashup (Live Query with OpenAI Streaming)
            </h3>
            <pre>
              It&apos;s Out of Africa meets Pretty Woman. So it&apos;s a
              psychic, political, thriller comedy with a heart With a heart, not
              unlike Ghost meets Manchurian Candidate. -- The Player, 1992
            </pre>
            <p>
              Mashup some of your favorite movies to create something new and
              Netflix-worthy to watch.
            </p>
            <p>
              Powered by OpenAI, this movie tagline and treatment updates on
              each stream content delta via a Live Query by invalidating the
              `MovieMashup` key.
            </p>
            <pre>
              const PROMPT = `Propose a short new movie treatment in the style
              of a movie trailer advertisement voice over by mashing up the
              plots, characters, their names, and themes of two existing movies.
              Give the new movie a title and tagline that could be used on a
              movie poster. The treatment should be no longer than 3 sentences.
              Return the title, tagline, and treatment of the new movie as text
              with labels: Title, Tagline, and Treatment and format as markdown
              where the title is a heading, tagline is a subheading and
              treatment uses bold for emphasis on some exciting words.`
            </pre>
            <img src="/images/screenshot__movies.png" alt="Movie Mashup" />
            <div className="action-buttons">
              <Link className="button" to={routes.movieMashup()}>
                <Icon name="arrowUpRight" /> View Demo
              </Link>
              <a className="button" href={Constants.MOVIE_MASHUP_ANCHOR}>
                <Icon name="github" /> View Code
              </a>
            </div>

            <h3 className="my-2 text-lg font-semibold leading-10">
              Movie Mashup (Stream Directive with OpenAI Streaming)
            </h3>

            <p>RedwoodJS also supports the GraphQL Stream directive.</p>

            <p>
              While Apollo Client does not support streaming, you can still try
              out this example in GraphiQL:
            </p>

            <pre
              dangerouslySetInnerHTML={{
                __html: `query StreamMovieMashupExample {
                  streamMovieMashup(input: {
                    firstMovieId: "11522-pretty-in-pink",
                    secondMovieId: "14370-real-genius"}) @stream
                }`,
              }}
            />

            <p>
              You can pass in two movie ids -- or random values will be used.
            </p>
          </div>
        </div>
        <div className="col-span-4 h-screen overflow-y-scroll bg-black pb-24 pt-[100px] text-center">
          <img
            src="/images/table-of-contents.svg"
            alt="Table of Contents"
            className="mx-auto mb-8"
          />

          <ul className="mx-auto w-[240px] text-left">
            {menuOptions.map((option, index) => {
              if (option.name === 'Table of Contents') return null
              return (
                <li className="mb-6" key={index}>
                  <Link to={option.slug} className="group">
                    <h4 className="font-sans text-xl font-bold text-caribbeanGreen group-hover:text-vividYellow">
                      {option.name}
                    </h4>
                    <p className="group-hover:text- font-mono font-bold text-white group-hover:text-vividYellow">
                      {option.subtitle}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default TableOfContentsPage
