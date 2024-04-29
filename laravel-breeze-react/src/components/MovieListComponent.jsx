import { formatDate } from '../utils/dateHelper';

const Movie = ({ movie, onOpenModal }) => {
  const handleClick = () => {
    onOpenModal(movie);
  };

  return (
    <div onClick={handleClick}>
      <div key={movie.id} className="bg-gray-100 rounded-md shadow-sm hover:shadow-2xl transition movieCard cursor-pointer h-full hover:-translate-y-1">
        <div className="overflow-hidden">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='movieCardImage w-full' />
        </div>
        <h2 className="p-2.5 text-center text-primary text-xl font-semibold">{movie.title}</h2>
        <p className="p-2.5 font-bold text-center">{formatDate(movie.release_date)}</p>
        {/* <p className="p-2.5 text-primary font-semibold">{movie.overview}</p> */}
      </div>
    </div>
  );
}

export default Movie;
