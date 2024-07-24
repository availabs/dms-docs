import React from 'react'
import ReactDOM from 'react-dom/client'
import { authProvider } from "@availabs/ams" //"./modules/ams/src"
import { AUTH_HOST, PROJECT_NAME, CLIENT_HOST }  from './config'
import {
  FalcorProvider,
  falcorGraph
} from "~/modules/avl-falcor"
import App from './App.jsx'
import './index.css'

export const falcor = falcorGraph('https://graph.availabs.org')
const AuthEnabledApp = authProvider(App, { AUTH_HOST, PROJECT_NAME, CLIENT_HOST });

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <FalcorProvider falcor={falcor}>
        <AuthEnabledApp />
      </FalcorProvider>
    </React.StrictMode>,
  )
