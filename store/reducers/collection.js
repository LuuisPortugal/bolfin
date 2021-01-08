export default function collection(state = "", action) {
  switch (action.type) {
    case 'SET_COLLECTION':
      return state = action.collection
    default:
      return state
  }
}
