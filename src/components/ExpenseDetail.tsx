import { useMemo } from 'react'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/solid'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { categories } from '../data/categories'
import { formatDate } from '../helpers'
import type { Expense } from '../types'
import AmountDisplay from './AmountDisplay'
import { useBudget } from '../hooks/useBudget'

type ExpenseDetailProps = {
  expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const { dispatch } = useBudget()
  const categoryInfo = useMemo(
    () => categories.filter(cat => cat.id === expense.category)[0],
    [expense],
  )

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } })
        }
      >
        Update
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: 'remove-expense', payload: { id: expense.id } })
        }
        destructive={true}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  )
  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={0.7}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="relative w-full bg-white shadow-lg p-6 border-b border-gray-200 flex gap-5 items-center rounded-lg overflow-hidden">
          <div className=" left-2 top-1/2 -translate-y-1/2 flex items-center text-blue-500 text-xs font-medium gap-1 pointer-events-none">
            <ChevronDoubleLeftIcon className="w-4 h-4" />
            Edit
          </div>

          <div>
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt="icono gasto"
              className="w-16"
            />
          </div>

          <div className="flex-1 space-y-1">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo.name}
            </p>
            <p className="text-slate-800">{expense.expenseName}</p>
            <p className="text-slate-600 text-xs">
              {formatDate(expense.date!.toString())}
            </p>
          </div>

          <AmountDisplay amount={expense.amount} />

          <div className=" left-2 top-1/2 -translate-y-1/2 flex items-center text-pink-500 text-xs font-medium gap-1 pointer-events-none">
            Delete <ChevronDoubleRightIcon className="w-4 h-4" />
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
