import { all } from 'redux-saga/effects'
import { saga as authSaga } from '../ducks/auth'
import { saga as newsSaga } from '../ducks/news'
import { saga as profileSaga } from '../ducks/profile'
import { saga as errorSaga } from '../ducks/error'

export default function*() {
  yield all([authSaga(), newsSaga(), profileSaga(), errorSaga()])
}