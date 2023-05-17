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
  getPage: () => {
    return window.localStorage.getItem(`${storagePrefix}page`) ?? 0;
  },
  setToken: (token) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  setPage: (page) => {
    window.localStorage.setItem(`${storagePrefix}page`, page);
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
  clearPage: () => {
    window.localStorage.removeItem(`${storagePrefix}page`);
  },
};

export default storage;
