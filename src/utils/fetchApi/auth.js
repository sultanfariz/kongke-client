import { baseApi } from './index';
import { destroyCookie, parseCookies } from 'nookies';

export async function register(setLoading, setAlert, { username, password }) {
  setLoading(true);
  return await baseApi
    .post('/auth/register', {
      username,
      password,
    })
    .then((res) => {
      console.log('res', res);
      return res;
    })
    .catch((err) => {
      console.log('err', err);
      setAlert({
        status: true,
        error: true,
        message: err?.response?.data?.message,
      });
      return err.response;
    })
    .finally(() => {
      setLoading(false);
    });
}

export async function login(setLoading, setAlert, { username, password }) {
  setLoading(true);
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
      setLoading(false);
    });
}

export async function logout(setLoading, setAlert) {
  setLoading(true);
  const serverRes = await baseApi
    .post(`/auth/logout`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      setAlert({
        status: true,
        message: err?.response?.data?.message,
      });
      return false;
    });
  if (serverRes.status === 202) {
    const res = destroyCookie(null, 'token');
    if (res) {
      setAlert({
        status: true,
        error: false,
        message: 'Logout Successfully',
      });
      setLoading(false);
      return true;
    }
  }
  setLoading(false);
  return false;
}

// export async function updatePassword(setLoading, setAlert, { username, password, newPassword }) {
//   setLoading(true);
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
//     setLoading(false);
//     return await res.json();
//   });
// }
