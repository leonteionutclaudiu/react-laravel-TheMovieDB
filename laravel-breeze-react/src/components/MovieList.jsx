import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import MovieListComponent from './MovieListComponent';
import { SpinnerContext } from '../contexts/SpinnerContext';
import { useLocation } from 'react-router-dom';
import MovieModal from './MovieModal';

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const endOfListRef = useRef(null);
    const [isScrollActive, setIsScrollActive] = useState(true);
    const { showSpinner, setShowSpinner } = useContext(SpinnerContext);
    const location = useLocation();
    const [lastSearchTerm, setLastSearchTerm] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [totalResults,setTotalResults] = useState('');


    const openModal = async (movie) => {
        try {
            setShowSpinner(true);
            const response = await axios.get(`${apiUrl}/movie/${movie.id}`, {
                params: {
                    api_key: apiKey,
                },
            });
            setSelectedMovie(response.data);
            setShowSpinner(false);
        } catch (error) {
            console.error('Error fetching movie details:', error);
            setShowSpinner(false);
        }
    };
    const closeModal = () => {
        setSelectedMovie(null);
    };

    // get search query
    const getSearchParamFromUrl = () => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get('q');
    };

    useEffect(() => {
        const fetchMovies = async () => {
            setShowSpinner(true);
            try {
                const searchParam = getSearchParamFromUrl();
                if (searchParam !== lastSearchTerm) {
                    setMovies([]);
                    setPage(1);
                }

                let response;
                if (searchParam) {
                    response = await axios.get(`${apiUrl}/search/movie`, {
                        params: {
                            api_key: apiKey,
                            query: searchParam,
                            page: page,
                        },
                    });
                    setTotalResults(response.data.total_results);
                } else {
                    response = await axios.get(`${apiUrl}/movie/popular`, {
                        params: {
                            api_key: apiKey,
                            page: page,
                        },
                    });
                }

                setMovies(prevMovies => {
                    if (searchParam !== lastSearchTerm) {
                        return [...response.data.results];
                    } else {
                        return [...prevMovies, ...response.data.results];
                    }
                });

                setShowSpinner(false);
                setLastSearchTerm(searchParam);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setShowSpinner(false);
            }
        };

        fetchMovies();
    }, [location.search, page]);


    const handleScroll = () => {
        if (
            endOfListRef.current &&
            endOfListRef.current.getBoundingClientRect().top <= window.innerHeight &&
            !showSpinner &&
            isScrollActive
        ) {
            setPage(prevPage => prevPage + 1);
            setIsScrollActive(false);

            setTimeout(() => {
                setIsScrollActive(true);
            }, 1000);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrollActive]);

    return (
        <>
            {movies && (
                <div>
                    <h2 className='text-center text-primary font-bold text-2xl md:text-3xl mb-10'>{getSearchParamFromUrl() ? `Search results (${totalResults}) :` : 'Popular movies'}</h2>
                    <div className='grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 items-stretch'>
                        {movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                {index === movies.length - 1 && (
                                    <div ref={endOfListRef}></div>
                                )}
                                <MovieListComponent
                                    movie={movie}
                                    onOpenModal={() => openModal(movie)}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
        </>
    );
}

export default MovieList;
