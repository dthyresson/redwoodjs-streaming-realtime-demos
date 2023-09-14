import type { Movie } from 'types/graphql'

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <img
          className="w-24 rounded-md shadow-md"
          alt={movie.title}
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.photo}`}
        />
      </div>
      <div className="text-md flex items-start rounded-md bg-gray-100 p-2 text-center text-sm">
        {movie.title}
      </div>
    </>
  )
}

export default MovieCard
