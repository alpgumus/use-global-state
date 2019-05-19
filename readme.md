# use-global-state-hook

Minimalistic global state and variable management with React Hooks and Context

---

Minimal example:

```javascript
import React from 'react'
import GlobalStateProvider, { useGlobalState } from 'use-global-state-hook'

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
```
