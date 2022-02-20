import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import { Button } from '@mui/material';
import { logout } from '../../src/utils/fetchApi/auth';
import dummyPP from '../../public/profile-dummy.png';

import router from 'next/router';
import { useEffect, useState } from 'react';
// import { signIn, useSession, signOut } from 'next-auth/client';
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_REVIEWER_BY_EMAIL, POST_REVIEWER, DELETE_REVIEW } from '../../src/libs/GraphQL/query';
// import Loading from '../../src/components/Page/Loading';
// import Error from '../../src/components/Page/Error';
// import AccountReviewCard from '../../src/components/Card/AccountReviewCard';

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

  const signout = async () => {
    const res = await logout(setAlert);
    switch (res) {
      case 200:
        router.push('/account/login');
        break;
      default:
        break;
    }
  }

  return (
    <div className={classes.root}>
      <Image
        className={classes.roundedImage}
        src={dummyPP}
        width={125}
        height={125}
        alt={"dummy"}
      />
      {/* <h2 style={{ marginBottom: '5px' }}>{session?.user?.name}</h2> */}
      <h2 style={{ marginBottom: '5px' }}>User</h2>
      {/* <p className={classes.text}>Joined on: {new Date().toDateString()}</p> */}
      <Button style={{ marginTop: '15px' }} variant='contained' color='primary' onClick={() => signout()}>
        Sign out
      </Button>
      <div className={classes.horizontalLine}></div>

      {/* {getByEmailLoading || deleteReviewLoading ? (
        <Loading />
      ) : getByEmailError || deleteReviewError ? (
        <Error />
      ) : (
        getByEmailData?.spill_reviewer[0]?.reviews?.map((review) => {
          return <AccountReviewCard review={review} key={review.id} removeCard={removeReview} />;
        })
      )} */}
    </div>
  );
}
