import React, { createContext, useContext } from 'react';

export default (hook, config, defaultValue) => {
  const Context = createContext(defaultValue)

  const Provider = ({children}) =>
    <Context.Provider value={hook(...config)}>
      {children}
    </Context.Provider>

  return [() => useContext(Context), Provider]
}