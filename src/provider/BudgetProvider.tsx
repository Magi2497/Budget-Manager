import { useMemo, useReducer, type PropsWithChildren } from 'react'
import { budgetReducer, initialState } from '../reducers/budget-reducer'
import { BudgetContext } from '../context/BudgetContext'

export const BudgetProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => total + expense.amount, 0),
    [state.expenses],
  )

  const remainingBudget = state.budget - totalExpenses

  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpenses, remainingBudget }}
    >
      {children}
    </BudgetContext.Provider>
  )
}
