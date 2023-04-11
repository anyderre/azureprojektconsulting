import jwtDecode from 'jwt-decode';
const storagePrefix = 'azure_project_consulting_';

const storage = {
  getToken: () => {
    const token = window.localStorage.getItem(`${storagePrefix}token`) ?? null;
    return token && token !== null && token !== undefined && token !== 'undefined'
      ? JSON.parse(token)
      : token;
  },
  getUser: () => {
    const token = window.localStorage.getItem(`${storagePrefix}token`) ?? null;

    return token && token !== null && token !== undefined && token !== 'undefined'
      ? jwtDecode(window.localStorage.getItem(`${storagePrefix}token`))['user']
      : null;
  },
  setToken: (token) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
