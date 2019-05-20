import React from 'react'
import GlobalStateProvider from 'use-global-state-hook'
import MyComponent from './exampleComponent'

const MyApp = () => (
  <GlobalStateProvider environment={{ debug: true }}>
    <MyComponent />
  </GlobalStateProvider>
)

export default MyApp
