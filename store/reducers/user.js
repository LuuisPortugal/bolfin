const _state = {
    avatar: 'https://instagram.fbel1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/134171702_149579456687982_4336161202247468911_n.jpg?_nc_ht=instagram.fbel1-1.fna.fbcdn.net&_nc_ohc=toZHLo7ooFUAX9SPVlX&tp=1&oh=cb8ca4935af74f16f6c8fca80901534e&oe=602526D8',
    name: "Luis Enrique Portugal",
    nick: "luisenriquegomesportugal"
}

export default function user(state = _state, action)
{
    switch (action.type)
    {
        case 'SET_USER':
            return state = action.user
        default:
            return state
    }
}
