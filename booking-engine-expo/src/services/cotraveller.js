import Global from "@utils/global";
import baseApi from "./base";

module.exports = {
  getCoTravellers(cb) {
    baseApi.basicApi('v1/cotraveler/details', 'POST', {
      "Request": "",
      "Flags": {}
    }, (err, res) => {
      cb(err, res)
    })
  },
  create(userData, cb) {
    baseApi.basicApi('/v1/cotraveler/create', 'POST', {
      "request": userData,
      "Flags": {}
    }, (err, res) => {
      cb(err, res)
    })
  },
  update(userData, cb) {
    baseApi.basicApi('/v1/cotraveler/update', 'POST', {
      "request": userData,
      "Flags": {}
    }, (err, res) => {
      cb(err, res)
    })
  },
  delete(userData, cb) {
    baseApi.basicApi('/v1/user/delete', 'POST', {
      "request": userData,
      "Flags": {}
    }, (err, res) => {
      cb(err, res)
    })
  }
};
