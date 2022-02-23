import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import { Button } from '@mui/material';
import { logout } from '../../src/utils/fetchApi/auth';
import dummyPP from '../../public/profile-dummy.png';
import Forbidden from '../../src/components/pages/Forbidden';
import { jwtDecode } from '../../src/utils/jwt';
import { BottomNav } from '../../src/components/navigation/BottomNav';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.primary,
    marginTop: '45px',
    minHeight: '80vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: '5px auto',
  },
  roundedImage: {
    width: '125px',
    height: '125px',
    borderRadius: '50%',
  },
  horizontalLine: {
    height: 0,
    width: '100%',
    border: '1px solid #909090',
    margin: '30px 0',
  },
}));

export default function Account() {
  const classes = useStyles();
  const router = useRouter();
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    status: false,
    message: '',
  });

  useEffect(() => {
    const { id, username } = jwtDecode();
    if (!id) setIsAuthenticated(false);
    else {
      setIsAuthenticated(true);
      setUser({ id, username });
    }
  }, []);

  const signout = async () => {
    const res = await logout(setLoading, setAlert);
    if (res) router.push('/account/login');
  };

  return (
    <>
      {!isAuthenticated ? (
        <Forbidden />
      ) : (
        <div className={classes.root}>
          <>
            <Image className={classes.roundedImage} src={dummyPP} width={125} height={125} alt={'dummy'} />
            <h2 style={{ marginBottom: '5px' }}>{user.username}</h2>
            {/* <p className={classes.text}>Joined on: {new Date().toDateString()}</p> */}
            {loading ? (
              <Button type='submit' variant='contained' className={classes.button} disabled>
                Loading...
              </Button>
            ) : (
              <Button style={{ marginTop: '15px' }} variant='contained' color='primary' onClick={() => signout()}>
                Sign out
              </Button>
            )}
            <div className={classes.horizontalLine}></div>
          </>
        </div>
      )}
      <BottomNav label='Account' />
    </>
  );
}
