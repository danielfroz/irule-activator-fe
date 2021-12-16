import { Provider } from 'react-redux'
import { Provider as AlertProvider } from 'react-alert'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../redux'

import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import AlertTemplate from '../alerts/Basic'

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider template={AlertTemplate} timeout={10000}
          position='bottom center' transition='scale'>
          <Component {...pageProps} />
        </AlertProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
