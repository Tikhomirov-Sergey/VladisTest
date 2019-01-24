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

export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`

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
            return state.set('user', payload.user)
            break;

        case SIGN_OUT_SUCCESS:
            return state.set('user', null)
            break;

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

export function signOut() {
    return {
        type: SIGN_OUT_SUCCESS,
        payload: null
    }
}

/**
 * Sagas
 **/

export function* signInSaga({ payload }) {
    
    const { email, password } = payload
    const user = yield call(singInApi)

    yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
    })
}

export function* saga() {
    yield all([takeEvery(SIGN_IN_REQUEST, signInSaga)])
}
