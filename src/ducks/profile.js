import { appName } from '../config'
import { Record } from 'immutable'
import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { userIdSelector } from './auth'
import { NEW_ERROR_REQUEST } from './error'

import Api from '../api'

/**
 * Constants
 * */

export const moduleName = 'profile'

const prefix = `${appName}/${moduleName}`

export const LOAD_PROFILE_REQUEST = `${prefix}/LOAD_PROFILE_REQUEST`
export const LOAD_PROFILE_SUCCESS = `${prefix}/LOAD_PROFILE_SUCCESS`

export const REMOVE_PROFILE = `${prefix}/REMOVE_PROFILE`

export const START_PROFILE_LOADING = `${prefix}/START_PROFILE_LOADING`
export const LOAD_PROFILE_ERROR = `${prefix}/LOAD_PROFILE_ERROR`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
    profile: null,
    error: null,
    loading: false,
    loaded: false
})

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch (type) {

        case LOAD_PROFILE_SUCCESS:
            return state
                .set('profile', payload.profile)
                .set('loading', false)
                .set('loaded', true)

        case START_PROFILE_LOADING:
            return state
                .set('loading', true)

        case REMOVE_PROFILE:
            return state
                .set('profile', null)
                .set('loaded', false)

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const profileSelector = (state) => state[moduleName].profile
export const loadingSelector = (state) => state[moduleName].loading
export const loadedSelector = (state) => state[moduleName].loaded

/**
 * Action Creators
 * */

export function loadProfile() {
    return {
        type: LOAD_PROFILE_REQUEST,
        payload: {}
    }
}

/**
 * Sagas
 **/

export function* loadProfileSaga() {

    if (yield select(loadedSelector)) return

    const id = yield select(userIdSelector)

    yield put({
        type: START_PROFILE_LOADING
    })

    let serverResponded = false

    while (!serverResponded) {

        try {

            const answer = yield call(Api.getProfile, id)

            if (answer.status === 'ok') {
                yield put({
                    type: LOAD_PROFILE_SUCCESS,
                    payload: { profile: answer.data }
                })
            }
            else {
                yield put({
                    type: LOAD_PROFILE_ERROR,
                    payload: { error: "Профиль не найден" }
                })
            }

            serverResponded = true
        }
        catch {
            yield put({
                type: NEW_ERROR_REQUEST,
                payload: { message: 'Сервер не отвечает, пробуем ещё раз' }
            })

            yield delay(2000)
        }
    }
}

export function* saga() {
    yield all([takeEvery(LOAD_PROFILE_REQUEST, loadProfileSaga)])
}
