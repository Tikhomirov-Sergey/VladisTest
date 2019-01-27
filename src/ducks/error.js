import { appName } from '../config'
import { createSelector } from 'reselect'
import { Record, OrderedMap } from 'immutable'
import { call, put, takeEvery, all } from 'redux-saga/effects'

import { objectToOrderedMap, generateId } from '../code/DucksHelper'

/**
 * Constants
 * */

export const moduleName = 'error'

const prefix = `${appName}/${moduleName}`

export const NEW_ERROR_REQUEST = `${prefix}/NEW_ERROR_REQUEST`
export const NEW_ERROR_SUCCESS = `${prefix}/NEW_ERROR_SUCCESS`

export const CLOSE_ERROR = `${prefix}/CLOSE_ERROR`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
    errors: OrderedMap({})
})

export const errorRecord = Record({
    id: null,
    message: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch (type) {

        case NEW_ERROR_SUCCESS:
            return state.mergeIn(['errors'], objectToOrderedMap(payload.id, payload, errorRecord))

        case CLOSE_ERROR:
            return state.delete('errors', payload.id)

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const errorSelector = createSelector(stateSelector, state => state.errors)
export const errorListSelector = createSelector(errorSelector, errors => errors.valueSeq().toArray())

/**
 * Action Creators
 * */

export function closeError(id) {
    return {
        type: CLOSE_ERROR,
        payload: { id }
    }
}

/**
 * Sagas
 **/

export function* newErrorSaga({ payload }) {

    const { message } = payload

    const id = yield call(generateId)

    yield put({
        type: NEW_ERROR_SUCCESS,
        payload: { message, id }
    })
}

export function* saga() {
    yield all([
        takeEvery(NEW_ERROR_REQUEST, newErrorSaga)
    ])
}
