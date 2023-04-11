// var FingerprintJS = require('@fingerprintjs/fingerprintjs')
// import { FingerprintJS } from '@fingerprintjs/fingerprintjs';
import { saveCookies } from './saveCookies';
import { COOKIES_TYPE } from './enum';
import Cookies from 'js-cookie';

export const saveVisitorId = () => {
  Cookies.get(COOKIES_TYPE.VISITORID) || generateVisitorId();
  function generateVisitorId() {
    const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3').then((FingerprintJS) =>
      FingerprintJS.load()
    );
    fpPromise.then((fp) => {
      fp.get().then((result) => {
        saveCookies(COOKIES_TYPE.VISITORID, result.visitorId);
        console.log(result.visitorId);
      });
    });
  }
};
