import Store from "../store";

export default {
    allTransaction()
    {
        let {transactions} = Store.getState();
        return transactions;
    },
    addTransaction(transaction)
    {
        Store.dispatch({
            type: 'ADD_TRANSACTION',
            transaction
        });
    },
    removeTransaction(transaction)
    {
        Store.dispatch({
            type: 'REMOVE_TRANSACTION',
            transaction
        });
    }
}
