import Store from "../store";

export default {
    visible()
    {
        let {drawer} = Store.getState();
        return drawer;
    },
    open()
    {
        Store.dispatch({type: 'OPEN_DRAWER'});
    },
    close()
    {
        Store.dispatch({type: 'CLOSE_DRAWER'});
    }
}
