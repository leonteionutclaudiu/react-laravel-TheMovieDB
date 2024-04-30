import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUpRightFromSquare, faCalendarDays, faEarDeaf, faEarthAmericas, faHourglass, faIndustry, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../utils/dateHelper';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import AccordionCustom from './Accordion';
import { SpinnerContext } from '../contexts/SpinnerContext';

const MovieModal = ({ movie, onClose }) => {
    const { showSpinner, setShowSpinner } = useContext(SpinnerContext);
    const [trailers, setTrailers] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const modalRef = useRef(null);

    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;


    const toggleAccordion = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleCloseModal = (e) => {
        if (!modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setShowSpinner(true);

                // Fetch trailers
                const trailersResponse = await axios.get(`${apiUrl}/movie/${movie.id}/videos`, {
                    params: {
                        api_key: apiKey,
                        language: 'en-US',
                    },
                });
                setTrailers(trailersResponse.data.results);
                setShowSpinner(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setShowSpinner(false);
            }
        };

        fetchMovieDetails();
    }, [movie.id]);

    useEffect(() => {
        document.addEventListener('mousedown', handleCloseModal);

        return () => {
            document.removeEventListener('mousedown', handleCloseModal);
        };
    }, []);

    return <>
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md container max-w-7xl overflow-y-auto mx-auto p-4 mt-[65px]" ref={modalRef}>
            <button className="z-10 sticky top-0 shadow-2xl w-20 ml-auto bg-red-500 h-10 block text-xl text-white hover:bg-red-700 transition rounded-full" onClick={onClose}>Back <FontAwesomeIcon icon={faArrowLeft} /></button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full md:max-w-md h-auto mb-4 rounded-lg" />
                <div>
                    <h1 className="text-3xl md:text-5xl text-white text-center font-bold mb-10">{movie.title}</h1>
                    <p className="text-gray-200 text-xl font-semibold mb-4">{movie.overview}</p>
                    <div className='flex flex-col md:flex-row flex-wrap justify-between gap-2 text-lg'>
                        <p className="text-gray-200">
                            <FontAwesomeIcon icon={faCalendarDays} /> {formatDate(movie.release_date)} <span className='text-tertiary'>({movie.status.toLowerCase()})</span>
                        </p>
                        <p className="text-secondary">
                            <FontAwesomeIcon icon={faHourglass} /> {movie.runtime > 0 ? `${movie.runtime} minutes` : 'not specified'}
                        </p>
                        <p className="text-yellow-500">
                            {movie.vote_average > 7.5 ? <FontAwesomeIcon icon={faStar} /> : <FontAwesomeIcon icon={faStarHalfStroke} />} Rating: {parseFloat(movie.vote_average.toFixed(1))}
                        </p>
                    </div>
                    <h2 className="text-xl font-semibold mt-6 mb-2 text-secondary">Genres</h2>
                    <ul className="flex flex-wrap mb-4">
                        {movie.genres.map(genre => (
                            <li key={genre.id} className="mr-2 bg-gray-200 px-2 py-1 rounded">{genre.name}</li>
                        ))}
                    </ul>
                    <h2 className="text-xl font-semibold mb-2 text-tertiary">Production companies <FontAwesomeIcon icon={faIndustry} /></h2>
                    <ul className="flex flex-wrap gap-1 italic mb-4 text-gray-200">
                        {movie.production_companies.map((company, index) => (
                            <li key={company.id}>
                                {company.name}
                                {index !== movie.production_companies.length - 1 && (movie.production_companies.length > 1 || index !== 0) && " , "}
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-xl font-semibold mb-2 text-secondary">Production Countries <FontAwesomeIcon icon={faEarthAmericas} /></h2>
                    <ul className="flex flex-wrap gap-1 mb-4 text-gray-200">
                        {movie.production_countries.map((country, index) => (
                            <li key={country.iso_3166_1}>
                                {country.name}
                                {index !== movie.production_countries.length - 1 && (movie.production_countries.length > 1 || index !== 0) && ","}
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-xl font-semibold mb-2 text-tertiary">Spoken Languages <FontAwesomeIcon icon={faEarDeaf} /></h2>
                    <ul className="flex flex-wrap mb-4 text-gray-200">
                        {movie.spoken_languages.map((language, index) => (
                            <li key={language.iso_639_1}>
                                {language.english_name}
                                {index !== movie.spoken_languages.length - 1 && (movie.spoken_languages.length > 1 || index !== 0) && ","}
                            </li>
                        ))}
                    </ul>
                    <div className='flex items-center justify-center gap-4 flex-wrap'>
                        <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" className="text-xl font-semibold mb-2 text-yellow-500 hover:text-yellow-600 transition">IMDB <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
                        <a href={`${movie.homepage}`} target="_blank" className="text-xl font-semibold mb-2 text-yellow-500 hover:text-yellow-600 transition">Homepage <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
                    </div>
                </div>
            </div>
            {trailers.length > 0 && <>
                <h2 className="text-2xl text-center font-bold mb-2 text-tertiary">Related videos <FontAwesomeIcon icon={faYoutube} /></h2>
                {trailers.map((trailer, index) => (
                    <AccordionCustom
                        key={trailer.key}
                        question={trailer.name}
                        answer={
                            <iframe
                                className='w-full h-96'
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title={trailer.name}
                                allowFullScreen
                            ></iframe>
                        }
                        isOpen={openIndex === index}
                        onToggle={() => toggleAccordion(index)}
                    />
                ))}
            </>}
        </div>
    </>
}

export default MovieModal;
