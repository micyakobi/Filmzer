import React, { useState, useEffect } from 'react';
//Redux data and actions
import { useDispatch, useSelector } from 'react-redux';
import { loadAllMovies, loadSearchedMovies } from '../redux/actions/moviesActions'
//Routing
import { Link } from 'react-router-dom';
//Styles
import { StyledMotionDiv } from '../styles/styles';
import styled from 'styled-components';
//Components
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';
import SearchInput from '../components/ui-elements/SearchInput';
//Animation 
import { pageAnimationFromBottom } from '../styles/animation';
import { motion } from 'framer-motion';
//Modal Video
import '../../node_modules/react-modal-video/scss/modal-video.scss';
import ModalVideo from 'react-modal-video';

const Movies = () => {

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [movieTrailerId, setMovieTrailerId] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [genreInput, setGenreInput] = useState("");
  const [yearInput, setYearInput] = useState("");

  const searchedMovies = useSelector(state => state.movies.searchedMovies);

  const handleWatchClick = (movie) => {
    if (movie) {
      let trailerId = movie.trailer_video.split('v=')[1];
      const ampersandPosition = trailerId.indexOf('&');
      if (ampersandPosition !== -1) {
        trailerId = trailerId.substring(0, ampersandPosition);
      }
      setMovieTrailerId(trailerId);
      setIsOpenModal(true);
    }
  };

  const dispatch = useDispatch();

  const handleTitleInput = (e) => {
    setTitleInput(e.target.value)
  };

  const handleGenreInput = (e) => {
    setGenreInput(e.target.value)
  };

  const handleYearInput = (e) => {
    setYearInput(e.target.value)
  };

  useEffect(() => {
    dispatch(loadSearchedMovies(titleInput, genreInput, yearInput));
  }, [titleInput, genreInput, yearInput])

  return (
    <>
      <Loader />
      <StyledMotionDiv
        variants={pageAnimationFromBottom}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {movieTrailerId && (
          <ModalVideo channel='youtube' autoplay isOpen={isOpenModal} videoId={movieTrailerId} onClose={() => setIsOpenModal(false)} />
        )}
        <StyledSearchDiv>
          <SearchInput placeholder="Title..." onChange={handleTitleInput} />
          <SearchInput placeholder="Genre..." onChange={handleGenreInput} />
          <SearchInput placeholder="Year..." onChange={handleYearInput} />
        </StyledSearchDiv>
        <MoviesGrid>
          {Object.values(searchedMovies).map((movie) => (
            <StyledLink to={`/movies/${movie._id}`}>
              <MovieCard movie={movie} onWatchClick={handleWatchClick} key={movie._id} />
            </StyledLink>
          ))}
        </MoviesGrid>
      </StyledMotionDiv>
    </>
  );
}

const MoviesGrid = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 2rem;
  grid-column-gap: 4rem;
  grid-row-gap: 4rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledSearchDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #141414;
  padding: 3rem;
  margin-bottom: 2rem;
`;

export default Movies;
