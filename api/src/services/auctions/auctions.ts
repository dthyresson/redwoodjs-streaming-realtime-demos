// api/src/services/auctions/auctions.ts
import type { LiveQueryStorageMechanism } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'

const auctions = [
  { id: '1', title: 'Converse All-Stars', bids: [{ amount: 10 }] },
  { id: '2', title: 'Adidas Run DMCs', bids: [{ amount: 5 }] },
  { id: '3', title: 'Nike Swooshed', bids: [{ amount: 15 }] },
  { id: '4', title: 'Adi Das Hamburg Edition', bids: [{ amount: 20 }] },
  { id: '5', title: 'Nike Teal Tops', bids: [{ amount: 25 }] },
]

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
export const auction = async ({ id }) => {
  const foundAuction = auctions.find((a) => a.id === id)
  logger.debug({ id, auction: foundAuction }, 'auction')
  return foundAuction
}

export const resetAuctions = async () => {
  auctions.forEach((a) => (a.bids = [{ amount: 0 }]))
  return auctions
}

export const resetAuction = async ({ id }) => {
  const index = auctions.findIndex((a) => a.id === id)

  auctions[index].bids = [auctions[index].bids[0]]
  return auctions[index]
}

export const bid = async (
  { input },
  { context }: { context: { liveQueryStore: LiveQueryStorageMechanism } }
) => {
  const { auctionId, amount } = input

  const index = auctions.findIndex((a) => a.id === auctionId)

  const bid = { amount }

  auctions[index].bids.push(bid)
  logger.debug({ auctionId, bid }, 'Added bid to auction')

  const key = `Auction:${auctionId}`
  context.liveQueryStore.invalidate(key)

  logger.debug({ key }, 'Invalidated auction key in liveQueryStore')

  return bid
}

export const Auction = {
  highestBid: (obj, { root }) => {
    const [max] = root.bids.sort((a, b) => a.amount - b.amount)

    logger.debug({ obj, root }, 'highestBid')

    return max
  },
}
