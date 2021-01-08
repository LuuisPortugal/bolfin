import {combineReducers} from 'redux'
import collection from './collection'
import collections from './collections'
import transactions from './transactions'

export default combineReducers({
    collection,
    collections,
    transactions
})
