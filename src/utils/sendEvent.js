import storage from './storage';
import { registerEvent } from '@/features/product/api/registerEvent';
import Cookies from 'js-cookie';
import { EVENT_TYPE, COOKIES_TYPE } from './enum';

export const sendEvent = async (product = null, eventType = '') => {
  if (!eventType) {
    return;
  }
  const user = storage.getUser();
  const sessionId = Cookies.get(COOKIES_TYPE.SESSIONID);
  const visitorId = Cookies.get(COOKIES_TYPE.VISITORID);
  let eventToSend = { sessionId, eventType, visitorId, dateTime: new Date() };

  if (eventType === EVENT_TYPE.ORDER || eventType === EVENT_TYPE.PRODUCT_VIEW) {
    if (!product) return;

    let pickedProdcutAttributes = {};
    if (eventType === EVENT_TYPE.ORDER) {
      pickedProdcutAttributes = (({
        productId,
        productName: title,
        productCategory: category,
        productSubCategory: sub_cateory,
      }) => ({
        productId,
        title,
        category,
        sub_cateory,
      }))(product);
    } else if (eventType === EVENT_TYPE.PRODUCT_VIEW) {
      pickedProdcutAttributes = (({ uniq_id: productId, title, category, sub_cateory }) => ({
        productId,
        title,
        category,
        sub_cateory,
      }))(product);
    }

    eventToSend = { ...eventToSend, ...pickedProdcutAttributes };
  }

  if (user) {
    delete user.password;
    eventToSend = {
      ...eventToSend,
      userId: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  await registerEvent(JSON.stringify(eventToSend));
};
