import Store from "../store";

export default {
    allCollections()
    {
        let {collections} = Store.getState();
        return collections;
    },
    activeCollection()
    {
        let {collection} = Store.getState();
        return collection;
    },
    setCollection(collection)
    {
        Store.dispatch({
            type: 'SET_COLLECTION',
            collection
        });
    },
    addCollection(collection)
    {
        Store.dispatch({
            type: 'ADD_COLLECTION',
            collection
        });
    },
    removeCollection(collection)
    {
        Store.dispatch({
            type: 'REMOVE_COLLECTION',
            collection
        });
    }
}
