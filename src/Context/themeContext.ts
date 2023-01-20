import React from 'react'

const paneDefaultContext = {
  secondaryColor: '#000000',
  primaryColor: '#1060e0',
  accentColor: '#070707',
  backgroundColor: '#ECE9E1',
  fontFamily: 'Roboto',
}

export const themeContext =
  React.createContext<typeof paneDefaultContext>(paneDefaultContext)
