import React from 'react';
import { Container, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flow-root',
    minHeight: '100vh',
    maxWidth: '576px',
    margin: 'auto',
    padding: '40px 20px',
  },
}));

export const ContainerLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Box>
      <Container className={classes.root}>
        <Box>{children}</Box>
      </Container>
    </Box>
  );
};

ContainerLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};
