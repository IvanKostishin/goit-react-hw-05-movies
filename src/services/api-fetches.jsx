import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = 'b27f2f3d79b3a6e46fc2bca972d7f174';

export const fetchPopularMovie = async () => {
  try {
    return await axios.get(`${BASE_URL}trending/movie/day?api_key=${KEY}`);
  } catch (error) {
    throw error;
  }
};

export const fetchMovieById = async movie_id => {
  try {
    return await axios.get(
      `${BASE_URL}movie/${movie_id}?api_key=${KEY}&language=en-US`
    );
  } catch (error) {
    throw error;
  }
};

export const fetchCast = async movie_id => {
  try {
    return await axios.get(
      `${BASE_URL}movie/${movie_id}/credits?api_key=${KEY}&language=en-US`
    );
  } catch (error) {
    throw error;
  }
};

export const fetchReviews = async movie_id => {
  try {
    return await axios.get(
      `${BASE_URL}movie/${movie_id}/reviews?api_key=${KEY}&language=en-US&page=1`
    );
  } catch (error) {
    throw error;
  }
};

export const fetchMovieByQuery = async query => {
  try {
    return await axios.get(
      `${BASE_URL}search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );
  } catch (error) {
    throw error;
  }
};
