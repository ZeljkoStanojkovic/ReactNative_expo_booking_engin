import * as types from './actionTypes';
import api from '@services'
import Global from "@utils/global";

export function searchLocations(query, location){
  return dispatch=>{
    dispatch({type:types.GET_LOCATIONS, status:types.LOADING})

    return new Promise((resolve, reject)=>{
      api.hotel.searchLocation(query, location, (error, result)=>{
        //console.log('searchLocations', error, result)
        dispatch({type:types.GET_LOCATIONS, status:error?types.FAILED:types.SUCCESS, error, result})
        resolve({error, result})
      })
    })
  }
}

export function selectLocation(location){
  return dispatch=>{
    dispatch({type:types.SELECT_LOCATION, status:types.SUCCESS, error:null, result:location})
  }
}

export function selectDate(fromDate, toDate){
  return dispatch=>{
    dispatch({type:types.SELECT_DATE, status:types.SUCCESS, error:null, result:{fromDate, toDate}})
  }
}

export function selectRoom(rooms){
  return dispatch=>{
    dispatch({type:types.SELECT_ROOM, status:types.SUCCESS, error:null, result:rooms})
  }
}

export function searchHotel(requestData){
  return dispatch=>{
    dispatch({type:types.SEARCH_HOTEL, status:types.LOADING})
    dispatch({type:types.SET_SEARCH_DATA, searchData:requestData})

    return new Promise((resolve, reject)=>{
      api.hotel.search(requestData, (error, result, token)=>{
        dispatch({type:types.SEARCH_HOTEL, status:error?types.FAILED:types.SUCCESS, error, result, token})
        resolve({error, result, token})
      })
    })
  }
}

export function searchMap(token){
  return dispatch=>{
    dispatch({type:types.SEARCH_MAP, status:types.LOADING})

    return new Promise((resolve, reject)=>{
      api.hotel.searchMap(token, (error, result)=>{
        dispatch({type:types.SEARCH_MAP, status:error?types.FAILED:types.SUCCESS, error, result})
        resolve({error, result})
      })
    })
  }
}

export function searchHotelPage(requestData){
  // console.log('searchHotelPage - requestData', requestData)
  return dispatch=>{
    dispatch({type:types.SEARCH_HOTEL_PAGE, status:types.LOADING})

    return new Promise((resolve, reject)=>{
      api.hotel.searchPage(requestData, (error, result)=>{
        // console.log('searchHotelPage - result', error, result)
        
        dispatch({type:types.SEARCH_HOTEL_PAGE, status:error?types.FAILED:types.SUCCESS, error, result})
        resolve({error, result})
      })
    })
  }
}

export function searchHotelPageNext(requestData){
  // console.log('searchHotelPage - requestData', requestData)
  return dispatch=>{
    //dispatch({type:types.SEARCH_HOTEL_PAGE, status:types.LOADING})

    return new Promise((resolve, reject)=>{
      api.hotel.searchPage(requestData, (error, result)=>{
        // console.log('searchHotelPage - result', error, result)
        dispatch({type:types.SEARCH_HOTEL_PAGE_NEXT, status:error?types.FAILED:types.SUCCESS, error, result})
        resolve({error, result})
      })
    })
  }
}

export function getHotelDetail(id, token){
  return dispatch=>{
    dispatch({type:types.GET_HOTEL_DETAIL, status:types.LOADING})

    return new Promise((resolve, reject)=>{
      api.hotel.getDetail(id, token, (error, result)=>{
        // console.log('hotel detail', error, result)
        dispatch({type:types.GET_HOTEL_DETAIL, status:error?types.FAILED:types.SUCCESS, error, result})
        resolve({error, result})
      })
    })
  }
}

export function recentSearch(){
  return dispatch=>{
    return new Promise((resolve, reject)=>{
      api.hotel.recentSearch((error, result)=>{
        // console.log('searchHotelPage - result', error, result)
        
        dispatch({type:types.RECENT_SEARCH, status:error?types.FAILED:types.SUCCESS, error, result})
        resolve({error, result})
      })
    })
  }
}