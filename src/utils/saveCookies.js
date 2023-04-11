import Cookies from 'js-cookie';
import { COOKIES_TYPE } from './enum';

export const saveCookies = (name, cookieValue = '') => {
  if (!name) return;
  if (name === COOKIES_TYPE.SESSIONID) {
    // Check if a cookie with the identifier already exists
    Cookies.get(COOKIES_TYPE.SESSIONID) || generateUserId();

    // Generate a new user ID if the cookie doesn't exist
    function generateUserId() {
      const userId = Math.random().toString(36).substring(2, 30);
      Cookies.set(COOKIES_TYPE.SESSIONID, userId);
    }
  } else if (name === COOKIES_TYPE.VISITORID && cookieValue) {
    Cookies.get(COOKIES_TYPE.VISITORID) || Cookies.set(COOKIES_TYPE.VISITORID, cookieValue);
  }
};
