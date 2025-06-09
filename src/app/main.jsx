import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";

import {ThemeProvider} from '../processes';
import {store} from '../redux/store.js'
import App from './api/App.jsx'

import '../shared/styles/global.scss'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeProvider>
    </StrictMode>,
)
