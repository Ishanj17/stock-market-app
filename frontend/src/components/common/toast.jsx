import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function successToast(message, timer = 5000) {
  toast.success(message, {
    position: 'top-right',
    autoClose: timer,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    rtl: false,
  });

  return function (dispatch) {
    dispatch({
      type: 'SUCCESS_TOAST',
      success: true,
      message,
    });
  };
}

export function failureToast(message, timer = 5000) {
  toast.error(message, {
    position: 'top-right',
    autoClose: timer,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    rtl: false,
  });

  return function (dispatch) {
    dispatch({
      type: 'FAILURE_TOAST',
      success: false,
      message,
    });
  };
}

export function infoToast(message, timer = 5000) {
  toast.warning(message, {
    position: 'top-right', // you can change to 'top-left' if you want
    autoClose: timer,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    rtl: false,
  });

  return function (dispatch) {
    dispatch({
      type: 'WARNING_TOAST',
      success: true,
      message,
    });
  };
}