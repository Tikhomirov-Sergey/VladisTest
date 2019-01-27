import { combineReducers } from 'redux'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import newsReducer, { moduleName as newsModule } from '../ducks/news'
import profileReducer, { moduleName as profileModule } from '../ducks/profile'
import errorReducer, { moduleName as errorModule } from '../ducks/error'

export default combineReducers({
  [authModule]: authReducer,
  [newsModule]: newsReducer,
  [profileModule]: profileReducer,
  [errorModule]: errorReducer
})
