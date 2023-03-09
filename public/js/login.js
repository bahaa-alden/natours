/* eslint-disable*/
import axios from 'axios';
import { cuteToast } from './cute/cute-alert';

export const login = async (body) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: body,
    });
    if (res.data.status === 'success') {
      cuteToast({
        type: 'success',
        title: 'Success',
        message: 'Congratulation yor are logged in',
        timer: 2000,
      }).then(() => {
        location.assign('/');
      });
    }
  } catch (err) {
    cuteToast({
      type: 'error',
      title: 'Error',
      message: err.response.data.message,
      timer: 2500,
    });
  }
};

export const logout = async () => {
  const res = await axios.post('http://127.0.0.1:3000/api/v1/users/logout');
  if (res.data.status === 'success')
    cuteToast({
      type: 'error',
      title: 'Logged out',
      message: 'You are logged out',
      timer: 1500,
    }).then(() => location.assign('/'));
};

export const signup = async (body) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/signup',
      data: body,
    });
    if (res.data.status === 'success') {
      cuteToast({
        type: 'success',
        title: 'Success',
        message: 'Congratulation you are one of our users now',
        timer: 2000,
      }).then(() => {
        location.assign('/');
      });
    }
  } catch (err) {
    cuteToast({
      type: 'error',
      title: 'Error',
      message: err.response.data.message,
      timer: 2500,
    });
  }
};
