import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import styles from '../../styles/Home.module.css';
import { RoomCard } from '../../src/components/card/RoomCard';
import { BottomNav } from '../../src/components/navigation/BottomNav';
import { jwtDecode } from '../../src/utils/jwt';
import Forbidden from '../../src/components/pages/Forbidden';
// import NavTabs from '../../src/components/Button/SearchFilterTab';

const rooms = [
  {
    id: 1,
    name: 'Sobat Gurun',
    description: 'This is Sobat Gurun group chat',
    image: 'https://cf.shopee.co.id/file/ff33c34cfed03b88596565e948b639c9',
  },
  {
    id: 2,
    name: 'Room 2',
    description: 'This is room 2',
    image: 'https://images.unsplash.com/photo-1645389419250-58715c9d06ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5rem',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
}));

export default function Search() {
  const classes = useStyles();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const router = useRouter();
  // const keyword = router.query.keyword;
  // const order = router.query.order;
  // const [orderBy, setOrderBy] = useState(order);
  // const [searchData, setSearchData] = useState([]);
  // const [tab, setTab] = useState(0);

  useEffect(() => {
    const { id } = jwtDecode();
    if (!id) setIsAuthenticated(false);
    else setIsAuthenticated(true);
  }, []);

  // useEffect(() => {
  //   if (order === 'newest') {
  //     setOrderBy('newest');
  //     setTab(1);
  //   } else if (order === 'popularity' || order === undefined) {
  //     setOrderBy('popularity');
  //     setTab(0);
  //   }
  // }, [order]);

  // useEffect(() => {
  //   if (orderBy === 'newest') {
  //     newestRefetch();
  //     setSearchData(newestData?.spill_review);
  //   } else if (orderBy === 'popularity') {
  //     popularityRefetch();
  //     setSearchData(popularityData?.spill_review);
  //   }
  // }, [orderBy]);

  // useEffect(() => {
  //   if (newestData) {
  //     setSearchData(newestData.spill_review);
  //   }
  // }, [newestData]);

  // useEffect(() => {
  //   if (popularityData) {
  //     setSearchData(popularityData.spill_review);
  //     // setTab(1);
  //   }
  // }, [popularityData]);

  return (
    // <main className={styles.main}>
    !isAuthenticated ? (<Forbidden />) : (<main className={classes.root}>
      {/* <NavTabs keyword={keyword} tab={tab} /> */}
      {rooms?.map((room) => {
        return <RoomCard room={room} key={room.id} />;
      })}
      <BottomNav label='Home' />
    </main>)
  );
}
