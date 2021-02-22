import React, { useState } from 'react';
//Animation in & out
import { motion } from 'framer-motion';
import { fade } from '../styles/animation';
import { AnimatePresence } from 'framer-motion';
//MUI Components
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Loader = () => {
  const classes = useStyles();
  const [showLoader, setShowLoader] = useState(true);
  setTimeout(() => {
    setShowLoader(false);
  }, 500)

  const handleClose = () => {
    setShowLoader(false);
  }

  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence exitBeforeEnter>
        {showLoader && (
          <motion.div
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
                ease: 'easeOut',
              },
            }}
          >
            <Backdrop className={classes.backdrop} open={showLoader} onClick={handleClose}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Loader;