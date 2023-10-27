# RedwoodJS Realtime

One of the most often asked questions of RedwoodJS before and after the launch for V1 was, “When will RedwoodJS support a realtime solution?”

The answer is: **now**.

## What is Realtime?

The real-time solution for RedwoodJS is initially for GraphQL.

In GraphQL, there are two options for real-time updates: **live queries** and **subscriptions**. Subscriptions are part of the GraphQL specification, whereas live queries are not.

There are times where subscriptions are well-suited for a realtime problem — and in some cases live queries may be a better fit. Later we’ll explore the pros and cons of each approach and how best to decide that to use and when.

## Showcase Demos

This app showcases both subscriptions and live queries. It also demonstrates how you can handle streaming responses, like those used by OpenAI chat completions.

### Chat Room (Subscription)

Sends a message to one of four Chat Rooms.

Each room subscribes to its new messages via the `NewMessage` channel aka topic.

```ts
context.pubSub.publish('newMessage', roomId, { from, body })
```

#### Simulate

```bash
./scripts/simulate_chat.sh -h
Usage: ./scripts/simulate_chat.sh -r [roomId] -n [num_messages]
       ./scripts/simulate_chat.sh -h

Options:
  -r roomId       Specify the room ID (1-4) for sending chat messages.
  -n num_messages Specify the number of chat messages to send. If not provided, the script will run with a random number of messages.
```
#### Test

```ts
/**
 * To test this NewMessage subscription, run the following in one GraphQL Playground to subscribe:
 *
 * subscription ListenForNewMessagesInRoom {
 *   newMessage(roomId: "1") {
 *     body
 *     from
 *   }
 * }
 *
 *
 * And run the following in another GraphQL Playground to publish and send a message to the room:
 *
 * mutation SendMessageToRoom {
 *   sendMessage(input: {roomId: "1", from: "hello", body: "bob"}) {
 *     body
 *     from
 *   }
 * }
 */
 ```

### Auction Bids (Live Query)

Bid on a fancy pair of new sneaks!

When a bid is made, the auction updates via a Live Query due to the invalidation of the auction key.

```ts

  const key = `Auction:${auctionId}`
  context.liveQueryStore.invalidate(key)
  ```

#### Simulate

```bash
./scripts/simulate_bids.sh -h
Usage: ./scripts/simulate_bids.sh [options]

Options:
  -a <auctionId>  Specify the auction ID (1-5) for which to send bids (optional).
  -n <num_bids>   Specify the number of bids to send (optional).
  -h, --help      Display this help message.
  ```

#### Test

```ts

/**
 * To test this live query, run the following in the GraphQL Playground:
 *
 * query GetCurrentAuctionBids @live {
 *  auction(id: "1") {
 *    bids {
 *      amount
 *    }
 *    highestBid {
 *      amount
 *    }
 *    id
 *    title
 *   }
 * }
 *
 * And then make a bid with the following mutation:
 *
 * mutation MakeBid {
 *   bid(input: {auctionId: "1", amount: 10}) {
 *     amount
 *   }
 * }
 */
```

### Countdown (Streaming Subscription)

> It started slowly and I thought it was my heart
> But then I realised that this time it was for real

Counts down from a starting values by an interval.

This example showcases how a subscription can yields its own response.

#### Test

```ts
/**
 * To test this Countdown subscription, run the following in the GraphQL Playground:
 *
 * subscription CountdownFromInterval {
 *   countdown(from: 100, interval: 10)
 * }
 */
```

### Bedtime Story (Subscription with OpenAI Streaming)

> Tell me a story about a happy, purple penguin that goes to a concert.

Showcases how to use OpenAI to stream a chat completion via a prompt that writes a bedtime story:

```ts
const PROMPT = `Write a short children's bedtime story about an Animal that is a given Color and that does a given Activity.

Give the animal a cute descriptive and memorable name.

The story should teach a lesson.

The story should be told in a quality, style and feeling of the given Adjective.

The story should be no longer than 3 paragraphs.

Format the story using Markdown.`

```

The story updates on each stream content delta via a `newStory` subscription topic event.

```ts
context.pubSub.publish('newStory', id, story)
```

### Bedtime Story (Stream Directive with OpenAI Streaming)

RedwoodJS also supports the GraphQL Stream directive.

While Apollo Client doesn't support streaming, you can still try out this example in GraphiQL:

```graphql
 query StreamStoryExample {
  streamStory(input: {}) @stream
 }
```

You can pass in an animal, color, adjective and activity -- or random values will be used.

### Movie Mashup (Live Query with OpenAI Streaming)

> It's Out of Africa meets Pretty Woman.

