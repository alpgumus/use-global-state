import React from 'react'
import GlobalStateProvider, { useGlobalState } from './GlobalStateProvider'

const App = () => {
  const { globalState, updateGlobalState } = useGlobalState({
    counter: 0,
    environment: { debug: true },
  })

  const { counter } = globalState
  return (
    <GlobalStateProvider>
      <p>
        counter:
        {counter}
      </p>
      <button type="button" onClick={() => updateGlobalState({ counter: counter + 1 })}>
        Add 1 to Global State counter
      </button>
    </GlobalStateProvider>
  )
}

export default App
