// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/index.tsx'
import {Suspense} from "react"
import Loading from './components/Loading/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Suspense fallback={<Loading/>}>
    <App />
    </Suspense>
  </Provider>
)
