import axios from "axios";

export const getMovieGenres = async (apiKey, apiUrl, setShowSpinner) => {
    try {
        setShowSpinner(true);
        const response = await axios.get(`${apiUrl}/genre/movie/list`, {
            params: {
                api_key: apiKey,
                language: 'en-US'
            }
        });

        setShowSpinner(false); 

        if (response.status !== 200) {
            throw new Error('Failed to fetch movie genres');
        }

        return response.data.genres.map(genre => ({
            id: genre.id,
            name: genre.name,
            slug: genre.name.toLowerCase().replace(/\s+/g, '-')
        }));
    } catch (error) {
        setShowSpinner(false);
        console.error('Error fetching movie genres:', error);
        throw error;
    }
};
