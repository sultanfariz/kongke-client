import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { makeStyles } from '@mui/styles';
import {
  Alert,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Link as MaterialLink,
  Snackbar,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import styles from '../../styles/Home.module.css';
import { BottomNav } from '../../src/components/navigation/BottomNav';
import { passwordValidation } from '../../src/utils/validation';
import { register } from '../../src/utils/fetchApi/auth';
import { jwtDecode } from '../../src/utils/jwt';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '0',
    padding: '4rem 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  snackbar: {
    marginBottom: '76px',
  },
  textField: {
    width: '100%',
  },
}));

export default function Register() {
  const classes = useStyles();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState({
    username: {
      status: false,
      message: '',
    },
    password: {
      status: false,
      message: '',
    },
  });
  const [alert, setAlert] = useState({
    status: false,
    error: false,
    message: '',
  });

  useEffect(() => {
    const { id } = jwtDecode();
    if (!id) setIsAuthenticated(false);
    else setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleOnChange = (e) => {
    switch (e.target.name) {
      case 'username':
        setData({ ...data, username: e.target.value });
        break;
      case 'password':
        setData({ ...data, password: e.target.value });
        passwordValidation(e.target.value)
          ? setError({ ...error, password: { status: false, message: '' } })
          : setError({
            ...error,
            password: {
              status: true,
              message: 'password must be at least 6 char',
            },
          });
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (data.username === '' || data.password == '') {
      setAlert({
        status: true,
        message: 'please fill all fields',
      });
    } else {
      const res = await register(setLoading, setAlert, data);
      switch (res.status) {
        case 201:
          setAlert({ status: true, error: false, message: 'Successfully registered, please login' });
          // router.push('/account/login');
          break;
        default:
          break;
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({ ...alert, status: false });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Register</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Snackbar open={alert.status} autoHideDuration={6000} onClose={handleClose} className={classes.snackbar}>
        <Alert onClose={handleClose} severity={alert.error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>

      <main className={styles.main}>
        <p className={styles.description}>Create an account</p>

        <div style={{ width: '100%' }}>
          <Box component='form' className={classes.form} onSubmit={(e) => handleOnSubmit(e)}>
            <TextField
              className={classes.textField}
              label='Username'
              name='username'
              path='text'
              fullWidth
              onChange={(e) => handleOnChange(e)}
              error={error.username.status}
              helperText={error.username.message}
            ></TextField>
            <br />
            <TextField
              className={classes.textField}
              label='Password'
              name='password'
              value={data.password}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              onChange={(e) => handleOnChange(e)}
              error={error.password.status}
              helperText={error.password.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <br />
            {loading ? (
              <Button type='submit' variant='contained' className={classes.button} disabled>
                Loading...
              </Button>
            ) : error.password.status || error.username.status ? (
              <Button type='submit' variant='contained' className={classes.button} disabled>
                Register
              </Button>
            ) : (
              <Button type='submit' variant='contained' className={classes.button}>
                Register
              </Button>
            )}
          </Box>
          <Typography variant='body2' color='textSecondary' align='center' style={{ marginTop: '3rem' }}>
            Already have an account? <MaterialLink href='/account/login'>Login</MaterialLink>
          </Typography>
        </div>
      </main>

      <BottomNav label='Account' />
    </div>
  );
}
