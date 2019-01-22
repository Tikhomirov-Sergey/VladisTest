import { appName } from '../config'
import { createSelector } from 'reselect'
import { Record } from 'immutable'
import { call, put, takeEvery, take, all, apply } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { replace } from 'connected-react-router'

import { singInApi } from '../api'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`
export const SIGN_IN_LIMIT = `${prefix}/SIGN_IN_LIMIT`

export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    user: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch (type) {
        case SIGN_IN_SUCCESS:
        debugger
            return state.set('user', payload.user)

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const userSelector = (state) => state[moduleName].user
export const isAuthorizedSelector = createSelector(
    userSelector,
    (user) => !!user
)

/**
 * Action Creators
 * */

export function signIn(email, password) {
    return {
        type: SIGN_IN_REQUEST,
        payload: { email, password }
    }
}

/**
 * Sagas
 **/

export function* signInSaga({ payload }) {
    
    const { email, password } = payload

   
debugger
    const user = yield call(
        singInApi
    )
    debugger
    yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
    })
}

export function* saga() {
    yield all([takeEvery(SIGN_IN_REQUEST, signInSaga)])
}
