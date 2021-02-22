import React, { useState, useEffect } from 'react';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/actions/usersActions';
//Styles
import styled from 'styled-components';
//Routes
import { Link } from 'react-router-dom';
//MUI Components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MovieIcon from '@material-ui/icons/Movie';
import StarsIcon from '@material-ui/icons/Stars';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Backdrop from '@material-ui/core/Backdrop';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#202020',
    color: 'white',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer - 1,
    color: '#fff',
  },
}));

const DrawerMenu = ({ openDrawer, setOpenDrawer, setOpen }) => {
  const classes = useStyles();
  const isLogged = useSelector(state => state.user.isLogged);
  const [toggleSignIn, setToggleSignIn] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setToggleSignIn(!isLogged);
  }, [isLogged])

  const handleOpenChat = () => {
    setOpen(true);
    handleDrawerClose();
  }

  const handleSignOut = () => {
    if (isLogged) {
      dispatch(signOut());
      handleDrawerClose();
    }
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <StyledChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <StyledListItem
            button key={'Home'}
            component={Link}
            to={'/'}
            onClick={handleDrawerClose}>
            <StyledHomeIcon />
            <ListItemText primary={'Home'} />
          </StyledListItem>
          <StyledListItem
            button key={'Movies'}
            component={Link}
            to={'/movies'}
            onClick={handleDrawerClose}>
            <StyledMovieIcon />
            <ListItemText primary={'Movies'} />
          </StyledListItem>
          <StyledListItem
            button key={'Reviews'}
            component={Link}
            to={'/reviews'}
            onClick={handleDrawerClose}
          >
            <StyledStarIcon />
            <ListItemText primary={'Reviews'} />
          </StyledListItem>
          <StyledListItem
            button key={'About'}
            component={Link}
            to={'/about'}
            onClick={handleDrawerClose}
          >
            <StyledInfoIcon />
            <ListItemText primary={'About'} />
          </StyledListItem>
        </List>
        <Divider />
        <List>
          {toggleSignIn ?
            (
              <StyledListItem
                button key={'Sign In'}
                component={Link}
                to={'/signin'}
                onClick={handleDrawerClose}
              >
                <StyledAccountCircleIcon />
                <ListItemText primary={'Sign In'} />
              </StyledListItem>
            )
            :
            (
              <>
                <StyledListItem
                  button key={'Chat With Us'}
                  onClick={handleOpenChat}
                >
                  <StyledChatIcon />
                  <ListItemText primary={'Chat With Us'} />
                </StyledListItem>
                <StyledListItem
                  button key={'Sign Out'}
                  component={Link}
                  to={'/'}
                  onClick={handleSignOut}
                >
                  <StyledAccountCircleIcon />
                  <ListItemText primary={'Sign Out'} />
                </StyledListItem>
              </>

            )}
        </List>
      </Drawer>
      <Backdrop className={classes.backdrop} open={openDrawer} onClick={handleDrawerClose} />
    </>
  );
}

const StyledListItem = styled(ListItem)`
  &:hover {
    transition: 0.5s;
    color: red;
  }
`;

const StyledMovieIcon = styled(MovieIcon)`
  color: white;
  margin-right: 2rem;
`;

const StyledStarIcon = styled(StarsIcon)`
  color: white;
  margin-right: 2rem;
`;

const StyledChatIcon = styled(ChatIcon)`
  color: white;
  margin-right: 2rem;
`;

const StyledInfoIcon = styled(InfoIcon)`
  color: white;
  margin-right: 2rem;
`;

const StyledHomeIcon = styled(HomeIcon)`
  color: white;
  margin-right: 2rem;
`;

const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  color: white;
  margin-right: 2rem;
`;

const StyledChevronLeftIcon = styled(ChevronLeftIcon)`
  color: white;
`;

export default DrawerMenu;