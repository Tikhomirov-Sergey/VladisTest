import { appName } from '../config'
import { createSelector } from 'reselect'
import { Record } from 'immutable'
import { call, put, takeEvery, all, cancel } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { REMOVE_PROFILE } from './profile'
import { NEW_ERROR_REQUEST } from './error'

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

export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
    user: null,
    loading: false
})

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch (type) {

        case SIGN_IN_SUCCESS:
            return state
                .set('user', payload.user)
                .set('loading', false)

        case SIGN_LOADING:
            return state.set('loading', payload.loading)

        case SIGN_OUT_SUCCESS:
            return state.set('user', null)

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const userSelector = (state) => state[moduleName].user
export const loadingSelector = (state) => state[moduleName].loading
export const isAuthorizedSelector = createSelector(
    userSelector,
    (user) => !!user
)
export const userIdSelector = createSelector(
    userSelector,
    (user) => user ? user.id : null
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
        type: SIGN_OUT_REQUEST
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

    let serverResponded = false

    while (!serverResponded) {

        try {

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
                    type: SIGN_LOADING,
                    payload: { loading: false }
                })

                yield put({
                    type: NEW_ERROR_REQUEST,
                    payload: { message: answer.message }
                })
            }

            serverResponded = true
        }
        catch
        {
            yield put({
                type: NEW_ERROR_REQUEST,
                payload: { message: 'Сервер не отвечает, пробуем ещё раз' }
            })

            yield delay(2000)
        }
    }
}

export function* checkAccessTokenSaga() {

    const token = yield call(LocalStorageHelper.getAccessTokenFromStorage)

    if (!token) return

    try {

        const answer = yield call(Api.checkAccessToken, token)

        if (answer.status === 'ok') {

            LocalStorageHelper.setAccessTokenToStorage(answer.data.acceessToken)

            yield put({
                type: SIGN_IN_SUCCESS,
                payload: { user: answer.data }
            })
        }
        else {
            LocalStorageHelper.clearAccessToken()
        }
    }
    catch
    {
        cancel();
    }
}

export function* signOutSaga() {

    yield put({
        type: SIGN_OUT_SUCCESS
    })

    yield put({
        type: REMOVE_PROFILE
    })
}

export function* saga() {
    yield all([
        takeEvery(SIGN_IN_REQUEST, signInSaga),
        checkAccessTokenSaga(),
        takeEvery(SIGN_OUT_REQUEST, signOutSaga)
    ])
}
