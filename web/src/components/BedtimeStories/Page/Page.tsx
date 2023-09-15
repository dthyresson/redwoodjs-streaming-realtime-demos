import { motion } from 'framer-motion'

interface PageProps {
  children?: JSX.Element
  currentPage?: undefined | number
  pageNumber?: undefined | number
  side?: 'left' | 'right'
  totalPages: number
}

const Page = ({
  children,
  currentPage = undefined,
  pageNumber = undefined,
  side = 'right',
  totalPages,
}: PageProps) => {
  const variants = {
    left: {
      rotateX: [0, 0, 0],
      rotateY: 0,
      skewY: [0, 5, 0],
      transitionStart: {
        zIndex: 10,
      },
      // I'm add +1 to the zIndex so that the answer is never 0
      zIndex: [totalPages + 1 - pageNumber + 1, 10],
      transitionEnd: {
        zIndex: totalPages + 1 - pageNumber + 1,
      },
    },
    right: {
      rotateX: [0, 0, 0],
      rotateY: 180,
      skewY: [0, 5, 0],
      zIndex: [pageNumber + 1, 10],
      transitionStart: {
        zIndex: 10,
      },
      transitionEnd: {
        zIndex: pageNumber + 1,
      },
    },
  }

  return (
    <motion.div
      animate={currentPage <= pageNumber ? 'left' : 'right'}
      variants={variants}
      transition={{ duration: 2 }}
      style={{
        zIndex:
          currentPage <= pageNumber ? totalPages + 1 - pageNumber : pageNumber,
      }}
      className={`page absolute left-0 top-0 page-${side} origin-top-${
        side === 'left' ? 'right' : 'left'
      } h-[687px] w-[450px] bg-cover shadow`}
    >
      {/* front of the page */}
      <div className="front page-layout">{children}</div>

      {/* back of the page - "tell me a story about the ..""  */}
      <div className="back center flex-col font-blackLetter text-[#342e28]">
        <img
          src="/images/ornaments--top.svg"
          alt="ornaments"
          className="mb-2"
        />
        <div className="mb-1 text-[50px] leading-none">tell me a</div>
        <div className="mb-1 text-[100px] leading-none">Story</div>
        <div className="mb-8 text-[50px] leading-none">about the...</div>
        <img
          src="/images/ornaments--top.svg"
          alt="ornaments"
          className="rotate-180"
        />
      </div>
    </motion.div>
  )
}

export default Page
