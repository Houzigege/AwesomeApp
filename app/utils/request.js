import axios from 'axios'
const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://39.105.201.251:8080/distributor' : 'http://39.105.201.251:8080/distributor';
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json; charset=UTF-8';
  // let token = localStorage.getItem('TOKEN');
  // if(token && token != null){
  //   config.headers['TOKEN'] = token;
  // }
  return config;
}, error => {
  Promise.reject(error);
});

service.interceptors.response.use(response => {
  const res = response.data;
  if (res.code === 2) {
    console.log('err');
    return false
  }
  return res;
}, error => {
  console.log(error);
  return Promise.reject(error)
});

export default service;