import { OrderedMap } from 'immutable'

export function generateId() {
  return Date.now() + Math.random()
}

export function objectToOrderedMap(id, values, DataRecord) {
    return new OrderedMap({[id]: new DataRecord({...values})})
}
