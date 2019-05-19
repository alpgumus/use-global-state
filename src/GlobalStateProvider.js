import React, { useContext, createContext, useReducer, useEffect, useRef } from 'react'

const environment = { debug: true }
const GlobalStateCtx = createContext(null)

const globalStateReducer = (state, action) => {
  const changed = []
  const same = []
  Object.keys(action).forEach(key => {
    if (state[key] !== action[key]) changed.push({ key, old: state[key], new: action[key] })
    else same.push({ key, same: state[key] })
  })
  let newstate = state
  if (changed.length) newstate = { ...state, ...action }
  if (newstate.environment.debug) console.log('reducer', ...changed, ...same)
  return newstate
}

const initialGlobalState = {
  width: typeof window !== 'undefined' ? window.innerWidth : 8000,
  height: typeof window !== 'undefined' ? window.innerHeight : 6000,
  environment,
}

export default ({ children }) => {
  const [globalState, updateGlobalState] = useReducer(globalStateReducer, initialGlobalState)
  const globalVariables = useRef()
  const updateGlobalVariables = vars => {
    globalVariables.current = { ...globalVariables.current, ...vars }
  }

  useEffect(() => {
    console.log('GlobalState initialized.')
    const handleResize = () => {
      updateGlobalState({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const value = { globalState, updateGlobalState, globalVariables, updateGlobalVariables }
  return <GlobalStateCtx.Provider value={value}>{children}</GlobalStateCtx.Provider>
}

export const useGlobalState = initUpdateState => {
  const contextValues = useContext(GlobalStateCtx)
  const { globalState, updateGlobalState } = contextValues
  useEffect(() => {
    if (initUpdateState) {
      const newState = {}
      Object.keys(initUpdateState).forEach(key => {
        if (!(key in globalState)) newState[key] = initUpdateState[key]
      })
      if (Object.keys(newState).length) updateGlobalState(newState)
    }
  }, [globalState, updateGlobalState, initUpdateState])

  return contextValues
}
