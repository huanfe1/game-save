import { createBrowserRouter } from 'react-router-dom';

import Game from '@/app/game';
import Layout from '@/app/layout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/game/:uid',
                element: <Game />,
            },
        ],
    },
]);
