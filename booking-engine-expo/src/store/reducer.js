import { combineReducers } from 'redux'

import common from './common'
import auth from './auth'
import user from './user'
import cotraveller from './cotraveller'
import hotel from './hotel'

export default combineReducers({
  common,
  auth,
  user,
  cotraveller,
  hotel
})
