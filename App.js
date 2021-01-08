import React from 'react';

import Home from './pages/Home';
import {useFonts} from "expo-font";

export default function App()
{
    const [loaded] = useFonts({
        Assistant: require('./assets/fonts/Assistant-Regular.ttf'),
        'Assistant-Light': require('./assets/fonts/Assistant-Light.ttf'),
        'Assistant-Bold': require('./assets/fonts/Assistant-Bold.ttf')
    });

    if (!loaded)
    {
        return null;
    }

    return (
        <Home/>
    );
}
