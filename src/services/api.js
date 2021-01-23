import axios from 'axios';
import config from '../config';
import store from '../store';

// Config axios defaults.
const AxiosInstance = axios.create({
  baseURL: config.baseUrl,
  timeout: 100000,
});

AxiosInstance.interceptors.request.use((conf) => {
  const state = store.getState();
  const newConf = { ...conf };

  newConf.headers.common['Content-Type'] = 'application/json';
  newConf.headers.common['Accept'] = 'application/json';

  // Pass auth token as header field
//   if (state.auth.token) {
//     newConf.headers.common.Authorization = `Bearer ${state.auth.token}`;
//   }

  return newConf;
});

export default AxiosInstance;
