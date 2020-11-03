import Global from "@utils/global";
import baseApi from "./base";
import UtilService from "@utils/utils";
import * as config from "../config";
import base64 from 'base-64';

module.exports = {
  createCart(token, data, cb) {
    var requestData = {
      "Request": {
        token,
        data
      },
      "Flags": {}
    }

    baseApi.basicApi('/v1/cart/create', 'POST', requestData, (err, res) => {
      cb(err, res)
    })
  },

  addToCart(cartId, token, data, cb) {
    var requestData = {
      "Request": {
        cartId,
        token,
        data
      },
      "Flags": {}
    }

    baseApi.basicApi('/v1/cart/add', 'POST', requestData, (err, res) => {
      cb(err, res)
    })
  },

  viewCart(cartId, cb) {
    var requestData = {
      "Request": cartId,
      "Flags": {
        "lockcartifunlocked": true,
        "provideCoTravellerDetails": true
      }
    }

    baseApi.basicApiWithRawResponse('/v1/cart', 'POST', requestData, (err, res) => {
      cb(err, res)
    })
  },

  removeFromCart(cartId, token, data, cb) {
    var requestData = {
      "Request": {
        cartId,
        token,
        data
      },
      "Flags": {}
    }

    baseApi.basicApi('/v1/cart/remove', 'POST', requestData, (err, res) => {
      cb(err, res)
    })
  },
  
  book(cartId, paymentGatewayId, paymentReturnUrl, cb) {
    var requestData = {
      paymentGatewayId,
      paymentReturnUrl,
      request:cartId,
      "Flags": {}
    }

    baseApi.basicApi('/v1/cart/book', 'POST', requestData, (err, res) => {
      cb(err, res.data)
    })
  },
  
  getMyBookings(bookingType, filters, sorts, cb) {
    var requestData = {
      "Request": {
        data: bookingType,
      },
      "Flags": {}
    }

    baseApi.basicApi('/v1/mybookings', 'POST', requestData, (err, res) => {
      cb(err, res)
    })
  },

  getMyBookingq(requestData, cb) {
    var requestData = {
      "Request": requestData,
      "Flags": {}
    }

    baseApi.basicApi('/v1/mybookings/details', 'POST', requestData, (err, res) => {
      cb(err, res)
    })
  },
};
