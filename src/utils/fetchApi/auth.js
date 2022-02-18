import { baseApi } from './index';
import { destroyCookie, parseCookies } from 'nookies';

export async function register(setLoading, setAlert, { username, password }) {
  setLoading(true);
  return await baseApi.post('/auth/register', {
    username,
    password,
  })
    .then((res) => {
      console.log("res", res);
      return res;
    })
    .catch((err) => {
      console.log("err", err);
      setAlert({
        status: true,
        message: err.response.data.message,
      });
      return err;
    })
    .finally(() => {
      setLoading(false);
    });
}

export async function login(setLoadingState, setAlert, { username, password }) {
  setLoadingState(true);
  return baseApi
    .post(`/auth/login`, {
      username,
      password,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      setAlert({
        status: true,
        message: err?.response?.data?.message,
      });
      return err.response;
    })
    .finally(() => {
      setLoadingState(false);
    });
}

export async function logout(setAlert) {
  const res = destroyCookie(null, 'token');
  if (res) {
    setAlert({
      status: true,
      message: 'Logout Successfully',
    });
    return true;
  }
}

// export async function updatePassword(setLoadingState, setAlert, { username, password, newPassword }) {
//   setLoadingState(true);
//   const data = { username, password, newPassword };
//   return fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}superadmin`, {
//     method: 'PUT',
//     withCredentials: true,
//     credentials: 'include',
//     connection: 'keep-alive',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${parseCookies()['token']}`,
//     },
//     body: JSON.stringify(data),
//   }).then(async (res) => {
//     setLoadingState(false);
//     return await res.json();
//   });
// }
