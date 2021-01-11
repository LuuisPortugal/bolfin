import Store from "../store";

export default {
    user()
    {
        let {user} = Store.getState();
        return user;
    },
    setUser(user)
    {
        Store.dispatch({
            type: 'SET_USER',
            user
        });
    }
}
