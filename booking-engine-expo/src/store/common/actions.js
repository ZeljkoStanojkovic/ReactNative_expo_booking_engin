import * as types from './actionTypes';

export function setInternetConnection(status) {
  return dispatch => {
    dispatch({ type: types.SET_INTERNET_CONNECTION_STATUS, value: status })
  }
}

export function showToast(toastText, toastDuration) {
  return dispatch => {
    dispatch({ type: types.SHOW_TOAST, toastText, toastDuration: toastDuration || 3000, showToast: true })
    setTimeout(() => {
      dispatch({ type: types.SHOW_TOAST, showToast: false })
    }, 10)
  }
}
