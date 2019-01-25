import { combineReducers } from 'redux'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import newsReducer, { moduleName as newsModule } from '../ducks/news'

export default combineReducers({
  [authModule]: authReducer,
  [newsModule]: newsReducer
})
