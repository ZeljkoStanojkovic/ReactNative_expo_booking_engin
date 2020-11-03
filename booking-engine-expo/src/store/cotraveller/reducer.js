import * as types from "./actionTypes";

const initialState = {
  coTravellers: [],
  coTraveller:null,
  type: types.NONE,
  status: types.NONE,
  result: null,
  error: null,
};

export default function common(state = initialState, action = {}) {
  switch (action.type) {
    case types.COTRAVELLER_GET:
      if (action.result) {
        state.coTravellers = action.result
      }
      return {
        ...state,
        type: types.COTRAVELLER_GET,
        status: action.status,
        result: action.result,
        error: action.error,
      }
    case types.COTRAVELLER_CREATE:
      if (action.result) {
        state.coTraveller = action.result
      }
      return {
        ...state,
        type: types.COTRAVELLER_CREATE,
        status: action.status,
        result: action.result,
        error: action.error,
      }
    case types.COTRAVELLER_UPDATE:
      if (action.result) {
        state.coTraveller = action.result
      }
      return {
        ...state,
        type: types.COTRAVELLER_UPDATE,
        status: action.status,
        result: action.result,
        error: action.error,
      }
    case types.COTRAVELLER_DELETE:
      if (action.result) {
        state.coTraveller = null
      }
      return {
        ...state,
        type: types.COTRAVELLER_DELETE,
        status: action.status,
        result: action.result,
        error: action.error,
      }
    default:
      return state;
  }
}
