import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";

const SingleMovie = () => {
  // throu useParams we get access to id of etch component
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchMovie = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      setError({ show: true, msg: data.Error });
      setIsLoading(true);
    } else {
      setMovie(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // "&i" - for getting id
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <div className="loading"></div>;
  }

  const { Poster: poster, Title: title, Plot: plot, Year: year } = movie;
  return (
    <section className="single-movie">
      <img src={poster} alt="img" />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
