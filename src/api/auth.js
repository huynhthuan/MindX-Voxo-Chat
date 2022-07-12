import axios from 'axios';
import {BASE_URL_API} from '../utils/const';

const authApi = {
  GenerateAuthCookie: params => {
    const url = BASE_URL_API + '/api/user/generate_auth_cookie';

    return axios.post(url, null, {
      params,
    });
  },
};

export default authApi;
