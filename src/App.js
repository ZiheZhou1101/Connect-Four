import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Game from './Game';

const router = createHashRouter([
    {
        path: '',
        element: <Game />
    }
])
const App = () => {
    return <RouterProvider router={router} />
}
export default App;