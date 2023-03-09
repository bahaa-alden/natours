/*eslint-disable */

import axios from 'axios';
import { cuteToast } from './cute/cute-alert';

export const updateUserData = async (body) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
      data: body,
    });
    if (res.data.status === 'success') {
      cuteToast({
        type: 'success',
        title: 'Success',
        message: 'Your data has been updated',
        timer: 2000,
      }).then(() => {
        location.reload(true);
      });
    }
  } catch (err) {
    console.log(err);
    cuteToast({
      type: 'error',
      title: 'Error',
      message: err.response.data.message,
      timer: 2500,
    });
  }
};

export const updateUserPassword = async (body) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/updateMyPassword',
      data: body,
    });
    if (res.data.status === 'success') {
      cuteToast({
        type: 'success',
        title: 'Success',
        message: 'Your password has been updated',
        timer: 2000,
      }).then(() => {
        location.reload(true);
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
