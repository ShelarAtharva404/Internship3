import { useState } from "react";
import Star from "../public/star-icon.svg";
import Header from './Header';  // Import Header component
import Footer from './Footer';  // Import Footer component

function App() {
  const [movies, setMovies] = useState([
    {
      Poster: "https://via.placeholder.com/150",
      Title: "Inception",
      Year: "2010",
      Rated: "PG-13",
      Released: "16 Jul 2010",
      Runtime: "148 min",
      Genre: "Action, Adventure, Sci-Fi",
      Plot: "A thief who steals corporate secrets through the use of dream-sharing technology...",
      Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
      imdbRating: "8.8",
    },
    {
      Poster: "https://via.placeholder.com/150",
      Title: "The Dark Knight",
      Year: "2008",
      Rated: "PG-13",
      Released: "18 Jul 2008",
      Runtime: "152 min",
      Genre: "Action, Crime, Drama",
      Plot: "When the menace known as The Joker emerges from his mysterious past...",
      Actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
      imdbRating: "9.0",
    },
    // Add more movies here...
  ]);

  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);  // State to track the selected movie
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to add a movie
  const addMovie = (newMovie) => {
    setMovies([newMovie, ...movies]);  // Add new movie at the top of the list
  };

  // Function to delete a movie by title
  const deleteMovie = (title) => {
    setMovies(movies.filter(movie => movie.Title !== title));  // Remove movie from list
  };

  const getMovie = async (e) => {
    e.preventDefault();
    setError(false);
    const movie = e.target.elements.movie.value;

    // Fetch the movie details
    const wait = await fetch(
      `https://www.omdbapi.com/?t=${movie}&apikey=ba8c1e41`
    );
    const data = await wait.json();

    if (data.Response === "True") {
      const newMovie = {
        Poster: data.Poster,
        Title: data.Title,
        Year: data.Year,
        Rated: data.Rated,
        Released: data.Released,
        Runtime: data.Runtime,
        Genre: data.Genre,
        Plot: data.Plot,
        Actors: data.Actors,
        imdbRating: data.imdbRating,
      };
      addMovie(newMovie);  // Add the searched movie to the list
    } else {
      setError(true);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setError(false);

    if (value.length >= 3) {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${value}&apikey=ba8c1e41`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setSuggestions(data.Search.slice(0, 5)); // Get top 5 suggestions
      } else {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (title) => {
    setSearchTerm(title);
    setSuggestions([]);
    document.querySelector("form").dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);  // Show the movie details in the modal
  };

  const closeModal = () => {
    setSelectedMovie(null);  // Close the modal
  };

  return (
    <div className="flex bg-black justify-center items-center min-h-screen w-full">
      <div className="w-full min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-700 p-0 flex flex-col">
        {/* Header */}
        <Header />

        <div className="max-w-6xl mx-auto flex-grow">
          <form onSubmit={getMovie} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <input
              placeholder="Enter movie name here..."
              name="movie"
              value={searchTerm}
              onChange={handleInputChange}
              className="bg-gray-800 border border-gray-600 h-12 rounded-md outline-none p-4 text-white text-lg focus:ring-2 focus:ring-amber-400 transition duration-200"
            />
            <button className="bg-amber-400 text-white rounded-md p-2 text-sm font-semibold shadow-md hover:bg-amber-500 transition duration-200">
              Search
            </button>
          </form>

          {suggestions.length > 0 && (
            <div className="bg-white text-black rounded-md shadow-lg absolute z-10 w-full max-w-xl mt-[-10px]">
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-amber-200 cursor-pointer"
                  onClick={() => handleSuggestionClick(item.Title)}
                >
                  {item.Title} ({item.Year})
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center mt-4 flex justify-center">
              <div className="flex flex-col justify-center items-center">
                <p className="text-red-600 font-medium mt-2">
                  Oops! Invalid movie name :/
                </p>
              </div>
            </div>
          )}

          {/* Display list of movies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handleMovieClick(movie)}  // Show the movie in modal on click
                />
                <div className="p-4">
                  <p className="text-white font-semibold text-xl">{movie.Title}</p>
                  <p className="text-sm text-gray-400">{movie.Year}</p>
                  <p className="text-sm text-yellow-400 flex items-center">
                    <img src={Star} className="h-4 w-4 mr-2" />
                    {movie.imdbRating}
                  </p>
                  <p className="text-sm text-gray-300">{movie.Genre}</p>
                  <p className="text-sm text-gray-400 mt-2">{movie.Plot}</p>

                  {/* Delete movie button */}
                  <button
                    className="mt-2 bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-200"
                    onClick={() => deleteMovie(movie.Title)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for displaying selected movie */}
        {selectedMovie && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-3xl">
              <button
                className="absolute top-4 right-4 text-white text-xl"
                onClick={closeModal}
              >
                X
              </button>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <img
                  src={selectedMovie.Poster}
                  alt={selectedMovie.Title}
                  className="w-48 h-72 object-cover mb-4 md:mb-0"
                />
                <div className="text-white">
                  <h2 className="text-3xl font-bold">{selectedMovie.Title}</h2>
                  <p className="text-xl text-gray-400">{selectedMovie.Year}</p>
                  <p className="text-yellow-400 flex items-center mt-2">
                    <img src={Star} className="h-5 w-5 mr-2" />
                    {selectedMovie.imdbRating}
                  </p>
                  <p className="mt-4">{selectedMovie.Plot}</p>
                  <p className="mt-2 text-gray-400">Actors: {selectedMovie.Actors}</p>
                  <p className="mt-2 text-gray-400">Runtime: {selectedMovie.Runtime}</p>
                  <p className="mt-2 text-gray-400">Genre: {selectedMovie.Genre}</p>
                  <p className="mt-2 text-gray-400">Rated: {selectedMovie.Rated}</p>
                  <p className="mt-2 text-gray-400">Released: {selectedMovie.Released}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
