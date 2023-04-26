import axios from 'axios';

let dataCache = [];

export const getData = async () => {
  if (!dataCache || dataCache.length <= 0) {
    const response = await axios.get(
      'https://shophsalbsig.blob.core.windows.net/storage/data.json'
    );
    dataCache = response.data;
  }
  return dataCache;
};
