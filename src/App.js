import React from 'react'
import Forms from './components/Forms'
import Store from './components/Store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    
    <Provider store={Store}>
<Forms/>
    </Provider>
   
  )
}

export default App