> So it's a psychic, political, thriller comedy with a heart With a heart, not unlike Ghost meets Manchurian Candidate.

-- The Player, 1992

Mashup some of your favorite movies to create something new and Netflix-worthy to watch.

Powered by OpenAI, this movie tagline and treatment updates on each stream content delta via a Live Query bui invalidating the `MovieMashup key.

```ts
context.liveQueryStore.invalidate(`MovieMashup:${id}`)
```

### Movie Mashup (Stream Directive with OpenAI Streaming)

RedwoodJS also supports the GraphQL Stream directive.

While Apollo Client doesn't support streaming, you can still try out this example in GraphiQL:

```graphql
query StreamMovieMashupExample {
  streamMovieMashup(input: {
    firstMovieId: "11522-pretty-in-pink",
    secondMovieId: "14370-real-genius"}) @stream
}
```

You can pass in two movie ids -- or random values will be used.

## RedwoodJS Realtime Setup

This project is already setup for Realtime.

To setup a new project:

* `yarn rw exp setup-server-file`
* `yarn rw exp setup-realtime`

You will get:

* `api/server.ts` where you configure your Fastify server and GraphQL
* `api/lib/realtime.ts` where you consume your subscriptions and configure realtime with an in-memory or Redis store
* The auction, countdown, and chat examples. You'll find sdl, services and subscriptions for each. Note there is no UI setup.

## Features

RedwoodJS Realtime handles the hard parts of a GraphQL Realtime implementation by automatically:

- allowing GraphQL Subscription operations to be handled
- merging in your subscriptions types and mapping their handler functions (subscribe, and resolve) to your GraphQL schema letting you keep your subscription logic organized and apart from services (your subscription my use a service to respond to an event)
- authenticating subscription requests using the same `@requireAuth` directives already protecting other queries and mutations (or you can implement your own validator directive)
- adding in the `@live` query directive to your GraphQL schema and setting up the `useLiveQuery` envelop plugin to handle requests, invalidation, and managing the storage mechanism needed
- creating and configuring in-memory and persisted Redis stores uses by the PubSub transport for subscriptions and Live Queries (and letting you switch between them in development and production)
- placing the pubSub transport and stores into the GraphQL context so you can use them in services, subscription resolvers, or elsewhere (like a webhook, function, or job) to publish an event or invalidate data
- typing you subscription channel event payloads

It provides a first-class developer experience for real-time updates with GraphQL so you can easily

- respond to an event (e.g. NewPost, NewUserNotification)
- respond to a data change (e.g. Post 123's title updated)

and have the latest data reflected in your app.

Lastly, the Redwood CLI has commands to

- generate a boilerplate implementation and sample code needed to create your custom
    - subscriptions
    - live Queries

Regardless of the implementation chosen, **a stateful server and store are needed** to track changes, invalidation, or who wants to be informed about the change.

## What can I build with Realtime?

- Application Alerts and Messages
- User Notifications
- Live Charts
- Location updates
- Auction bid updates
- Messaging
- OpenAI streaming responses

## Subscriptions

RedwoodJS has a first-class developer experience for GraphQL subscriptions.

#### Subscribe to Events

- Granular information on what data changed
- Why has the data changed?
- Spec compliant

### Example

```graphql
type Subscription {
  newMessage(roomId: ID!): Message! @requireAuth
}
```

1. I subscribed to a "newMessage” in room “2”
2. Someone added a message to room “2” with a from and body
3. A "NewMessage" event to Room 2 gets published
4. I find out and see who the message is from and what they messaged (the body)

## Live Queries

RedwoodJS has made it super easy to add live queries to your GraphQL server! You can push new data to your clients automatically once the data selected by a GraphQL operation becomes stale by annotating your query operation with the `@live` directive.

The invalidation mechanism is based on GraphQL ID fields and schema coordinates. Once a query operation has been invalidated, the query is re-executed, and the result is pushed to the client.

##### Listen for Data Changes

- I'm not interested in what exactly changed it.
- Just give me the data.
- This is not part of the GraphQL specification.
- There can be multiple root fields.

### Example

```graphql
query GetCurrentAuctionBids @live {
 auction(id: "1") {
   bids {
     amount
   }
   highestBid {
     amount
   }
   id
   title
  }
}

