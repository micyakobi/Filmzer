import React from "react";
//styles
import styled from 'styled-components';
import { StyledButton } from '../styles/styles';
//Routing
import { Link } from 'react-router-dom';
//MUI Components
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    maxWidth: 320,
    borderRadius: '0',
    transition: 'transform .2s',
    border: '0.5px solid transparent',
    backgroundColor: '#141414',
    '&:hover': {
      transform: 'scale(1.05)',
    }
  },
  media: {
    height: 280,
  },
  content: {
    padding: '1rem 1.2rem',
    height: 120,
    background: '#202020',
    color: '#d4d4d4',
  },
  actions: {
    padding: '1rem 1.2rem',
    background: '#202020',
    color: 'white',
  },
});

const ReviewCard = ({ review }) => {
  const classes = useStyles();
  const { reviewTitle, reviewContent, rating } = review;
  const { title, image_url } = review.movie;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt={`${title}`}
          height="140"
          image={`${image_url}`}
          title={`${title}`}
        />
        <CardContent className={classes.content}>
          <StyledHeaderCardDiv>
            <Typography gutterBottom variant="h6" component="h2" align="left">
              {`${reviewTitle}`}
            </Typography>
            <div>{`${rating}/10`}</div>
          </StyledHeaderCardDiv>
          <Typography variant="body2" component="p" align="left">
            {`${reviewContent.replace(/^(.{80}[^\s]*).*/, "$1")}...`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <StyledActions className={classes.actions}>
        <StyledButton component={Link} to={`/movies/${review.movie._id}`} size="small" color="inherit">
          READ MORE REVIEWS
        </StyledButton>
      </StyledActions>
    </Card>
  );
}

const StyledHeaderCardDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
    margin-left: 1rem;
    margin-bottom: 0.5rem;
    background-color: red;
    border-radius: 10px;
  }
`;

const StyledActions = styled(CardActions)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ReviewCard;
