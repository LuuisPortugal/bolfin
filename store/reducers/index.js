import {combineReducers} from 'redux'
import collection from './collection'
import collections from './collections'
import transactions from './transactions'
import drawer from './drawer'
import user from './user'

export default combineReducers({
    collection,
    collections,
    transactions,
    drawer,
    user
})
