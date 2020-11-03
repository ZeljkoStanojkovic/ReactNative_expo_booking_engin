import * as types from './actionTypes';
import api from '@services'

export function login(email, password){
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({type:types.AUTH_LOGIN, status:types.LOADING})
      api.auth.login(email, password, (error, result)=>{
        resolve(error)
        dispatch({type:types.AUTH_LOGIN, status:error?types.FAILED:types.SUCCESS, error, result})
      })
    })
  }
} 

export function  socialLogin(requestData, socialType){
  return dispatch =>{
    return new Promise((resolve, reject) => {
      dispatch({type:types.AUTH_REGISTER, status:socialType=='facebook'?types.LOADING_FACEBOOK:types.LOADING_GOOGLE})
      api.auth.signupWithOpenID(requestData, (error, result)=>{
        dispatch({type:types.AUTH_REGISTER, status:error?types.FAILED:types.SUCCESS, error, result})
        resolve({error, result})
      })
    })
  }
} 

export const  socialGoogleLogin = (requestData) => dispatch =>{
  var q = new Promise((resolve, reject) => {
    dispatch({type:types.AUTH_LOGIN, status:types.LOADING_GOOGLE})
    api.auth.signupWithOpenID(requestData, (error, result)=>{
      dispatch({type:types.AUTH_LOGIN, status:error?types.FAILED:types.SUCCESS, error, result})
    })
  })

  return q
}

export function loginWithPhone(phoneNumber, countryCode, password){
  return dispatch=>{
    dispatch({type:types.AUTH_LOGIN, status:types.LOADING})
    api.auth.loginWithPhoneNumber(phoneNumber, countryCode, password, (error, result)=>{
      dispatch({type:types.AUTH_LOGIN, status:error?types.FAILED:types.SUCCESS, error, result})
    })
  }
}

export function logout(cb){
  return dispatch=>{
    api.auth.logout(cb)
    dispatch({type:types.AUTH_LOGOUT})
  }
}

export function disableLogoutToast(){
  return dispatch=>{
    api.auth.logout()
    dispatch({type:types.AUTH_LOGOUT})
  }
}

export function register(data){
  return dispatch=>{

    dispatch({type:types.AUTH_REGISTER, status:types.LOADING})

    return new Promise((resolve, reject)=>{
      api.auth.signup(data, (error, result)=>{
        dispatch({type:types.AUTH_REGISTER, status:error?types.FAILED:types.SUCCESS, error, result})
        resolve({error, result})
      })
    })
  }
}

export function setAuthUser(user){
  return dispatch=>{
    dispatch({type:types.AUTH_USER, status:types.SUCCESS, error:null, result: user})
  }
}

export function forgetPassword(data){
  //console.log('forget password', data)
  return dispatch=>{
    return new Promise((resolve, reject)=>{
      dispatch({type:types.AUTH_FORGOT, status:types.LOADING})
      api.auth.forgetPassword(data, (error, result)=>{
        dispatch({type:types.AUTH_FORGOT, status:error?types.FAILED:types.SUCCESS, error, result})
        resolve({error})
      })  
    })
  }
}
