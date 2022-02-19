import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import { Button } from '@mui/material';
import router from 'next/router';
import notFound from '../public/404.png';
import { BottomNav } from '../src/components/navigation/BottomNav';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.primary,
    marginTop: '1rem',
  },
  text: {
    margin: '5px auto',
  },
}));

export default function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Image src={notFound} alt='notfound' />
      <h1 style={{ margin: '5px auto' }}>404 Not Found</h1>
      <p className={classes.text}>The page you are looking for does not exist.</p>
      <Button
        variant='contained'
        color='primary'
        style={{ marginTop: '15px' }}
        // redirect to login page
        onClick={() => router.push('/')}
      >
        Back to Homepage
      </Button>
      <BottomNav />
    </div>
  );
}
