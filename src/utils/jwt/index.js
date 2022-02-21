import { parseCookies } from 'nookies';

export function jwtDecode() {
  const { token } = parseCookies();
  const decode = token?.split('.')[1];
  const base64 = decode?.replace('-', '+').replace('_', '/');
  if (!token || !decode || !base64)
    return {
      Id: 0,
      Email: '',
      Member: false,
      OperationalAdmin: false,
      Superadmin: false,
      exp: 0,
    };
  return JSON.parse(window.atob(base64));
}

export function getJwt() {
  return parseCookies()['token'];
}
