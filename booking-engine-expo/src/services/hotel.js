import Global from "@utils/global";
import baseApi from "./base";
import UtilService from "@utils/utils";
import * as config from "../config";
import base64 from 'base-64';

module.exports = {
  searchLocation(query, location, cb) {
    //   {
    //     "Location": {
    //         "Latitude": 23.0339049,
    //         "Longitude": 72.5105345
    //     },
    //     "Request": "Singa",
    //     "Flags": {}
    // }
    var request = {
      "location": location?{
        latitude:location.latitude,
        longitude:location.longitude,
      }:null,
      "request": query,
      "Flags": {}
    }

    console.log('location request', request)
    baseApi.basicApi('/v1/hotel/search/location', 'POST', request, (err, res) => {
      cb(err, res)
    })
  },

  /* 
   * locationInfo : result of searchLocation api
   * checkIn, checkOut: full datetime format string ex) "2018-12-23T17:59:44"
   * paxInfo : includes rooms/adults/childrens
   * 
   * callback(error, pagedResult, token)
   */
  search(requestData, cb) {
    //console.log('requestData', requestData)
    baseApi.basicApiWithRawResponse('/v1/hotel/search', 'POST', requestData, (err, res) => {
      if(!err && res.firstPage) {
        cb(null, res.firstPage.response, res.response.token)
      } else if(!err){
        cb(res.errs[0])
      } else {
        cb(err)
      }
    })
  },

  searchPage(requestData, cb) {
    baseApi.basicApi('/v1/hotel/search/page', 'POST', requestData, (err, res) => {
      cb(err, res)
    })
  },

  getDetail(data, token, cb) {
    var requestData = {
      "Request": {
        data,
        token
      },
      "Flags": {}
    }
    baseApi.basicApi('/v1/hotel/details', 'POST', requestData, (err, res) => {
      if(!err && res && res[0].item) {
        cb(null, res[0].item[0])
      } else
        cb(err, null)
    })
  },

  searchMap(token, cb) {
    var requestData = {
      "request": {
        token
      },
      "flags": {}
    }
    baseApi.basicApi('/v1/hotel/search/map', 'POST', requestData, (err, res) => {
      if(!err && res.data) {
        cb(null, res.data)
      } else
        cb(err, [])
    })
  },

  recentSearch(cb) {
    var requestData = {
      "request": "",
      "flags": {}
    }
    baseApi.basicApi('/v1/home/recent/search', 'POST', requestData, (err, res) => {
      //console.log('recentSearch', err, res)
      if(!err) {
        cb(null, res)
      } else
        cb(err, [])
    })
  },
};
