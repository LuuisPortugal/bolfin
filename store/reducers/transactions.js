export default function transactions(state = [], action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return state.concat([action.transaction])
    case 'REMOVE_TRANSACTION':
      let transactions = [...state]
      let index = transactions.indexOf(action.transaction)
      
      transactions.splice(index, 1)
      return transactions
    default:
      return state
  }
}