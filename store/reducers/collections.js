export default function collections(state = [], action)
{
    switch (action.type)
    {
        case 'ADD_COLLECTION':
            return state.concat([action.collection])
        case 'REMOVE_COLLECTION':
            let collections = [...state]
            let index = collections.indexOf(action.collection)

            collections.splice(index, 1)
            return collections
        default:
            return state
    }
}
