import { createContext, type Dispatch } from 'react'
import type { BudgetActions, BudgetState } from '../reducers/budget-reducer'

type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
}

export const BudgetContext = createContext<BudgetContextProps>(null!)
