import React from 'react'

const AppContext = React.createContext()  // this makes available provider and consumer objects, brought in below

export const Provider = AppContext.Provider

export const Consumer = AppContext.Consumer