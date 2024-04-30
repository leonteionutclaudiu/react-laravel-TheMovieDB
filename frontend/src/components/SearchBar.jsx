import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";

function SearchBar() {
    const { searchTerm, setSearchTerm } = useContext(SearchContext);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            setSearchTerm('');
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search movies"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <button type="submit" className="absolute inset-y-0 right-0 px-4 py-2 bg-primary text-white font-semibold rounded-r-lg flex items-center">
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchBar;
