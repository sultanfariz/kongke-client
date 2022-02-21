import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import { Button } from '@mui/material';
import router from 'next/router';
import forbidden from '../../../public/forbidden.webp';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.primary,
  },
  text: {
    margin: '5px auto',
  },
  button: {
    marginTop: '1rem',
  },
}));

export default function Forbidden() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Image src={forbidden} alt='forbidden' />
      <h1 className={classes.text}>403 Forbidden</h1>
      <p className={classes.text}>Please login to access this page</p>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        // redirect to login page
        onClick={() => router.push('/account/login')}
      >
        Login
      </Button>
    </div>
  );
}
