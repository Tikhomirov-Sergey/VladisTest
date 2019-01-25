import { appName } from '../config'
import { createSelector } from 'reselect'
import { Record } from 'immutable'
import { call, put, takeEvery, take, all, apply, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { replace } from 'connected-react-router'

import Api from '../api'
import LocalStorageHelper from '../code/localStorageHelper'

/**
 * Constants
 * */
export const moduleName = 'auth'

const prefix = `${appName}/${moduleName}`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`

export const SIGN_LOADING = `${prefix}/SIGN_LOADING`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`

export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
    user: null,
    error: null,
    loading: false
})

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch (type) {

        case SIGN_IN_SUCCESS:
            return state
                .set('user', payload.user)
                .set('error', null)
                .set('loading', false)
            break;

        case SIGN_LOADING:
            return state.set('loading', payload.loading)
            break;

        case SIGN_IN_ERROR: debugger
            return state
                .set('error', payload.error)
                .set('loading', false)
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
export const errorSelector = (state) => state[moduleName].error
export const loadingSelector = (state) => state[moduleName].loading
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

    yield put({
        type: SIGN_LOADING,
        payload: { loading: true }
    })

    const answer = yield call(Api.singIn, email, password)

    if (answer.status === 'ok') {

        LocalStorageHelper.setAccessTokenToStorage(answer.data.accessToken)

        yield put({
            type: SIGN_IN_SUCCESS,
            payload: { user: answer.data, loading: false }
        })
    }
    else {
        yield put({
            type: SIGN_IN_ERROR,
            payload: { error: answer.message, loading: false }
        })
    }
}

export function* checkAccessTokenSaga() {
    
    const token = yield call(LocalStorageHelper.getAccessTokenFromStorage)

    if(!token) return

    const answer = yield call(Api.checkAccessToken, token)

    if (answer.status === 'ok') {

        LocalStorageHelper.setAccessTokenToStorage(answer.data.acceessToken)

        yield put({
            type: SIGN_IN_SUCCESS,
            payload: { user: answer.data }
        })
    }
    else 
    {
        LocalStorageHelper.clearAccessToken()
    }
}

export function* saga() {
    yield all([
        takeEvery(SIGN_IN_REQUEST, signInSaga),
        checkAccessTokenSaga()
    ])
}
