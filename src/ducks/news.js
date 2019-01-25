import { appName } from '../config'
import { createSelector } from 'reselect'
import { Record } from 'immutable'
import { call, put, takeEvery, take, all, apply, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { replace } from 'connected-react-router'

import Api from '../api'

/**
 * Constants
 * */
export const moduleName = 'news'

const prefix = `${appName}/${moduleName}`

export const LOAD_NEWS_REQUEST = `${prefix}/LOAD_NEWS_REQUEST`
export const LOAD_NEWS_SUCCESS = `${prefix}/LOAD_NEWS_SUCCESS`

export const START_NEWS_LOADING = `${prefix}/START_NEWS_LOADING`
export const LOAD_NEWS_ERROR = `${prefix}/LOAD_NEWS_ERROR`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
    news: null,
    error: null,
    loading: false
})

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch (type) {

        case LOAD_NEWS_SUCCESS:
            return state
                .set('news', payload.news)
                .set('loading', false)
            break;
        
        case START_NEWS_LOADING:
            return state
                .set('loading', true)
            break;

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const newsSelector = (state) => state[moduleName].news
export const loadingSelector = (state) => state[moduleName].loading

/**
 * Action Creators
 * */

export function loadNews() {
    return {
        type: LOAD_NEWS_REQUEST,
        payload: {}
    }
} 

/**
 * Sagas
 **/

export function* loadNewsSaga() {
    
        yield put({
            type: START_NEWS_LOADING,
            payload: { }
        })
    
        const answer = yield call(Api.getNews)
    
        if (answer.status === 'ok') {debugger
            yield put({
                type: LOAD_NEWS_SUCCESS,
                payload: { news: answer.data }
            })
        }
        else {
            yield put({
                type: LOAD_NEWS_ERROR,
                payload: { error: answer.message }
            })
        }
    }
    
    export function* saga() {
        yield all([takeEvery(LOAD_NEWS_REQUEST, loadNewsSaga)])
    }
    