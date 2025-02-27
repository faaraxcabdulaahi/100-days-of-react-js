import React from 'react'
import  CounterProvider  from './context/CounterProvider'
import Home from './pages/Home'

const App = () => {
  return (
    <CounterProvider>
      <Home/>
    </CounterProvider>
    
  )
}

export default App
