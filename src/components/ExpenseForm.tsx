import { useState, useEffect } from 'react'
import type { DraftExpense, Value } from '../types'
import { categories } from '../data/categories'
import ErrorMessage from './ErrorMessage'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { useBudget } from '../hooks/useBudget'

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  })

  const [error, setError] = useState('')
  const { dispatch, state } = useBudget()

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(
        expense => expense.id === state.editingId,
      )[0]

      setExpense(editingExpense)
    }
  }, [state.editingId, state.expenses])

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target

    const isAmountField = ['amount'].includes(name)

    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    })
  }

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate
    if (Object.values(expense).includes('')) {
      setError('All fields are required')
      return
    }
    // Add or update a expense
    if (state.editingId) {
      dispatch({
        type: 'update-expense',
        payload: { expense: { id: state.editingId, ...expense } },
      })
    } else {
      dispatch({ type: 'add-expense', payload: { expense } })
    }

    // Restart the state

    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date(),
    })
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.editingId
          ? `Update expense: ${expense.expenseName}`
          : 'New Expense'}
      </legend>
      {error && <ErrorMessage> {error}</ErrorMessage>}
      <div className=" flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Expense Name:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Enter a name for the expense"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className=" flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Enter the amount of the expense: (e.g., 300)"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className=" flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Category:
        </label>

        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Select --</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <div className=" flex flex-col gap-2">
          <label htmlFor="amount" className="text-xl">
            Expense Date:
          </label>
          <DatePicker
            className="bg-slate-100 p-2 border-0"
            value={expense.date}
            onChange={handleChangeDate}
          />
        </div>

        <input
          type="submit"
          className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
          value={state.editingId ? 'Update expense' : 'Add Expense'}
        />
      </div>
    </form>
  )
}