mutation MakeBid {
  bid(input: { auctionId: "1", amount: 10 }) {
    amount
  }
}
```

1. I listen for changes to Auction 1 by querying the auction.
2. A bid was placed on Auction 1.
3. The information for Auction 1 is no longer valid.
4. My query automatically refetches the latest Auction and Bid details.

## How do I choose Subscriptions or Live Queries?

![image](https://github.com/ahaywood/redwoodjs-streaming-realtime-demos/assets/1051633/e3c51908-434c-4396-856a-8bee7329bcdd)

When deciding on how to offer realtime data updates in your RedwoodJS app, you’ll want to consider:

- How frequently do your users require information updates?
    - Determine the value of "real-time" versus "near real-time" to your users. Do they need to know in less than 1-2 seconds, or is 10, 30, or 60 seconds acceptable for them to receive updates?
    - Consider the criticality of the data update. Is it low, such as a change in shipment status, or higher, such as a change in stock price for an investment app?
    - Consider the cost of maintaining connections and tracking updates across your user base. Is the infrastructure cost justifiable?
    - If you don't require "real" real-time, consider polling for data updates on a reasonable interval. According to Apollo, [in most cases](https://www.apollographql.com/docs/react/data/subscriptions/), your client should not use subscriptions to stay up to date with your backend. Instead, you should poll intermittently with queries or re-execute queries on demand when a user performs a relevant action, such as clicking a button.
- How are you deploying? Serverless or Serverful?
    - Real-time options depend on your deployment method.
    - If you are using a serverless architecture, your application cannot maintain a stateful connection to your users' applications. Therefore, it's not easy to "push," "publish," or "stream" data updates to the web client.
        - In this case, you may need to look for third-party solutions that manage the infrastructure to maintain such stateful connections to your web client, such as [Supabase Realtime](https://supabase.com/realtime), [SendBird](https://sendbird.com/), [Pusher](https://pusher.com/), or consider creating your own [AWS SNS-based](https://docs.aws.amazon.com/sns/latest/dg/welcome.html) functionality.

### PubSub and LiveQueryStore

By setting up RedwoodJS Realtime, the GraphQL server adds two helpers on the context:

* pubSub
* liveQueryStory

With `context.pubSub` you can subscribe to and publish messages via `context.pubSub.publish('the-topic', id, id2)`.

With `context.liveQueryStore.` you can `context.liveQueryStore.invalidate(key)`
`


---
# RedwoodJS README

Welcome to [RedwoodJS](https://redwoodjs.com)!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=18.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then change into that directory and start the development server:

```
cd my-redwood-project
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910 where you'll see the Welcome Page, which links to many great resources.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command!
> From dev to deploy, the CLI is with you the whole way.
> And there's quite a few commands at your disposal:
> ```
> yarn redwood --help
> ```
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).

## Prisma and the database

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and replace the `UserExample` model with the following `Post` model:

```
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` is short for `redwood`

You'll be prompted for the name of your migration. `create posts` will do.

Now let's generate everything we need to perform all the CRUD (Create, Retrieve, Update, Delete) actions on our `Post` model:

```
yarn redwood g scaffold post
```

Navigate to http://localhost:8910/posts/new, fill in the title and body, and click "Save":

Did we just create a post in the database? Yup! With `yarn rw g scaffold <model>`, Redwood created all the pages, components, and services necessary to perform all CRUD actions on our posts table.

## Frontend first with Storybook

Don't know what your data models look like?
That's more than ok—Redwood integrates Storybook so that you can work on design without worrying about data.
Mockup, build, and verify your React components, even in complete isolation from the backend:

```
yarn rw storybook
```

Before you start, see if the CLI's `setup ui` command has your favorite styling library:

```
yarn rw setup ui --help
```

## Testing with Jest

It'd be hard to scale from side project to startup without a few tests.
Redwood fully integrates Jest with the front and the backends and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```

To make the integration even more seamless, Redwood augments Jest with database [scenarios](https://redwoodjs.com/docs/testing.md#scenarios)  and [GraphQL mocking](https://redwoodjs.com/docs/testing.md#mocking-graphql-calls).

## Ship it

Redwood is designed for both serverless deploy targets like Netlify and Vercel and serverful deploy targets like Render and AWS:

```
yarn rw setup deploy --help
```

Don't go live without auth!
Lock down your front and backends with Redwood's built-in, database-backed authentication system ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), or integrate with nearly a dozen third party auth providers:

```
yarn rw setup auth --help
```

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)

---

# Fly Deploy

Since RedwoodJS Realtime requires a serverful deploy, one great option is [Fly.io](https://fly.io).

### Deploy to Fly

There is a `fly` branch with the config and settings needed to deploy to Fly.

* [Install flytcl](https://fly.io/docs/hands-on/install-flyctl/) from https://fly.io/docs/hands-on/install-flyctl/
* Assumes you have a Fly app setup and all necessary envars configured
* `git co fly`
* `flyctl deploy`
