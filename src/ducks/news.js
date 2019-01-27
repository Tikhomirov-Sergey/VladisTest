import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { call, put, takeEvery, all, select } from 'redux-saga/effects'

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
    news: new OrderedMap(),
    error: null,
    loading: false,
    loaded: false
})

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch (type) {

        case LOAD_NEWS_SUCCESS:debugger
            return state
                .set('news', payload.news)
                .set('loading', false)
                .set('loaded', true)
        
        case START_NEWS_LOADING:
            return state
                .set('loading', true)

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const newsSelector = (state) => state[moduleName].news
export const loadingSelector = (state) => state[moduleName].loading
export const loadedSelector = (state) => state[moduleName].loaded

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
    
        if(yield select(loadedSelector)) return

        yield put({
            type: START_NEWS_LOADING
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
    