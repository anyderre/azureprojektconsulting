import { saveCookies } from './saveCookies';
import { COOKIES_TYPE } from './enum';
import Cookies from 'js-cookie';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const saveVisitorId = () => {
  Cookies.get(COOKIES_TYPE.VISITORID) || generateVisitorId();
  function generateVisitorId() {
    FingerprintJS.load().then((fp) => {
      fp.get().then((result) => {
        saveCookies(COOKIES_TYPE.VISITORID, result.visitorId);
      });
    });
  }
};
