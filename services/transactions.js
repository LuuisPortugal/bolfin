import Store from "../store";

export default {
    allTransaction()
    {
        let {transactions, collection} = Store.getState();
        return transactions.filter(transaction => transaction.collection === collection);
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
