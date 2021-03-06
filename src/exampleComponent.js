import React from 'react'
import { useGlobalState } from 'use-global-state-hook'

const MyComponent = () => {
  const { globalState, updateGlobalState } = useGlobalState({ counter: 0 })
  const { counter } = globalState
  return (
    <div>
      <p>counter: {counter}</p>
      <button type="button" onClick={() => updateGlobalState({ counter: counter + 1 })}>
        Add 1 to Global State counter
      </button>
    </div>
  )
}

export default MyComponent
