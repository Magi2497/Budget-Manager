import { useReducer, type PropsWithChildren } from 'react'
import { budgetReducer, initialState } from '../reducers/budget-reducer'
import { BudgetContext } from '../context/BudgetContext'

export const BudgetProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  )
}
