import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Box, TextField, Button } from '@mui/material';
import styles from '../styles/Home.module.css';
import { BottomNav } from '../src/components/navigation/BottomNav';
import { jwtDecode, getJwt } from '../src/utils/jwt';
import Forbidden from '../src/components/pages/Forbidden';
import { makeStyles } from '@mui/styles';
import { io } from 'socket.io-client';

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
    // width: '100%',
  },
  textField: {
    // width: '100%',
    marginRight: '1rem',
  }
}));

export default function Home() {
  const classes = useStyles();
  const [socket, setSocket] = useState(null);
  const [jwt, setJwt] = useState(getJwt());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([])
  // const [messageSent, setMessageSent] = useState();
  // const [newMessage, setNewMessage] = useState({});
  const [message, setMessage] = useState({
    user: user?.username,
    text: '',
  })

  useEffect(() => {
    const { id, username } = jwtDecode();
    if (!id) setIsAuthenticated(false);
    else {
      const jwt = getJwt();
      setJwt(jwt);
      setUser({ id, username });
      setMessage({ user: username, text: '' });
      setIsAuthenticated(true);
      const socket = io('http://localhost:5000', {
        transports: ['websocket'],
        extraHeaders: { Authorization: `Bearer ${jwt}` },
        query: `token=${jwt}`
      });
      socket
        .emit('authenticate', { token: jwt })
        .on('authenticated', function () {
          //do other things
          // console.log("authenticated")
          setIsAuthenticated(true);
        })
        .on('unauthorized', (msg) => {
          // console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
          setIsAuthenticated(false);
        })
      setSocket(socket);
    }
  }, []);


  // useEffect(() => {
  //   const socket = io('http://localhost:5000', {
  //     transports: ['websocket'],
  //     extraHeaders: { Authorization: `Bearer ${jwt}` },
  //     query: `token=${jwt}`
  //   });
  //   socket
  //     .emit('authenticate', { token: jwt })
  //     .on('authenticated', function () {
  //       //do other things
  //       // console.log("authenticated")
  //       setIsAuthenticated(true);
  //     })
  //     .on('unauthorized', (msg) => {
  //       // console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
  //       setIsAuthenticated(false);
  //     })
  //   setSocket(socket);
  //   console.log("jwt", jwt)
  // }, [jwt]);

  // useEffect(() => {
  //   socket.emit('chat', messageSent);
  //   // console.log("jwtatas", jwt)
  // }, [messageSent, socket]);

  useEffect(() => {
    socket?.on("connect_error", (err) => {
      if (err.message === "no token provided" || err.message === "jwt expired")
        setIsAuthenticated(false);
      // console.log(`connect_error due to ${err.message}`);
    });
    socket?.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        // console.log("reason", reason);
        socket.connect();
      }
      // else the socket will automatically try to reconnect
    });
    socket?.on('chat', (data) => {
      console.log("socket on", data);
      // setMessages(messages => [...messages, data])
      setMessages([...messages, data])
      // setNewMessage(data);
    })
    // console.log("jwtbawah", jwt)
    // console.log("render")
  }, [messages, socket]);

  // console.log("messages", messages)

  const sendMessage = (e) => {
    // const socket = io('http://localhost:5000', {
    //   transports: ['websocket'],
    //   extraHeaders: { Authorization: `Bearer ${jwt}` },
    //   query: `token=${jwt}`
    // });
    // socket
    //   .emit('authenticate', { token: jwt })
    //   .on('authenticated', function () {
    //     //do other things
    //     // console.log("authenticated")
    //     setIsAuthenticated(true);
    //   })
    //   .on('unauthorized', (msg) => {
    //     // console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
    //     setIsAuthenticated(false);
    //   })
    // socket.on("connect_error", (err) => {
    //   if (err.message === "no token provided" || err.message === "jwt expired")
    //     setIsAuthenticated(false);
    //   // console.log(`connect_error due to ${err.message}`);
    // });
    // socket.on("disconnect", (reason) => {
    //   if (reason === "io server disconnect") {
    //     // the disconnection was initiated by the server, you need to reconnect manually
    //     // console.log("reason", reason);
    //     socket.connect();
    //   }
    //   // else the socket will automatically try to reconnect
    // });
    // socket.on('chat', (data) => {
    //   console.log("socket on", data);
    //   // setMessages(messages => [...messages, data])
    //   setMessages([...messages, data])
    //   // setNewMessage(data);
    // })
    e.preventDefault()
    socket.emit('chat', message)
    // setMessageSent({ user: message.user, text: message.text });
    // console.log("message", message)
    setMessage({ ...message, text: '' });
  }

  return (
    <div className={styles.container}>
      {!isAuthenticated ? <Forbidden /> : (
        <>
          <Head>
            <title>Kongke</title>
            <meta name='description' content='Generated by create next app' />
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>
              Welcome to <a href='https://kongke.vercel.app'>Kongke!</a>
            </h1>

            {/* <p className={styles.description}>
              Get started by editing <code className={styles.code}>pages/index.js</code>
            </p> */}

            {/* chatbox */}
            <Box
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'center',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginTop: '1rem',
              }}>
              <Box
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  justifyContent: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}>
                {messages.map((message, index) => (
                  <p key={index}
                    style={{
                      margin: '0.5rem 0',
                    }}
                  ><strong>{`${message.user}: `}</strong>{message.text}</p>
                ))}
              </Box>
            </Box>

            <div
              // className={styles.grid}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // width: '100%',
                width: '464px',
                position: 'fixed',
                bottom: '76px',
                backgroundColor: '#fff',
              }}
            >
              <TextField
                className={classes.textField}
                label='Type your message here'
                name='chat'
                path='text'
                fullWidth
                value={message.text}
                onChange={e => setMessage({ ...message, text: e.target.value })}
              // onChange={(e) => handleOnChange(e)}
              // error={error.username.status}
              // helperText={error.username.message}
              ></TextField>
              <Button type='submit' variant='contained' className={classes.button}
                onClick={sendMessage}>Send</Button>

              {/* <a href='https://nextjs.org/docs' className={styles.card}>
                <h2>Documentation &rarr;</h2>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>

              <a href='https://nextjs.org/learn' className={styles.card}>
                <h2>Learn &rarr;</h2>
                <p>Learn about Next.js in an interactive course with quizzes!</p>
              </a>

              <a href='https://github.com/vercel/next.js/tree/canary/examples' className={styles.card}>
                <h2>Examples &rarr;</h2>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>

              <a
                href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
                className={styles.card}
              >
                <h2>Deploy &rarr;</h2>
                <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
              </a> */}
            </div>
          </main>

          <footer className={styles.footer}>
            <a
              href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
              target='_blank'
              rel='noopener noreferrer'
            >
              Powered by{' '}
              <span className={styles.logo}>
                <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
              </span>
            </a>
          </footer>
        </>
      )
      }
      <BottomNav label='Home' />
    </div >
  );
}
