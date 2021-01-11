export default function drawer(state = false, action)
{
    switch (action.type)
    {
        case 'OPEN_DRAWER':
            return state = true
        case 'CLOSE_DRAWER':
            return state = false
        default:
            return state
    }
}
