import * as React from 'react'

export const useToggle = (initialValue?: boolean) => React.useReducer((s) => !s, initialValue || false)