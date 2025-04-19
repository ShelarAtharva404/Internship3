import React from "react";
import { useLocation } from "react-router-dom"; // Hook to get location from React Router

const MovieDetails = () => {
  const location = useLocation();
  const { movie } = location.state || {}; // Get movie details from the state passed via Router

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-900">
      <div className="w-full max-w-4xl p-6 bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-lg">
        <h1 className="text-white text-4xl font-bold mb-4">{movie.Title}</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full md:w-1/3 h-auto object-cover rounded-lg"
          />
          <div className="text-white md:w-2/3">
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Rated:</strong> {movie.Rated}</p>
            <p><strong>Released:</strong> {movie.Released}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
            <p className="mt-4"><strong>Plot:</strong> {movie.Plot}</p>
            <p className="mt-2"><strong>Cast:</strong> {movie.Actors}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
